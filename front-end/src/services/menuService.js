import { API_BASE_URL } from "../env";

const delay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const menuService = {
  // ==========================================
  // MENU ITEMS
  // ==========================================

  async getMenuItems() {
    try {
      await delay();

      const response = await fetch(
        `${API_BASE_URL}/menu_items`,
      );

      const items = await response.json();

      return {
        success: true,
        data: items,
        error: null,
      };
    } catch (error) {
      console.error("Error fetching menu items:", error);

      return {
        success: false,
        data: null,
        error: "Failed to fetch menu items",
      };
    }
  },

  async getMenuItemsByCategory(categoryId) {
    try {
      await delay();

      const response = await fetch(
        `${API_BASE_URL}/menu_items?category_id=${categoryId}`,
      );

      const items = await response.json();

      return {
        success: true,
        data: items,
        error: null,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        data: [],
        error: "Failed to fetch category items",
      };
    }
  },

  async createMenuItem(itemData) {
    try {
      await delay();

      const newItem = {
        ...itemData,
        availability: true,
        created_at: new Date().toISOString(),
      };

      const response = await fetch(
        `${API_BASE_URL}/menu_items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        },
      );

      const item = await response.json();

      return {
        success: true,
        data: item,
        error: null,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        data: null,
        error: "Failed to create menu item",
      };
    }
  },

  async updateMenuItem(id, updatedData) {
    try {
      await delay();

      const response = await fetch(
        `${API_BASE_URL}/menu_items/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...updatedData,
            updated_at: new Date().toISOString(),
          }),
        },
      );

      if (!response.ok) {
        return {
          success: false,
          data: null,
          error: "Menu item not found",
        };
      }

      const item = await response.json();

      return {
        success: true,
        data: item,
        error: null,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        data: null,
        error: "Failed to update menu item",
      };
    }
  },

  async deleteMenuItem(id) {
    try {
      await delay();

      const response = await fetch(
        `${API_BASE_URL}/menu_items/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        return {
          success: false,
          data: null,
          error: "Menu item not found",
        };
      }

      return {
        success: true,
        data: { id },
        error: null,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        data: null,
        error: "Failed to delete menu item",
      };
    }
  },

  async updateAvailability(id, availability) {
    try {
      await delay();

      const response = await fetch(
        `${API_BASE_URL}/menu_items/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            availability,
          }),
        },
      );

      if (!response.ok) {
        return {
          success: false,
          data: null,
          error: "Menu item not found",
        };
      }

      const item = await response.json();

      return {
        success: true,
        data: item,
        error: null,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        data: null,
        error: "Failed to update availability",
      };
    }
  },

  // ==========================================
  // CATEGORIES
  // ==========================================

  async getCategories() {
    try {
      await delay();

      const response = await fetch(
        `${API_BASE_URL}/categories`,
      );

      const categories = await response.json();

      return {
        success: true,
        data: categories,
        error: null,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        data: [],
        error: "Failed to fetch categories",
      };
    }
  },

  async getCategoriesByRestaurant(restaurantId) {
    try {
      await delay();

      const response = await fetch(
        `${API_BASE_URL}/categories?restaurant_id=${restaurantId}`,
      );

      const categories = await response.json();

      return {
        success: true,
        data: categories,
        error: null,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        data: [],
        error: "Failed to fetch restaurant categories",
      };
    }
  },

  async addCategory(categoryData) {
    try {
      await delay();

      const response = await fetch(
        `${API_BASE_URL}/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...categoryData,
            created_at: new Date().toISOString(),
          }),
        },
      );

      const category = await response.json();

      return {
        success: true,
        data: category,
        error: null,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        data: null,
        error: "Failed to create category",
      };
    }
  },

  async updateCategory(id, data) {
    try {
      await delay();

      const response = await fetch(
        `${API_BASE_URL}/categories/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const category = await response.json();

      return {
        success: true,
        data: category,
        error: null,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        data: null,
        error: "Failed to update category",
      };
    }
  },

  async deleteCategory(id) {
    try {
      await delay();

      const response = await fetch(
        `${API_BASE_URL}/categories/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        return {
          success: false,
          data: null,
          error: "Category not found",
        };
      }

      return {
        success: true,
        data: { id },
        error: null,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        data: null,
        error: "Failed to delete category",
      };
    }
  },
};

export default menuService;