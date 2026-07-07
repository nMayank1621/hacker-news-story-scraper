const Story = require('../models/Story');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');
const { addStories, addUsers } = require('../utils/memoryStore');

const getStories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const isConnected = getIsConnected();
    let stories, total;

    if (isConnected) {
      stories = await Story.find({ enabled: true })
        .sort({ points: -1 })
        .skip(skip)
        .limit(limit);
      total = await Story.countDocuments({ enabled: true });
    } else {
      const sortedStories = [...addStories.find()].sort((a, b) => b.points - a.points);
      stories = sortedStories.slice(skip, skip + limit);
      total = sortedStories.length;
    }

    res.json({
      stories,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStoryById = async (req, res) => {
  try {
    const isConnected = getIsConnected();
    let story;

    if (isConnected) {
      story = await Story.findById(req.params.id);
    } else {
      story = addStories.findById(req.params.id);
    }

    if (story) {
      res.json(story);
    } else {
      res.status(404).json({ message: 'Story not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleBookmark = async (req, res) => {
  try {
    const isConnected = getIsConnected();
    let user;
    const storyId = req.params.id;

    if (isConnected) {
      user = await User.findById(req.user._id);
    } else {
      user = addUsers.findById(req.user._id);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isBookmarked = user.bookmarks.includes(storyId);

    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== storyId.toString()
      );
    } else {
      user.bookmarks.push(storyId);
    }

    if (isConnected) {
      await user.save();
    } else {
      addUsers.findByIdAndUpdate(user._id, { bookmarks: user.bookmarks });
    }

    res.json({ bookmarks: user.bookmarks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookmarks = async (req, res) => {
  try {
    const isConnected = getIsConnected();
    let user;

    if (isConnected) {
      user = await User.findById(req.user._id).populate('bookmarks');
    } else {
      user = addUsers.findById(req.user._id);
      if (user) {
        user.bookmarks = user.bookmarks.map(id => addStories.findById(id)).filter(Boolean);
      }
    }

    if (user) {
      res.json(user.bookmarks);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStories,
  getStoryById,
  toggleBookmark,
  getBookmarks,
};
