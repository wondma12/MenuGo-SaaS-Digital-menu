import { API_BASE_URL } from "../env";

// Base API configuration
const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${apiConfig.baseURL}${endpoint}`, {
      headers: apiConfig.headers,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Restaurant related API calls
export const restaurantAPI = {
  // Get all restaurants
  getAll: () => apiRequest("/restaurants"),

  // Get restaurant by ID
  getById: (id) => apiRequest(`/restaurants/${id}`),

  // Create restaurant
  create: (data) =>
    apiRequest("/restaurants", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Update restaurant
  update: (id, data) =>
    apiRequest(`/restaurants/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Delete restaurant
  delete: (id) =>
    apiRequest(`/restaurants/${id}`, {
      method: "DELETE",
    }),
};

// Restaurant locations API
export const restaurantLocationAPI = {
  // Get all restaurant locations
  getAll: () => apiRequest("/restaurantLocations"),

  // Get location by restaurant ID
  getByRestaurantId: (restaurantId) =>
    apiRequest(`/restaurantLocations?restaurantId=${restaurantId}`),

  // Create location
  create: (data) =>
    apiRequest("/restaurantLocations", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Update location
  update: (id, data) =>
    apiRequest(`/restaurantLocations/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

// Restaurant verifications API
export const restaurantVerificationAPI = {
  // Get all verifications
  getAll: () => apiRequest("/restaurantVerifications"),

  // Get verification by restaurant ID
  getByRestaurantId: (restaurantId) =>
    apiRequest(`/restaurantVerifications?restaurantId=${restaurantId}`),

  // Create verification
  create: (data) =>
    apiRequest("/restaurantVerifications", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Update verification
  update: (id, data) =>
    apiRequest(`/restaurantVerifications/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

// Users API
export const userAPI = {
  // Get all users
  getAll: () => apiRequest("/users"),

  // Get user by ID
  getById: (id) => apiRequest(`/users/${id}`),

  // Create user
  create: (data) =>
    apiRequest("/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Update user
  update: (id, data) =>
    apiRequest(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Delete user
  delete: (id) =>
    apiRequest(`/users/${id}`, {
      method: "DELETE",
    }),
};

// Staff API
export const staffAPI = {
  // Get all staff
  getAll: () => apiRequest("/staff"),

  // Get staff by restaurant ID
  getByRestaurantId: (restaurantId) =>
    apiRequest(`/staff?restaurantId=${restaurantId}`),

  // Create staff
  create: (data) =>
    apiRequest("/staff", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Update staff
  update: (id, data) =>
    apiRequest(`/staff/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Delete staff
  delete: (id) =>
    apiRequest(`/staff/${id}`, {
      method: "DELETE",
    }),
};

// Categories API
export const categoryAPI = {
  // Get all categories
  getAll: () => apiRequest("/categories"),

  // Get category by ID
  getById: (id) => apiRequest(`/categories/${id}`),

  // Create category
  create: (data) =>
    apiRequest("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Update category
  update: (id, data) =>
    apiRequest(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Delete category
  delete: (id) =>
    apiRequest(`/categories/${id}`, {
      method: "DELETE",
    }),
};

// Menu Items API
export const menuItemAPI = {
  // Get all menu items
  getAll: () => apiRequest("/menuItems"),

  // Get menu items by restaurant ID
  getByRestaurantId: (restaurantId) =>
    apiRequest(`/menuItems?restaurantId=${restaurantId}`),

  // Create menu item
  create: (data) =>
    apiRequest("/menuItems", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Update menu item
  update: (id, data) =>
    apiRequest(`/menuItems/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Delete menu item
  delete: (id) =>
    apiRequest(`/menuItems/${id}`, {
      method: "DELETE",
    }),
};

// Orders API
export const orderAPI = {
  // Get all orders
  getAll: () => apiRequest("/orders"),

  // Get orders by restaurant ID
  getByRestaurantId: (restaurantId) =>
    apiRequest(`/orders?restaurantId=${restaurantId}`),

  // Create order
  create: (data) =>
    apiRequest("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Update order
  update: (id, data) =>
    apiRequest(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Delete order
  delete: (id) =>
    apiRequest(`/orders/${id}`, {
      method: "DELETE",
    }),
};

// Order Items API
export const orderItemAPI = {
  // Get all order items
  getAll: () => apiRequest("/orderItems"),

  // Get order items by order ID
  getByOrderId: (orderId) => apiRequest(`/orderItems?orderId=${orderId}`),

  // Create order item
  create: (data) =>
    apiRequest("/orderItems", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Update order item
  update: (id, data) =>
    apiRequest(`/orderItems/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Delete order item
  delete: (id) =>
    apiRequest(`/orderItems/${id}`, {
      method: "DELETE",
    }),
};

// Combined API for admin dashboard
export const adminAPI = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const [restaurants, users, staff] = await Promise.all([
        restaurantAPI.getAll(),
        userAPI.getAll(),
        staffAPI.getAll(),
      ]);

      return {
        totalRestaurants: restaurants.length,
        totalUsers: users.length,
        totalStaff: staff.length,
        pendingRestaurants: restaurants.filter((r) => r.status === "pending")
          .length,
        activeRestaurants: restaurants.filter((r) => r.status === "active")
          .length,
        suspendedRestaurants: restaurants.filter(
          (r) => r.status === "suspended",
        ).length,
      };
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error;
    }
  },

  // Get restaurant with all related data
  getRestaurantWithDetails: async (id) => {
    try {
      const [restaurant, locations, verifications, staff] = await Promise.all([
        restaurantAPI.getById(id),
        restaurantLocationAPI.getByRestaurantId(id),
        restaurantVerificationAPI.getByRestaurantId(id),
        staffAPI.getByRestaurantId(id),
      ]);

      return {
        ...restaurant,
        location: locations[0] || null,
        verifications,
        staff,
      };
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
      throw error;
    }
  },
};
