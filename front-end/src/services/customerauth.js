// services/customerauth.js
import { restaurantAPI, menuAPI, locationAPI, orderAPI } from './api.js';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const customerAuth = {
  // =========================================
  // GET RESTAURANT BY ID
  // =========================================
  async getRestaurantById(restaurantId) {
    try {
      const restaurant = await restaurantAPI.getById(restaurantId);
      return {
        success: true,
        data: restaurant,
        error: null,
      };
    } catch (error) {
      console.error('Get restaurant error:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to fetch restaurant',
      };
    }
  },

  // =========================================
  // GET RESTAURANT MENU
  // =========================================
  async getRestaurantMenu(restaurantId) {
    try {
      const menu = await menuAPI.getPublicMenu(restaurantId);
      
      return {
        success: true,
        data: menu,
        error: null,
      };
    } catch (error) {
      console.error('Get restaurant menu error:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to fetch restaurant menu',
      };
    }
  },

  // =========================================
  // GET RESTAURANT LOCATION
  // =========================================
  async getRestaurantLocation(restaurantId) {
    try {
      // First get the restaurant to get location ID
      const restaurant = await restaurantAPI.getById(restaurantId);
      
      if (!restaurant || !restaurant.location) {
        return {
          success: false,
          data: null,
          error: 'Restaurant location not found',
        };
      }

      return {
        success: true,
        data: restaurant.location,
        error: null,
      };
    } catch (error) {
      console.error('Get restaurant location error:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to fetch restaurant location',
      };
    }
  },

  // =========================================
  // CHECK CUSTOMER ACCESS
  // =========================================
  async canAccessRestaurant(restaurantId) {
    try {
      const result = await this.getRestaurantById(restaurantId);
      return result.success && result.data.status === 'active';
    } catch (error) {
      console.error('Restaurant access error:', error);
      return false;
    }
  },

  // =========================================
  // GET RESTAURANT SETTINGS
  // =========================================
  async getRestaurantSettings(restaurantId) {
    try {
      // This would require a settings endpoint
      // For now, return default settings
      return {
        success: true,
        data: {
          restaurant_id: restaurantId,
          currency: 'ETB',
          language: 'en',
          allow_online_orders: true,
          service_charge: 10,
          tax_percentage: 15,
        },
        error: null,
      };
    } catch (error) {
      console.error('Get restaurant settings error:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to fetch restaurant settings',
      };
    }
  },

  // =========================================
  // CHECK ORDER AVAILABILITY
  // =========================================
  async isRestaurantAcceptingOrders(restaurantId) {
    try {
      const restaurantResult = await this.getRestaurantById(restaurantId);

      if (!restaurantResult.success) {
        return false;
      }

      // Restaurant must be active
      if (restaurantResult.data.status !== 'active') {
        return false;
      }

      const settingsResult = await this.getRestaurantSettings(restaurantId);

      if (!settingsResult.success) {
        return false;
      }

      return settingsResult.data.allow_online_orders;
    } catch (error) {
      console.error('Check restaurant orders error:', error);
      return false;
    }
  },

  // =========================================
  // TRACK ORDER
  // =========================================
  async trackOrder(orderNumber) {
    try {
      const order = await orderAPI.trackOrder(orderNumber);
      return {
        success: true,
        data: order,
        error: null,
      };
    } catch (error) {
      console.error('Track order error:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to track order',
      };
    }
  }
};

export default customerAuth;