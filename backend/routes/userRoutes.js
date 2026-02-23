import express from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  updateUserRole,
} from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAllUsers);
router.get("/:id", protect, getUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, adminOnly, deleteUser);
router.put("/:id/role", protect, adminOnly, updateUserRole);

export default router;
