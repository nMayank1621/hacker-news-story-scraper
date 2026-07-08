const mongoose = require("mongoose");

let isConnected = false;

const getIsConnected = () => isConnected;

const connectDB = async () => {
  try {
    console.log("Trying to connect...");
    console.log(process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;

    console.log("✅ MongoDB Connected");
    console.log(conn.connection.host);

    return true;
  } catch (err) {
    isConnected = false;

    console.log("❌ MongoDB FAILED");
    console.log(err);

    return false;
  }
};

module.exports = {
  connectDB,
  getIsConnected,
};