import { API_BASE_URL } from "../env";

const delay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const authService = {
  // =========================
  // LOGIN
  // =========================
  async login(email, password) {
    try {
      await delay();

      const response = await fetch(`${API_BASE_URL}/users`);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        return {
          success: false,
          data: null,
          error: "Invalid email or password",
        };
      }

      // Platform admin doesn't belong to restaurant
      if (
        user.role !== "platform_admin" &&
        !user.restaurant_id
      ) {
        return {
          success: false,
          data: null,
          error: "Restaurant assignment missing",
        };
      }

      const { password: _, ...userWithoutPassword } = user;

      return {
        success: true,
        data: {
          user: userWithoutPassword,
          token: `mock-token-${user.id}-${Date.now()}`,
        },
        error: null,
      };
    } catch (error) {
      console.error("Login error:", error);

      return {
        success: false,
        data: null,
        error: "Login failed. Please try again.",
      };
    }
  },

  // =========================
  // CURRENT USER
  // =========================
  async getCurrentUser(token) {
    try {
      await delay();

      if (!token || !token.startsWith("mock-token-")) {
        return {
          success: false,
          data: null,
          error: "Invalid token",
        };
      }

      const userId = Number(token.split("-")[2]);

      const response = await fetch(`${API_BASE_URL}/users`);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();

      const user = users.find((u) => u.id === userId);

      if (!user) {
        return {
          success: false,
          data: null,
          error: "User not found",
        };
      }

      const { password: _, ...userWithoutPassword } = user;

      return {
        success: true,
        data: userWithoutPassword,
        error: null,
      };
    } catch (error) {
      console.error("Get current user error:", error);

      return {
        success: false,
        data: null,
        error: "Failed to get user information",
      };
    }
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
    if (user.role === "platform_admin") {
      return true;
    }

    // Restaurant users only access their own restaurant
    return Number(user.restaurant_id) === Number(restaurantId);
  },

  // =========================
  // REDIRECTS
  // =========================
  getRestaurantRedirectPath(user) {
    // Platform admin
    if (user.role === "platform_admin") {
      return "/platform/dashboard";
    }

    // Restaurant admin
    if (user.role === "restaurant_admin") {
      return `/Restaurant_admin/dashboard/${user.restaurant_id}`;
    }

    // Waiter
    if (user.role === "waiter") {
      return `/waiter/orders/${user.restaurant_id}`;
    }

    return "/";
  },

  // =========================
  // GET USER RESTAURANT
  // =========================
  async getRestaurantByUser(user) {
    try {
      if (
        user.role === "platform_admin" ||
        !user.restaurant_id
      ) {
        return null;
      }

      const response = await fetch(
        `${API_BASE_URL}/restaurants/${user.restaurant_id}`
      );

      if (!response.ok) {
        throw new Error("Restaurant not found");
      }

      return await response.json();
    } catch (error) {
      console.error("Restaurant fetch error:", error);
      return null;
    }
  },

  // =========================
  // LOGOUT
  // =========================
  async logout() {
    try {
      await delay();

      return {
        success: true,
        data: null,
        error: null,
      };
    } catch (error) {
      console.error("Logout error:", error);

      return {
        success: false,
        data: null,
        error: "Logout failed",
      };
    }
  },
};

export default authService;