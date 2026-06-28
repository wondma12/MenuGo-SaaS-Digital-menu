// src/components/customer/Cart/OrderTypeSelector.jsx

import React from 'react';

const OrderTypeSelector = ({ orderType, setOrderType, tableNumber, setTableNumber }) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={() => setOrderType("dine_in")}  // ✅ MUST be "dine_in"
          className={`px-4 py-2 rounded-lg border ${
            orderType === "dine_in" 
              ? "border-black bg-black text-white" 
              : "border-gray-300 hover:border-black"
          }`}
        >
          Dine-in
        </button>
        <button
          onClick={() => {
            setOrderType("takeaway");  // ✅ MUST be "takeaway"
            setTableNumber("");
          }}
          className={`px-4 py-2 rounded-lg border ${
            orderType === "takeaway" 
              ? "border-black bg-black text-white" 
              : "border-gray-300 hover:border-black"
          }`}
        >
          Takeaway
        </button>
      </div>
      
      {orderType === "dine_in" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Table Number *
          </label>
          <input
            type="text"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            placeholder="Enter table number (e.g., 5, A1, etc.)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-black focus:ring-0"
            required
          />
          <p className="text-xs text-gray-400 mt-1">Required for dine-in orders</p>
        </div>
      )}
    </div>
  );
};

export default OrderTypeSelector;