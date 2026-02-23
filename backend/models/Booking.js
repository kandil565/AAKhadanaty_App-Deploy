import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceName: {
      type: String,
      required: [true, "Please provide a service name"],
    },
    serviceType: {
      type: String,
      enum: ["therapy", "consultation", "counseling", "massage", "training"],
      required: true,
    },
    date: {
      type: Date,
      required: [true, "Please provide a booking date"],
    },
    time: {
      type: String,
      required: [true, "Please provide a time"],
    },
    duration: {
      type: Number,
      default: 60, // in minutes
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },
    notes: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "failed"],
      default: "unpaid",
    },
    therapistName: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: "Online",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// Index for better queries
bookingSchema.index({ userId: 1, date: 1 });

export default mongoose.model("Booking", bookingSchema);
