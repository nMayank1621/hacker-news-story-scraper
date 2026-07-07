const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');
const { getIsConnected } = require('../config/db');
const { addStories } = require('../utils/memoryStore');

const scrapeHackerNews = async () => {
  try {
    const { data } = await axios.get('https://news.ycombinator.com');
    const $ = cheerio.load(data);
    const stories = [];

    $('.athing').each((index, element) => {
      if (index < 10) {
        const title = $(element).find('.titleline a').first().text();
        const url = $(element).find('.titleline a').first().attr('href');
        const subtext = $(element).next();
        const points = parseInt($(subtext).find('.score').text().split(' ')[0]) || 0;
        const author = $(subtext).find('.hnuser').text() || 'Anonymous';
        const postedAt = $(subtext).find('.age a').text();

        if (title && url && author && postedAt) {
          stories.push({
            title,
            url: url.startsWith('http') ? url : `https://news.ycombinator.com/${url}`,
            points,
            author,
            postedAt,
            enabled: true
          });
        }
      }
    });

    const isConnected = getIsConnected();
    for (const storyData of stories) {
      if (isConnected) {
        const existingStory = await Story.findOne({ url: storyData.url });
        if (existingStory) {
          await Story.findByIdAndUpdate(existingStory._id, storyData);
        } else {
          await Story.create(storyData);
        }
      } else {
        const existingStory = addStories.findOne({ url: storyData.url });
        if (existingStory) {
          addStories.findByIdAndUpdate(existingStory._id, storyData);
        } else {
          addStories.create(storyData);
        }
      }
    }

    console.log('Scraping complete');
    return stories;
  } catch (error) {
    console.error('Scraping error:', error.message);
    throw error;
  }
};

module.exports = { scrapeHackerNews };
