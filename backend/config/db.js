const mongoose = require('mongoose');

let isConnected = false;

const getIsConnected = () => isConnected;

const connectDB = async () => {
  if (isConnected) {
    console.log('MongoDB already connected');
    return true;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log('Note: Make sure MongoDB is running locally or update MONGO_URI to use MongoDB Atlas');
    console.log('Using in-memory store as fallback');
    return false;
  }
};

module.exports = { connectDB, getIsConnected };
