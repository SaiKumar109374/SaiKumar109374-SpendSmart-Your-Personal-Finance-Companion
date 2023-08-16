const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      console.log("Token:", token); // Add this line to log the token

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded); // Add this line to log the decoded token

      // Get user from the token
      const userId = decoded.id;
      console.log("User ID from Token:", userId);

      const user = await User.findById(userId).select("-password");
      console.log("Fetched User:", user);

      if (!user) {
        console.log("User Not Found");
        res.status(401).json({ message: "Not authorized" });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Not authorized" });
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
