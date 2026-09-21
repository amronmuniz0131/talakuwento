import express from 'express';
import {
  registerUser,
  loginUser,
  getProfile,
  saveQuizScore,
  getMyQuizScores,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.post('/scores', protect, saveQuizScore);
router.get('/scores/me', protect, getMyQuizScores);

export default router;
