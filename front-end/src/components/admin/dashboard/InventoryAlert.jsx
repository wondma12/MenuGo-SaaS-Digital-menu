// src/components/admin/dashboard/InventoryAlert.jsx
import React from 'react';

const InventoryAlert = ({ itemCount = 3, onDismiss, onRestock }) => {
  return (
    <div className="bg-surface-container-low border border-neutral-200 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 flex items-center justify-center bg-white rounded border border-neutral-200">
          <span className="material-symbols-outlined text-black"></span>
        </div>
        <div>
          <h4 className="font-h3 text-[16px] text-black">Inventory Update</h4>
          <p className="text-sm text-secondary">
            {itemCount} items from 'Main Menu' are currently running low on stock.
          </p>
        </div>
      </div>
      <div className="flex space-x-3">
        <button
          onClick={onDismiss}
          className="px-4 py-2 border border-black text-black text-sm font-medium rounded hover:bg-neutral-50 transition-colors"
        >
          Dismiss
        </button>
        <button
          onClick={onRestock}
          className="px-4 py-2 bg-black text-white text-sm font-medium rounded hover:bg-neutral-800 transition-colors"
        >
          Restock Now
        </button>
      </div>
    </div>
  );
};

export default InventoryAlert;