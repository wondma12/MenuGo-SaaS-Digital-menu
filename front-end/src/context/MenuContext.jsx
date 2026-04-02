import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import menuService from '../services/menuService';

// Create Context
const MenuContext = createContext();

// Custom hook to use menu context
export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within MenuProvider');
  }
  return context;
};

// Provider Component - MAKE SURE THIS IS EXPORTED
export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  // Load initial data
  const loadMenuData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [itemsRes, categoriesRes, statsRes] = await Promise.all([
        menuService.getMenuItems(),
        menuService.getCategories(),
        menuService.getMenuStats()
      ]);
      
      if (itemsRes.success) {
        setMenuItems(itemsRes.data);
      } else {
        setError(itemsRes.error);
      }
      
      if (categoriesRes.success) {
        setCategories(categoriesRes.data);
      }
      
      if (statsRes.success) {
        setStats(statsRes.data);
      }
    } catch (err) {
      setError('Failed to load menu data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Reload data
  const reloadMenu = useCallback(() => {
    loadMenuData();
  }, [loadMenuData]);

  // Add menu item
  const addMenuItem = useCallback(async (itemData) => {
    setLoading(true);
    try {
      const response = await menuService.addMenuItem(itemData);
      if (response.success) {
        setMenuItems(prev => [response.data, ...prev]);
        const statsRes = await menuService.getMenuStats();
        if (statsRes.success) setStats(statsRes.data);
        return { success: true, data: response.data };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('Failed to add menu item');
      return { success: false, error: 'Failed to add menu item' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Update menu item
  const updateMenuItem = useCallback(async (id, updatedData) => {
    setLoading(true);
    try {
      const response = await menuService.updateMenuItem(id, updatedData);
      if (response.success) {
        setMenuItems(prev => prev.map(item => 
          item.id === parseInt(id) ? response.data : item
        ));
        const statsRes = await menuService.getMenuStats();
        if (statsRes.success) setStats(statsRes.data);
        return { success: true, data: response.data };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('Failed to update menu item');
      return { success: false, error: 'Failed to update menu item' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete menu item
  const deleteMenuItem = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await menuService.deleteMenuItem(id);
      if (response.success) {
        setMenuItems(prev => prev.filter(item => item.id !== parseInt(id)));
        const statsRes = await menuService.getMenuStats();
        if (statsRes.success) setStats(statsRes.data);
        return { success: true };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('Failed to delete menu item');
      return { success: false, error: 'Failed to delete menu item' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Update availability
  const updateAvailability = useCallback(async (id, isAvailable) => {
    try {
      const response = await menuService.updateAvailability(id, isAvailable);
      if (response.success) {
        setMenuItems(prev => prev.map(item => 
          item.id === parseInt(id) ? response.data : item
        ));
        const statsRes = await menuService.getMenuStats();
        if (statsRes.success) setStats(statsRes.data);
        return { success: true };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('Failed to update availability');
      return { success: false, error: 'Failed to update availability' };
    }
  }, []);

  // Bulk update availability
  const bulkUpdateAvailability = useCallback(async (ids, isAvailable) => {
    setLoading(true);
    try {
      const response = await menuService.bulkUpdateAvailability(ids, isAvailable);
      if (response.success) {
        setMenuItems(response.data);
        const statsRes = await menuService.getMenuStats();
        if (statsRes.success) setStats(statsRes.data);
        return { success: true };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('Failed to update availability');
      return { success: false, error: 'Failed to update availability' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Update categories
  const updateCategories = useCallback(async (newCategories) => {
    setLoading(true);
    try {
      const response = await menuService.updateCategories(newCategories);
      if (response.success) {
        setCategories(response.data);
        const itemsRes = await menuService.getMenuItems();
        if (itemsRes.success) setMenuItems(itemsRes.data);
        return { success: true };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('Failed to update categories');
      return { success: false, error: 'Failed to update categories' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Add category
  const addCategory = useCallback(async (categoryName) => {
    try {
      const response = await menuService.addCategory(categoryName);
      if (response.success) {
        setCategories(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('Failed to add category');
      return { success: false, error: 'Failed to add category' };
    }
  }, []);

  // Delete category
  const deleteCategory = useCallback(async (categoryName, fallbackCategory = 'Food') => {
    setLoading(true);
    try {
      const response = await menuService.deleteCategory(categoryName, fallbackCategory);
      if (response.success) {
        setCategories(response.data);
        const itemsRes = await menuService.getMenuItems();
        if (itemsRes.success) setMenuItems(itemsRes.data);
        return { success: true };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('Failed to delete category');
      return { success: false, error: 'Failed to delete category' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Search items
  const searchItems = useCallback(async (query) => {
    if (!query) {
      loadMenuData();
      return;
    }
    
    setLoading(true);
    try {
      const response = await menuService.searchMenuItems(query);
      if (response.success) {
        setMenuItems(response.data);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Failed to search menu items');
    } finally {
      setLoading(false);
    }
  }, [loadMenuData]);

  // Get item by ID
  const getMenuItemById = useCallback((id) => {
    return menuItems.find(item => item.id === parseInt(id));
  }, [menuItems]);

  // Get items by category
  const getItemsByCategory = useCallback((category) => {
    return menuItems.filter(item => item.category === category);
  }, [menuItems]);

  // Get available items
  const getAvailableItems = useCallback(() => {
    return menuItems.filter(item => item.isAvailable);
  }, [menuItems]);

  // Reset to mock data
  const resetToMockData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await menuService.resetToMockData();
      if (response.success) {
        await loadMenuData();
        return { success: true };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('Failed to reset data');
      return { success: false, error: 'Failed to reset data' };
    } finally {
      setLoading(false);
    }
  }, [loadMenuData]);

  // Load data on mount
  useEffect(() => {
    loadMenuData();
  }, [loadMenuData]);

  // Context value
  const value = {
    // State
    menuItems,
    categories,
    loading,
    error,
    stats,
    
    // Actions
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    updateAvailability,
    bulkUpdateAvailability,
    updateCategories,
    addCategory,
    deleteCategory,
    searchItems,
    getMenuItemById,
    getItemsByCategory,
    getAvailableItems,
    reloadMenu,
    resetToMockData
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};

// Also export the context itself if needed
export default MenuContext;