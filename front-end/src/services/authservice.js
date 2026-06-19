// services/authservice.js
import { authAPI } from './api.js';

/**
 * Auth Service
 * Handles all authentication-related operations including login, registration,
 * user management, role checks, and navigation redirects.
 */
const authService = {
  // ============================================================
  // AUTHENTICATION OPERATIONS
  // ============================================================

  /**
   * Login user with email and password
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise<Object>} { success, data: { token, user }, error }
   */
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

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} { success, data, error }
   */
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

  /**
   * Get current authenticated user
   * @returns {Promise<Object>} { success, user, error }
   */
  async getCurrentUser() {
    try {
      const result = await authAPI.getCurrentUser();
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

  /**
   * Logout user - clears all stored auth data
   * @returns {Object} { success: true }
   */
  logout() {
    authAPI.logout();
    return { success: true };
  },

  // ============================================================
  // STORAGE HELPERS
  // ============================================================

  /**
   * Get current user from localStorage
   * @returns {Object|null} User object or null if not found
   */
  getCurrentUserFromStorage() {
    return authAPI.getUser();
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if token exists
   */
  isAuthenticated() {
    return authAPI.isAuthenticated();
  },

  /**
   * Get auth token from localStorage
   * @returns {string|null} Token or null if not found
   */
  getToken() {
    return authAPI.getToken();
  },

  // ============================================================
  // ROLE & PERMISSION CHECKS
  // ============================================================

  /**
   * Role hierarchy levels for permission checking
   */
  _roleHierarchy: {
    platform_admin: 3,
    restaurant_admin: 2,
    waiter: 1,
  },

  /**
   * Check if user has required role level
   * @param {string} userRole - Current user's role
   * @param {string} requiredRole - Required role to check
   * @returns {boolean} True if user has sufficient role level
   */
  hasRole(userRole, requiredRole) {
    const userLevel = this._roleHierarchy[userRole] || 0;
    const requiredLevel = this._roleHierarchy[requiredRole] || 0;
    return userLevel >= requiredLevel;
  },

  /**
   * Check if user can access a specific restaurant
   * @param {Object} user - User object
   * @param {string} restaurantId - Restaurant ID to check
   * @returns {boolean} True if user has access
   */
  canAccessRestaurant(user, restaurantId) {
    // Platform admin has access to all restaurants
    if (user.role === 'platform_admin') {
      return true;
    }
    // Others can only access their own restaurant
    return user.restaurant_id === restaurantId;
  },

  // ============================================================
  // NAVIGATION HELPERS
  // ============================================================

  /**
   * Get redirect path based on user role
   * @param {Object} user - User object
   * @returns {string} Redirect path URL
   */
  getRestaurantRedirectPath(user) {
    const redirectMap = {
      platform_admin: '/admin/dashboard',
      restaurant_admin: `/Restaurant_admin/dashboard/${user.restaurant_id}`,
      waiter: `/waiter/orders/${user.restaurant_id}`,
    };

    return redirectMap[user.role] || '/';
  },

  /**
   * Get user's restaurant data
   * @param {Object} user - User object
   * @returns {Promise<Object|null>} Restaurant data or null
   */
  async getRestaurantByUser(user) {
    // Platform admin or users without restaurant don't have a restaurant
    if (user.role === 'platform_admin' || !user.restaurant_id) {
      return null;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/restaurants/${user.restaurant_id}`
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