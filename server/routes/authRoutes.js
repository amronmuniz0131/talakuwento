import express from 'express';
import {
  registerUser,
  loginUser,
  getProfile,
  saveQuizScore,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.post('/scores', protect, saveQuizScore);

export default router;
