const express = require('express');
const {
  getStories,
  getStoryById,
  toggleBookmark,
  scrape,
  getBookmarks,
} = require('../controllers/storyController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getStories);
router.get('/bookmarks', verifyToken, getBookmarks);
router.get('/:id', getStoryById);
router.post('/:id/bookmark', verifyToken, toggleBookmark);
router.post('/', scrape);

module.exports = router;
