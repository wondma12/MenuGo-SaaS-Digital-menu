// src/pages/Restaurant_admin/MenuManagement.jsx
import React, { useState, useMemo } from 'react';
import MenuItemList from '../../components/admin/menu/MenuItemList';
import CreateMenuItemModal from '../../components/admin/menu/CreateMenuItemModal';

// Initial mock data with high-quality images matching the design
const INITIAL_ITEMS = [
  {
    id: 1,
    name: "Wagyu Ribeye",
    description: "A5 Grade, Truffle Butter",
    category: "Main Course",
    price: 84.00,
    available: true,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDH_f9EOD8f_YMbHl7quGMKEmzgZqONsROFtP66SOLTAiqX6piY5asfN_ASt1th4d-nPkPCgsntdUfpOK9GXCS3m1jrFfZ-YQotR8s0Xal0TYW4M0UiOWN9DzYI-DG47f9kHw8452sIPauF6L3twER4VlF1YPs8hFw5AJlxXgCcvDsHscz1MXHiWdkCGYDiZuV_MluQC4eJZFYvynbakYFeIWpnpW3XdwO09jSjF4BDCVytVI3J-u1IP738Ukr24uYzKRo7_rkT7CM",
    orderCount: 145,
    stock: null,
    margin: 65
  },
  {
    id: 2,
    name: "Citrus Deconstruction",
    description: "Meyer Lemon, Yuzu Curd",
    category: "Desserts",
    price: 18.00,
    available: true,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfanwlnLIHnPAh9fvzChXUe_ck18edcaG6zL-osgYe_vxxBnhYsyNu1k_LGQNM1fYDbF44G_ovIz8jP3ZgLMheK3uTNIH79w7hs-fSbbuzYGpxfCF49tZQlPBbxFfeX7cKo2SXI29cdGcqpUZXkamEgsdpuO31CO1ccd8qTemXdm6S613ltS1vQiYGSzmJitNoOksAAl0WuAnPV-SyH84t1LiDF_e8GlgUkVDzwiczEiuipzEN0cznnsMkeoGM1MaXSgiLox1y5FI",
    orderCount: 98,
    stock: null,
    margin: 82
  },
  {
    id: 3,
    name: "Heirloom Burrata",
    description: "Balsamic Pearls, Basil Oil",
    category: "Starters",
    price: 22.00,
    available: false,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuArGqaS4vE9QI1Xo64QvoYQUVPqtgn2XPiAYfNn4ooetg8ge1uOfS5w4ZaaIcmI-KT6sGKYZ8FERMiSDsCSAOqFMbBhu-_FIC6XQ9PfKVvfGUOIhSGBA4BtiVh_jOuaNyffKSOD1txr-8WjhAJHSLUPDP7zD9-ywnT2jAmGqkFIRni6T427NjnSLkU2gO9_ZRSGoc3Y_kl49_AfBje3hMOSAIY6aLV0MlEdxky3w-SV4CkbD6pwMXocNXO8YocagcosE6LXclrzA68",
    orderCount: 34,
    stock: null,
    margin: 55
  },
  {
    id: 4,
    name: "Black Truffle Pasta",
    description: "Handmade Fettuccine, Parmesan",
    category: "Pasta",
    price: 48.00,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=100&h=100&fit=crop",
    orderCount: 42,
    stock: 12,
    margin: 70
  },
  {
    id: 5,
    name: "Spicy Tuna Roll",
    description: "Fresh Tuna, Sriracha, Avocado",
    category: "Starters",
    price: 24.00,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=100&h=100&fit=crop",
    orderCount: 67,
    stock: null,
    margin: 60
  },
  {
    id: 6,
    name: "Lobster Bisque",
    description: "Cognac, Crème Fraîche",
    category: "Starters",
    price: 32.00,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?w=100&h=100&fit=crop",
    orderCount: 53,
    stock: 8,
    margin: 68
  }
];

const MenuManagement = () => {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const itemsPerPage = 3;

  // Filter items based on search and category
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, categoryFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats calculations
  const activeItemsCount = items.filter(item => item.available).length;
  const averageOrderValue = items.reduce((sum, item) => sum + item.price, 0) / items.length;

  // Insights calculations
  const mostPopularItem = items.reduce((prev, current) => 
    (current.orderCount > prev.orderCount) ? current : prev, items[0]);
  const lowInventoryItem = items.find(item => item.stock !== null && item.stock < 20 && item.available);
  const profitLeader = items.reduce((prev, current) => 
    (current.margin > prev.margin) ? current : prev, items[0]);

  // CRUD Operations
  const handleAddItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleSaveItem = (itemData) => {
    if (editingItem) {
      // Update existing item
      setItems(items.map(item => 
        item.id === editingItem.id ? { ...itemData, id: item.id } : item
      ));
    } else {
      // Add new item
      const newItem = {
        ...itemData,
        id: Date.now(),
        orderCount: 0,
        stock: null,
        margin: 50
      };
      setItems([...items, newItem]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Get unique categories for filter
  const categories = ['All', ...new Set(items.map(item => item.category))];

  return (
    <div className="min-h-screen bg-surface">
      {/* SideNavBar */}
     
 {/* TopAppBar */}
        <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-10 h-16">
          <div className="flex items-center space-x-4">
            <span className="font-h2 text-h2 text-black">Menu Management</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <button aria-label="Notifications" title="Notifications" className="p-2 rounded-sm hover:bg-neutral-100 transition-all duration-200 text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
              </button>
            </div>
            <div className="flex items-center space-x-3 cursor-pointer hover:bg-neutral-100 p-1 rounded-sm transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 20a8 8 0 0116 0" />
              </svg>
              <span className="font-sans text-base font-semibold tracking-tight text-black">Administrator</span>
            </div>
          </div>
        </header>
      {/* Main Content */}
      <div className="min-h-screen flex flex-col">
        {/* TopAppBar */}
      
        {/* Main Content Area */}
        <main className="flex-1 p-8 max-w-[1200px] w-full mx-auto">
          {/* Page Header Actions */}
          <div className="flex justify-between items-end mb-6">
            <div>
              <h1 className="font-h1 text-h1 text-black">Menu Inventory</h1>
              <p className="font-body-md text-secondary mt-1">Manage your dishes, pricing, and availability across all locations.</p>
            </div>
            <button 
              onClick={handleAddItem}
               className="bg-black text-white px-4 py-2 font-medium text-sm rounded hover:bg-neutral-800 transition-colors flex items-center space-x-2"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>menu item</span>
            </button>
          </div>

          {/* Stats Overview (Asymmetric Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
            <div className="md:col-span-8 bg-white border border-neutral-200 p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <div className="flex justify-between items-center mb-md">
                <span className="font-label-caps text-label-caps text-secondary uppercase">Availability Pulse</span>
                <span className="text-xs font-bold text-black px-2 py-1 bg-surface-container rounded-sm">LIVE</span>
              </div>
              <div className="flex items-baseline space-x-4">
                <span className="text-display font-display text-black">{activeItemsCount}</span>
                <span className="text-secondary font-body-md">Active Menu Items</span>
              </div>
            </div>
            <div className="md:col-span-4 bg-black text-white p-6 rounded-xl flex flex-col justify-between">
              <span className="font-label-caps text-label-caps text-neutral-400 uppercase">Average Order Value</span>
              <div className="mt-4">
                <span className="text-h1 font-h1">${averageOrderValue.toFixed(2)}</span>
                <p className="text-xs text-neutral-400 mt-1">+12% from last month</p>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="mb-4 flex items-center space-x-4">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                
              </span>
              <input 
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:border-black focus:ring-0 transition-colors font-body-sm text-on-surface placeholder:text-neutral-400"
                placeholder="Search by item name or category..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="border border-neutral-200 px-3 py-2 rounded-lg bg-white hover:bg-neutral-50 font-medium text-sm cursor-pointer"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Table Container */}
          <MenuItemList 
            items={paginatedItems}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-neutral-200 flex items-center justify-between bg-surface-container-low rounded-b-xl mt-4">
            <span className="font-body-sm text-secondary">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredItems.length)} of {filteredItems.length} results
            </span>
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 border border-neutral-200 rounded-lg ${currentPage === 1 ? 'text-neutral-400 cursor-not-allowed' : 'bg-white hover:bg-neutral-50 text-black'}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button 
                className={`px-3 py-1 border border-neutral-200 rounded-lg ${currentPage === totalPages ? 'text-neutral-400 cursor-not-allowed' : 'bg-white hover:bg-neutral-50 text-black'}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>

          {/* Contextual Insight Footer */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-2 border-black pl-4">
              <p className="font-label-caps text-label-caps text-secondary mb-1">MOST POPULAR</p>
              <p className="font-h3 text-h3 text-black">{mostPopularItem.name}</p>
              <p className="font-body-sm text-secondary">Ordered {mostPopularItem.orderCount} times this week.</p>
            </div>
            <div className="border-l-2 border-neutral-300 pl-4">
              <p className="font-label-caps text-label-caps text-secondary mb-1">LOW INVENTORY</p>
              <p className="font-h3 text-h3 text-black">{lowInventoryItem ? lowInventoryItem.name : 'N/A'}</p>
              <p className="font-body-sm text-secondary">
                {lowInventoryItem ? `Only ${lowInventoryItem.stock} servings left.` : 'All items well stocked'}
              </p>
            </div>
            <div className="border-l-2 border-neutral-300 pl-4">
              <p className="font-label-caps text-label-caps text-secondary mb-1">PROFIT LEADER</p>
              <p className="font-h3 text-h3 text-black">{profitLeader.name}</p>
              <p className="font-body-sm text-secondary">Highest margin item ({profitLeader.margin}%).</p>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      <CreateMenuItemModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        initialData={editingItem}
      />
    </div>
  );
};

export default MenuManagement;