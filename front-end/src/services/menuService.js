// services/menuService.js
import { menuAPI } from './api.js';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const menuService = {
  // ==========================================
  // MENU ITEMS
  // ==========================================

  async getMenuItems(params = {}) {
    try {
      const result = await menuAPI.getMenuItems(params);
      return {
        success: true,
        data: result.menuItems || result,
        error: null,
      };
    } catch (error) {
      console.error('Error fetching menu items:', error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to fetch menu items',
      };
    }
  },

  async getMenuItemsByCategory(categoryId) {
    try {
      const result = await menuAPI.getMenuItems({ category_id: categoryId });
      return {
        success: true,
        data: result.menuItems || result,
        error: null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        data: [],
        error: error.message || 'Failed to fetch category items',
      };
    }
  },

// services/menuService.js

// services/menuService.js

async createMenuItem(itemData) {
  try {
    const result = await menuAPI.createMenuItem({
      category_id: itemData.category_id,  
      name: itemData.name,
      description: itemData.description,
      price: itemData.price,
      image: itemData.imageUrl || null,
      status: itemData.available ? 'available' : 'unavailable',
      preparation_time: itemData.preparation_time || 15,
      is_featured: itemData.is_featured || false,
    });

    console.log('[menuService] createMenuItem result:', result);

    // ✅ Check if result exists
    if (!result) {
      return {
        success: false,
        data: null,
        error: 'No response from server'
      };
    }

    // ✅ If result has id (successful creation)
    if (result.id) {
      return {
        success: true,
        data: result,
      };
    }

    // ✅ If result has success property
    if (result.success === true) {
      return {
        success: true,
      data: result.data || result,
      };
    }

    // ✅ If result has data property
    if (result.data) {
      return {
        success: true,
        data: result.data,
      };
    }

    // ✅ Fallback - if we got here, assume success
    return {
      success: true,
      data: result,
    };

  } catch (error) {
    console.error("[menuService] Error creating menu item:", error);
    return {
      success: false,
      data: null,
      error: error.message || "Failed to create menu item"
    };
  }
},

async updateMenuItem(id, updatedData) {
  try {
    const result = await menuAPI.updateMenuItem(id, updatedData);
    console.log('[menuService] updateMenuItem result:', result);

    if (!result) {
      return {
        success: false,
        data: null,
        error: 'No response from server'
      };
    }

    if (result.id) {
      return {
        success: true,
        data: result,
      };
    }

    if (result.success === true) {
      return {
        success: true,
        data: result.data || result,
      };
    }

    if (result.data) {
      return {
        success: true,
        data: result.data,
      };
    }

    return {
      success: true,
      data: result,
    };

  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: null,
      error: error.message || 'Failed to update menu item',
    };
  }
},

async deleteMenuItem(id) {
  try {
    const result = await menuAPI.deleteMenuItem(id);
    console.log('[menuService] deleteMenuItem result:', result);

    if (!result) {
      return {
        success: false,
        data: null,
        error: 'No response from server'
      };
    }

    // If we got here, assume success
    return {
      success: true,
      data: { id },
    };

  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: null,
      error: error.message || 'Failed to delete menu item',
    };
  }
},

  async updateAvailability(id, status) {
    try {
      const result = await menuAPI.updateMenuItemStatus(id, status);
      return {
        success: true,
        data: result,
        error: null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to update availability',
      };
    }
  },

  // ==========================================
  // CATEGORIES
  // ==========================================

  async getCategories() {
    try {
      const result = await menuAPI.getCategories();
      return {
        success: true,
        data: result.categories || result,
        error: null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        data: [],
        error: error.message || 'Failed to fetch categories',
      };
    }
  },

  async getCategoriesByRestaurant(restaurantId) {
    try {
      // This would need a filter by restaurant
      const result = await menuAPI.getCategories();
      const categories = result.categories || result;
      // Filter by restaurant - this would be better handled server-side
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
        error: error.message || 'Failed to fetch restaurant categories',
      };
    }
  },

  async addCategory(categoryData) {
    try {
      const result = await menuAPI.createCategory(categoryData);
      return {
        success: true,
        data: result,
        error: null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to create category',
      };
    }
  },

  async updateCategory(id, data) {
    try {
      const result = await menuAPI.updateCategory(id, data);
      return {
        success: true,
        data: result,
        error: null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to update category',
      };
    }
  },

  async deleteCategory(id) {
    try {
      await menuAPI.deleteCategory(id);
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
        error: error.message || 'Failed to delete category',
      };
    }
  },

  // ==========================================
  // FEATURED & ORGANIZED MENU
  // ==========================================

  async getFeaturedItems(limit = 10) {
    try {
      const result = await menuAPI.getFeaturedItems(limit);
      return {
        success: true,
        data: result,
        error: null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        data: [],
        error: error.message || 'Failed to fetch featured items',
      };
    }
  },

  async getMenuByCategory() {
    try {
      const result = await menuAPI.getMenuByCategory();
      return {
        success: true,
        data: result,
        error: null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        data: [],
        error: error.message || 'Failed to fetch organized menu',
      };
    }
  },

  // ==========================================
  // PUBLIC MENU
  // ==========================================

  async getPublicMenu(restaurantId) {
    try {
      const result = await menuAPI.getPublicMenu(restaurantId);
      return {
        success: true,
        data: result,
        error: null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        data: null,
        error: error.message || 'Failed to fetch public menu',
      };
    }
  }
};

export default menuService;