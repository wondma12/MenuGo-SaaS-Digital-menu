// src/components/Admin/menu/CreateMenuItemModal.jsx

import React, { useState, useEffect } from 'react';
import menuService from '../../../services/menuService';

const CreateMenuItemModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData,
  restaurantId  // ✅ Add restaurantId prop
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    price: '',
    available: true,
    imageUrl: ''
  });

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoryError, setCategoryError] = useState(null);

  // ✅ Fetch categories from database when modal opens
  useEffect(() => {
    const fetchCategories = async () => {
      if (!isOpen) return;
      
      try {
        setLoadingCategories(true);
        setCategoryError(null);
        
        const result = await menuService.getCategories();
        
        if (result.success) {
          setCategories(result.data || []);
        } else {
          setCategoryError(result.error || 'Failed to load categories');
          // ✅ Fallback to empty array
          setCategories([]);
        }
      } catch (error) {
        console.error('[CreateMenuItemModal] Error fetching categories:', error);
        setCategoryError('Failed to load categories');
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [isOpen]);

  // ✅ Reset form when modal opens or initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        category_id: initialData.category_id || initialData.category || '',
        price: initialData.price?.toString() || '',
        available: initialData.available !== undefined ? initialData.available : true,
        imageUrl: initialData.imageUrl || ''
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category_id: '',
        price: '',
        available: true,
        imageUrl: ''
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // ✅ Validation
    if (!formData.name.trim()) {
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      return;
    }
    if (!formData.description.trim()) {
      return;
    }
    if (!formData.category_id) {
      return;
    }

    const newItem = {
      ...formData,
      price: parseFloat(formData.price),
      imageUrl: formData.imageUrl || 'https://via.placeholder.com/48x48?text=New+Item',
      // ✅ Ensure category_id is sent correctly
      category_id: formData.category_id
    };

    onSave(newItem);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h2 className="font-h2 text-h2 text-black">
              {initialData ? 'Edit Menu Item' : 'Create New Menu Item'}
            </h2>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-neutral-100 rounded-sm transition-colors"
            >
              <span className="material-symbols-outlined text-black">close</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block font-label-caps text-label-caps text-secondary mb-2">
                Item Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-black focus:ring-0 transition-colors font-body-md"
                placeholder="e.g., Wagyu Ribeye"
                required
              />
            </div>

            <div>
              <label className="block font-label-caps text-label-caps text-secondary mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-black focus:ring-0 transition-colors font-body-md resize-none"
                placeholder="e.g., A5 Grade, Truffle Butter"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-label-caps text-label-caps text-secondary mb-2">
                  Category *
                </label>
                {loadingCategories ? (
                  <div className="w-full px-3 py-2 border border-neutral-200 rounded-lg bg-gray-50 text-gray-400 text-sm">
                    Loading categories...
                  </div>
                ) : categoryError ? (
                  <div className="w-full px-3 py-2 border border-red-200 rounded-lg bg-red-50 text-red-500 text-sm">
                    {categoryError}
                  </div>
                ) : (
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-black focus:ring-0 transition-colors font-body-md"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block font-label-caps text-label-caps text-secondary mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-black focus:ring-0 transition-colors font-body-md"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-label-caps text-label-caps text-secondary mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-black focus:ring-0 transition-colors font-body-md"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-secondary mt-1">Leave empty to use a placeholder image</p>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="w-4 h-4 text-black border-neutral-300 rounded focus:ring-black"
              />
              <label className="font-body-md text-black">
                Available for ordering
              </label>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4 border-t border-neutral-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors font-button text-button"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:opacity-90 transition-colors font-button text-button"
              >
                {initialData ? 'Save Changes' : 'Create Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMenuItemModal;