import { API_BASE_URL } from "../env";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const customerAuth = {
  // Get restaurant by ID for customer isolation
  async getRestaurantById(restaurantId) {
    try {
      await delay();

      const response = await fetch(`${API_BASE_URL}/restaurants`);
      const restaurants = await response.json();

      const restaurant = restaurants.find((r) => r.id === restaurantId);

      if (restaurant) {
        return {
          success: true,
          data: restaurant,
          error: null,
        };
      } else {
        return {
          success: false,
          data: null,
          error: "Restaurant not found",
        };
      }
    } catch (error) {
      console.error("Get restaurant error:", error);
      return {
        success: false,
        data: null,
        error: "Failed to fetch restaurant",
      };
    }
  },

  // Get restaurant menu items for specific restaurant
  async getRestaurantMenu(restaurantId) {
    try {
      await delay();

      const [restaurantsResponse, menuItemsResponse, categoriesResponse] =
        await Promise.all([
          fetch(`${API_BASE_URL}/restaurants`),
          fetch(`${API_BASE_URL}/menuItems`),
          fetch(`${API_BASE_URL}/categories`),
        ]);

      const restaurants = await restaurantsResponse.json();
      const menuItems = await menuItemsResponse.json();
      const categories = await categoriesResponse.json();

      // Verify restaurant exists
      const restaurant = restaurants.find((r) => r.id === restaurantId);
      if (!restaurant) {
        return {
          success: false,
          data: null,
          error: "Restaurant not found",
        };
      }

      // Filter menu items and categories for this restaurant
      const restaurantMenuItems = menuItems.filter(
        (item) => item.restaurantId === restaurantId,
      );
      const restaurantCategories = categories.filter(
        (cat) => cat.restaurantId === restaurantId,
      );

      // Group menu items by category
      const menuWithCategories = restaurantCategories.map((category) => ({
        ...category,
        items: restaurantMenuItems.filter(
          (item) => item.categoryId === category.id,
        ),
      }));

      return {
        success: true,
        data: {
          restaurant,
          categories: menuWithCategories,
          allItems: restaurantMenuItems,
        },
        error: null,
      };
    } catch (error) {
      console.error("Get restaurant menu error:", error);
      return {
        success: false,
        data: null,
        error: "Failed to fetch restaurant menu",
      };
    }
  },

  // Get restaurant location for specific restaurant
  async getRestaurantLocation(restaurantId) {
    try {
      await delay();

      const response = await fetch(`${API_BASE_URL}/restaurantLocations`);
      const locations = await response.json();

      const location = locations.find(
        (loc) => loc.restaurantId === restaurantId,
      );

      if (location) {
        return {
          success: true,
          data: location,
          error: null,
        };
      } else {
        return {
          success: false,
          data: null,
          error: "Restaurant location not found",
        };
      }
    } catch (error) {
      console.error("Get restaurant location error:", error);
      return {
        success: false,
        data: null,
        error: "Failed to fetch restaurant location",
      };
    }
  },

  // Validate restaurant access for customer
  canAccessRestaurant(restaurantId) {
    // Customers can access any active restaurant
    return this.getRestaurantById(restaurantId).then((result) => {
      return result.success && result.data.status === "active";
    });
  },

  // Get restaurant settings for customer view
  async getRestaurantSettings(restaurantId) {
    try {
      await delay();

      const response = await fetch(`${API_BASE_URL}/restaurantSettings`);
      const settings = await response.json();

      const restaurantSettings = settings.find(
        (setting) => setting.restaurantId === restaurantId,
      );

      if (restaurantSettings) {
        return {
          success: true,
          data: restaurantSettings,
          error: null,
        };
      } else {
        // Return default settings if none found
        return {
          success: true,
          data: {
            currency: "ETB",
            language: "en",
            theme: "light",
            taxPercentage: 15,
            serviceCharge: 10,
            allowOnlineOrders: true,
          },
          error: null,
        };
      }
    } catch (error) {
      console.error("Get restaurant settings error:", error);
      return {
        success: false,
        data: null,
        error: "Failed to fetch restaurant settings",
      };
    }
  },

  // Check if restaurant is accepting orders
  async isRestaurantAcceptingOrders(restaurantId) {
    try {
      const result = await this.getRestaurantById(restaurantId);
      if (result.success) {
        const settingsResult = await this.getRestaurantSettings(restaurantId);
        return settingsResult.success && settingsResult.data.allowOnlineOrders;
      }
      return false;
    } catch (error) {
      console.error("Check restaurant orders error:", error);
      return false;
    }
  },
};

export default customerAuth;
