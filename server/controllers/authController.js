import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const normalizedEmail = email.toLowerCase();
    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const assignedRole = normalizedEmail.endsWith('.admin') ? 'admin' : 'user';

    const user = await User.create({
      username,
      email: normalizedEmail,
      password,
      role: assignedRole,
      adminId: null,
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
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (user && (await user.matchPassword(password))) {
      return res.json({
        success: true,
        id: user._id,
        _id: user._id,
        userId: user._id,
        adminId: user.adminId,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }

    res.status(401);
    throw new Error('Invalid credentials');
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json({
      success: true,
      id: user._id,
      _id: user._id,
      userId: user._id,
      adminId: user.adminId,
      username: user.username,
      email: user.email,
      role: user.role,
      quizScores: user.quizScores,
    });
  } catch (error) {
    next(error);
  }
};

const saveQuizScore = async (req, res, next) => {
  try {
    const { storyTitle, score, totalQuestions, percentage } = req.body;

    if (!storyTitle) {
      res.status(400);
      throw new Error('Story title is required');
    }
    if (score === undefined || score === null) {
      res.status(400);
      throw new Error('Quiz score is required');
    }
    if (totalQuestions === undefined || totalQuestions === null || Number(totalQuestions) <= 0) {
      res.status(400);
      throw new Error('Total questions is required');
    }

    const numericScore = Number(score);
    const numericTotal = Number(totalQuestions);

    if (numericScore < 0 || numericScore > numericTotal) {
      res.status(400);
      throw new Error('Invalid quiz score');
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const calculatedPercentage = Math.round((numericScore / numericTotal) * 100);

    user.quizScores.push({
      userId: user._id,
      adminId: user.adminId || null,
      storyTitle,
      score: numericScore,
      totalQuestions: numericTotal,
      percentage: percentage === undefined ? calculatedPercentage : Number(percentage),
      completedAt: new Date(),
    });

    await user.save();
    const savedScore = user.quizScores[user.quizScores.length - 1];

    res.status(201).json({
      success: true,
      message: 'Quiz score saved successfully',
      data: {
        id: savedScore._id,
        adminId: savedScore.adminId,
        userId: savedScore.userId,
        storyTitle: savedScore.storyTitle,
        quizScore: savedScore.score,
        score: savedScore.score,
        totalQuestions: savedScore.totalQuestions,
        percentage: savedScore.percentage,
        completedAt: savedScore.completedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMyQuizScores = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('_id username email role adminId quizScores');

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json({
      success: true,
      userId: user._id,
      adminId: user.adminId,
      username: user.username,
      email: user.email,
      quizScores: user.quizScores,
    });
  } catch (error) {
    next(error);
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  saveQuizScore,
  getMyQuizScores,
};
