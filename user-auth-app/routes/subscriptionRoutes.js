const jwt = require('jsonwebtoken');

// Export the middleware as a function
const verifyToken = (req, res, next) => {
  try {
    // Get the token from the headers
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        message: "Authentication failed: No token provided"
      });
    }
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user info to request
    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };
    
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed: Invalid token",
      error: error.message
    });
  }
};

module.exports = verifyToken;