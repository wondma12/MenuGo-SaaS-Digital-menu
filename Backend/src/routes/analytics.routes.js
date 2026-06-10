import express from 'express';
import * as analyticsController from '../controllers/analytics.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/dashboard', analyticsController.getDashboardStats);
router.get('/revenue-chart', analyticsController.getRevenueChart);
router.get('/order-distribution', analyticsController.getOrderStatusDistribution);

export default router;