import { API_BASE_URL } from "../env";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const menuService = {
  async getMenuItems() {
    try {
      await delay();
      const response = await fetch(`${API_BASE_URL}/menuItems`);
      const items = await response.json();
      return { success: true, data: items, error: null };
    } catch (error) {
      console.error("Error fetching menu items:", error);
      return {
        success: false,
        data: null,
        error: "Failed to fetch menu items",
      };
    }
  },

  async getCategories() {
    try {
      await delay();
      const response = await fetch(`${API_BASE_URL}/categories`);
      const categories = await response.json();
      return { success: true, data: categories, error: null };
    } catch (error) {
      console.error("Error fetching categories:", error);
      return {
        success: false,
        data: null,
        error: "Failed to fetch categories",
      };
    }
  },

  async createMenuItem(itemData) {
    try {
      await delay();
      const newItem = {
        ...itemData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const response = await fetch(`${API_BASE_URL}/menuItems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      const createdItem = await response.json();
      return { success: true, data: createdItem, error: null };
    } catch (error) {
      console.error("Error creating menu item:", error);
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
      const updatedItem = {
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };
      const response = await fetch(`${API_BASE_URL}/menuItems/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });
      if (!response.ok) {
        return { success: false, data: null, error: "Menu item not found" };
      }
      const result = await response.json();
      return { success: true, data: result, error: null };
    } catch (error) {
      console.error("Error updating menu item:", error);
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
      const response = await fetch(`${API_BASE_URL}/menuItems/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        return { success: false, data: null, error: "Menu item not found" };
      }
      return { success: true, data: { id }, error: null };
    } catch (error) {
      console.error("Error deleting menu item:", error);
      return {
        success: false,
        data: null,
        error: "Failed to delete menu item",
      };
    }
  },

  async updateAvailability(id, isAvailable) {
    try {
      await delay();
      const updatedItem = {
        isAvailable,
        updatedAt: new Date().toISOString(),
      };
      const response = await fetch(`${API_BASE_URL}/menuItems/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });
      if (!response.ok) {
        return { success: false, data: null, error: "Menu item not found" };
      }
      const result = await response.json();
      return { success: true, data: result, error: null };
    } catch (error) {
      console.error("Error updating availability:", error);
      return {
        success: false,
        data: null,
        error: "Failed to update availability",
      };
    }
  },

  async addCategory(categoryName) {
    try {
      await delay();
      const response = await fetch(`${API_BASE_URL}/categories`);
      const categories = await response.json();
      if (categories.includes(categoryName)) {
        return { success: false, data: null, error: "Category already exists" };
      }
      const updatedCategories = [...categories, categoryName];
      const updateResponse = await fetch(`${API_BASE_URL}/categories`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategories),
      });
      const result = await updateResponse.json();
      return { success: true, data: result, error: null };
    } catch (error) {
      console.error("Error adding category:", error);
      return { success: false, data: null, error: "Failed to add category" };
    }
  },

  async deleteCategory(categoryName) {
    try {
      await delay();
      const response = await fetch(`${API_BASE_URL}/categories`);
      const categories = await response.json();
      const updatedCategories = categories.filter(
        (cat) => cat !== categoryName,
      );
      const updateResponse = await fetch(`${API_BASE_URL}/categories`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategories),
      });
      const result = await updateResponse.json();
      return { success: true, data: result, error: null };
    } catch (error) {
      console.error("Error deleting category:", error);
      return { success: false, data: null, error: "Failed to delete category" };
    }
  },
};

export default menuService;
