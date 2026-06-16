import express from 'express';
import {
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
  getQuizResults,
} from '../controllers/accountController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

router.route('/quiz-results').get(getQuizResults);
router.route('/').post(createAccount).get(getAccounts);
router.route('/:id').put(updateAccount).delete(deleteAccount);

export default router;
