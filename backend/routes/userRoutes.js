import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  updateUserProfile,
  deleteUserProfile,
  getUserProfile,
  registerUser,
  deleteUser,
  getUserById,
  logoutUser,
  updateUser,
  getUsers,
  authUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUserProfile);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
