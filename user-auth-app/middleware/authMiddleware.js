const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token is missing." });
  }
  
  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send("Invalid Token");
    
    // Check if the user has an 'admin' role
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    
    req.user = decoded; // Attach decoded user to request
    next();
  });
};

module.exports = { verifyToken };
