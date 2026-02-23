/**
 * fixAdminPassword.js
 *
 * Set admin user's password to plaintext so Mongoose pre-save hashes it once.
 * Run: node backend/scripts/fixAdminPassword.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const ADMIN_EMAIL = "admin@a5adamaty.com";
const ADMIN_PASSWORD = "admin12345678";

const fixPassword = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    const email = ADMIN_EMAIL.trim().toLowerCase();
    const admin = await User.findOne({ email }).select("+password");
    if (!admin) {
      console.log("⚠️ Admin user not found");
      process.exit(1);
    }

    admin.password = ADMIN_PASSWORD; // set plaintext so pre-save hashes it
    admin.isAdmin = true;
    await admin.save();

    console.log("✅ Admin password updated and hashed correctly.");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message || err);
    process.exit(1);
  }
};

fixPassword();
