/**
 * Delete All Non-Admin Users
 *
 * This script deletes all regular users from the database,
 * keeping only admin users.
 *
 * Run: node backend/scripts/deleteNonAdminUsers.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const deleteNonAdminUsers = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    // Get all users
    const allUsers = await User.find();
    console.log(`\n📊 Total users in database: ${allUsers.length}`);

    if (allUsers.length > 0) {
      console.log("\nUsers before deletion:");
      allUsers.forEach((user) => {
        console.log(
          `  - ${user.email} (${user.isAdmin ? "Admin" : "Regular User"})`,
        );
      });
    }

    // Delete all non-admin users
    const result = await User.deleteMany({ isAdmin: { $ne: true } });

    console.log(`\n✨ Deleted ${result.deletedCount} non-admin users!`);

    // Get remaining users
    const remainingUsers = await User.find();
    console.log(`\n📊 Remaining admin users: ${remainingUsers.length}`);

    if (remainingUsers.length > 0) {
      console.log("\nRemaining users:");
      remainingUsers.forEach((user) => {
        console.log(`  ✓ ${user.email} (Admin)`);
      });
    } else {
      console.log("\n⚠️  No admin users found in database.");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

deleteNonAdminUsers();
