const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token is missing." });
  }
  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send("Invalid Token");
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
