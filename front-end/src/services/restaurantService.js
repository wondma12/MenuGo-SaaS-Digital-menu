
import api from './api.js';



const restaurantService = {
  
  
  

  


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