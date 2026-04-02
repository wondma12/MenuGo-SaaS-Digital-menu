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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  const stats = getMenuStats();

  const handleAddItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = (itemData) => {
    if (editingItem) {
      updateMenuItem(editingItem.id, itemData);
    } else {
      addMenuItem(itemData);
    }
    setIsModalOpen(false);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteMenuItem(id);
    }
  };

  const handleToggleAvailability = (id, currentStatus) => {
    updateAvailability(id, !currentStatus);
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            onClick={() => setShowCategoryManager(true)}
            variant="secondary"
          />
          <Button
            label="Add Menu Item"
            onClick={handleAddItem}
            variant="primary"
            icon={<Plus className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* Menu Items List */}
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-gray-500">Loading menu items...</div>
          </div>
        ) : filteredItems.length === 0 ? (
          <EmptyMenuState onAddItem={handleAddItem} />
        ) : (
          <MenuItemList
            items={filteredItems}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
            onToggleAvailability={handleToggleAvailability}
          />
        )}
      </Card>

      {/* Add/Edit Modal */}
      <MenuFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        editingItem={editingItem}
        categories={categories}
      />

      {/* Category Manager Modal */}
      {showCategoryManager && (
        <CategoryManager
          categories={categories}
          onClose={() => setShowCategoryManager(false)}
        />
      )}
    </div>
  );
};

export default MenuManagement;