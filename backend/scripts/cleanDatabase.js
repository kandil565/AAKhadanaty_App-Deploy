/**
 * Database Clean Script
 *
 * Use this script to clear all test data from the database if you're getting
 * "Email already exists" errors for new emails, which indicates leftover test data.
 *
 * Run in Node.js: node backend/scripts/cleanDatabase.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const cleanDatabase = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    // Get all collections
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    console.log("\n📋 Available collections:");
    collections.forEach((col) => {
      console.log(`  - ${col.name}`);
    });

    // Ask which collection to clear
    const args = process.argv.slice(2);
    const collectionName = args[0];

    if (!collectionName) {
      console.log("\n⚠️  Please specify a collection to clear:");
      console.log("   node backend/scripts/cleanDatabase.js users");
      console.log("   node backend/scripts/cleanDatabase.js bookings");
      process.exit(1);
    }

    // Drop the collection
    const collection = db.collection(collectionName);
    const exists = await collection.indexExists();

    if (
      exists ||
      (await db.listCollections().toArray()).some(
        (c) => c.name === collectionName,
      )
    ) {
      await db.dropCollection(collectionName);
      console.log(
        `\n✨ Successfully cleared the "${collectionName}" collection!`,
      );
    } else {
      console.log(`\n⚠️  Collection "${collectionName}" not found.`);
    }

    // Show remaining data
    if (collectionName !== "users") {
      const usersCollection = db.collection("users");
      const userCount = await usersCollection.countDocuments();
      console.log(`\n📊 Users in database: ${userCount}`);
    }

    if (collectionName !== "bookings") {
      const bookingsCollection = db.collection("bookings");
      const bookingCount = await bookingsCollection.countDocuments();
      console.log(`📊 Bookings in database: ${bookingCount}`);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

cleanDatabase();
