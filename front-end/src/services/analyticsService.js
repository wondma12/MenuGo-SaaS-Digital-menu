

import api from './api.js';



const analyticsService = {
  
  
  

  


  async getDashboardStats() {
    try {
      
      const userStr = localStorage.getItem('user');
      let user = {};
      try {
        user = userStr ? JSON.parse(userStr) : {};
      } catch (e) {
        console.warn('[AnalyticsService] Failed to parse user:', e);
      }
      
      
      const isPlatformAdmin = 
        user.role === 'platform_admin' || 
        user.role === 'Platform_admin' ||
        user.role === 'Platform Admin' ||
        user.userRole === 'platform_admin' ||
        user.type === 'platform_admin';
      
      console.log('[AnalyticsService] User object:', user);
      console.log('[AnalyticsService] User role:', user.role);
      console.log('[AnalyticsService] Is Platform Admin?', isPlatformAdmin);
      
      
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

  


  async getRevenueChart(days = 30, isPlatform = false) {
    try {
      
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

  


  async getOrderDistribution(isPlatform = false) {
    try {
      
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