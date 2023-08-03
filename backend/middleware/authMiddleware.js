import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// Auth Middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // verifying and getting payload.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // userId is basically which is you provided as a payload at the time cookie creation.
      req.user = await User.findById(decoded.userId);

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, token did not found");
  }
});

// Admin Middleware
const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
});

export { protect, admin };
