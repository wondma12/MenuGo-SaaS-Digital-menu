import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
import Button from '../../components/ui/button';
import Card from '../../components/ui/card';
import Input from '../../components/ui/input';
import MenuItemList from '../../components/admin/menu/MenuItemList';
import MenuFormModal from '../../components/admin/menu/MenuFormModal';
import CategoryManager from '../../components/admin/menu/CategoryManager';
import MenuStatsBar from '../../components/admin/menu/MenuStatsBar';
import EmptyMenuState from '../../components/admin/menu/EmptyMenuState';
import { useMenu } from '../../hooks/useMenu';

const MenuManagement = () => {
  const { 
    menuItems, 
    categories, 
    loading, 
    addMenuItem, 
    updateMenuItem, 
    deleteMenuItem,
    updateAvailability,
    getMenuStats 
  } = useMenu();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  // Helper functions
  const getMenuStats = () => {
    const totalItems = menuItems.length;
    const availableItems = menuItems.filter(item => item.available).length;
    const totalCategories = categories.length;
    const popularItems = menuItems.filter(item => item.ordersCount && item.ordersCount > 50).length;
    
    return {
      totalItems,
      availableItems,
      totalCategories,
      popularItems
    };
  };

  const addMenuItem = (itemData) => {
    setLoading(true);
    setTimeout(() => {
      const newItem = {
        id: Date.now(),
        ...itemData,
        available: true,
        ordersCount: 0,
        createdAt: new Date().toISOString()
      };
      setMenuItems([...menuItems, newItem]);
      setLoading(false);
      alert('Menu item added successfully!');
    }, 500);
  };

  const updateMenuItem = (id, itemData) => {
    setLoading(true);
    setTimeout(() => {
      setMenuItems(menuItems.map(item => 
        item.id === id ? { ...item, ...itemData, updatedAt: new Date().toISOString() } : item
      ));
      setLoading(false);
      alert('Menu item updated successfully!');
    }, 500);
  };

  const deleteMenuItem = (id) => {
    setLoading(true);
    setTimeout(() => {
      setMenuItems(menuItems.filter(item => item.id !== id));
      setLoading(false);
      alert('Menu item deleted successfully!');
    }, 500);
  };

  const updateAvailability = (id, available) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, available } : item
    ));
  };

  const addCategory = (categoryName) => {
    if (!categories.includes(categoryName)) {
      setCategories([...categories, categoryName]);
      alert(`Category "${categoryName}" added successfully!`);
    }
  };

  const deleteCategory = (categoryName) => {
    const itemsInCategory = menuItems.filter(item => item.category === categoryName);
    if (itemsInCategory.length > 0) {
      alert(`Cannot delete category "${categoryName}" because it has ${itemsInCategory.length} menu item(s). Please reassign or delete these items first.`);
      return false;
    }
    setCategories(categories.filter(cat => cat !== categoryName));
    alert(`Category "${categoryName}" deleted successfully!`);
    return true;
  };

  // Statistics
  const stats = {
    totalItems: menuItems.length,
    availableItems: menuItems.filter(i => i.available).length,
    popularItems: menuItems.filter(i => i.isPopular).length,
    categories: categories.length,
    avgPrice: (menuItems.reduce((sum, i) => sum + i.price, 0) / menuItems.length).toFixed(2)
  };

  // Menu Item CRUD Operations
  const handleAddItem = (item) => {
    const newItem = { 
      ...item, 
      id: Date.now(), 
    };
    setMenuItems([...menuItems, newItem]);
    setIsModalOpen(false);
  };

  const handleEditItem = (item) => {
    setMenuItems(menuItems.map(i => i.id === item.id ? item : i));
    setEditingItem(null);
    setIsModalOpen(false);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item? This action cannot be undone.")) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  const handleToggleAvailability = (id) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  // Category CRUD Operations
  const handleAddCategory = (category) => {
    setCategories([...categories, category]);
  };

  const handleEditCategory = (oldValue, newCategory) => {
    setCategories(categories.map(cat => 
      cat.value === oldValue ? newCategory : cat
    ));
    // Update menu items with new category value
    setMenuItems(menuItems.map(item =>
      item.category === oldValue ? { ...item, category: newCategory.value } : item
    ));
  };

  const handleDeleteCategory = (categoryValue) => {
    if (window.confirm(`Delete "${categoryValue}" category? Items in this category will become "Uncategorized".`)) {
      setCategories(categories.filter(cat => cat.value !== categoryValue));
      // Move items to uncategorized
      setMenuItems(menuItems.map(item =>
        item.category === categoryValue ? { ...item, category: "uncategorized" } : item
      ));
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
        <p className="mt-2 text-gray-600">Manage your restaurant's menu items, categories, and availability</p>
      </div>

      {/* Stats Section */}
      <MenuStatsBar stats={stats} />

      {/* Actions Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-3">
          <Button 
            label="Manage Categories" 
            variant="secondary" 
            onClick={() => setShowCategoryManager(true)}
          />
          <Button
            label="Add Menu Item"
            onClick={handleAddItem}
            variant="primary"
            icon={<Plus className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
          <p className="text-xs text-gray-500">Total Items</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
          <p className="text-xs text-gray-500">Available</p>
          <p className="text-2xl font-bold text-green-600">{stats.availableItems}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-yellow-500">
          <p className="text-xs text-gray-500">Popular Items</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.popularItems}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-purple-500">
          <p className="text-xs text-gray-500">Categories</p>
          <p className="text-2xl font-bold text-purple-600">{stats.categories}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-orange-500">
          <p className="text-xs text-gray-500">Avg. Price</p>
          <p className="text-2xl font-bold text-orange-600">${stats.avgPrice}</p>
        </div>
      </div>

      {/* Menu Items List */}
      <MenuItemList
        items={menuItems}
        onEdit={openEditModal}
        onDelete={handleDeleteItem}
        onToggleAvailability={handleToggleAvailability}
        categories={categories}
      />

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
          <Package size={20} className="text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800">Menu Tips</p>
            <p className="text-xs text-blue-600 mt-1">
              Add high-quality images to increase order conversion by up to 40%
            </p>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 flex items-start gap-3">
          <TrendingUp size={20} className="text-green-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-800">Popular Items</p>
            <p className="text-xs text-green-600 mt-1">
              Mark your best-selling items as "Popular" to attract more customers
            </p>
          </div>
        </div>
      </div>

      {/* Add/Edit Item Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        title={editingItem ? "Edit Menu Item" : "Add New Menu Item"}
      >
        <MenuForm
          initialData={editingItem}
          onSubmit={editingItem ? handleEditItem : handleAddItem}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          categories={categories}
        />
      </Modal>

      {/* Category Manager Modal */}
      <Modal
        isOpen={showCategoryManager}
        onClose={() => setShowCategoryManager(false)}
        title="Manage Categories"
      >
        <CategoryManager
          categories={categories}
          onClose={() => setShowCategoryManager(false)}
        />
      </Modal>
    </div>
  );
};

export default MenuManagement;