import express from "express";
import {
  getAllBookings,
  getMyBookings,
  getBooking,
  createBooking,
  updateBooking,
  cancelBooking,
  deleteBooking,
} from "../controllers/bookingController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAllBookings);
router.get("/my-bookings", protect, getMyBookings);
router.post("/", protect, createBooking);
router.get("/:id", protect, getBooking);
router.put("/:id", protect, updateBooking);
router.patch("/:id/cancel", protect, cancelBooking);
router.delete("/:id", protect, adminOnly, deleteBooking);

export default router;
