// src/components/admin/orders/OrderFilter.jsx
import React, { useState } from "react";

const OrderFilter = ({ statusFilter, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const statusOptions = [
    { value: "all", label: "All Orders" },
    { value: "pending", label: "Pending" },
    { value: "verified", label: "Verified" },
    { value: "preparing", label: "Preparing" },
    { value: "served", label: "Served" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white border border-neutral-200 text-black px-4 py-2 font-button text-button rounded hover:bg-neutral-50 transition-colors flex items-center space-x-2"
      >
        <span className="material-symbols-outlined text-sm">filter_list</span>
        <span>Filter</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg z-10">
          <div className="p-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onStatusChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  statusFilter === option.value
                    ? "bg-black text-white"
                    : "text-black hover:bg-neutral-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderFilter;