
import axios from "axios";

const API_BASE_URL =  import.meta.env.VITE_API_URL || "https://menugo-digital-menu.onrender.com/api/v1";

  // import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});


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


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    console.error("API Error:", errorMessage);

    return Promise.reject(error);
  },
);





const handleResponse = (response) => {
  console.log('[API] handleResponse - Response:', response);
  
  if (!response) {
    console.error('[API] No response object');
    throw new Error('No response from server');
  }
  
  if (!response.data) {
    console.error('[API] No response.data:', response);
    throw new Error('No data received from server');
  }
  
  console.log('[API] response.data:', response.data);
  
  
  if (response.data.success === true) {
    return response.data.data;
  }
  
  
  if (response.data.success === false) {
    throw new Error(response.data.message || 'Request failed');
  }
  
  
  if (response.data.data) {
    return response.data.data;
  }
  
  
  return response.data;
};



const handleError = (error) => {
  console.error('[API] handleError - Error:', error);
  console.error('[API] Error response:', error.response);
  console.error('[API] Error data:', error.response?.data);
  
  const message =
    error.response?.data?.message || error.message || "Request failed";
  console.error("API Error:", message);
  throw new Error(message);
};



const wrapApiCall = async (apiCall) => {
  try {
    const result = await apiCall();
    return {
      success: true,
      data: result,
      error: null,
    };
  } catch (error) {
    console.error('[API] API call failed:', error);
    return {
      success: false,
      data: null,
      error: error.message || 'Request failed',
    };
  }
};



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
      if (response.data.success) {
        return { success: true, data: response.data.data };
      }
      return { success: false, error: response.data.message };
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
      if (response.data.success) {
        return { success: true, user: response.data.data };
      }
      return { success: false, error: response.data.message };
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



export const restaurantAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/restaurants/all", { params });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getPublicRestaurant: async (id) => {
    try {
      // If you have a public endpoint, use it
      const response = await api.get(`/public/restaurants/${id}`);
      return handleResponse(response);
    } catch (error) {
      // Fallback: try regular endpoint (might fail if no auth)
      try {
        const response = await api.get(`/restaurants/${id}`);
        return handleResponse(response);
      } catch (fallbackError) {
        console.error('[restaurantAPI] Failed to get restaurant:', fallbackError);
        return null;
      }
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/restaurants/${id}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getMyRestaurant: async () => {
    try {
      const response = await api.get("/restaurants/my-restaurant");
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  create: async (data) => {
    try {
      console.log('[restaurantAPI.create] Sending data:', data);
      const response = await api.post("/restaurants", data);
      console.log('[restaurantAPI.create] Response data:', response.data);
      
      if (!response || !response.data) {
        throw new Error('No response from server');
      }
      
      
      if (response.data.success === true) {
        return {
          success: true,
          data: response.data.data,
        };
      }
      
      
      if (response.data.data) {
        return {
          success: true,
          data: response.data.data,
        };
      }
      
      
      if (response.data.id) {
        return {
          success: true,
          data: response.data,
        };
      }
      
      
      if (response.data.success === false) {
        return {
          success: false,
          data: null,
          error: response.data.message || 'Request failed',
        };
      }
      
      
      return {
        success: true,
        data: response.data,
      };
      
    } catch (error) {
      console.error('[restaurantAPI.create] Error:', error);
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
      return handleError(error);
    }
  },

  updateStatus: async (id, status) => {
    try {
      const response = await api.put(`/restaurants/${id}/status`, { status });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};



export const staffAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/users", { params });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getByRestaurant: async (restaurantId) => {
    try {
      const response = await api.get(`/users?restaurant_id=${restaurantId}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  create: async (data) => {
    try {
      const response = await api.post("/users", data);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/users/${id}`, data);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};



export const menuAPI = {
  
  getCategories: async () => {
    try {
      const response = await api.get("/menu/categories");
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getCategoryById: async (id) => {
    try {
      const response = await api.get(`/menu/categories/${id}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  createCategory: async (data) => {
    try {
      const response = await api.post("/menu/categories", data);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  updateCategory: async (id, data) => {
    try {
      const response = await api.put(`/menu/categories/${id}`, data);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  deleteCategory: async (id) => {
    try {
      const response = await api.delete(`/menu/categories/${id}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  
  getMenuItems: async (params = {}) => {
    try {
      const response = await api.get("/menu/items", { params });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getMenuItemById: async (id) => {
    try {
      const response = await api.get(`/menu/items/${id}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  createMenuItem: async (data) => {
    try {
      const response = await api.post("/menu/items", data);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  updateMenuItem: async (id, data) => {
    try {
      const response = await api.put(`/menu/items/${id}`, data);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  deleteMenuItem: async (id) => {
    try {
      const response = await api.delete(`/menu/items/${id}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  updateMenuItemStatus: async (id, status) => {
    try {
      const response = await api.patch(`/menu/items/${id}/status`, { status });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getFeaturedItems: async (limit = 10) => {
    try {
      const response = await api.get("/menu/items/featured", { params: { limit } });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getMenuByCategory: async () => {
    try {
      const response = await api.get("/menu/items/menu-by-category");
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  
  getPublicMenu: async (restaurantId) => {
    try {
      console.log('[menuAPI] Fetching public menu for restaurant:', restaurantId);
      const response = await api.get(`/menu/public/${restaurantId}`);
      console.log('[menuAPI] Public menu response:', response.data);
      return handleResponse(response);
    } catch (error) {
      console.error('[menuAPI] Public menu error:', error);
      return handleError(error);
    }
  },
};



export const orderAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/orders", { params });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getActive: async () => {
    try {
      const response = await api.get("/orders/active");
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getHistory: async (params = {}) => {
    try {
      const response = await api.get("/orders/history", { params });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getToday: async () => {
    try {
      const response = await api.get("/orders/today");
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getKitchenDisplay: async () => {
    try {
      const response = await api.get("/orders/kitchen-display");
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  create: async (data) => {
    try {
      const response = await api.post("/orders", data);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  updateStatus: async (id, status) => {
    try {
      const response = await api.patch(`/orders/${id}/status`, { status });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  assignWaiter: async (id, waiterId) => {
    try {
      const response = await api.put(`/orders/${id}/assign-waiter`, { waiter_id: waiterId });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  trackOrder: async (orderNumber) => {
    try {
      const response = await api.get(`/orders/track/${orderNumber}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};



export const qrCodeAPI = {
  generate: async (data) => {
    try {
      console.log('[qrCodeAPI.generate] Sending data:', data);
      const response = await api.post("/qrcodes/generate", data);
      console.log('[qrCodeAPI.generate] Response:', response.data);
      
      if (!response || !response.data) {
        return {
          success: false,
          data: null,
          error: 'No response from server',
        };
      }
      
      
      if (response.data.success === true) {
        return {
          success: true,
          data: response.data.data,
        };
      }
      
      
      if (response.data.data) {
        return {
          success: true,
          data: response.data.data,
        };
      }
      
      
      if (response.data.id) {
        return {
          success: true,
          data: response.data,
        };
      }
      
      
      if (response.data.success === false) {
        return {
          success: false,
          data: null,
          error: response.data.message || 'Request failed',
        };
      }
      
      
      return {
        success: true,
        data: response.data,
      };
      
    } catch (error) {
      console.error('[qrCodeAPI.generate] Error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || error.message || 'Request failed',
      };
    }
  },

  generateTables: async (tableNumbers) => {
    try {
      const response = await api.post("/qrcodes/generate-tables", { table_numbers: tableNumbers });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getAll: async (params = {}) => {
    try {
      const response = await api.get("/qrcodes", { params });
      console.log('[qrCodeAPI.getAll] Response:', response.data);
      
      if (!response || !response.data) {
        return {
          success: false,
          data: [],
          error: 'No response from server',
        };
      }
      
      
      if (response.data.success === true) {
        return {
          success: true,
          data: response.data.data || [],
        };
      }
      
      
      if (response.data.data) {
        return {
          success: true,
          data: response.data.data,
        };
      }
      
      
      if (Array.isArray(response.data)) {
        return {
          success: true,
          data: response.data,
        };
      }
      
      
      return {
        success: true,
        data: response.data || [],
      };
      
    } catch (error) {
      console.error('[qrCodeAPI.getAll] Error:', error);
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || error.message || 'Failed to fetch QR codes',
      };
    }
  },

  updateStatus: async (id, isActive) => {
    try {
      const response = await api.patch(`/qrcodes/${id}/status`, { is_active: isActive });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/qrcodes/${id}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};



export const feedbackAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/feedbacks", { params });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  submitPublic: async (restaurantId, data) => {
    try {
      const response = await api.post(`/feedbacks/public/${restaurantId}`, data);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/feedbacks/${id}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};



export const analyticsAPI = {
  getDashboard: async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      
      let endpoint = '/analytics/dashboard';
      if (user.role === 'platform_admin') {
        endpoint = '/admin/dashboard';
      }
      
      console.log('[analyticsAPI] Calling endpoint:', endpoint);
      const response = await api.get(endpoint);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getRevenueChart: async (days = 30) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      let endpoint = '/analytics/revenue-chart';
      if (user.role === 'platform_admin') {
        endpoint = '/admin/revenue-chart';
      }
      
      const response = await api.get(endpoint, { params: { days } });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getOrderDistribution: async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      let endpoint = '/analytics/order-distribution';
      if (user.role === 'platform_admin') {
        endpoint = '/admin/order-distribution';
      }
      
      const response = await api.get(endpoint);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};



export const verificationAPI = {
  submit: async (data) => {
    try {
      const response = await api.post("/verification/submit", data);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getStatus: async () => {
    try {
      const response = await api.get("/verification/my-status");
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getAll: async (params = {}) => {
    try {
      const response = await api.get("/verification/all", { params });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  review: async (id, status, notes) => {
    try {
      const response = await api.put(`/verification/${id}/review`, { status, notes });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};



export const locationAPI = {
  add: async (data) => {
    try {
      const response = await api.post("/locations", data);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  update: async (data) => {
    try {
      const response = await api.put("/locations", data);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  get: async () => {
    try {
      const response = await api.get("/locations");
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getNearby: async (latitude, longitude, radius = 10) => {
    try {
      const response = await api.get("/locations/nearby", { params: { latitude, longitude, radius } });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};



export const settingsAPI = {
  get: async () => {
    try {
      const response = await api.get("/settings");
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  update: async (data) => {
    try {
      const response = await api.put("/settings", data);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};



export default api;