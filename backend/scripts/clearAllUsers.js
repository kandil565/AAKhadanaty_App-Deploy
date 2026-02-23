/**
 * Clear All Users Database
 *
 * This script completely clears all users from the database
 * and shows the result.
 *
 * Run: node backend/scripts/clearAllUsers.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const clearAllUsers = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ Connected to: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);

    // Get database and collection
    const db = mongoose.connection.db;
    const usersCollection = db.collection("users");

    // Count users before
    const countBefore = await usersCollection.countDocuments();
    console.log(`\n📋 Users before: ${countBefore}`);

    if (countBefore > 0) {
      // Show all users
      const allUsers = await usersCollection.find({}).toArray();
      console.log("\nUsers in database:");
      allUsers.forEach((user) => {
        console.log(
          `  - ${user.email} (${user.isAdmin ? "Admin" : "Regular"})`,
        );
      });

      // Delete all users
      const result = await usersCollection.deleteMany({});
      console.log(`\n✨ Deleted ${result.deletedCount} users!`);
    }

    // Count after
    const countAfter = await usersCollection.countDocuments();
    console.log(`📊 Users after: ${countAfter}`);

    // Drop the collection entirely to remove any index issues
    await usersCollection.drop().catch(() => {
      // Collection might already be empty
    });
    console.log(`✅ Collection cleared completely!`);

    await mongoose.disconnect();
    console.log(`\n✅ Done! Database cleaned. You can now register new users.`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

clearAllUsers();
