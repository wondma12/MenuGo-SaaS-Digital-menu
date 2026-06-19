// services/restaurantService.js
import api from './api.js';

/**
 * Restaurant Service
 * Handles all restaurant-related operations including CRUD operations,
 * restaurant details, status updates, and location management.
 */
const restaurantService = {
  // ============================================================
  // RESTAURANT CRUD OPERATIONS
  // ============================================================

  /**
   * Get all restaurants (Platform Admin only)
   * @param {Object} params - Query parameters (page, limit, status, etc.)
   * @returns {Promise<Object>} { success, data, error }
   */
  async getAllRestaurants(params = {}) {
    try {
      const response = await api.get('/restaurants/all', { params });
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[RestaurantService] Get all restaurants error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch restaurants',
      };
    }
  },

  /**
   * Get restaurant by ID
   * @param {string} id - Restaurant ID
   * @returns {Promise<Object>} { success, data, error }
   */
  async getRestaurantById(id) {
    try {
      const response = await api.get(`/restaurants/${id}`);
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[RestaurantService] Get restaurant by ID error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch restaurant',
      };
    }
  },

  /**
   * Get current user's restaurant
   * @returns {Promise<Object>} { success, data, error }
   */
  async getMyRestaurant() {
    try {
      const response = await api.get('/restaurants/my-restaurant');
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[RestaurantService] Get my restaurant error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch your restaurant',
      };
    }
  },

  /**
   * Create a new restaurant
   * @param {Object} data - Restaurant data
   * @returns {Promise<Object>} { success, data, error }
   */
  async createRestaurant(data) {
    try {
      const response = await api.post('/restaurants', data);
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[RestaurantService] Create restaurant error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to create restaurant',
      };
    }
  },

  /**
   * Update restaurant
   * @param {string} id - Restaurant ID
   * @param {Object} data - Updated restaurant data
   * @returns {Promise<Object>} { success, data, error }
   */
  async updateRestaurant(id, data) {
    try {
      const response = await api.put(`/restaurants/${id}`, data);
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[RestaurantService] Update restaurant error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to update restaurant',
      };
    }
  },

  /**
   * Update restaurant status (Platform Admin only)
   * @param {string} id - Restaurant ID
   * @param {string} status - New status (active, pending, suspended)
   * @returns {Promise<Object>} { success, data, error }
   */
  async updateRestaurantStatus(id, status) {
    try {
      const response = await api.put(`/restaurants/${id}/status`, { status });
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[RestaurantService] Update restaurant status error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to update restaurant status',
      };
    }
  },

  /**
   * Delete restaurant (Platform Admin only)
   * @param {string} id - Restaurant ID
   * @returns {Promise<Object>} { success, data, error }
   */
  async deleteRestaurant(id) {
    try {
      const response = await api.delete(`/restaurants/${id}`);
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[RestaurantService] Delete restaurant error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to delete restaurant',
      };
    }
  },

  // ============================================================
  // RESTAURANT LOCATION
  // ============================================================

  /**
   * Add restaurant location
   * @param {Object} data - Location data
   * @returns {Promise<Object>} { success, data, error }
   */
  async addLocation(data) {
    try {
      const response = await api.post('/locations', data);
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[RestaurantService] Add location error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to add location',
      };
    }
  },

  /**
   * Update restaurant location
   * @param {Object} data - Updated location data
   * @returns {Promise<Object>} { success, data, error }
   */
  async updateLocation(data) {
    try {
      const response = await api.put('/locations', data);
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[RestaurantService] Update location error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to update location',
      };
    }
  },

  /**
   * Get restaurant location
   * @returns {Promise<Object>} { success, data, error }
   */
  async getLocation() {
    try {
      const response = await api.get('/locations');
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[RestaurantService] Get location error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch location',
      };
    }
  },

  /**
   * Get nearby restaurants
   * @param {number} latitude - Latitude
   * @param {number} longitude - Longitude
   * @param {number} radius - Radius in kilometers (default: 10)
   * @returns {Promise<Object>} { success, data, error }
   */
  async getNearbyRestaurants(latitude, longitude, radius = 10) {
    try {
      const response = await api.get('/locations/nearby', {
        params: { latitude, longitude, radius },
      });
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[RestaurantService] Get nearby restaurants error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch nearby restaurants',
      };
    }
  },

  // ============================================================
  // RESTAURANT VERIFICATION
  // ============================================================

  /**
   * Submit restaurant verification
   * @param {Object} data - Verification data
   * @returns {Promise<Object>} { success, data, error }
   */
  async submitVerification(data) {
    try {
      const response = await api.post('/verification/submit', data);
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[RestaurantService] Submit verification error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to submit verification',
      };
    }
  },

  /**
   * Get verification status
   * @returns {Promise<Object>} { success, data, error }
   */
  async getVerificationStatus() {
    try {
      const response = await api.get('/verification/my-status');
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[RestaurantService] Get verification status error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to get verification status',
      };
    }
  },

  // ============================================================
  // RESTAURANT SETTINGS
  // ============================================================

  /**
   * Get restaurant settings
   * @returns {Promise<Object>} { success, data, error }
   */
  async getSettings() {
    try {
      const response = await api.get('/settings');
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[RestaurantService] Get settings error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch settings',
      };
    }
  },

  /**
   * Update restaurant settings
   * @param {Object} data - Updated settings data
   * @returns {Promise<Object>} { success, data, error }
   */
  async updateSettings(data) {
    try {
      const response = await api.put('/settings', data);
      return {
        success: true,
        data: response.data.data,
        error: null,
      };
    } catch (error) {
      console.error('[RestaurantService] Update settings error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to update settings',
      };
    }
  },

  // ============================================================
  // RESTAURANT DASHBOARD
  // ============================================================

  /**
   * Get restaurant dashboard statistics
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
      console.error('[RestaurantService] Get dashboard stats error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch dashboard stats',
      };
    }
  },
};

export default restaurantService;