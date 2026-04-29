const STORAGE_KEYS = {
  MENU_ITEMS: "menugo_menu_items",
  CATEGORIES: "menugo_menu_categories",
};

const initialMenuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with fresh tomatoes, mozzarella, and basil.",
    price: 14.99,
    category: "Food",
    image: "",
    isAvailable: true,
    isPopular: true,
    calories: 780,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Avocado Salad",
    description:
      "Fresh avocado, mixed greens, cherry tomatoes, and citrus dressing.",
    price: 10.5,
    category: "Food",
    image: "",
    isAvailable: true,
    isPopular: false,
    calories: 420,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with a gooey center and vanilla ice cream.",
    price: 8.99,
    category: "Desserts",
    image: "",
    isAvailable: false,
    isPopular: true,
    calories: 620,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const initialCategories = ["Food", "Drinks", "Desserts", "Appetizers"];

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.MENU_ITEMS)) {
    localStorage.setItem(
      STORAGE_KEYS.MENU_ITEMS,
      JSON.stringify(initialMenuItems),
    );
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(
      STORAGE_KEYS.CATEGORIES,
      JSON.stringify(initialCategories),
    );
  }
};

const getStoredMenuItems = () => {
  initializeStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.MENU_ITEMS));
};

const getStoredCategories = () => {
  initializeStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES));
};

const saveStoredMenuItems = (items) => {
  localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
};

const saveStoredCategories = (categories) => {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
};

const menuService = {
  async getMenuItems() {
    try {
      await delay();
      const items = getStoredMenuItems();
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
      const categories = getStoredCategories();
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
      const items = getStoredMenuItems();
      const newItem = {
        id: Date.now(),
        ...itemData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedItems = [newItem, ...items];
      saveStoredMenuItems(updatedItems);
      return { success: true, data: newItem, error: null };
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
      const items = getStoredMenuItems();
      const index = items.findIndex((item) => item.id === id);
      if (index === -1) {
        return { success: false, data: null, error: "Menu item not found" };
      }
      const updatedItem = {
        ...items[index],
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };
      items[index] = updatedItem;
      saveStoredMenuItems(items);
      return { success: true, data: updatedItem, error: null };
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
      const items = getStoredMenuItems();
      const filteredItems = items.filter((item) => item.id !== id);
      saveStoredMenuItems(filteredItems);
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
      const items = getStoredMenuItems();
      const index = items.findIndex((item) => item.id === id);
      if (index === -1) {
        return { success: false, data: null, error: "Menu item not found" };
      }
      items[index].isAvailable = isAvailable;
      items[index].updatedAt = new Date().toISOString();
      saveStoredMenuItems(items);
      return { success: true, data: items[index], error: null };
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
      const categories = getStoredCategories();
      if (categories.includes(categoryName)) {
        return { success: false, data: null, error: "Category already exists" };
      }
      const updatedCategories = [...categories, categoryName];
      saveStoredCategories(updatedCategories);
      return { success: true, data: updatedCategories, error: null };
    } catch (error) {
      console.error("Error adding category:", error);
      return { success: false, data: null, error: "Failed to add category" };
    }
  },

  async deleteCategory(categoryName) {
    try {
      await delay();
      const categories = getStoredCategories();
      const updatedCategories = categories.filter(
        (cat) => cat !== categoryName,
      );
      saveStoredCategories(updatedCategories);
      return { success: true, data: updatedCategories, error: null };
    } catch (error) {
      console.error("Error deleting category:", error);
      return { success: false, data: null, error: "Failed to delete category" };
    }
  },
};

export default menuService;
