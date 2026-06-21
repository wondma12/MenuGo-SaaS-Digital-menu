import express from 'express';
import * as feedbackController from '../controllers/feedback.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public route for customers
router.post('/public/:restaurantId', feedbackController.createPublicFeedback);

router.use(authenticate);

router.get('/', feedbackController.getAllFeedbacks);
router.delete('/:id', feedbackController.deleteFeedback);

export default router;