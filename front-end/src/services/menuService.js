

import { mockMenuItems, mockCategories } from '../utils/mockMenuData';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Storage keys for localStorage persistence
const STORAGE_KEYS = {
  MENU_ITEMS: 'menugo_menu_items',
  CATEGORIES: 'menugo_categories'
};

// Initialize localStorage with mock data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.MENU_ITEMS)) {
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(mockMenuItems));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(mockCategories));
  }
};

// Get data from localStorage
const getStoredMenuItems = () => {
  initializeStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.MENU_ITEMS));
};

const getStoredCategories = () => {
  initializeStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES));
};

// Save data to localStorage
const saveStoredMenuItems = (items) => {
  localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
};

const saveStoredCategories = (categories) => {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
};

// Menu Service Object
const menuService = {
  // Get all menu items
  async getMenuItems() {
    try {
      await delay();
      const items = getStoredMenuItems();
      return { success: true, data: items, error: null };
    } catch (error) {
      console.error('Error fetching menu items:', error);
      return { success: false, data: null, error: 'Failed to fetch menu items' };
    }
  },

  // Get single menu item by ID
  async getMenuItemById(id) {
    try {
      await delay();
      const items = getStoredMenuItems();
      const item = items.find(item => item.id === parseInt(id));
      if (!item) {
        return { success: false, data: null, error: 'Menu item not found' };
      }
      return { success: true, data: item, error: null };
    } catch (error) {
      console.error('Error fetching menu item:', error);
      return { success: false, data: null, error: 'Failed to fetch menu item' };
    }
  },

  // Add new menu item
  async addMenuItem(itemData) {
    try {
      await delay();
      const items = getStoredMenuItems();
      
      const newItem = {
        id: Date.now(),
        ...itemData,
        orderCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const updatedItems = [newItem, ...items];
      saveStoredMenuItems(updatedItems);
      
      return { success: true, data: newItem, error: null };
    } catch (error) {
      console.error('Error adding menu item:', error);
      return { success: false, data: null, error: 'Failed to add menu item' };
    }
  },

  // Update menu item
  async updateMenuItem(id, updatedData) {
    try {
      await delay();
      const items = getStoredMenuItems();
      const index = items.findIndex(item => item.id === parseInt(id));
      
      if (index === -1) {
        return { success: false, data: null, error: 'Menu item not found' };
      }
      
      const updatedItem = {
        ...items[index],
        ...updatedData,
        updatedAt: new Date().toISOString()
      };
      
      items[index] = updatedItem;
      saveStoredMenuItems(items);
      
      return { success: true, data: updatedItem, error: null };
    } catch (error) {
      console.error('Error updating menu item:', error);
      return { success: false, data: null, error: 'Failed to update menu item' };
    }
  },

  // Delete menu item
  async deleteMenuItem(id) {
    try {
      await delay();
      const items = getStoredMenuItems();
      const filteredItems = items.filter(item => item.id !== parseInt(id));
      
      if (filteredItems.length === items.length) {
        return { success: false, data: null, error: 'Menu item not found' };
      }
      
      saveStoredMenuItems(filteredItems);
      return { success: true, data: { id: parseInt(id) }, error: null };
    } catch (error) {
      console.error('Error deleting menu item:', error);
      return { success: false, data: null, error: 'Failed to delete menu item' };
    }
  },

  // Update item availability
  async updateAvailability(id, isAvailable) {
    try {
      await delay();
      const items = getStoredMenuItems();
      const index = items.findIndex(item => item.id === parseInt(id));
      
      if (index === -1) {
        return { success: false, data: null, error: 'Menu item not found' };
      }
      
      items[index].isAvailable = isAvailable;
      items[index].updatedAt = new Date().toISOString();
      saveStoredMenuItems(items);
      
      return { success: true, data: items[index], error: null };
    } catch (error) {
      console.error('Error updating availability:', error);
      return { success: false, data: null, error: 'Failed to update availability' };
    }
  },

  // Bulk update availability
  async bulkUpdateAvailability(ids, isAvailable) {
    try {
      await delay();
      const items = getStoredMenuItems();
      const updatedItems = items.map(item => {
        if (ids.includes(item.id)) {
          return { ...item, isAvailable, updatedAt: new Date().toISOString() };
        }
        return item;
      });
      
      saveStoredMenuItems(updatedItems);
      return { success: true, data: updatedItems, error: null };
    } catch (error) {
      console.error('Error bulk updating availability:', error);
      return { success: false, data: null, error: 'Failed to update availability' };
    }
  },

  // Get all categories
  async getCategories() {
    try {
      await delay();
      const categories = getStoredCategories();
      return { success: true, data: categories, error: null };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { success: false, data: null, error: 'Failed to fetch categories' };
    }
  },

  // Add new category
  async addCategory(categoryName) {
    try {
      await delay();
      const categories = getStoredCategories();
      
      if (categories.includes(categoryName)) {
        return { success: false, data: null, error: 'Category already exists' };
      }
      
      const updatedCategories = [...categories, categoryName];
      saveStoredCategories(updatedCategories);
      
      return { success: true, data: updatedCategories, error: null };
    } catch (error) {
      console.error('Error adding category:', error);
      return { success: false, data: null, error: 'Failed to add category' };
    }
  },

  // Update category
  async updateCategory(oldName, newName) {
    try {
      await delay();
      const categories = getStoredCategories();
      const index = categories.indexOf(oldName);
      
      if (index === -1) {
        return { success: false, data: null, error: 'Category not found' };
      }
      
      // Update categories list
      categories[index] = newName;
      saveStoredCategories(categories);
      
      // Update all menu items with this category
      const items = getStoredMenuItems();
      const updatedItems = items.map(item => {
        if (item.category === oldName) {
          return { ...item, category: newName, updatedAt: new Date().toISOString() };
        }
        return item;
      });
      saveStoredMenuItems(updatedItems);
      
      return { success: true, data: categories, error: null };
    } catch (error) {
      console.error('Error updating category:', error);
      return { success: false, data: null, error: 'Failed to update category' };
    }
  },

  // Delete category
  async deleteCategory(categoryName, fallbackCategory = 'Food') {
    try {
      await delay();
      const categories = getStoredCategories();
      const filteredCategories = categories.filter(cat => cat !== categoryName);
      
      if (filteredCategories.length === categories.length) {
        return { success: false, data: null, error: 'Category not found' };
      }
      
      saveStoredCategories(filteredCategories);
      
      // Update items that had this category
      const items = getStoredMenuItems();
      const updatedItems = items.map(item => {
        if (item.category === categoryName) {
          return { ...item, category: fallbackCategory, updatedAt: new Date().toISOString() };
        }
        return item;
      });
      saveStoredMenuItems(updatedItems);
      
      return { success: true, data: filteredCategories, error: null };
    } catch (error) {
      console.error('Error deleting category:', error);
      return { success: false, data: null, error: 'Failed to delete category' };
    }
  },

  // Update all categories (bulk)
  async updateCategories(categories) {
    try {
      await delay();
      saveStoredCategories(categories);
      return { success: true, data: categories, error: null };
    } catch (error) {
      console.error('Error updating categories:', error);
      return { success: false, data: null, error: 'Failed to update categories' };
    }
  },

  // Search menu items
  async searchMenuItems(query) {
    try {
      await delay(300);
      const items = getStoredMenuItems();
      const lowerQuery = query.toLowerCase();
      const filtered = items.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
      );
      return { success: true, data: filtered, error: null };
    } catch (error) {
      console.error('Error searching menu items:', error);
      return { success: false, data: null, error: 'Failed to search menu items' };
    }
  },

  // Get menu statistics
  async getMenuStats() {
    try {
      await delay();
      const items = getStoredMenuItems();
      const categories = getStoredCategories();
      
      const totalItems = items.length;
      const availableItems = items.filter(item => item.isAvailable).length;
      const popularItems = items.filter(item => item.isPopular).length;
      const totalRevenue = items.reduce((sum, item) => sum + (item.price * (item.orderCount || 0)), 0);
      
      return {
        success: true,
        data: {
          totalItems,
          availableItems,
          unavailableItems: totalItems - availableItems,
          popularItems,
          totalCategories: categories.length,
          totalRevenue,
          averagePrice: totalItems > 0 ? (items.reduce((sum, item) => sum + item.price, 0) / totalItems).toFixed(2) : 0
        },
        error: null
      };
    } catch (error) {
      console.error('Error getting menu stats:', error);
      return { success: false, data: null, error: 'Failed to get menu statistics' };
    }
  },

  // Clear all data (reset to mock)
  async resetToMockData() {
    try {
      await delay();
      localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(mockMenuItems));
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(mockCategories));
      return { success: true, data: null, error: null };
    } catch (error) {
      console.error('Error resetting data:', error);
      return { success: false, data: null, error: 'Failed to reset data' };
    }
  }
};

export default menuService;