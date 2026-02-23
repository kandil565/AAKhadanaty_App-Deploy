/**
 * createAdmin.js
 *
 * Creates or updates the admin user in the database with the credentials below.
 * Run: node backend/scripts/createAdmin.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const ADMIN_EMAIL = "admin@a5adamaty.com"; // normalized lowercase
const ADMIN_PASSWORD = "admin12345678";
const ADMIN_NAME = "Admin";
const ADMIN_PHONE = "0000000000";

const ensureAdmin = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    const email = ADMIN_EMAIL.trim().toLowerCase();

    let admin = await User.findOne({ email });
    if (admin) {
      console.log(
        "🔎 Admin already exists. Updating password and isAdmin flag.",
      );
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(ADMIN_PASSWORD, salt);
      admin.isAdmin = true;
      await admin.save();
      console.log(`✅ Admin user updated: ${email}`);
    } else {
      console.log("➕ Creating new admin user...");
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(ADMIN_PASSWORD, salt);
      admin = await User.create({
        name: ADMIN_NAME,
        email,
        phone: ADMIN_PHONE,
        password: hashed,
        isAdmin: true,
      });
      console.log(`✅ Admin user created: ${email}`);
    }

    // Show admin record id
    const refreshed = await User.findOne({ email }).select("-password");
    console.log("Admin user:", refreshed);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message || err);
    process.exit(1);
  }
};

ensureAdmin();
