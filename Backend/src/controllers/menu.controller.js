// Backend/src/controllers/menu.controller.js

import prisma from '../config/prisma.js';  // ✅ ADDED
import * as menuService from '../services/menu.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

// ============================================================
// CATEGORY CONTROLLERS
// ============================================================

export const createCategory = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const category = await menuService.createCategory(
      req.body,
      req.user.id,
      restaurantId
    );
    
    successResponse(res, 'Category created successfully', category, 201);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const { page = 1, limit = 50 } = req.query;
    const result = await menuService.getAllCategories(
      restaurantId,
      parseInt(page),
      parseInt(limit)
    );
    
    successResponse(res, 'Categories retrieved successfully', result);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const category = await menuService.getCategoryById(id, restaurantId);
    successResponse(res, 'Category retrieved successfully', category);
  } catch (error) {
    errorResponse(res, error.message, null, 404);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const category = await menuService.updateCategory(id, restaurantId, req.body);
    successResponse(res, 'Category updated successfully', category);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    await menuService.deleteCategory(id, restaurantId);
    successResponse(res, 'Category deleted successfully');
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

// ============================================================
// MENU ITEM CONTROLLERS
// ============================================================

export const createMenuItem = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const menuItem = await menuService.createMenuItem(
      req.body,
      req.user.id,
      restaurantId
    );
    
    successResponse(res, 'Menu item created successfully', menuItem, 201);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const getAllMenuItems = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const { page = 1, limit = 50, category_id, status, is_featured, search, min_price, max_price } = req.query;
    
    const filters = { category_id, status, is_featured, search, min_price, max_price };
    
    const result = await menuService.getAllMenuItems(
      restaurantId,
      filters,
      parseInt(page),
      parseInt(limit)
    );
    
    successResponse(res, 'Menu items retrieved successfully', result);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};

export const getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const menuItem = await menuService.getMenuItemById(id, restaurantId);
    successResponse(res, 'Menu item retrieved successfully', menuItem);
  } catch (error) {
    errorResponse(res, error.message, null, 404);
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const menuItem = await menuService.updateMenuItem(id, restaurantId, req.body);
    successResponse(res, 'Menu item updated successfully', menuItem);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    await menuService.deleteMenuItem(id, restaurantId);
    successResponse(res, 'Menu item deleted successfully');
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const updateMenuItemStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const menuItem = await menuService.updateMenuItemStatus(id, restaurantId, status);
    successResponse(res, 'Menu item status updated successfully', menuItem);
  } catch (error) {
    errorResponse(res, error.message, null, 400);
  }
};

export const getFeaturedItems = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const { limit = 10 } = req.query;
    const featuredItems = await menuService.getFeaturedItems(restaurantId, parseInt(limit));
    successResponse(res, 'Featured items retrieved successfully', featuredItems);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};

export const getMenuByCategory = async (req, res) => {
  try {
    const restaurantId = req.user.restaurant_id;
    
    if (!restaurantId) {
      return errorResponse(res, 'No restaurant associated with this user', null, 400);
    }

    const menu = await menuService.getMenuByCategory(restaurantId);
    successResponse(res, 'Menu retrieved successfully', menu);
  } catch (error) {
    errorResponse(res, error.message, null, 500);
  }
};

// ============================================================
// PUBLIC ENDPOINT - NO AUTHENTICATION REQUIRED
// ============================================================

export const getPublicMenu = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    
    if (!restaurantId) {
      return errorResponse(res, 'Restaurant ID is required', null, 400);
    }

    // ✅ Now prisma is defined because we imported it
    // Verify restaurant exists and is active
    const restaurant = await prisma.restaurants.findUnique({
      where: { id: restaurantId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        logo: true,
        banner: true,
        slogan: true,
        description: true,
        status: true,
        restaurant_location: {
          select: {
            country: true,
            city: true,
            sub_city: true,
            street_address: true,
            map_link: true
          }
        }
      }
    });

    if (!restaurant) {
      return errorResponse(res, 'Restaurant not found or inactive', null, 404);
    }

    // Get menu by category
    const menu = await menuService.getMenuByCategory(restaurantId);
    
    // Return restaurant info and menu
    successResponse(res, 'Menu retrieved successfully', { 
      restaurant, 
      categories: menu 
    });
  } catch (error) {
    console.error('[PublicMenu] Error:', error);
    errorResponse(res, error.message, null, 500);
  }
};