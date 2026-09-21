import express from 'express';
import {
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
  getQuizResults,
  getUserQuizResults,
} from '../controllers/accountController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/quiz-results', adminOnly, getQuizResults);
router.route('/').post(adminOnly, createAccount).get(adminOnly, getAccounts);
router.get('/:id/quiz-results', adminOnly, getUserQuizResults);
router.route('/:id').put(adminOnly, updateAccount).delete(adminOnly, deleteAccount);

export default router;
