// middleware/userAuth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = adminAuth;
