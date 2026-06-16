import User from '../models/User.js';
import mongoose from 'mongoose';

// Helper to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// @desc    Create new account
// @route   POST /api/accounts
// @access  Private
const createAccount = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      res.status(400);
      throw new Error('Please add all required fields');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      username,
      email,
      password,
      role: role || 'user',
    });

    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all accounts (with search and pagination)
// @route   GET /api/accounts
// @access  Private
const getAccounts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search || '';

    const query = {};
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const startIndex = (page - 1) * limit;
    const total = await User.countDocuments(query);

    const accounts = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 }) // Latest first
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: accounts.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: accounts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update account
// @route   PUT /api/accounts/:id
// @access  Private
const updateAccount = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400);
      throw new Error('Invalid Account ID format');
    }

    const account = await User.findById(id);

    if (!account) {
      res.status(404);
      throw new Error('Account not found');
    }

    const { username, email, password, role } = req.body;

    if (username) account.username = username;
    if (email) account.email = email;
    if (password) account.password = password;
    if (role) account.role = role;

    const updatedAccount = await account.save();

    res.status(200).json({
      _id: updatedAccount.id,
      username: updatedAccount.username,
      email: updatedAccount.email,
      role: updatedAccount.role,
    });
  } catch (error) {
    // Handle unique email error
    if (error.code === 11000) {
      res.status(400);
      return next(new Error('Email already in use'));
    }
    next(error);
  }
};

// @desc    Delete account
// @route   DELETE /api/accounts/:id
// @access  Private
const deleteAccount = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400);
      throw new Error('Invalid Account ID format');
    }

    const account = await User.findById(id);

    if (!account) {
      res.status(404);
      throw new Error('Account not found');
    }

    await account.deleteOne();

    res.status(200).json({ id, message: 'Account removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users with quiz scores (with search and pagination)
// @route   GET /api/accounts/quiz-results
// @access  Private
const getQuizResults = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search || '';

    const query = { 'quizScores.0': { $exists: true } };

    if (search) {
      query.$and = [
        { 'quizScores.0': { $exists: true } },
        {
          $or: [
            { username: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
          ],
        },
      ];
      delete query['quizScores.0'];
    }

    const startIndex = (page - 1) * limit;
    const total = await User.countDocuments(query);

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const formattedData = users.map(user => {
      let totalQuizzes = user.quizScores.length;
      let totalScore = 0;

      user.quizScores.forEach(quiz => {
        totalScore += quiz.percentage;
      });
      
      let averageScore = totalQuizzes > 0 ? Math.round(totalScore / totalQuizzes) : 0;

      return {
        _id: user.id,
        username: user.username,
        email: user.email,
        totalQuizzes,
        averageScore,
        quizScores: user.quizScores
      };
    });

    res.status(200).json({
      success: true,
      count: formattedData.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: formattedData,
    });
  } catch (error) {
    next(error);
  }
};

export { createAccount, getAccounts, updateAccount, deleteAccount, getQuizResults };
