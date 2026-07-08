const express = require('express');

const {
  getStories,
  getStoryById,
  toggleBookmark,
  getBookmarks,
} = require('../controllers/storyController');

const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();


console.log({
  getStories,
  getStoryById,
  toggleBookmark,
  getBookmarks,
  verifyToken,
});

router.get('/', getStories);
router.get('/bookmarks', verifyToken, getBookmarks);
router.get('/:id', getStoryById);
router.post('/:id/bookmark', verifyToken, toggleBookmark);

module.exports = router;