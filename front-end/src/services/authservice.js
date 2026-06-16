// services/authservice.js
import { authAPI } from './api.js';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const authService = {
  // =========================
  // LOGIN
  // =========================
  async login(email, password) {
    try {
      const result = await authAPI.login(email, password);
      return result;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Login failed. Please try again.',
      };
    }
  },

  // =========================
  // REGISTER
  // =========================
  async register(userData) {
    try {
      const result = await authAPI.register(userData);
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Registration failed. Please try again.',
      };
    }
  },

  // =========================
  // CURRENT USER
  // =========================
  async getCurrentUser() {
    try {
      const result = await authAPI.getCurrentUser();
      return result;
    } catch (error) {
      console.error('Get current user error:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to get user information',
      };
    }
  },

  // =========================
  // LOGOUT
  // =========================
  logout() {
    return authAPI.logout();
  },

  // =========================
  // ROLE CHECK
  // =========================
  hasRole(userRole, requiredRole) {
    const roleHierarchy = {
      platform_admin: 3,
      restaurant_admin: 2,
      waiter: 1,
    };

    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  },

  // =========================
  // RESTAURANT ACCESS
  // =========================
  canAccessRestaurant(user, restaurantId) {
    // Platform admin can access everything
    if (user.role === 'platform_admin') {
      return true;
    }

    // Restaurant users only access their own restaurant
    return user.restaurant_id === restaurantId;
  },

  // =========================
  // REDIRECTS
  // =========================
  getRestaurantRedirectPath(user) {
    // Platform admin
    if (user.role === 'platform_admin') {
      return '/platform/dashboard';
    }

    // Restaurant admin
    if (user.role === 'restaurant_admin') {
      return `/Restaurant_admin/dashboard/${user.restaurant_id}`;
    }

    // Waiter
    if (user.role === 'waiter') {
      return `/waiter/orders/${user.restaurant_id}`;
    }

    return '/';
  },

  // =========================
  // GET USER RESTAURANT
  // =========================
  async getRestaurantByUser(user) {
    try {
      if (user.role === 'platform_admin' || !user.restaurant_id) {
        return null;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/restaurants/${user.restaurant_id}`
      );

      if (!response.ok) {
        throw new Error('Restaurant not found');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Restaurant fetch error:', error);
      return null;
    }
  },

  // =========================
  // GET CURRENT USER FROM STORAGE
  // =========================
  getCurrentUserFromStorage() {
    return authAPI.getUser();
  },

  // =========================
  // IS AUTHENTICATED
  // =========================
  isAuthenticated() {
    return authAPI.isAuthenticated();
  },

  // =========================
  // GET TOKEN
  // =========================
  getToken() {
    return authAPI.getToken();
  }
};

export default authService;