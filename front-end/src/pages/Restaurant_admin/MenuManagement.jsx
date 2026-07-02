import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import MenuItemList from "../../components/Restaurant_admin/menu/MenuItemList";
import CreateMenuItemModal from "../../components/Restaurant_admin/menu/CreateMenuItemModal";
import CategoryManagementModal from "../../components/Restaurant_admin/menu/CategoryManagementModal";
import menuService from "../../services/menuService";
import { FolderOpen } from "lucide-react";
const MenuManagement = () => {
  const { restaurantId } = useParams();

  
  
  

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const itemsPerPage = 3;

  
  
  

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await menuService.getMenuItems();

      if (result.success) {
        const transformedItems = result.data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description || "",
          category: item.categories?.name || "Uncategorized",
          price: parseFloat(item.price),
          available: item.status === "available",
          imageUrl:
            item.image ||
            "https://images.unsplash.com/photo-1547592180-85f173990554?w=100&h=100&fit=crop",
          orderCount: item.order_count || 0,
          stock: item.stock || null,
          margin: item.margin || 50,
          category_id: item.category_id,
        }));

        setItems(transformedItems);
      } else {
        setError(result.error || "Failed to fetch menu items");
      }
    } catch (err) {
      console.error("[MenuManagement] Error fetching menu items:", err);
      setError(err.message || "Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  
  
  

  const categories = useMemo(() => {
    const cats = ["All", ...new Set(items.map((item) => item.category))];
    return cats;
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, categoryFilter]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const activeItemsCount = items.filter((item) => item.available).length;
  const averageOrderValue =
    items.length > 0
      ? items.reduce((sum, item) => sum + item.price, 0) / items.length
      : 0;

  const mostPopularItem =
    items.length > 0
      ? items.reduce(
          (prev, current) =>
            current.orderCount > prev.orderCount ? current : prev,
          items[0],
        )
      : null;

  const lowInventoryItem = items.find(
    (item) => item.stock !== null && item.stock < 20 && item.available,
  );

  const profitLeader =
    items.length > 0
      ? items.reduce(
          (prev, current) => (current.margin > prev.margin ? current : prev),
          items[0],
        )
      : null;

  
  
  

  const handleAddItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      const result = await menuService.deleteMenuItem(id);

      if (result.success) {
        setItems(items.filter((item) => item.id !== id));
        console.log("Item deleted successfully");
      } else {
        alert(result.error || "Failed to delete item");
      }
    } catch (error) {
      console.error("[MenuManagement] Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
    }
  };

  const handleSaveItem = async (itemData) => {
    setIsSubmitting(true);

    try {
      const apiData = {
        category_id: itemData.category_id || itemData.category,
        name: itemData.name,
        description: itemData.description || "",
        price: parseFloat(itemData.price),
        image: itemData.imageUrl || "",
        status: itemData.available ? "available" : "unavailable",
        preparation_time: parseInt(itemData.preparation_time) || 15,
        is_featured: itemData.is_featured || false,
      };

      let result;

      if (editingItem) {
        result = await menuService.updateMenuItem(editingItem.id, apiData);
      } else {
        result = await menuService.createMenuItem(apiData);
      }

      if (result.success) {
        await fetchMenuItems();
        setIsModalOpen(false);
        setEditingItem(null);
        console.log(
          editingItem
            ? "Item updated successfully"
            : "Item created successfully",
        );
      } else {
        alert(result.error || "Failed to save item");
      }
    } catch (error) {
      console.error("[MenuManagement] Error saving item:", error);
      alert("Failed to save item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCategoryChange = async () => {
    await fetchMenuItems();
  };

  
  
  

  if (loading) {
    return (
      <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
        <main className="min-h-screen bg-surface">
          <div className="p-8 max-w-[1200px] w-full mx-auto">
            <div className="flex justify-between items-end mb-6">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
              <div className="md:col-span-8 h-24 bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="md:col-span-4 h-24 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  
  
  

  if (error) {
    return (
      <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
        <main className="min-h-screen bg-surface">
          <div className="p-8 max-w-[1200px] w-full mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                Unable to Load Menu
              </h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchMenuItems}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  
  
  

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
      <main className="min-h-screen bg-surface">
        <div className="p-8 max-w-[1200px] w-full mx-auto">
          {}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
            <div>
              <p className="text-gray-500 text-sm font-bold mb-2 uppercase tracking-widest">
                Menu Inventory
              </p>
              <h2 className="text-black text-3xl md:text-5xl font-bold uppercase leading-none">
                Manage your dishes
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {items.length} total items • {activeItemsCount} active
              </p>
            </div>
            <button
              onClick={handleAddItem}
              className="bg-black text-white px-4 py-2 font-medium text-sm rounded hover:bg-neutral-800 transition-colors flex items-center space-x-2"
            >
              <span className="text-sm mr-1">+</span>
              <span>menu item</span>
            </button>
          </div>

          {}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
            <div className="md:col-span-8 bg-white border border-neutral-200 p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Availability Pulse
                </span>
                <span className="text-xs font-bold text-black px-2 py-1 bg-gray-100 rounded">
                  LIVE
                </span>
              </div>
              <div className="flex items-baseline space-x-4">
                <span className="text-4xl font-bold text-black">
                  {activeItemsCount}
                </span>
                <span className="text-gray-600">Active Menu Items</span>
              </div>
            </div>
            <div className="md:col-span-4 bg-black text-white p-6 rounded-xl flex flex-col justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Average Order Value
              </span>
              <div className="mt-4">
                <span className="text-3xl font-bold">
                  ${averageOrderValue.toFixed(2)}
                </span>
                <p className="text-xs text-gray-400 mt-1">
                  Based on current menu prices
                </p>
              </div>
            </div>
          </div>

          {}
          <div className="mb-4 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1 w-full">
              <input
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:border-black focus:ring-0 transition-colors"
                placeholder="Search by item name or category..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
            <select
              className="border border-neutral-200 px-3 py-2 rounded-lg bg-white hover:bg-neutral-50 font-medium text-sm cursor-pointer w-full sm:w-auto"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {}
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors text-sm font-medium flex items-center gap-1.5 whitespace-nowrap"
            >
              <FolderOpen className="w-4 h-4" />
              Manage Categories
            </button>
          </div>

          {}
          <MenuItemList
            items={paginatedItems}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />

          {}
          {filteredItems.length > 0 && (
            <div className="px-6 py-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between bg-gray-50 rounded-b-xl mt-4 gap-2">
              <span className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredItems.length)} of{" "}
                {filteredItems.length} results
              </span>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 border border-neutral-200 rounded-lg ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed bg-gray-100"
                      : "bg-white hover:bg-neutral-50 text-black"
                  }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className={`px-3 py-1 border border-neutral-200 rounded-lg ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed bg-gray-100"
                      : "bg-white hover:bg-neutral-50 text-black"
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {}
          {items.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-l-2 border-black pl-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                  MOST POPULAR
                </p>
                <p className="text-xl font-bold text-black">
                  {mostPopularItem?.name || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  Ordered {mostPopularItem?.orderCount || 0} times.
                </p>
              </div>
              <div className="border-l-2 border-gray-300 pl-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                  LOW INVENTORY
                </p>
                <p className="text-xl font-bold text-black">
                  {lowInventoryItem ? lowInventoryItem.name : "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  {lowInventoryItem
                    ? `Only ${lowInventoryItem.stock} servings left.`
                    : "All items well stocked"}
                </p>
              </div>
              <div className="border-l-2 border-gray-300 pl-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                  PROFIT LEADER
                </p>
                <p className="text-xl font-bold text-black">
                  {profitLeader?.name || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  {profitLeader
                    ? `Highest margin item (${profitLeader.margin}%)`
                    : "No data available"}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {}
      <CreateMenuItemModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        initialData={editingItem}
        isSubmitting={isSubmitting}
        categories={categories.filter((c) => c !== "All")}
         restaurantId={restaurantId}
      />

      {}
      {}
      <CategoryManagementModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onCategoryChange={handleCategoryChange}
        restaurantId={restaurantId}
      />
    </div>
  );
};

export default MenuManagement;
