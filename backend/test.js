require("dotenv").config();
const mongoose = require("mongoose");

(async () => {
  try {
    console.log("Connecting...");
    console.log(process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected Successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Connection Error");
    console.error(err);
    process.exit(1);
  }
})();