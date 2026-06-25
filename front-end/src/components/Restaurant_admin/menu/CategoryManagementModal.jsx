// src/components/Restaurant_admin/menu/CategoryManagementModal.jsx

import React, { useState, useEffect } from "react";
import { X, Plus, Edit2, Trash2, FolderOpen } from "lucide-react";
import menuService from "../../../services/menuService";

const CategoryManagementModal = ({ isOpen, onClose, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingName, setEditingName] = useState("");

  // ============================================================
  // FETCH CATEGORIES
  // ============================================================

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await menuService.getCategories();
      
      if (result.success) {
        setCategories(result.data || []);
      } else {
        setError(result.error || "Failed to fetch categories");
      }
    } catch (err) {
      console.error("[CategoryManagement] Error fetching categories:", err);
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      alert("Please enter a category name");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await menuService.createCategory({
        name: newCategoryName.trim(),
        display_order: categories.length + 1,
      });

      if (result.success) {
        await fetchCategories();
        setNewCategoryName("");
        if (onCategoryChange) onCategoryChange();
      } else {
        alert(result.error || "Failed to create category");
      }
    } catch (error) {
      console.error("[CategoryManagement] Error adding category:", error);
      alert("Failed to create category. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateCategory = async (id) => {
    if (!editingName.trim()) {
      alert("Please enter a category name");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await menuService.updateCategory(id, {
        name: editingName.trim(),
      });

      if (result.success) {
        await fetchCategories();
        setEditingCategory(null);
        setEditingName("");
        if (onCategoryChange) onCategoryChange();
      } else {
        alert(result.error || "Failed to update category");
      }
    } catch (error) {
      console.error("[CategoryManagement] Error updating category:", error);
      alert("Failed to update category. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (category) => {
    const itemCount = category._count?.menu_items || 0;
    
    if (itemCount > 0) {
      const confirmMessage = `This category has ${itemCount} menu item(s). Deleting it will require reassigning or deleting these items. Are you sure?`;
      if (!window.confirm(confirmMessage)) {
        return;
      }
    } else {
      if (!window.confirm(`Delete category "${category.name}"?`)) {
        return;
      }
    }

    try {
      setIsSubmitting(true);
      const result = await menuService.deleteCategory(category.id);

      if (result.success) {
        await fetchCategories();
        if (onCategoryChange) onCategoryChange();
      } else {
        alert(result.error || "Failed to delete category");
      }
    } catch (error) {
      console.error("[CategoryManagement] Error deleting category:", error);
      alert("Failed to delete category. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditing = (category) => {
    setEditingCategory(category.id);
    setEditingName(category.name);
  };

  const cancelEditing = () => {
    setEditingCategory(null);
    setEditingName("");
  };

  // ============================================================
  // RENDER
  // ============================================================

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200">
          <div className="flex items-center gap-3">
            <FolderOpen className="w-5 h-5 text-zinc-600" />
            <h3 className="text-xl font-bold text-black">Manage Categories</h3>
            <span className="px-2 py-0.5 bg-zinc-100 text-zinc-600 text-xs font-bold rounded-full">
              {categories.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Add New Category */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="New category name..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddCategory();
              }}
              className="flex-1 px-4 py-2 border border-zinc-200 rounded-lg focus:border-black focus:ring-0 transition-colors text-sm"
            />
            <button
              onClick={handleAddCategory}
              disabled={isSubmitting || !newCategoryName.trim()}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center gap-1 text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
              ))}
            </div>
          )}

          {/* Category List */}
          {!loading && categories.length === 0 && (
            <div className="text-center py-8 text-zinc-400">
              <FolderOpen className="w-12 h-12 mx-auto mb-3 text-zinc-300" />
              <p className="font-medium">No categories yet</p>
              <p className="text-sm">Add your first category above</p>
            </div>
          )}

          {!loading && categories.length > 0 && (
            <div className="space-y-2">
              {categories.map((category) => {
                const isEditing = editingCategory === category.id;
                const itemCount = category._count?.menu_items || 0;

                return (
                  <div
                    key={category.id}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                      isEditing
                        ? "border-black bg-zinc-50"
                        : "border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    {isEditing ? (
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleUpdateCategory(category.id);
                            if (e.key === "Escape") cancelEditing();
                          }}
                          className="flex-1 px-3 py-1.5 border border-zinc-200 rounded focus:border-black focus:ring-0 text-sm"
                          autoFocus
                        />
                        <button
                          onClick={() => handleUpdateCategory(category.id)}
                          disabled={isSubmitting || !editingName.trim()}
                          className="px-3 py-1.5 bg-black text-white rounded hover:bg-neutral-800 transition-colors disabled:opacity-50 text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="px-3 py-1.5 border border-zinc-200 rounded hover:bg-zinc-50 transition-colors text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <FolderOpen className="w-4 h-4 text-zinc-400" />
                          <span className="font-medium text-sm">{category.name}</span>
                          <span className="text-xs text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
                            {itemCount} {itemCount === 1 ? "item" : "items"}
                          </span>
                          {category.display_order !== null && (
                            <span className="text-xs text-zinc-400">
                              #{category.display_order}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => startEditing(category)}
                            className="p-1.5 hover:bg-zinc-100 rounded-lg transition-colors"
                            title="Edit category"
                          >
                            <Edit2 className="w-4 h-4 text-zinc-400 hover:text-zinc-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category)}
                            className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete category"
                          >
                            <Trash2 className="w-4 h-4 text-zinc-400 hover:text-red-500" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 bg-zinc-50/50 rounded-b-xl">
          <p className="text-xs text-zinc-400">
            💡 Categories help organize your menu. Items in a category with no items can be safely deleted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagementModal;