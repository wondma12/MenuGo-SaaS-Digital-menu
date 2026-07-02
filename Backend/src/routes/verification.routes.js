import express from 'express';
import * as verificationController from '../controllers/verification.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/submit', verificationController.submitVerification);
router.get('/my-status', verificationController.getVerificationStatus);

router.get('/all', authorize('platform_admin'), verificationController.getAllVerifications);
router.put('/:id/review', authorize('platform_admin'), verificationController.reviewVerification);

export default router;