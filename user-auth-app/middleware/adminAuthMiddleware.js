const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin"); // Import your Admin model

const verifyAdminToken = async (req, res, next) => {
  // Check if authorization header exists
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Extract the token (assuming "Bearer TOKEN_STRING")
    const tokenString = token.split(" ")[1];
    
    // Verify the token
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);

    // Check if the decoded token has an admin ID
    if (!decoded.adminId) {
      return res.status(403).json({ error: "Invalid admin token." });
    }

    // Find the admin in the database to ensure they exist
    const admin = await Admin.findById(decoded.adminId);
    
    if (!admin) {
      return res.status(404).json({ error: "Admin not found." });
    }

    // Attach admin information to the request
    req.admin = admin;
    
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Handle different types of errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: "Invalid token." });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Token has expired." });
    }

    // Generic error response
    return res.status(500).json({ error: "Authentication failed." });
  }
};

module.exports = { verifyAdminToken };