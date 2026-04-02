import { useState, useEffect, useCallback } from 'react';
import { mockMenuItems, mockCategories } from '../utils/mockMenuData';

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    loadMenuData();
  }, []);

  const loadMenuData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setMenuItems(mockMenuItems);
      setCategories(mockCategories);
    } catch (err) {
      setError('Failed to load menu data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add new menu item
  const addMenuItem = useCallback((newItem) => {
    const itemWithId = {
      ...newItem,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      orderCount: 0
    };
    setMenuItems(prev => [itemWithId, ...prev]);
    return itemWithId.id;
  }, []);

  // Update existing menu item
  const updateMenuItem = useCallback((id, updatedData) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedData, updatedAt: new Date().toISOString() } : item
    ));
  }, []);

  // Delete menu item
  const deleteMenuItem = useCallback((id) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  }, []);

  // Update availability
  const updateAvailability = useCallback((id, isAvailable) => {
    setMenuItems(prev => prev.map(item =>
      item.id === id ? { ...item, isAvailable } : item
    ));
  }, []);

  // Bulk update availability (e.g., mark all as available/unavailable)
  const bulkUpdateAvailability = useCallback((ids, isAvailable) => {
    setMenuItems(prev => prev.map(item =>
      ids.includes(item.id) ? { ...item, isAvailable } : item
    ));
  }, []);

  // Get menu item by ID
  const getMenuItemById = useCallback((id) => {
    return menuItems.find(item => item.id === id);
  }, [menuItems]);

  // Get items by category
  const getItemsByCategory = useCallback((category) => {
    return menuItems.filter(item => item.category === category);
  }, [menuItems]);

  // Get available items
  const getAvailableItems = useCallback(() => {
    return menuItems.filter(item => item.isAvailable);
  }, [menuItems]);

  // Update categories
  const updateCategories = useCallback((newCategories) => {
    setCategories(newCategories);
    // Also update any items that had deleted categories
    setMenuItems(prev => prev.map(item => {
      if (!newCategories.includes(item.category)) {
        return { ...item, category: newCategories[0] || 'Uncategorized' };
      }
      return item;
    }));
  }, []);

  // Get menu statistics
  const getMenuStats = useCallback(() => {
    const totalItems = menuItems.length;
    const availableItems = menuItems.filter(item => item.isAvailable).length;
    const unavailableItems = totalItems - availableItems;
    const popularCount = menuItems.filter(item => item.isPopular).length;
    const totalCategories = categories.length;
    
    // Get most popular items (based on orderCount or isPopular flag)
    const mostPopular = [...menuItems]
      .sort((a, b) => (b.orderCount || 0) - (a.orderCount || 0))
      .slice(0, 5);
    
    return {
      totalItems,
      availableItems,
      unavailableItems,
      popularCount,
      totalCategories,
      mostPopular,
      availabilityRate: totalItems > 0 ? (availableItems / totalItems * 100).toFixed(1) : 0
    };
  }, [menuItems, categories]);

  // Search items
  const searchItems = useCallback((query) => {
    if (!query) return menuItems;
    const lowerQuery = query.toLowerCase();
    return menuItems.filter(item => 
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
    );
  }, [menuItems]);

  return {
    menuItems,
    categories,
    loading,
    error,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    updateAvailability,
    bulkUpdateAvailability,
    getMenuItemById,
    getItemsByCategory,
    getAvailableItems,
    updateCategories,
    getMenuStats,
    searchItems,
    reloadMenu: loadMenuData
  };
};