import React, { useState } from "react";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Modal from "../../ui/Modal";
import { Plus, Trash2, Edit2, GripVertical } from "lucide-react";

const CategoryManager = ({ categories, onAddCategory, onEditCategory, onDeleteCategory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");

  const handleSubmit = () => {
    if (!categoryName.trim() || !categoryValue.trim()) return;
    
    if (editingCategory) {
      onEditCategory(editingCategory.value, { 
        label: categoryName, 
        value: categoryValue,
        icon: categoryIcon 
      });
    } else {
      onAddCategory({ 
        label: categoryName, 
        value: categoryValue,
        icon: categoryIcon 
      });
    }
    
    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setEditingCategory(null);
    setCategoryName("");
    setCategoryValue("");
    setCategoryIcon("");
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setCategoryName(category.label);
    setCategoryValue(category.value);
    setCategoryIcon(category.icon || "");
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
          <p className="text-sm text-gray-500">Manage your menu categories</p>
        </div>
        <Button 
          label="Add Category" 
          variant="secondary" 
          onClick={openAddModal} 
          icon={Plus} 
          size="sm" 
        />
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {categories.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No categories yet. Click "Add Category" to create one.
          </div>
        ) : (
          categories.map((category) => (
            <div 
              key={category.value} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center gap-3 flex-1">
                <GripVertical size={16} className="text-gray-400 cursor-move" />
                <div>
                  <p className="font-medium text-gray-900">{category.label}</p>
                  <p className="text-xs text-gray-500">Slug: {category.value}</p>
                  {category.icon && (
                    <p className="text-xs text-gray-400">Icon: {category.icon}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEditModal(category)}
                  className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit category"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onDeleteCategory(category.value)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete category"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Category Count */}
      <div className="mt-4 pt-4 border-t">
        <p className="text-sm text-gray-500">
          Total Categories: <span className="font-semibold text-gray-900">{categories.length}</span>
        </p>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? "Edit Category" : "Add New Category"}
        onConfirm={handleSubmit}
        confirmLabel={editingCategory ? "Update Category" : "Add Category"}
      >
        <div className="space-y-4">
          <Input
            label="Category Name"
            placeholder="e.g., Main Course"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          <Input
            label="Category Slug"
            placeholder="e.g., main-course (used in URLs)"
            value={categoryValue}
            onChange={(e) => setCategoryValue(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            required
          />
          <Input
            label="Category Icon (optional)"
            placeholder="e.g., pizza, salad, coffee"
            value={categoryIcon}
            onChange={(e) => setCategoryIcon(e.target.value)}
          />
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">Preview URL:</p>
            <p className="text-xs font-mono text-gray-700">/menu/category/{categoryValue || "category-slug"}</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CategoryManager;