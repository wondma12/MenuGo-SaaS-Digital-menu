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

// ===============================
// RESTAURANTS API
// ===============================

export const restaurantAPI = {
  getAll: () => apiRequest("/restaurants"),

  getById: (id) => apiRequest(`/restaurants/${id}`),

  create: (data) =>
    apiRequest("/restaurants", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiRequest(`/restaurants/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiRequest(`/restaurants/${id}`, {
      method: "DELETE",
    }),
};

// ===============================
// RESTAURANT LOCATIONS API
// ===============================

export const restaurantLocationAPI = {
  getAll: () => apiRequest("/restaurant_locations"),

  getByRestaurantId: (restaurant_id) =>
    apiRequest(`/restaurant_locations?restaurant_id=${restaurant_id}`),

  create: (data) =>
    apiRequest("/restaurant_locations", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiRequest(`/restaurant_locations/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

// ===============================
// RESTAURANT VERIFICATIONS API
// ===============================

export const restaurantVerificationAPI = {
  getAll: () => apiRequest("/restaurant_verifications"),

  getByRestaurantId: (restaurant_id) =>
    apiRequest(
      `/restaurant_verifications?restaurant_id=${restaurant_id}`,
    ),

  create: (data) =>
    apiRequest("/restaurant_verifications", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiRequest(`/restaurant_verifications/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

// ===============================
// USERS API
// ===============================

export const userAPI = {
  getAll: () => apiRequest("/users"),

  getById: (id) => apiRequest(`/users/${id}`),

  create: (data) =>
    apiRequest("/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiRequest(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiRequest(`/users/${id}`, {
      method: "DELETE",
    }),
};

// ===============================
// CATEGORIES API
// ===============================

export const categoryAPI = {
  getAll: () => apiRequest("/categories"),

  getById: (id) => apiRequest(`/categories/${id}`),

  getByRestaurantId: (restaurant_id) =>
    apiRequest(`/categories?restaurant_id=${restaurant_id}`),

  create: (data) =>
    apiRequest("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiRequest(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiRequest(`/categories/${id}`, {
      method: "DELETE",
    }),
};

// ===============================
// MENU ITEMS API
// ===============================

export const menuItemAPI = {
  getAll: () => apiRequest("/menu_items"),

  getById: (id) => apiRequest(`/menu_items/${id}`),

  getByCategoryId: (category_id) =>
    apiRequest(`/menu_items?category_id=${category_id}`),

  create: (data) =>
    apiRequest("/menu_items", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiRequest(`/menu_items/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiRequest(`/menu_items/${id}`, {
      method: "DELETE",
    }),
};

// ===============================
// ORDERS API
// ===============================

export const orderAPI = {
  getAll: () => apiRequest("/orders"),

  getById: (id) => apiRequest(`/orders/${id}`),

  getByRestaurantId: (restaurant_id) =>
    apiRequest(`/orders?restaurant_id=${restaurant_id}`),

  create: (data) =>
    apiRequest("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiRequest(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiRequest(`/orders/${id}`, {
      method: "DELETE",
    }),
};

// ===============================
// ORDER ITEMS API
// ===============================

export const orderItemAPI = {
  getAll: () => apiRequest("/order_items"),

  getById: (id) => apiRequest(`/order_items/${id}`),

  getByOrderId: (order_id) =>
    apiRequest(`/order_items?order_id=${order_id}`),

  create: (data) =>
    apiRequest("/order_items", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiRequest(`/order_items/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiRequest(`/order_items/${id}`, {
      method: "DELETE",
    }),
};

// ===============================
// ADMIN DASHBOARD API
// ===============================

export const adminAPI = {
  // Dashboard statistics
  getDashboardStats: async () => {
    try {
      const [restaurants, users] = await Promise.all([
        restaurantAPI.getAll(),
        userAPI.getAll(),
      ]);

      const waiters = users.filter(
        (user) => user.role === "waiter",
      );

      const restaurantAdmins = users.filter(
        (user) => user.role === "restaurant_admin",
      );

      return {
        totalRestaurants: restaurants.length,

        totalUsers: users.length,

        totalRestaurantAdmins: restaurantAdmins.length,

        totalStaff: waiters.length,

        pendingRestaurants: restaurants.filter(
          (r) => r.status === "pending",
        ).length,

        activeRestaurants: restaurants.filter(
          (r) => r.status === "active",
        ).length,

        suspendedRestaurants: restaurants.filter(
          (r) => r.status === "suspended",
        ).length,
      };
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error;
    }
  },

  // Restaurant with complete details
  getRestaurantWithDetails: async (id) => {
    try {
      const [
        restaurant,
        locations,
        verifications,
        users,
        categories,
        orders,
      ] = await Promise.all([
        restaurantAPI.getById(id),

        restaurantLocationAPI.getByRestaurantId(id),

        restaurantVerificationAPI.getByRestaurantId(id),

        userAPI.getAll(),

        categoryAPI.getByRestaurantId(id),

        orderAPI.getByRestaurantId(id),
      ]);

      const restaurantUsers = users.filter(
        (user) => user.restaurant_id === id,
      );

      return {
        ...restaurant,

        location: locations[0] || null,

        verification: verifications[0] || null,

        users: restaurantUsers,

        categories,

        orders,
      };
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
      throw error;
    }
  },
};