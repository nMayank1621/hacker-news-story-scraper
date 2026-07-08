const mongoose = require("mongoose");

let isConnected = false;

const getIsConnected = () => isConnected;

const connectDB = async () => {
  try {
    console.log("======================================");
    console.log("Connecting to MongoDB...");
    console.log("URI:", process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      family: 4,
      serverSelectionTimeoutMS: 10000,
    });

    isConnected = true;

    console.log("======================================");
    console.log("✅ MongoDB Connected Successfully");
    console.log("Host:", conn.connection.host);
    console.log("Database:", conn.connection.name);
    console.log("Ready State:", conn.connection.readyState);

    // Show all collections in the connected database
    const collections = await conn.connection.db.listCollections().toArray();

    console.log(
      "Collections:",
      collections.map((c) => c.name)
    );

    console.log("======================================");

    return true;
  } catch (err) {
    isConnected = false;

    console.log("======================================");
    console.log("❌ MongoDB Connection Failed");
    console.error(err);
    console.log("======================================");

    return false;
  }
};

module.exports = {
  connectDB,
  getIsConnected,
};