import express from 'express';
import authRoutes from '../auth.routes.js';
import restaurantRoutes from '../restaurant.routes.js';
import menuRoutes from '../menu.routes.js';
import orderRoutes from '../order.routes.js';
import qrCodeRoutes from '../qrcode.routes.js';
import verificationRoutes from '../verification.routes.js';
import feedbackRoutes from '../feedback.routes.js';
import analyticsRoutes from '../analytics.routes.js';
import settingsRoutes from '../settings.routes.js';
import locationRoutes from '../location.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/menu', menuRoutes);
router.use('/orders', orderRoutes);
router.use('/qrcodes', qrCodeRoutes);
router.use('/verification', verificationRoutes);
router.use('/feedbacks', feedbackRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/settings', settingsRoutes);
router.use('/locations', locationRoutes);

export default router;