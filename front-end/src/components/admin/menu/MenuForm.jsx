import React, { useState, useEffect } from 'react';
import Button from '../../ui/button';
import Input from '../../ui/input';
import ImageUpload from './ImageUpload';

const MenuForm = ({ onSubmit, initialData, categories, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: categories[0] || '',
    image: '',
    isAvailable: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        category: initialData.category || categories[0] || '',
        image: initialData.image || '',
        isAvailable: initialData.isAvailable !== undefined ? initialData.isAvailable : true
      });
    }
  }, [initialData, categories]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({ ...prev, image: imageUrl }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        price: parseFloat(formData.price)
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Item Name */}
      <div>
        <Input
          label="Item Name *"
          name="name"
          placeholder="e.g., Margherita Pizza"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Description *
        </label>
        <textarea
          name="description"
          placeholder="Describe your menu item..."
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className={`w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
      </div>

      {/* Price and Category Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            label="Price *"
            name="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.price}
            onChange={handleChange}
            className={errors.price ? 'border-red-500' : ''}
          />
          {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
        </div>
      </div>

      {/* Image Upload */}
      <ImageUpload 
        onImageUpload={handleImageUpload}
        currentImage={formData.image}
      />

      {/* Availability Toggle */}
      <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
        <span className="text-sm font-medium text-gray-700">Available for ordering</span>
        <button
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, isAvailable: !prev.isAvailable }))}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            formData.isAvailable ? 'bg-green-500' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              formData.isAvailable ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          label="Cancel"
          onClick={onCancel}
          variant="secondary"
          type="button"
        />
        <Button
          label={isEditing ? 'Update Item' : 'Add Item'}
          type="submit"
          variant="primary"
        />
      </div>
    </form>
  );
};

export default MenuForm;