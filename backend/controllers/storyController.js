const Story = require("../models/Story");
const User = require("../models/User");
const { getIsConnected } = require("../config/db");
const { addStories, addUsers } = require("../utils/memoryStore");

// ================= GET STORIES =================

const getStories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const isConnected = getIsConnected();

    let stories = [];
    let total = 0;

    if (isConnected) {
      stories = await Story.find({ enabled: true })
        .sort({ points: -1 })
        .skip(skip)
        .limit(limit);

      total = await Story.countDocuments({ enabled: true });
    } else {
      const allStories = addStories.find();

      stories = [...allStories]
        .sort((a, b) => b.points - a.points)
        .slice(skip, skip + limit);

      total = allStories.length;
    }

    res.json({
      stories,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ================= GET STORY =================

const getStoryById = async (req, res) => {
  try {
    let story;

    if (getIsConnected()) {
      story = await Story.findById(req.params.id);
    } else {
      story = addStories.findById(req.params.id);
    }

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    res.json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= TOGGLE BOOKMARK =================

const toggleBookmark = async (req, res) => {
  try {
    const storyId = req.params.id;

    let user;

    if (getIsConnected()) {
      user = await User.findById(req.user._id);
    } else {
      user = addUsers.findById(req.user._id);
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const bookmarkIds = user.bookmarks.map((bookmark) =>
      typeof bookmark === "object"
        ? bookmark._id.toString()
        : bookmark.toString()
    );

    const exists = bookmarkIds.includes(storyId);

    if (exists) {
      user.bookmarks = user.bookmarks.filter((bookmark) => {
        const id =
          typeof bookmark === "object"
            ? bookmark._id.toString()
            : bookmark.toString();

        return id !== storyId;
      });
    } else {
      user.bookmarks.push(storyId);
    }

    if (getIsConnected()) {
      await user.save();
    } else {
      addUsers.findByIdAndUpdate(user._id, {
        bookmarks: user.bookmarks,
      });
    }

    res.json({
      success: true,
      bookmarks: user.bookmarks,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= GET BOOKMARKS =================
const getBookmarks = async (req, res) => {
  try {
    const isConnected = getIsConnected();

    if (isConnected) {
      const user = await User.findById(req.user._id).populate("bookmarks");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json(user.bookmarks);
    }

    const user = addUsers.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookmarks = [];

    for (const bookmark of user.bookmarks) {

      // Already a story object
      if (typeof bookmark === "object" && bookmark.title) {
        bookmarks.push(bookmark);
      }

      // Bookmark is an ID
      else {
        const story = addStories.findById(bookmark);
        if (story) bookmarks.push(story);
      }
    }

    res.json(bookmarks);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getStories,
  getStoryById,
  toggleBookmark,
  getBookmarks,
};