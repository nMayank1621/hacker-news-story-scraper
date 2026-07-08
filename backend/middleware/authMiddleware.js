const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');
const { addUsers } = require('../utils/memoryStore');

const verifyToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const isConnected = getIsConnected();
      
      if (isConnected) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        const user = addUsers.findById(decoded.id);
        if (user) {
          req.user = { ...user, password: undefined };
        }
      }

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }
      
      next();
    } catch (error) {
      console.error('authMiddleware error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  }
};

module.exports = { verifyToken };
