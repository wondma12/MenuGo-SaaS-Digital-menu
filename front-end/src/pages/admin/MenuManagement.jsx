import React, { useState } from "react";
import MenuItemList from "../../components/admin/menu/MenuItemList";
import MenuForm from "../../components/admin/menu/MenuForm";
import CategoryManager from "../../components/admin/menu/CategoryManager";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { Plus } from "lucide-react";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([
    { 
      id: 1, 
      name: "Margherita Pizza", 
      description: "Fresh tomatoes, fresh mozzarella, fresh basil", 
      price: 15.99, 
      category: "pizza", 
      available: true, 
      image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300&h=200&fit=crop"
    },
    { 
      id: 2, 
      name: "Caesar Salad", 
      description: "Romaine lettuce, parmesan cheese, croutons, caesar dressing", 
      price: 8.99, 
      category: "salad", 
      available: true, 
      image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=300&h=200&fit=crop"
    },
    { 
      id: 3, 
      name: "Pasta Carbonara", 
      description: "Spaghetti, eggs, pecorino cheese, pancetta, black pepper", 
      price: 18.99, 
      category: "pasta", 
      available: true, 
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=300&h=200&fit=crop"
    },
    { 
      id: 4, 
      name: "Garlic Bread", 
      description: "Toasted bread with garlic butter and parsley", 
      price: 4.99, 
      category: "appetizer", 
      available: true, 
      image: ""
    },
    { 
      id: 5, 
      name: "Tiramisu", 
      description: "Classic Italian dessert with coffee and mascarpone", 
      price: 6.99, 
      category: "dessert", 
      available: false, 
      image: ""
    },
  ]);

  const [categories, setCategories] = useState([
    { value: "pizza", label: "Pizza" },
    { value: "salad", label: "Salad" },
    { value: "pasta", label: "Pasta" },
    { value: "appetizer", label: "Appetizer" },
    { value: "dessert", label: "Dessert" },
    { value: "drinks", label: "Drinks" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  // Menu Item CRUD Operations
  const handleAddItem = (item) => {
    const newItem = { 
      ...item, 
      id: Date.now(), 
      available: true 
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
    if (window.confirm("Are you sure you want to delete this item?")) {
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
    if (window.confirm(`Delete category? Items with this category will be moved to "Uncategorized".`)) {
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
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600 mt-1">Manage your restaurant's menu items and categories</p>
        </div>
        <div className="flex gap-3">
          <Button 
            label="Manage Categories" 
            variant="secondary" 
            onClick={() => setShowCategoryManager(true)}
          />
          <Button 
            label="Add New Item" 
            variant="primary" 
            onClick={openAddModal}
            icon={Plus}
          />
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
          onAddCategory={handleAddCategory}
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      </Modal>
    </div>
  );
};

export default MenuManagement;