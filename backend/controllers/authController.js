const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');
const { addUsers } = require('../utils/memoryStore');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const register = async (req, res) => {
  console.log("===== REGISTER CALLED =====");
  console.log(req.body);

  try {
    const { name, email, password } = req.body;
    const isConnected = getIsConnected();

    console.log("Mongo Connected:", isConnected);

    let user;

    if (isConnected) {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      console.log("Creating Mongo user...");
      user = await User.create({ name, email, password });
      console.log("Saved:", user);
    } else {
      const userExists = addUsers.findOne({ email });

      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user = addUsers.create({
        name,
        email,
        password: hashedPassword,
      });
    }

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isConnected = getIsConnected();

    let user;

    if (isConnected) {
      user = await User.findOne({ email });

      if (user && (await user.matchPassword(password))) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      }
    } else {
      user = addUsers.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      }
    }

    return res.status(401).json({
      message: "Invalid email or password",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { register, login };