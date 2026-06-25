// Backend/src/controllers/admin.analytics.controller.js

import * as adminAnalyticsService from '../services/admin.analytics.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * Admin Analytics Controller
 * All endpoints require platform_admin role
 */

// ============================================================
// PLATFORM DASHBOARD
// ============================================================

export const getPlatformDashboard = async (req, res) => {
  try {
    // Verify platform admin role
    if (req.user.role !== 'platform_admin') {
      return errorResponse(res, 'Access denied. Platform admin only.', null, 403);
    }

    const stats = await adminAnalyticsService.getPlatformDashboardStats();
    successResponse(res, 'Platform dashboard statistics retrieved successfully', stats);
  } catch (error) {
    console.error('[AdminAnalyticsController] Error fetching platform dashboard:', error);
    errorResponse(res, error.message, null, 500);
  }
};

// ============================================================
// PLATFORM REVENUE CHART
// ============================================================

export const getPlatformRevenueChart = async (req, res) => {
  try {
    if (req.user.role !== 'platform_admin') {
      return errorResponse(res, 'Access denied. Platform admin only.', null, 403);
    }

    const { days = 30 } = req.query;
    const revenue = await adminAnalyticsService.getPlatformRevenueChart(parseInt(days));
    successResponse(res, 'Platform revenue chart data retrieved successfully', revenue);
  } catch (error) {
    console.error('[AdminAnalyticsController] Error fetching platform revenue chart:', error);
    errorResponse(res, error.message, null, 500);
  }
};

// ============================================================
// PLATFORM ORDER DISTRIBUTION
// ============================================================

export const getPlatformOrderDistribution = async (req, res) => {
  try {
    if (req.user.role !== 'platform_admin') {
      return errorResponse(res, 'Access denied. Platform admin only.', null, 403);
    }

    const distribution = await adminAnalyticsService.getPlatformOrderDistribution();
    successResponse(res, 'Platform order distribution retrieved successfully', distribution);
  } catch (error) {
    console.error('[AdminAnalyticsController] Error fetching platform order distribution:', error);
    errorResponse(res, error.message, null, 500);
  }
};

// ============================================================
// ALL RESTAURANTS ANALYTICS
// ============================================================

export const getAllRestaurantsAnalytics = async (req, res) => {
  try {
    if (req.user.role !== 'platform_admin') {
      return errorResponse(res, 'Access denied. Platform admin only.', null, 403);
    }

    const allRestaurants = await adminAnalyticsService.getAllRestaurantsAnalytics();
    successResponse(res, 'All restaurants analytics retrieved successfully', allRestaurants);
  } catch (error) {
    console.error('[AdminAnalyticsController] Error fetching all restaurants analytics:', error);
    errorResponse(res, error.message, null, 500);
  }
};

// ============================================================
// TOP RESTAURANTS BY REVENUE
// ============================================================

export const getTopRestaurants = async (req, res) => {
  try {
    if (req.user.role !== 'platform_admin') {
      return errorResponse(res, 'Access denied. Platform admin only.', null, 403);
    }

    const { limit = 10 } = req.query;
    const topRestaurants = await adminAnalyticsService.getTopRestaurants(parseInt(limit));
    successResponse(res, 'Top restaurants retrieved successfully', topRestaurants);
  } catch (error) {
    console.error('[AdminAnalyticsController] Error fetching top restaurants:', error);
    errorResponse(res, error.message, null, 500);
  }
};