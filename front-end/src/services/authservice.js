
import { authAPI } from './api.js';
import { API_BASE_URL } from '../env.js';



const authService = {
  
  
  

  


  async login(email, password) {
    try {
      const result = await authAPI.login(email, password);

      if (result.success) {
        return {
          success: true,
          data: {
            token: result.token,
            user: result.user,
          },
          error: null,
        };
      }

      return {
        success: false,
        data: null,
        error: result.error || 'Invalid email or password',
      };
    } catch (error) {
      console.error('[AuthService] Login error:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Login failed. Please try again.',
      };
    }
  },

  


  async register(userData) {
    try {
      const result = await authAPI.register(userData);
      return result;
    } catch (error) {
      console.error('[AuthService] Registration error:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Registration failed. Please try again.',
      };
    }
  },

  


  async getCurrentUser() {
    try {
      const result = await authAPI.getCurrentUser();
      if (result.success && result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
      }
      return result;
    } catch (error) {
      console.error('[AuthService] Get current user error:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to get user information',
      };
    }
  },

  


  logout() {
    authAPI.logout();
    return { success: true };
  },

  
  
  

  


  getCurrentUserFromStorage() {
    return authAPI.getUser();
  },

  


  isAuthenticated() {
    return authAPI.isAuthenticated();
  },

  


  getToken() {
    return authAPI.getToken();
  },

  
  
  

  


  _roleHierarchy: {
    platform_admin: 3,
    restaurant_admin: 2,
    waiter: 1,
  },

  


  hasRole(userRole, requiredRole) {
    const userLevel = this._roleHierarchy[userRole] || 0;
    const requiredLevel = this._roleHierarchy[requiredRole] || 0;
    return userLevel >= requiredLevel;
  },

  


  canAccessRestaurant(user, restaurantId) {
    
    if (user.role === 'platform_admin') {
      return true;
    }
    
    return user.restaurant_id === restaurantId;
  },

  
  
  

  


  getRestaurantRedirectPath(user) {
    const redirectMap = {
      platform_admin: '/admin/dashboard',
      restaurant_admin: `/Restaurant_admin/dashboard/${user.restaurant_id}`,
      waiter: `/waiter/orders/${user.restaurant_id}`,
    };

    return redirectMap[user.role] || '/';
  },

  


  async getRestaurantByUser(user) {
    
    if (user.role === 'platform_admin' || !user.restaurant_id) {
      return null;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/restaurants/${user.restaurant_id}`
      );

      if (!response.ok) {
        throw new Error('Restaurant not found');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('[AuthService] Restaurant fetch error:', error);
      return null;
    }
  },
};

export default authService;