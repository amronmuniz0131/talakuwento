import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    console.log('--- REGISTER REQUEST RECEIVED ---');
    console.log('Request body:', req.body);
    
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      console.error('Registration failed: Missing fields');
      res.status(400);
      throw new Error('Please add all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      console.error('Registration failed: User already exists');
      res.status(400);
      throw new Error('User already exists');
    }

    // Determine role based on email suffix
    let assignedRole = 'user';
    if (email && typeof email === 'string' && email.toLowerCase().endsWith('.admin')) {
      assignedRole = 'admin';
    }

    console.log(`🔍 Detected role for ${email}: ${assignedRole}`);

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      role: assignedRole,
    });

    if (user) {
      console.log('✅ Successful user creation:', user.email);
      res.status(201).json({
        success: true,
        _id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    console.error('❌ Registration error:', error.message);
    next(error);
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    console.log('--- LOGIN REQUEST RECEIVED ---');
    console.log('Request body:', req.body);

    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select('+password');
    console.log('User found in DB:', user ? 'Yes' : 'No');

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        _id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get user data
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

// @desc    Save a quiz score
// @route   POST /api/auth/scores
// @access  Private
const saveQuizScore = async (req, res, next) => {
  try {
    const { storyTitle, score, totalQuestions, percentage } = req.body;

    if (!storyTitle || score === undefined || !totalQuestions || percentage === undefined) {
      res.status(400);
      throw new Error('Please provide all score details');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    user.quizScores.push({
      storyTitle,
      score,
      totalQuestions,
      percentage
    });

    await user.save();

    res.status(200).json({
      success: true,
      quizScores: user.quizScores
    });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, getProfile, saveQuizScore };
