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
   * Get dashboard statistics - auto-detects user role
   * @returns {Promise<Object>} { success, data, error }
   */
  async getDashboardStats() {
    try {
      // ✅ Get user from localStorage with proper parsing
      const userStr = localStorage.getItem('user');
      let user = {};
      try {
        user = userStr ? JSON.parse(userStr) : {};
      } catch (e) {
        console.warn('[AnalyticsService] Failed to parse user:', e);
      }
      
      // ✅ Check multiple possible role values
      const isPlatformAdmin = 
        user.role === 'platform_admin' || 
        user.role === 'Platform_admin' ||
        user.role === 'Platform Admin' ||
        user.userRole === 'platform_admin' ||
        user.type === 'platform_admin';
      
      console.log('[AnalyticsService] User object:', user);
      console.log('[AnalyticsService] User role:', user.role);
      console.log('[AnalyticsService] Is Platform Admin?', isPlatformAdmin);
      
      // ✅ Choose endpoint based on role
      let endpoint = '/analytics/dashboard';
      if (isPlatformAdmin) {
        endpoint = '/admin/dashboard';
      }
      
      console.log('[AnalyticsService] Calling endpoint:', endpoint);
      const response = await api.get(endpoint);
      console.log('[AnalyticsService] Response data:', response.data);
      
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
   * Get platform dashboard (Admin only)
   * @returns {Promise<Object>} { success, data, error }
   */
  async getPlatformDashboard() {
    try {
      console.log('[AnalyticsService] Fetching platform dashboard...');
      const response = await api.get('/admin/dashboard');
      console.log('[AnalyticsService] Platform dashboard response:', response.data);
      
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[AnalyticsService] Get platform dashboard error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch platform dashboard',
      };
    }
  },

  /**
   * Get revenue chart data
   * @param {number} days - Number of days to include (default: 30)
   * @param {boolean} isPlatform - If true, gets platform-wide data
   * @returns {Promise<Object>} { success, data, error }
   */
  async getRevenueChart(days = 30, isPlatform = false) {
    try {
      // ✅ Auto-detect platform if not specified
      if (isPlatform === false) {
        const userStr = localStorage.getItem('user');
        let user = {};
        try {
          user = userStr ? JSON.parse(userStr) : {};
        } catch (e) {}
        
        const isPlatformAdmin = 
          user.role === 'platform_admin' || 
          user.role === 'Platform_admin' ||
          user.role === 'Platform Admin';
        
        isPlatform = isPlatformAdmin;
      }
      
      const endpoint = isPlatform ? '/admin/revenue-chart' : '/analytics/revenue-chart';
      console.log('[AnalyticsService] Revenue chart endpoint:', endpoint);
      
      const response = await api.get(endpoint, {
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
   * @param {boolean} isPlatform - If true, gets platform-wide data
   * @returns {Promise<Object>} { success, data, error }
   */
  async getOrderDistribution(isPlatform = false) {
    try {
      // ✅ Auto-detect platform if not specified
      if (isPlatform === false) {
        const userStr = localStorage.getItem('user');
        let user = {};
        try {
          user = userStr ? JSON.parse(userStr) : {};
        } catch (e) {}
        
        const isPlatformAdmin = 
          user.role === 'platform_admin' || 
          user.role === 'Platform_admin' ||
          user.role === 'Platform Admin';
        
        isPlatform = isPlatformAdmin;
      }
      
      const endpoint = isPlatform ? '/admin/order-distribution' : '/analytics/order-distribution';
      console.log('[AnalyticsService] Order distribution endpoint:', endpoint);
      
      const response = await api.get(endpoint);
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

  /**
   * Get all restaurants analytics (Admin only)
   * @returns {Promise<Object>} { success, data, error }
   */
  async getAllRestaurantsAnalytics() {
    try {
      console.log('[AnalyticsService] Fetching all restaurants analytics...');
      const response = await api.get('/admin/restaurants');
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[AnalyticsService] Get all restaurants analytics error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch restaurants analytics',
      };
    }
  },

  /**
   * Get top restaurants by revenue (Admin only)
   * @param {number} limit - Number of restaurants to return
   * @returns {Promise<Object>} { success, data, error }
   */
  async getTopRestaurants(limit = 10) {
    try {
      console.log('[AnalyticsService] Fetching top restaurants...');
      const response = await api.get('/admin/top-restaurants', { params: { limit } });
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[AnalyticsService] Get top restaurants error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch top restaurants',
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