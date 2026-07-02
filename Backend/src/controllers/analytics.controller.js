import * as analyticsService from '../services/analytics.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getDashboardStats = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId && req.user.role !== 'platform_admin') {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const stats = await analyticsService.getDashboardStats(restaurantId);
    successResponse(res, 'Dashboard statistics retrieved successfully', stats);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};

export const getRevenueChart = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    const { days = 30 } = req.query;
    
    if (!restaurantId && req.user.role !== 'platform_admin') {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const revenue = await analyticsService.getRevenueChart(restaurantId, parseInt(days));
    successResponse(res, 'Revenue chart data retrieved successfully', revenue);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};

export const getOrderStatusDistribution = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId && req.user.role !== 'platform_admin') {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const distribution = await analyticsService.getOrderStatusDistribution(restaurantId);
    successResponse(res, 'Order status distribution retrieved successfully', distribution);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};

// Platform admin only - get all restaurants analytics
export const getAllRestaurantsAnalytics = async (req, res) => {
  try {
    if (req.user.role !== 'platform_admin') {
      return errorResponse(res, 'Access denied. Platform admin only.', null, 403);
    }

    const allRestaurants = await prisma.restaurants.findMany({
      select: {
        id: true,
        name: true,
        status: true,
        _count: {
          select: {
            orders: true,
            categories: true,
            menu_items: true
          }
        }
      }
    });

    successResponse(res, 'All restaurants analytics retrieved successfully', allRestaurants);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};