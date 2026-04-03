import React, { useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import ImageUpload from "./ImageUpload";
import { AlertCircle } from "lucide-react";

const MenuForm = ({ initialData, onSubmit, onCancel, categories }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      description: "",
      price: "",
      category: categories[0]?.value || "",
      image: "",
      available: true,
      isPopular: false,
      preparationTime: "15",
      calories: "",
    }
  );

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Item name is required";
    if (formData.name.length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.description.length < 10) newErrors.description = "Description must be at least 10 characters";
    if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required";
    if (formData.price > 1000) newErrors.price = "Price seems too high";
    if (!formData.category) newErrors.category = "Category is required";
    if (formData.preparationTime && (formData.preparationTime < 0 || formData.preparationTime > 120)) {
      newErrors.preparationTime = "Preparation time must be between 0-120 minutes";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === "checkbox" ? checked : value 
    });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleImageUpload = (imageData) => {
    setFormData({ ...formData, image: imageData });
  };

  const handleImageRemove = () => {
    setFormData({ ...formData, image: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      onSubmit({ 
        ...formData, 
        price: parseFloat(formData.price),
        preparationTime: parseInt(formData.preparationTime),
        calories: formData.calories ? parseInt(formData.calories) : null
      });
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 pb-2 border-b">Basic Information</h3>
        
        <Input
          label="Item Name"
          name="name"
          placeholder="e.g., Margherita Pizza"
          value={formData.name}
          onChange={handleChange}
          required
          error={errors.name}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            rows="3"
            placeholder="Describe your menu item with details about ingredients, taste, etc..."
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          <p className="text-xs text-gray-400 mt-1">{formData.description.length}/500 characters</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Price ($)"
            name="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.price}
            onChange={handleChange}
            required
            error={errors.price}
          />
          <Input
            label="Preparation Time (minutes)"
            name="preparationTime"
            type="number"
            placeholder="15"
            value={formData.preparationTime}
            onChange={handleChange}
            error={errors.preparationTime}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Category"
            name="category"
            options={categories}
            value={formData.category}
            onChange={handleChange}
            error={errors.category}
          />
          <Input
            label="Calories (optional)"
            name="calories"
            type="number"
            placeholder="e.g., 450"
            value={formData.calories}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Media & Options */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 pb-2 border-b">Media & Options</h3>
        
        <ImageUpload
          currentImage={formData.image}
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
          label="Item Image"
        />

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300 focus:ring-black"
            />
            <span className="text-sm text-gray-700">Item Available</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isPopular"
              checked={formData.isPopular}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300 focus:ring-black"
            />
            <span className="text-sm text-gray-700">Mark as Popular</span>
          </label>
        </div>
      </div>

      {/* Info Note */}
      <div className="bg-blue-50 rounded-lg p-3 flex items-start gap-2">
        <AlertCircle size={16} className="text-blue-600 mt-0.5" />
        <p className="text-xs text-blue-700">
          Changes to menu items will be reflected immediately on the customer menu page.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t">
        <Button 
          label={isSubmitting ? "Saving..." : "Save Item"} 
          type="submit" 
          variant="primary" 
          className="flex-1"
          disabled={isSubmitting}
        />
        <Button 
          label="Cancel" 
          variant="secondary" 
          onClick={onCancel} 
          className="flex-1"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default MenuForm;