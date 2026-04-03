import React, { useState } from "react";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import MenuItemRow from "./MenuItemRow";
import { Search, Filter, Grid, List } from "lucide-react";

const MenuItemList = ({ items, onEdit, onDelete, onToggleAvailability, categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [viewMode, setViewMode] = useState("list"); // list or grid

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesAvailability = availabilityFilter === "all" || 
                                (availabilityFilter === "available" && item.available) ||
                                (availabilityFilter === "unavailable" && !item.available);
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...categories.map(cat => ({ value: cat.value, label: cat.label }))
  ];

  const availabilityOptions = [
    { value: "all", label: "All Items" },
    { value: "available", label: "Available Only" },
    { value: "unavailable", label: "Unavailable Only" },
  ];

  return (
    <Card title="Menu Items">
      {/* Search and Filter Bar */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search menu items by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              {categoryOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              {availabilityOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 px-3 transition-colors ${
                  viewMode === "list" ? "bg-black text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <List size={18} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 px-3 transition-colors ${
                  viewMode === "grid" ? "bg-black text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Grid size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Items Count */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-900">{filteredItems.length}</span> of{" "}
          <span className="font-semibold text-gray-900">{items.length}</span> items
        </p>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Items List/Grid View */}
      {viewMode === "list" ? (
        <div className="space-y-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <MenuItemRow
                key={item.id}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleAvailability={onToggleAvailability}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No menu items found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-100 relative">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                  {!item.available && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold px-2 py-1 bg-red-500 rounded">Unavailable</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <span className="font-bold text-gray-900">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full capitalize">{item.category}</span>
                    <div className="flex gap-2">
                      <button onClick={() => onEdit(item)} className="p-1 text-blue-500 hover:text-blue-700">Edit</button>
                      <button onClick={() => onDelete(item.id)} className="p-1 text-red-500 hover:text-red-700">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No menu items found</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default MenuItemList;