import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';


export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: 'Username and password are required'
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error while creating user'
    });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: 'Username and password are required'
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: 'Invalid username/password'
      });
    }

    if (user.token) {
      return res.status(403).json({
        message: 'User already logged in on another device'
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Invalid username/password'
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    user.token = token;
    await user.save();

    res.json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error during login'
    });
  }
};


export const logoutUser = async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();

    res.json({
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error during logout'
    });
  }
};
