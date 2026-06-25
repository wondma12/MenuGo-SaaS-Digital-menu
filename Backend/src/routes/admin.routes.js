// Backend/src/routes/admin.routes.js

import express from 'express';
import * as adminAnalyticsController from '../controllers/admin.analytics.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All admin routes require authentication
router.use(authenticate);

// ============================================================
// ADMIN ANALYTICS ROUTES (Platform Admin Only)
// ============================================================

// Platform dashboard
router.get('/dashboard', adminAnalyticsController.getPlatformDashboard);

// Platform revenue chart
router.get('/revenue-chart', adminAnalyticsController.getPlatformRevenueChart);

// Platform order distribution
router.get('/order-distribution', adminAnalyticsController.getPlatformOrderDistribution);

// All restaurants analytics
router.get('/restaurants', adminAnalyticsController.getAllRestaurantsAnalytics);

// Top restaurants by revenue
router.get('/top-restaurants', adminAnalyticsController.getTopRestaurants);

export default router;