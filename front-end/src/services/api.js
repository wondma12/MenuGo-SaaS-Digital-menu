// services/api.js
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

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
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
    }

    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    console.error("API Error:", errorMessage);

    return Promise.reject(error);
  },
);

// ============================================================
// 🔥 FIXED: Helper function for consistent response format
// ============================================================

const handleResponse = (response) => {
  console.log('[API] handleResponse - Response:', response);
  
  // ✅ Check if response exists
  if (!response) {
    console.error('[API] No response object');
    throw new Error('No response from server');
  }
  
  // ✅ Check if response.data exists
  if (!response.data) {
    console.error('[API] No response.data:', response);
    throw new Error('No data received from server');
  }
  
  console.log('[API] response.data:', response.data);
  
  // ✅ If the response has success: true, return the data
  if (response.data.success === true) {
    return response.data.data;
  }
  
  // ✅ If the response has success: false, throw the error
  if (response.data.success === false) {
    throw new Error(response.data.message || 'Request failed');
  }
  
  // ✅ If success is not provided but there's data, assume success
  if (response.data.data) {
    return response.data.data;
  }
  
  // ✅ Fallback: return the whole response
  return response.data;
};

// Helper function for error handling
const handleError = (error) => {
  console.error('[API] handleError - Error:', error);
  console.error('[API] Error response:', error.response);
  console.error('[API] Error data:', error.response?.data);
  
  const message =
    error.response?.data?.message || error.message || "Request failed";
  console.error("API Error:", message);
  throw new Error(message);
};

// ===============================
// RESTAURANT API - FIXED
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
    console.log('[restaurantAPI.create] Sending data:', data);
    const response = await api.post("/restaurants", data);
    console.log('[restaurantAPI.create] Raw response:', response);
    console.log('[restaurantAPI.create] Response data:', response.data);
    
    // ✅ Check if response exists
    if (!response) {
      throw new Error('No response from server');
    }
    
    // ✅ Check if response.data exists
    if (!response.data) {
      console.error('[restaurantAPI.create] No data in response');
      throw new Error('No data received from server');
    }
    
    // ✅ Return consistent format with success flag
    if (response.data.data) {
      return {
        success: true,
        data: response.data.data,
      };
    }
    
    // ✅ If the response is directly the data
    if (response.data.id || response.data.name) {
      return {
        success: true,
        data: response.data,
      };
    }
    
    // ✅ If success is true
    if (response.data.success === true) {
      return {
        success: true,
        data: response.data.data || response.data,
      };
    }
    
    // ✅ If success is false
    if (response.data.success === false) {
      return {
        success: false,
        data: null,
        error: response.data.message || 'Request failed',
      };
    }
    
    // ✅ Fallback: assume success
    return {
      success: true,
      data: response.data,
    };
    
  } catch (error) {
    console.error('[restaurantAPI.create] Error:', error);
    console.error('[restaurantAPI.create] Error response:', error.response);
    console.error('[restaurantAPI.create] Error data:', error.response?.data);
    
    // ✅ Return error in consistent format
    return {
      success: false,
      data: null,
      error: error.response?.data?.message || error.message || 'Request failed',
    };
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

// ... rest of your api.js exports (keep everything else the same)

export default api;