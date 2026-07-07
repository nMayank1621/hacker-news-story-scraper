const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const storyRoutes = require('./routes/storyRoutes');
const { scrapeHackerNews } = require('./scraper/scraper');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);

// Dedicated scrape endpoint
app.post('/api/scrape', async (req, res) => {
  try {
    const stories = await scrapeHackerNews();
    res.json({ message: 'Scraping successful', stories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  const dbConnected = await connectDB();
  try {
    await scrapeHackerNews();
  } catch (err) {
    console.error('Initial scraping failed:', err.message);
  }
});
