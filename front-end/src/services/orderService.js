// services/orderService.js
import { orderAPI } from './api.js';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const orderService = {
  // ==========================================
  // GET ALL ORDERS
  // ==========================================
  async getAllOrders(params = {}) {
    try {
      const result = await orderAPI.getAll(params);
      return {
        success: true,
        data: result.orders || result,
        error: null,
      };
    } catch (error) {
      console.error('Error fetching orders:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to fetch orders',
      };
    }
  },

  // ==========================================
  // GET ORDERS BY RESTAURANT
  // ==========================================
  async getOrdersByRestaurant(restaurantId, params = {}) {
    try {
      // The backend should filter by restaurant automatically based on user's role
      const result = await orderAPI.getAll({ ...params });
      return {
        success: true,
        data: result.orders || result,
        error: null,
      };
    } catch (error) {
      console.error('Error fetching restaurant orders:', error);
      return {
        success: false,
        data: [],
        error: error.message || 'Failed to fetch restaurant orders',
      };
    }
  },

  // ==========================================
  // GET ACTIVE ORDERS
  // ==========================================
  async getActiveOrders() {
    try {
      const result = await orderAPI.getActive();
      return {
        success: true,
        data: result,
        error: null,
      };
    } catch (error) {
      console.error('Error fetching active orders:', error);
      return {
        success: false,
        data: [],
        error: error.message || 'Failed to fetch active orders',
      };
    }
  },

  // ==========================================
  // GET KITCHEN DISPLAY
  // ==========================================
  async getKitchenDisplay() {
    try {
      const result = await orderAPI.getKitchenDisplay();
      return {
        success: true,
        data: result,
        error: null,
      };
    } catch (error) {
      console.error('Error fetching kitchen display:', error);
      return {
        success: false,
        data: { verified: [], preparing: [], total_active: 0 },
        error: error.message || 'Failed to fetch kitchen display',
      };
    }
  },

  // ==========================================
  // CREATE ORDER
  // ==========================================
  async createOrder(orderData) {
    try {
      const result = await orderAPI.create(orderData);
      return {
        success: true,
        data: result,
        error: null,
      };
    } catch (error) {
      console.error('Error creating order:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to create order',
      };
    }
  },

  // ==========================================
  // UPDATE ORDER STATUS  // ==========================================
  async updateOrderStatus(orderId, status) {
    try {
      const result = await orderAPI.updateStatus(orderId, status);
      return {
        success: true,
        data: result,
        error: null,
      };
    } catch (error) {
      console.error('Error updating order status:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to update order status',
      };
    }
  },

  // ==========================================
  // GET ORDER BY ID
  // ==========================================
  async getOrderById(orderId) {
    try {
      const result = await orderAPI.getById(orderId);
      return {
        success: true,
        data: result,
        error: null,
      };
    } catch (error) {
      console.error('Error fetching order:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to fetch order',
      };
    }
  },

  // ==========================================
  // GET TODAY'S ORDERS
  // ==========================================
  async getTodayOrders() {
    try {
      const result = await orderAPI.getToday();
      return {
        success: true,
        data: result,
        error: null,
      };
    } catch (error) {
      console.error('Error fetching today\'s orders:', error);
      return {
        success: false,
        data: { orders: [], stats: {} },
        error: error.message || 'Failed to fetch today\'s orders',
      };
    }
  },

  // ==========================================
  // GET ORDER HISTORY
  // ==========================================
  async getOrderHistory(params = {}) {
    try {
      const result = await orderAPI.getHistory(params);
      return {
        success: true,
        data: result,
        error: null,
      };
    } catch (error) {
      console.error('Error fetching order history:', error);
      return {
        success: false,
        data: { orders: [], daily_revenue: [] },
        error: error.message || 'Failed to fetch order history',
      };
    }
  },

  // ==========================================
  // ASSIGN WAITER
  // ==========================================
  async assignWaiter(orderId, waiterId) {
    try {
      const result = await orderAPI.assignWaiter(orderId, waiterId);
      return {
        success: true,
        data: result,
        error: null,
      };
    } catch (error) {
      console.error('Error assigning waiter:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to assign waiter',
      };
    }
  },

  // ==========================================
  // TRACK ORDER (Public)
  // ==========================================
  async trackOrder(orderNumber) {
    try {
      const result = await orderAPI.trackOrder(orderNumber);
      return {
        success: true,
        data: result,
        error: null,
      };
    } catch (error) {
      console.error('Error tracking order:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to track order',
      };
    }
  },

  // ==========================================
  // DASHBOARD STATS
  // ==========================================
  async getStats(restaurantId = null) {
    try {
      const result = await orderAPI.getAll(restaurantId ? { restaurant_id: restaurantId } : {});
      const orders = result.orders || [];
      
      return {
        success: true,
        data: {
          totalOrders: orders.length,
          pending: orders.filter((o) => o.status === 'pending').length,
          verified: orders.filter((o) => o.status === 'verified').length,
          preparing: orders.filter((o) => o.status === 'preparing').length,
          served: orders.filter((o) => o.status === 'served').length,
        },
        error: null,
      };
    } catch (error) {
      console.error('Error fetching order stats:', error);
      return {
        success: false,
        data: {
          totalOrders: 0,
          pending: 0,
          verified: 0,
          preparing: 0,
          served: 0,
        },
        error: error.message || 'Failed to fetch order stats',
      };
    }
  },
};

export default orderService;