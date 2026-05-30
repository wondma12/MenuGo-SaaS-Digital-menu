import { API_BASE_URL } from "../env";

const delay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const customerAuth = {
  // =========================================
  // GET RESTAURANT BY ID
  // =========================================
  async getRestaurantById(restaurantId) {
    try {
      await delay();

      const response = await fetch(
        `${API_BASE_URL}/restaurants/${restaurantId}`,
      );

      if (!response.ok) {
        return {
          success: false,
          data: null,
          error: "Restaurant not found",
        };
      }

      const restaurant = await response.json();

      return {
        success: true,
        data: restaurant,
        error: null,
      };
    } catch (error) {
      console.error("Get restaurant error:", error);

      return {
        success: false,
        data: null,
        error: "Failed to fetch restaurant",
      };
    }
  },

  // =========================================
  // GET RESTAURANT MENU
  // =========================================
  async getRestaurantMenu(restaurantId) {
    try {
      await delay();

      const [
        restaurantResponse,
        categoriesResponse,
        menuItemsResponse,
      ] = await Promise.all([
        fetch(`${API_BASE_URL}/restaurants/${restaurantId}`),

        fetch(
          `${API_BASE_URL}/categories?restaurant_id=${restaurantId}`,
        ),

        fetch(`${API_BASE_URL}/menu_items`),
      ]);

      // Restaurant validation
      if (!restaurantResponse.ok) {
        return {
          success: false,
          data: null,
          error: "Restaurant not found",
        };
      }

      const restaurant = await restaurantResponse.json();

      const categories = await categoriesResponse.json();

      const menuItems = await menuItemsResponse.json();

      // Get category IDs
      const categoryIds = categories.map((cat) => cat.id);

      // Filter menu items belonging to restaurant categories
      const restaurantMenuItems = menuItems.filter((item) =>
        categoryIds.includes(item.category_id),
      );

      // Group menu items by category
      const menuWithCategories = categories.map((category) => ({
        ...category,

        items: restaurantMenuItems.filter(
          (item) => item.category_id === category.id,
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

  // =========================================
  // GET RESTAURANT LOCATION
  // =========================================
  async getRestaurantLocation(restaurantId) {
    try {
      await delay();

      const response = await fetch(
        `${API_BASE_URL}/restaurant_locations?restaurant_id=${restaurantId}`,
      );

      const locations = await response.json();

      const location = locations[0];

      if (location) {
        return {
          success: true,
          data: location,
          error: null,
        };
      }

      return {
        success: false,
        data: null,
        error: "Restaurant location not found",
      };
    } catch (error) {
      console.error("Get restaurant location error:", error);

      return {
        success: false,
        data: null,
        error: "Failed to fetch restaurant location",
      };
    }
  },

  // =========================================
  // CHECK CUSTOMER ACCESS
  // =========================================
  async canAccessRestaurant(restaurantId) {
    try {
      const result = await this.getRestaurantById(restaurantId);

      return (
        result.success &&
        result.data.status === "active"
      );
    } catch (error) {
      console.error("Restaurant access error:", error);
      return false;
    }
  },

  // =========================================
  // GET RESTAURANT SETTINGS
  // =========================================
  async getRestaurantSettings(restaurantId) {
    try {
      await delay();

      const response = await fetch(
        `${API_BASE_URL}/restaurant_settings?restaurant_id=${restaurantId}`,
      );

      const settings = await response.json();

      const restaurantSettings = settings[0];

      // Default fallback settings
      if (!restaurantSettings) {
        return {
          success: true,

          data: {
            restaurant_id: restaurantId,

            currency: "ETB",

            language: "en",

            allow_online_orders: true,

            service_charge: 10,

            tax_percentage: 15,
          },

          error: null,
        };
      }

      return {
        success: true,
        data: restaurantSettings,
        error: null,
      };
    } catch (error) {
      console.error("Get restaurant settings error:", error);

      return {
        success: false,
        data: null,
        error: "Failed to fetch restaurant settings",
      };
    }
  },

  // =========================================
  // CHECK ORDER AVAILABILITY
  // =========================================
  async isRestaurantAcceptingOrders(restaurantId) {
    try {
      const restaurantResult =
        await this.getRestaurantById(restaurantId);

      if (!restaurantResult.success) {
        return false;
      }

      // Restaurant must be active
      if (restaurantResult.data.status !== "active") {
        return false;
      }

      const settingsResult =
        await this.getRestaurantSettings(restaurantId);

      if (!settingsResult.success) {
        return false;
      }

      return settingsResult.data.allow_online_orders;
    } catch (error) {
      console.error("Check restaurant orders error:", error);

      return false;
    }
  },
};

export default customerAuth;