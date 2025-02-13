// routes/packageRoutes.js
const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Package = require('./models/Package');
const UserPackage = require('./models/UserPackage');
const Contact = require('../models/Contact');
const router = express.Router();

// Create package types
router.post('/packages', verifyToken, async (req, res) => {
  try {
    const packages = [
      {
        name: 'SELF_NUMBER',
        price: 500,
        messageLimit: 100
      },
      {
        name: 'RANDOM_NUMBER',
        price: 700,
        messageLimit: 100
      }
    ];

    await Package.insertMany(packages);
    res.status(201).json({ message: 'Packages created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Purchase a package
router.post('/purchase', verifyToken, async (req, res) => {
  const { packageId, whatsappNumber } = req.body;
  const userId = req.user.id;

  try {
    const package = await Package.findById(packageId);
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const user = await User.findById(userId);
    if (user.Balance < package.price) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // If it's a self number package, verify the WhatsApp number
    if (package.name === 'SELF_NUMBER') {
      if (!whatsappNumber) {
        return res.status(400).json({ message: 'WhatsApp number required for self number package' });
      }
      const contact = await Contact.findOne({ 
        whatsappId: whatsappNumber,
        userId: userId,
        status: 1 // Connected status
      });
      if (!contact) {
        return res.status(400).json({ message: 'WhatsApp number not found or not connected' });
      }
    }

    // Create expiration date (30 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Create user package
    const userPackage = new UserPackage({
      userId,
      packageId,
      messagesRemaining: package.messageLimit,
      whatsappNumber: package.name === 'SELF_NUMBER' ? whatsappNumber : null,
      expiresAt,
      active: true
    });

    // Deduct balance
    user.Balance -= package.price;
    await user.save();
    await userPackage.save();

    res.status(201).json({
      message: 'Package purchased successfully',
      userPackage
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send message
router.post('/send-message', verifyToken, async (req, res) => {
  const { packageId, recipient, message } = req.body;
  const userId = req.user.id;

  try {
    // Check if user has active package
    const userPackage = await UserPackage.findOne({
      userId,
      packageId,
      active: true,
      expiresAt: { $gt: new Date() },
      messagesRemaining: { $gt: 0 }
    });

    if (!userPackage) {
      return res.status(400).json({ message: 'No active package found or messages exhausted' });
    }

    // Get sender WhatsApp number
    let senderNumber;
    const package = await Package.findById(packageId);
    
    if (package.name === 'SELF_NUMBER') {
      senderNumber = userPackage.whatsappNumber;
    } else {
      // Get random connected WhatsApp number
      const randomContact = await Contact.aggregate([
        { $match: { status: 1 } }, // Only connected numbers
        { $sample: { size: 1 } } // Get random number
      ]);
      
      if (!randomContact.length) {
        return res.status(400).json({ message: 'No available WhatsApp numbers' });
      }
      senderNumber = randomContact[0].whatsappId;
    }

    // Send message using SMS Pro API
    const response = await axios.post('https://smspro.pk/api/send/whatsapp', {
      secret: process.env.SMS_PRO_SECRET,
      account: senderNumber,
      recipient,
      type: 'text',
      message
    });

    if (response.data.status === 200) {
      // Decrement messages remaining
      userPackage.messagesRemaining--;
      await userPackage.save();

      res.status(200).json({
        message: 'Message sent successfully',
        messagesRemaining: userPackage.messagesRemaining
      });
    } else {
      res.status(400).json({ message: 'Failed to send message' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user packages
router.get('/my-packages', verifyToken, async (req, res) => {
  try {
    const userPackages = await UserPackage.find({
      userId: req.user.id,
      active: true,
      expiresAt: { $gt: new Date() }
    }).populate('packageId');

    res.status(200).json(userPackages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;