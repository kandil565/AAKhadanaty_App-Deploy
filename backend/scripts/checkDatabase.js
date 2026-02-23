/**
 * Check Database Status
 *
 * Shows what users are currently in the database
 *
 * Run: node backend/scripts/checkDatabase.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const checkDatabase = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ Connected to: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);

    // Get database
    const db = mongoose.connection.db;

    // Check collections
    const collections = await db.listCollections().toArray();
    console.log(`\n📋 Collections in database: ${collections.length}`);
    collections.forEach((col) => {
      console.log(`  - ${col.name}`);
    });

    // Check users collection
    const usersCollection = db.collection("users");
    const userCount = await usersCollection.countDocuments();

    console.log(`\n👥 Total users: ${userCount}`);

    if (userCount > 0) {
      const users = await usersCollection.find({}).toArray();
      console.log("\nUsers details:");
      users.forEach((user, index) => {
        console.log(`\n  ${index + 1}. Email: ${user.email}`);
        console.log(`     Name: ${user.name}`);
        console.log(`     Admin: ${user.isAdmin}`);
        console.log(`     ID: ${user._id}`);
      });
    } else {
      console.log("✅ No users in database!");
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("\nMake sure:");
    console.error("  1. MongoDB is running");
    console.error("  2. MONGODB_URI in .env is correct");
    console.error("  3. You're in the backend directory");
    process.exit(1);
  }
};

checkDatabase();
