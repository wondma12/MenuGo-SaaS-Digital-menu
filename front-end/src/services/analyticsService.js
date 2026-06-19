// services/analyticsService.js
import api from './api.js';

/**
 * Analytics Service
 * Handles all analytics and reporting operations including dashboard stats,
 * revenue charts, order distribution, and performance metrics.
 */
const analyticsService = {
  // ============================================================
  // DASHBOARD ANALYTICS
  // ============================================================

  /**
   * Get dashboard statistics
   * @returns {Promise<Object>} { success, data, error }
   */
  async getDashboardStats() {
    try {
      const response = await api.get('/analytics/dashboard');
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[AnalyticsService] Get dashboard stats error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch dashboard statistics',
      };
    }
  },

  /**
   * Get revenue chart data
   * @param {number} days - Number of days to include (default: 30)
   * @returns {Promise<Object>} { success, data, error }
   */
  async getRevenueChart(days = 30) {
    try {
      const response = await api.get('/analytics/revenue-chart', {
        params: { days },
      });
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[AnalyticsService] Get revenue chart error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch revenue chart data',
      };
    }
  },

  /**
   * Get order status distribution
   * @returns {Promise<Object>} { success, data, error }
   */
  async getOrderDistribution() {
    try {
      const response = await api.get('/analytics/order-distribution');
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[AnalyticsService] Get order distribution error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch order distribution',
      };
    }
  },

  // ============================================================
  // ORDER ANALYTICS
  // ============================================================

  /**
   * Get order statistics
   * @param {string} restaurantId - Restaurant ID (optional)
   * @returns {Promise<Object>} { success, data, error }
   */
  async getOrderStats(restaurantId = null) {
    try {
      const params = restaurantId ? { restaurant_id: restaurantId } : {};
      const response = await api.get('/analytics/order-stats', { params });
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[AnalyticsService] Get order stats error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch order statistics',
      };
    }
  },

  /**
   * Get top selling items
   * @param {number} limit - Number of items to return (default: 10)
   * @param {string} restaurantId - Restaurant ID (optional)
   * @returns {Promise<Object>} { success, data, error }
   */
  async getTopSellingItems(limit = 10, restaurantId = null) {
    try {
      const params = { limit };
      if (restaurantId) params.restaurant_id = restaurantId;
      
      const response = await api.get('/analytics/top-selling', { params });
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[AnalyticsService] Get top selling items error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch top selling items',
      };
    }
  },

  // ============================================================
  // RESTAURANT ANALYTICS
  // ============================================================

  /**
   * Get restaurant performance metrics
   * @param {string} restaurantId - Restaurant ID
   * @param {string} period - Time period (day, week, month, year)
   * @returns {Promise<Object>} { success, data, error }
   */
  async getRestaurantPerformance(restaurantId, period = 'week') {
    try {
      const response = await api.get(`/analytics/restaurant/${restaurantId}/performance`, {
        params: { period },
      });
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[AnalyticsService] Get restaurant performance error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch restaurant performance',
      };
    }
  },

  /**
   * Get customer analytics
   * @param {string} restaurantId - Restaurant ID
   * @returns {Promise<Object>} { success, data, error }
   */
  async getCustomerAnalytics(restaurantId) {
    try {
      const response = await api.get(`/analytics/restaurant/${restaurantId}/customers`);
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[AnalyticsService] Get customer analytics error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch customer analytics',
      };
    }
  },

  // ============================================================
  // MENU ANALYTICS
  // ============================================================

  /**
   * Get menu performance analytics
   * @param {string} restaurantId - Restaurant ID
   * @returns {Promise<Object>} { success, data, error }
   */
  async getMenuPerformance(restaurantId) {
    try {
      const response = await api.get(`/analytics/restaurant/${restaurantId}/menu-performance`);
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[AnalyticsService] Get menu performance error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch menu performance',
      };
    }
  },

  /**
   * Get category performance analytics
   * @param {string} restaurantId - Restaurant ID
   * @returns {Promise<Object>} { success, data, error }
   */
  async getCategoryPerformance(restaurantId) {
    try {
      const response = await api.get(`/analytics/restaurant/${restaurantId}/category-performance`);
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[AnalyticsService] Get category performance error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch category performance',
      };
    }
  },

  // ============================================================
  // EXPORT & REPORTING
  // ============================================================

  /**
   * Generate sales report
   * @param {Object} params - Report parameters (restaurantId, startDate, endDate, format)
   * @returns {Promise<Object>} { success, data, error }
   */
  async generateSalesReport(params) {
    try {
      const response = await api.post('/analytics/sales-report', params);
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[AnalyticsService] Generate sales report error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to generate sales report',
      };
    }
  },

  /**
   * Export analytics data
   * @param {Object} params - Export parameters
   * @returns {Promise<Object>} { success, data, error }
   */
  async exportData(params) {
    try {
      const response = await api.post('/analytics/export', params, {
        responseType: 'blob',
      });
      return {
        success: true,
        data: response.data,
        error: null,
      };
    } catch (error) {
      console.error('[AnalyticsService] Export data error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to export data',
      };
    }
  },
};

export default analyticsService;