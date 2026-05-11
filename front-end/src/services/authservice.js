import { API_BASE_URL } from "../env";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const authService = {
  async login(email, password) {
    try {
      await delay();

      const response = await fetch(`${API_BASE_URL}/users`);
      const users = await response.json();

      const user = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (user) {
        const { password: _, ...userWithoutPassword } = user;

        return {
          success: true,
          data: {
            user: userWithoutPassword,
            token: `mock-token-${user.id}-${Date.now()}`,
          },
          error: null,
        };
      } else {
        return {
          success: false,
          data: null,
          error: "Invalid email or password",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        data: null,
        error: "Login failed. Please try again.",
      };
    }
  },

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

      const userId = parseInt(token.split("-")[2]);

      const response = await fetch(`${API_BASE_URL}/users`);
      const users = await response.json();

      const user = users.find((u) => u.id === userId);

      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        return {
          success: true,
          data: userWithoutPassword,
          error: null,
        };
      } else {
        return {
          success: false,
          data: null,
          error: "User not found",
        };
      }
    } catch (error) {
      console.error("Get current user error:", error);
      return {
        success: false,
        data: null,
        error: "Failed to get user information",
      };
    }
  },

  hasRole(userRole, requiredRole) {
    const roleHierarchy = {
      platform_admin: 3,
      restaurant_admin: 2,
      waiter: 1,
    };

    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  },

  canAccessRestaurant(user, restaurantId) {
    if (user.role === "platform_admin") {
      return true;
    }

    if (user.role === "restaurant_admin" || user.role === "waiter") {
      return user.restaurantId === restaurantId;
    }

    return false;
  },

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
