import React, { useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import { Upload, X } from "lucide-react";

const MenuForm = ({ initialData, onSubmit, onCancel, categories }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      description: "",
      price: "",
      category: categories[0]?.value || "",
      image: "",
      available: true,
    }
  );

  const [imagePreview, setImagePreview] = useState(formData.image || "");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Item name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required";
    if (!formData.category) newErrors.category = "Category is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ ...formData, price: parseFloat(formData.price) });
    }
  };

  const removeImage = () => {
    setImagePreview("");
    setFormData({ ...formData, image: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Item Name */}
      <Input
        label="Item Name"
        name="name"
        placeholder="e.g., Margherita Pizza"
        value={formData.name}
        onChange={handleChange}
        required
        error={errors.name}
      />

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          rows="3"
          placeholder="Describe your menu item..."
          value={formData.description}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
      </div>

      {/* Price and Category */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price"
          name="price"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={formData.price}
          onChange={handleChange}
          required
          error={errors.price}
        />
        <Select
          label="Category"
          name="category"
          options={categories}
          value={formData.category}
          onChange={handleChange}
          error={errors.category}
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Item Image
        </label>
        {imagePreview ? (
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload size={24} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click to upload image</p>
                <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <Button label="Save Item" type="submit" variant="primary" className="flex-1" />
        <Button label="Cancel" variant="secondary" onClick={onCancel} className="flex-1" />
      </div>
    </form>
  );
};

export default MenuForm;