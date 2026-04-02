import React, { useState, useRef } from 'react';

// Simple UI components inline
const Button = ({ label, onClick, variant, icon, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
      variant === 'primary' 
        ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300' 
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400'
    }`}
  >
    {icon && <span className="h-4 w-4">{icon}</span>}
    {label}
  </button>
);

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>
    {children}
  </div>
);

const Input = ({ placeholder, value, onChange, className, type = "text", accept }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    accept={accept}
    className={`border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 ${className}`}
  />
);

// Icons
const SearchIcon = () => (
  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const UploadIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const ImageIcon = () => (
  <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const CategoriesIcon = () => (
  <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

// Mock initial data with base64 images
const initialMenuItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella, basil',
    price: 12.99,
    category: 'Pizza',
    available: true,
    stock: 25,
    ordersCount: 120,
    image: null,
    imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=80&h=80&fit=crop'
  },
  {
    id: 2,
    name: 'Caesar Salad',
    description: 'Romaine lettuce, croutons, parmesan',
    price: 8.99,
    category: 'Salads',
    available: true,
    stock: 15,
    ordersCount: 85,
    image: null,
    imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54dd8ca?w=80&h=80&fit=crop'
  },
  {
    id: 3,
    name: 'Chicken Burger',
    description: 'Grilled chicken, lettuce, tomato, mayo',
    price: 10.99,
    category: 'Burgers',
    available: false,
    stock: 0,
    ordersCount: 45,
    image: null,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&h=80&fit=crop'
  }
];

const initialCategories = ['Pizza', 'Salads', 'Burgers', 'Pasta', 'Desserts', 'Beverages'];

// Menu Item List Component
const MenuItemList = ({ items, onEdit, onDelete, onToggleAvailability }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50">
            <td className="px-6 py-4">
              <div className="flex items-center">
                <img 
                  src={item.imageUrl || 'https://via.placeholder.com/80'} 
                  alt={item.name} 
                  className="h-10 w-10 rounded object-cover"
                />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">{item.category}</td>
            <td className="px-6 py-4 text-sm text-gray-900">${item.price.toFixed(2)}</td>
            <td className="px-6 py-4">
              <span className={`text-sm font-semibold ${item.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                {item.stock} units
              </span>
            </td>
            <td className="px-6 py-4">
              <button
                onClick={() => onToggleAvailability(item.id, item.available)}
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  item.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {item.available ? 'Available' : 'Unavailable'}
              </button>
            </td>
            <td className="px-6 py-4 text-sm font-medium">
              <button
                onClick={() => onEdit(item)}
                className="text-blue-600 hover:text-blue-900 mr-3"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Stats Bar Component - Updated with Total Categories instead of Low Stock
const MenuStatsBar = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <div className="bg-white rounded-lg shadow p-4">
      <div className="text-sm text-gray-500">Total Items</div>
      <div className="text-2xl font-bold text-gray-900">{stats.totalItems}</div>
    </div>
    <div className="bg-white rounded-lg shadow p-4">
      <div className="text-sm text-gray-500">Available Items</div>
      <div className="text-2xl font-bold text-green-600">{stats.availableItems}</div>
    </div>
    <div className="bg-white rounded-lg shadow p-4">
      <div className="text-sm text-gray-500">Total Categories</div>
      <div className="text-2xl font-bold text-yellow-600">{stats.totalCategories}</div>
    </div>
    <div className="bg-white rounded-lg shadow p-4">
      <div className="text-sm text-gray-500">Popular Items</div>
      <div className="text-2xl font-bold text-purple-600">{stats.popularItems}</div>
    </div>
  </div>
);

// Empty State Component
const EmptyMenuState = ({ onAddItem }) => (
  <div className="text-center py-12">
    <div className="text-gray-400 mb-4 text-4xl">🍽️</div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">No menu items found</h3>
    <p className="text-gray-500 mb-4">Get started by adding your first menu item</p>
    <Button label="Add Menu Item" onClick={onAddItem} variant="primary" />
  </div>
);

// Image Upload Component
const ImageUpload = ({ currentImage, onImageUpload, onImageRemove }) => {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(currentImage || null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreviewUrl(base64String);
        onImageUpload(base64String, file);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file (JPEG, PNG, or JPG)');
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Item Image</label>
      <div className="flex items-center gap-4">
        {previewUrl ? (
          <div className="relative">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="h-24 w-24 rounded-lg object-cover border border-gray-300"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="h-24 w-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <ImageIcon />
          </div>
        )}
        <div>
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
          >
            <UploadIcon />
            {previewUrl ? 'Change Image' : 'Upload Image'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleFileSelect}
            className="hidden"
          />
          <p className="text-xs text-gray-500 mt-1">JPEG, PNG, JPG up to 5MB</p>
        </div>
      </div>
    </div>
  );
};

// Menu Form Modal Component with Image Upload and Stock
const MenuFormModal = ({ isOpen, onClose, onSave, editingItem, categories }) => {
  const [formData, setFormData] = useState({
    name: editingItem?.name || '',
    description: editingItem?.description || '',
    price: editingItem?.price || '',
    category: editingItem?.category || categories[0] || '',
    stock: editingItem?.stock || 0,
    image: editingItem?.image || null,
    imageUrl: editingItem?.imageUrl || ''
  });
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = (base64Image, file) => {
    setUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setFormData({
        ...formData,
        image: base64Image,
        imageUrl: base64Image
      });
      setUploading(false);
    }, 500);
  };

  const handleImageRemove = () => {
    setFormData({
      ...formData,
      image: null,
      imageUrl: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock) || 0,
      image: formData.image,
      imageUrl: formData.imageUrl || formData.image
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
        </h2>
        <form onSubmit={handleSubmit}>
          <ImageUpload
            currentImage={formData.imageUrl}
            onImageUpload={handleImageUpload}
            onImageRemove={handleImageRemove}
          />
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              rows="3"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Price *</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Stock Quantity *</label>
            <input
              type="number"
              step="1"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
            >
              {uploading ? 'Uploading...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Category Manager Component
const CategoryManager = ({ categories, onClose, onAddCategory, onDeleteCategory }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
        
        <div className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category name"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
            />
            <button
              onClick={handleAddCategory}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {categories.map(cat => (
            <div key={cat} className="flex justify-between items-center py-2 border-b">
              <span>{cat}</span>
              <button
                onClick={() => onDeleteCategory(cat)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
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
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </div>
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
            icon={<PlusIcon />}
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
          onAddCategory={addCategory}
          onDeleteCategory={deleteCategory}
        />
      )}
    </div>
  );
};

export default MenuManagement;