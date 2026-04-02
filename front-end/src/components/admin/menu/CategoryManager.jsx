import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import Button from '../../ui/button';
import Input from '../../ui/input';

const CategoryManager = ({ categories, onClose, onUpdateCategories }) => {
  const [categoryList, setCategoryList] = useState([...categories]);
  const [newCategory, setNewCategory] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [error, setError] = useState('');

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      setError('Category name cannot be empty');
      return;
    }
    
    if (categoryList.includes(newCategory.trim())) {
      setError('Category already exists');
      return;
    }
    
    setCategoryList([...categoryList, newCategory.trim()]);
    setNewCategory('');
    setError('');
  };

  const handleDeleteCategory = (index) => {
    const categoryToDelete = categoryList[index];
    if (window.confirm(`Delete category "${categoryToDelete}"? Items in this category will need to be reassigned.`)) {
      const updated = categoryList.filter((_, i) => i !== index);
      setCategoryList(updated);
    }
  };

  const handleStartEdit = (index, category) => {
    setEditingIndex(index);
    setEditValue(category);
  };

  const handleSaveEdit = () => {
    if (!editValue.trim()) {
      setError('Category name cannot be empty');
      return;
    }
    
    if (categoryList.includes(editValue.trim()) && categoryList[editingIndex] !== editValue.trim()) {
      setError('Category already exists');
      return;
    }
    
    const updated = [...categoryList];
    updated[editingIndex] = editValue.trim();
    setCategoryList(updated);
    setEditingIndex(null);
    setEditValue('');
    setError('');
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
    setError('');
  };

  const handleSaveAll = () => {
    onUpdateCategories(categoryList);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-bold text-gray-900">Manage Categories</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          {/* Add New Category */}
          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Add New Category
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Appetizers"
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                  setError('');
                }}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
              />
              <Button
                label="Add"
                onClick={handleAddCategory}
                variant="primary"
                icon={<Plus className="h-4 w-4" />}
              />
            </div>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>

          {/* Categories List */}
          <div className="max-h-80 space-y-2 overflow-y-auto">
            <p className="mb-2 text-sm font-medium text-gray-700">
              Current Categories ({categoryList.length})
            </p>
            
            {categoryList.length === 0 ? (
              <div className="rounded-lg bg-gray-50 p-4 text-center text-gray-500">
                No categories yet. Add your first category above.
              </div>
            ) : (
              categoryList.map((category, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                  {editingIndex === index ? (
                    <div className="flex flex-1 gap-2">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1"
                        autoFocus
                        onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                      />
                      <button
                        onClick={handleSaveEdit}
                        className="rounded-lg bg-green-500 p-2 text-white hover:bg-green-600"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="rounded-lg bg-gray-300 p-2 text-gray-700 hover:bg-gray-400"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-gray-700">{category}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStartEdit(index, category)}
                          className="rounded p-1 text-blue-500 hover:bg-blue-50"
                          title="Edit category"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(index)}
                          className="rounded p-1 text-red-500 hover:bg-red-50"
                          title="Delete category"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t p-4">
          <Button label="Cancel" onClick={onClose} variant="secondary" />
          <Button label="Save Changes" onClick={handleSaveAll} variant="primary" />
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;