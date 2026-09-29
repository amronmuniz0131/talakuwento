import User from '../models/User.js';
import mongoose from 'mongoose';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const createAccount = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      throw new Error('Please add all required fields');
    }

    const normalizedEmail = email.toLowerCase();
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const accountRole = role || 'user';
    const adminId = req.user?.role === 'admin' && accountRole === 'user' ? req.user._id : null;

    const user = await User.create({
      username,
      email: normalizedEmail,
      password,
      role: accountRole,
      adminId,
    });

    res.status(201).json({
      success: true,
      id: user._id,
      _id: user._id,
      userId: user._id,
      adminId: user.adminId,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400);
      return next(new Error('Email already in use'));
    }
    next(error);
  }
};

const getAccounts = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
    const search = (req.query.search || '').trim();

    const andConditions = [];

    if (search) {
      andConditions.push({
        $or: [
          { username: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ],
      });
    }

    if (req.user?.role === 'admin') {
      andConditions.push({
        $or: [{ _id: req.user._id }, { adminId: req.user._id }],
      });
    }

    const query = andConditions.length ? { $and: andConditions } : {};
    const startIndex = (page - 1) * limit;
    const total = await User.countDocuments(query);

    const accounts = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
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

    const { username, email, password, role, adminId } = req.body;
    if (username) account.username = username;
    if (email) account.email = email.toLowerCase();
    if (password) account.password = password;
    if (role) account.role = role;

    if (adminId !== undefined) {
      if (adminId !== null && !isValidObjectId(adminId)) {
        res.status(400);
        throw new Error('Invalid Admin ID');
      }
      account.adminId = adminId;
    }

    const updatedAccount = await account.save();

    res.status(200).json({
      success: true,
      id: updatedAccount._id,
      _id: updatedAccount._id,
      userId: updatedAccount._id,
      adminId: updatedAccount.adminId,
      username: updatedAccount.username,
      email: updatedAccount.email,
      role: updatedAccount.role,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400);
      return next(new Error('Email already in use'));
    }
    next(error);
  }
};

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
    res.status(200).json({ success: true, id, message: 'Account removed' });
  } catch (error) {
    next(error);
  }
};

const getQuizResults = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
    const search = (req.query.search || '').trim();

    const andConditions = [{ 'quizScores.0': { $exists: true } }];

    if (req.user?.role === 'admin') {
      andConditions.push({ adminId: req.user._id });
    }

    if (search) {
      andConditions.push({
        $or: [
          { username: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ],
      });
    }

    const query = { $and: andConditions };
    const startIndex = (page - 1) * limit;
    const total = await User.countDocuments(query);

    const users = await User.find(query)
      .select('-password')
      .populate('adminId', 'username email')
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const formattedData = users.map((user) => {
      const totalQuizzes = user.quizScores.length;
      const totalScore = user.quizScores.reduce((sum, quiz) => sum + quiz.percentage, 0);
      const averageScore = totalQuizzes ? Math.round(totalScore / totalQuizzes) : 0;

      return {
        id: user._id,
        _id: user._id,
        userId: user._id,
        adminId: user.adminId?._id || user.adminId || null,
        username: user.username,
        email: user.email,
        role: user.role,
        totalQuizzes,
        averageScore,
        quizScores: user.quizScores.map((quiz) => ({
          id: quiz._id,
          userId: quiz.userId || user._id,
          adminId: quiz.adminId || user.adminId?._id || user.adminId || null,
          storyTitle: quiz.storyTitle,
          quizScore: quiz.score,
          score: quiz.score,
          totalQuestions: quiz.totalQuestions,
          percentage: quiz.percentage,
          completedAt: quiz.completedAt,
        })),
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

const getUserQuizResults = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      res.status(400);
      throw new Error('Invalid User ID format');
    }

    const user = await User.findById(id).select('-password').populate('adminId', 'username email');
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (req.user?.role === 'admin' && String(user.adminId?._id || user.adminId || '') !== String(req.user._id)) {
      res.status(403);
      throw new Error('You do not have access to this user');
    }

    res.status(200).json({
      success: true,
      id: user._id,
      userId: user._id,
      adminId: user.adminId?._id || user.adminId || null,
      username: user.username,
      email: user.email,
      quizScores: user.quizScores,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
  getQuizResults,
  getUserQuizResults,
};
