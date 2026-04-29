import React, { useEffect, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/button";

const initialFormState = {
  name: "",
  description: "",
  price: "",
  category: "",
  isAvailable: true,
  isPopular: false,
  calories: "",
  image: "",
};

const CreateMenuItemModal = ({
  isOpen,
  onClose,
  onSave,
  categories,
  menuItem,
  isSaving,
}) => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (menuItem) {
      setFormValues({
        name: menuItem.name || "",
        description: menuItem.description || "",
        price: menuItem.price?.toString() || "",
        category: menuItem.category || categories[0] || "",
        isAvailable: menuItem.isAvailable ?? true,
        isPopular: menuItem.isPopular ?? false,
        calories: menuItem.calories?.toString() || "",
        image: menuItem.image || "",
      });
      setImagePreview(menuItem.image || null);
      setErrors({});
    } else {
      setFormValues({
        ...initialFormState,
        category: categories[0] || "",
      });
      setImagePreview(null);
      setErrors({});
    }
  }, [menuItem, categories, isOpen]);

  const validate = () => {
    const validationErrors = {};

    if (!formValues.name.trim()) {
      validationErrors.name = "Item name is required.";
    }
    if (!formValues.description.trim()) {
      validationErrors.description = "Description is required.";
    }
    if (
      !formValues.price ||
      Number.isNaN(Number(formValues.price)) ||
      Number(formValues.price) <= 0
    ) {
      validationErrors.price = "Enter a valid price.";
    }
    if (!formValues.category) {
      validationErrors.category = "Category is required.";
    }
    if (
      !formValues.calories ||
      Number.isNaN(Number(formValues.calories)) ||
      Number(formValues.calories) <= 0
    ) {
      validationErrors.calories = "Enter calories.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));
    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        handleChange("image", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    handleChange("image", "");
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    onSave({
      ...formValues,
      price: Number(formValues.price),
      calories: Number(formValues.calories),
    });
  };

  return (
    <Modal
      title={menuItem ? "Edit menu item" : "Add menu item"}
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button variant="secondary" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save item"}
          </Button>
        </div>
      }
    >
      <div className="grid gap-5">
        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Item Image
          </label>
          {imagePreview ? (
            <div className="relative group">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-2xl border-2 border-slate-200"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Upload className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="grid gap-4">
          <Input
            label="Name"
            value={formValues.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={errors.name}
            className="rounded-xl"
          />
          <Input
            label="Description"
            textarea
            value={formValues.description}
            onChange={(e) => handleChange("description", e.target.value)}
            error={errors.description}
            className="rounded-xl"
            rows={3}
          />
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Price ($)"
              value={formValues.price}
              type="number"
              onChange={(e) => handleChange("price", e.target.value)}
              error={errors.price}
              className="rounded-xl"
            />
            <Input
              label="Calories"
              value={formValues.calories}
              type="number"
              onChange={(e) => handleChange("calories", e.target.value)}
              error={errors.calories}
              className="rounded-xl"
            />
          </div>
          <Select
            label="Category"
            value={formValues.category}
            onChange={(e) => handleChange("category", e.target.value)}
            options={categories.map((category) => ({
              label: category,
              value: category,
            }))}
            error={errors.category}
            className="rounded-xl"
          />
        </div>

        {/* Toggle Switches */}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
            <span className="text-sm font-medium text-gray-700">Available</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={formValues.isAvailable}
                onChange={(e) => handleChange("isAvailable", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </div>
          </label>
          <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
            <span className="text-sm font-medium text-gray-700">
              Popular Item
            </span>
            <div className="relative">
              <input
                type="checkbox"
                checked={formValues.isPopular}
                onChange={(e) => handleChange("isPopular", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </div>
          </label>
        </div>
      </div>
    </Modal>
  );
};

export default CreateMenuItemModal;
