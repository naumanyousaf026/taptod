const mongoose = require("mongoose");
const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const User = require("../models/User");
const Contact = require("../models/Contact");
const axios = require("axios");

const router = express.Router();

// Endpoint to generate WhatsApp QR
router.get("/generate-whatsapp-qr", verifyToken, async (req, res) => {
  const { secret, sid } = req.query;

  if (!secret || !sid) {
    return res.status(400).json({
      message: "Missing required query parameters: 'secret' and 'sid'.",
    });
  }

  const url = "https://smspro.pk/api/create/wa.link";
  const params = { secret, sid };

  try {
    const response = await axios.get(url, { params });

    if (response.data.status === 200) {
      const qrImageLink = response.data.data.qrimagelink;
      const infoLink = response.data.data.infolink;

      // Extract token from the infoLink
      const urlParams = new URL(infoLink);
      const token = urlParams.searchParams.get("token");

      if (!token) {
        return res.status(400).json({
          message: "Token could not be extracted from the infoLink.",
        });
      }

      return res.status(200).json({
        message: "WhatsApp QRCode generated successfully!",
        qrImageLink,
        infoLink,
        token,
      });
    } else {
      return res.status(400).json({
        message: `Error generating QR code: ${response.data.message || "Unknown error"}`,
      });
    }
  } catch (error) {
    console.error("Error generating WhatsApp QR:", error.message);
    return res.status(500).json({
      message: "Failed to generate WhatsApp QR Code.",
      error: error.message,
    });
  }
});

// Helper function to format WhatsApp ID
function formatWhatsAppId(wid) {
  const parts = wid.split(":")[0];
  return `+${parts}`;
}

// Allocate rewards
async function allocateRewards(contact) {
  const rewardAmount = 30;

  // Check if the contact is eligible for a reward (every hour)
  if (!contact.lastRewardedAt || new Date() - contact.lastRewardedAt >= 60000) {
    contact.balance += rewardAmount; // Add ₹30 to the balance
    contact.lastRewardedAt = new Date(); // Update the last rewarded time
    contact.rewarded = true; // Mark as rewarded
    await contact.save();
  }
}

// Fetch WhatsApp accounts and update contact statuses
async function fetchWhatsAppAccounts() {
  const url = "https://smspro.pk/api/get/wa.accounts";
  const params = {
    secret: "e7d0098a46e0af84f43c2b240af5984ae267e08d",
    sid:1,
    limit: 10,
    page: 1,
  };

  try {
    const response = await axios.get(url, { params });
    // console.log("Fetched WhatsApp Accounts:", response.data);

    if (response.data && response.data.message === "WhatsApp Accounts") {
      const accounts = response.data.data; // Assuming the response contains an array of accounts

      for (const account of accounts) {
        const { unique, status } = account;

        // Check if the unique ID matches any contact
        const contact = await Contact.findOne({ uniqueId: unique });
        if (contact) {
          if (status === "connected") {
            // If connected, allocate rewards
            await allocateRewards(contact);
            contact.status = 1; // Mark as connected
          } else {
            // If not connected, set status to disconnected
            contact.status = 2;
          }
          await contact.save(); // Save the updated contact
        }
      }
    }
  } catch (error) {
    // console.error("Error fetching WhatsApp accounts:", error.message);
  }
}

// Periodically check WhatsApp accounts every hour
setInterval(fetchWhatsAppAccounts, 60 * 1000);// Run every hour

router.get("/get-whatsapp-info", verifyToken, async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).json({ message: "Missing WhatsApp token." });
  }

  const url = "https://smspro.pk/api/get/wa.info";
  let retries = 5; // Maximum number of retries
  let delay = 5000; // Initial delay (5 seconds)

  try {
    let response;

    for (let attempt = 1; attempt <= retries; attempt++) {
      response = await axios.get(url, { params: { token } });

      if (response.data.status === 200 && response.data.data) {
        break; // Exit loop if valid data is received
      }

      if (response.data.status === 301) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      }
    }

    if (response.data.status !== 200 || !response.data.data) {
      return res.status(response.data.status).json({
        message: "WhatsApp info is still not ready. Please try again later.",
      });
    }

    const { wid, unique } = response.data.data;
    const whatsappId = formatWhatsAppId(wid);

    let contact = await Contact.findOne({ whatsappId, status: 0 });

    if (contact) {
      // Existing contact: Check time since last connection
      const previousConnectedAt = contact.connectedAt;
      contact.uniqueId = unique;
      contact.status = 1;
      contact.connectedAt = new Date();

      // Calculate time difference in milliseconds
      const timeDifference = contact.connectedAt - previousConnectedAt;
      contact.rewarded = timeDifference >= 60000; // 1 minute check
    } else {
      // New contact: Create and allocate referral rewards
      contact = new Contact({
        whatsappId,
        uniqueId: unique,
        userId: req.user.id,
        status: 1,
        connectedAt: new Date(),
        rewarded: false, // Initial state; let allocateRewards set if needed
      });

      // Allocate rewards only for new contacts (referrals)
      await allocateRewards(contact);
    }

    await contact.save();

    // Update user balance with fixed 10-rupee reward
    const user = await User.findById(req.user.id);
    user.Balance += 10;
    user.Rewards += 10;
    await user.save();

    return res.status(200).json({
      message: "Reward processed successfully.",
      data: {
        whatsappId: contact.whatsappId,
        uniqueId: contact.uniqueId,
        reward: contact.rewarded ? 30 : 0, // 30 rupees if rewarded
        balance: contact.balance,
        userRewards: user.Rewards,
        userBalance: user.Balance,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error fetching WhatsApp information: ${error.message || "Unknown error"}`,
    });
  }
});

router.get("/last-connected", verifyToken, async (req, res) => {
  try {
    // Get the last connected contact
    const lastContact = await Contact.findOne().sort({ lastRewardedAt: -1 });

    if (!lastContact) {
      return res.status(404).json({ message: "No connected users found." });
    }

    return res.status(200).json({
      whatsappId: lastContact.whatsappId,
      uniqueId: lastContact.uniqueId,  // Include the uniqueId field
      status: lastContact.status === 1 ? "Connected" : "Disconnected",
      balance: lastContact.balance,
      lastConnectedAt: lastContact.lastRewardedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});
// Delete WhatsApp Account Endpoint
router.delete("/delete-wa-account", verifyToken, async (req, res) => {
  const { unique } = req.query;

  if (!unique) {
    return res.status(400).json({ message: "Missing unique ID." });
  }

  try {
    // Find contact by uniqueId
    const contact = await Contact.findOne({ uniqueId: unique });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found." });
    }

    // Check if status is disconnected (2)
    if (contact.status === 2) {
      contact.status = 0; // Update to inactive status
      await contact.save();
    }

    // Call SMS Pro's delete API
    const smsProResponse = await axios.get("https://smspro.pk/api/delete/wa.account", {
      params: {
        secret: "e7d0098a46e0af84f43c2b240af5984ae267e08d",
        unique: unique,
      }
    });

    return res.status(200).json({
      message: "Account deleted successfully",
      data: smsProResponse.data
    });

  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({
      message: "Failed to delete account",
      error: error.message
    });
  }
});

// Update status to 0
router.put("/update-status", verifyToken, async (req, res) => {
  const { whatsappId, status } = req.body;

  if (!whatsappId) {
    return res.status(400).json({ message: "WhatsApp ID is required." });
  }

  try {
    const contact = await Contact.findOne({ whatsappId });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found." });
    }

    contact.status = status;
    await contact.save();

    return res.status(200).json({ message: "Status updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error });
  }
});
module.exports = router;