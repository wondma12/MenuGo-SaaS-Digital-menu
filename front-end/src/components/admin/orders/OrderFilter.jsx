import React, { useState } from "react";
import { Search, Calendar, Filter } from "lucide-react";

const OrderFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    date: "",
    sortBy: "newest"
  });

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const statusOptions = [
    { value: "all", label: "All Orders" },
    { value: "pending", label: "Pending" },
    { value: "verified", label: "Verified" },
    { value: "preparing", label: "Preparing" },
    { value: "ready", label: "Ready" },
    { value: "served", label: "Served" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Search orders..."
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black w-64"
        />
      </div>

      <select
        value={filters.status}
        onChange={(e) => handleChange("status", e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
      >
        {statusOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <input
        type="date"
        value={filters.date}
        onChange={(e) => handleChange("date", e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />

      <select
        value={filters.sortBy}
        onChange={(e) => handleChange("sortBy", e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="highest">Highest Amount</option>
        <option value="lowest">Lowest Amount</option>
      </select>
    </div>
  );
};

export default OrderFilter;