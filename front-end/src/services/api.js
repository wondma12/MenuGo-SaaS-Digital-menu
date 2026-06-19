// services/api.js
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

console.log(import.meta.env.VITE_API_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Request interceptor - Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // window.location.href = "/login";
    }

    // Extract error message from response
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    console.error("API Error:", errorMessage);

    return Promise.reject(error);
  },
);

// Helper function for consistent response format
const handleResponse = (response) => {
  if (response.data.success) {
    return response.data.data;
  }
  throw new Error(response.data.message || "Request failed");
};

// Helper function for error handling
const handleError = (error) => {
  const message =
    error.response?.data?.message || error.message || "Request failed";
  console.error("API Error:", message);
  throw new Error(message);
};

// ===============================
// AUTH API
// ===============================

export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.data.success) {
        const { token, user } = response.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        return { success: true, user, token };
      }
      return { success: false, error: response.data.message };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return { success: true, data: response.data.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me");
      return { success: true, user: response.data.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to get user",
      };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { success: true };
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem("token");
  },
};

// ===============================
// RESTAURANT API
// ===============================

export const restaurantAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/restaurants/all", { params });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/restaurants/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getMyRestaurant: async () => {
    try {
      const response = await api.get("/restaurants/my-restaurant");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  create: async (data) => {
    try {
      const response = await api.post("/restaurants", data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/restaurants/${id}`, data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  updateStatus: async (id, status) => {
    try {
      const response = await api.put(`/restaurants/${id}/status`, { status });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },
};

// ===============================
// MENU API (Categories & Items)
// ===============================

export const menuAPI = {
  // ---------- CATEGORIES ----------
  getCategories: async () => {
    try {
      const response = await api.get("/menu/categories");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getCategoryById: async (id) => {
    try {
      const response = await api.get(`/menu/categories/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  createCategory: async (data) => {
    try {
      const response = await api.post("/menu/categories", data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  updateCategory: async (id, data) => {
    try {
      const response = await api.put(`/menu/categories/${id}`, data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  deleteCategory: async (id) => {
    try {
      const response = await api.delete(`/menu/categories/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  // ---------- MENU ITEMS ----------
  getMenuItems: async (params = {}) => {
    try {
      const response = await api.get("/menu/items", { params });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getMenuItemById: async (id) => {
    try {
      const response = await api.get(`/menu/items/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  createMenuItem: async (data) => {
    try {
      const response = await api.post("/menu/items", data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  updateMenuItem: async (id, data) => {
    try {
      const response = await api.put(`/menu/items/${id}`, data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  deleteMenuItem: async (id) => {
    try {
      const response = await api.delete(`/menu/items/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  updateMenuItemStatus: async (id, status) => {
    try {
      const response = await api.patch(`/menu/items/${id}/status`, { status });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getFeaturedItems: async (limit = 10) => {
    try {
      const response = await api.get("/menu/items/featured", {
        params: { limit },
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getMenuByCategory: async () => {
    try {
      const response = await api.get("/menu/items/menu-by-category");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getPublicMenu: async (restaurantId) => {
    try {
      const response = await api.get(`/menu/public/${restaurantId}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },
};

// ===============================
// ORDER API
// ===============================

export const orderAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/orders", { params });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getActive: async () => {
    try {
      const response = await api.get("/orders/active");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getHistory: async (params = {}) => {
    try {
      const response = await api.get("/orders/history", { params });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getToday: async () => {
    try {
      const response = await api.get("/orders/today");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getKitchenDisplay: async () => {
    try {
      const response = await api.get("/orders/kitchen-display");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  create: async (data) => {
    try {
      const response = await api.post("/orders", data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  updateStatus: async (id, status) => {
    try {
      const response = await api.patch(`/orders/${id}/status`, { status });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  assignWaiter: async (id, waiterId) => {
    try {
      const response = await api.put(`/orders/${id}/assign-waiter`, {
        waiter_id: waiterId,
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  trackOrder: async (orderNumber) => {
    try {
      const response = await api.get(`/orders/track/${orderNumber}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },
};

// ===============================
// QR CODE API
// ===============================

export const qrCodeAPI = {
  generate: async (data) => {
    try {
      const response = await api.post("/qrcodes/generate", data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  generateTables: async (tableNumbers) => {
    try {
      const response = await api.post("/qrcodes/generate-tables", {
        table_numbers: tableNumbers,
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getAll: async (params = {}) => {
    try {
      const response = await api.get("/qrcodes", { params });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  updateStatus: async (id, isActive) => {
    try {
      const response = await api.patch(`/qrcodes/${id}/status`, {
        is_active: isActive,
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/qrcodes/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },
};

// ===============================
// FEEDBACK API
// ===============================

export const feedbackAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/feedbacks", { params });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  submitPublic: async (restaurantId, data) => {
    try {
      const response = await api.post(
        `/feedbacks/public/${restaurantId}`,
        data,
      );
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/feedbacks/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },
};

// ===============================
// ANALYTICS API
// ===============================

export const analyticsAPI = {
  getDashboard: async () => {
    try {
      const response = await api.get("/analytics/dashboard");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getRevenueChart: async (days = 30) => {
    try {
      const response = await api.get("/analytics/revenue-chart", {
        params: { days },
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getOrderDistribution: async () => {
    try {
      const response = await api.get("/analytics/order-distribution");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },
};

// ===============================
// VERIFICATION API
// ===============================

export const verificationAPI = {
  submit: async (data) => {
    try {
      const response = await api.post("/verification/submit", data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getStatus: async () => {
    try {
      const response = await api.get("/verification/my-status");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getAll: async (params = {}) => {
    try {
      const response = await api.get("/verification/all", { params });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  review: async (id, status, notes) => {
    try {
      const response = await api.put(`/verification/${id}/review`, {
        status,
        notes,
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },
};

// ===============================
// LOCATION API
// ===============================

export const locationAPI = {
  add: async (data) => {
    try {
      const response = await api.post("/locations", data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  update: async (data) => {
    try {
      const response = await api.put("/locations", data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  get: async () => {
    try {
      const response = await api.get("/locations");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getNearby: async (latitude, longitude, radius = 10) => {
    try {
      const response = await api.get("/locations/nearby", {
        params: { latitude, longitude, radius },
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },
};

// ===============================
// SETTINGS API
// ===============================

export const settingsAPI = {
  get: async () => {
    try {
      const response = await api.get("/settings");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  update: async (data) => {
    try {
      const response = await api.put("/settings", data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },
};

// ===============================
// STAFF/USERS API
// ===============================

export const staffAPI = {
  getAll: async (params = {}) => {
    try {
      // This would require a users endpoint in your backend
      // For now, you might need to create this endpoint
      const response = await api.get("/users", { params });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  getByRestaurant: async (restaurantId) => {
    try {
      const response = await api.get(`/users?restaurant_id=${restaurantId}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  create: async (data) => {
    try {
      const response = await api.post("/users", data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/users/${id}`, data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },
};

export default api;
