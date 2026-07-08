const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const storyRoutes = require("./routes/storyRoutes");
const { scrapeHackerNews } = require("./scraper/scraper");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stories", storyRoutes);

// Manual scrape endpoint
app.post("/api/scrape", async (req, res) => {
  try {
    const stories = await scrapeHackerNews();

    res.json({
      success: true,
      message: "Scraping successful",
      stories,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log("MONGO_URI:", process.env.MONGO_URI);

    const dbConnected = await connectDB();

    console.log("Database Connected:", dbConnected);

    if (dbConnected) {
      console.log("✅ MongoDB connection successful");
    } else {
      console.log("⚠ Running with in-memory database");
    }

    await scrapeHackerNews();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Server startup failed:", err);
  }
};

startServer();