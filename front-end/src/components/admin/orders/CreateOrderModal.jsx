// src/components/admin/orders/CreateOrderModal.jsx
import React, { useState } from "react";

const CreateOrderModal = ({ isOpen, onClose, onCreate }) => {
  const [tableNumber, setTableNumber] = useState("");
  const [itemsText, setItemsText] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple parsing: itemsText as "Item Name, quantity, price" per line
    const items = itemsText.split("\n").filter((line) => line.trim()).map((line) => {
      const parts = line.split(",");
      return {
        name: parts[0]?.trim() || "Unknown",
        quantity: parseInt(parts[1]) || 1,
        price: parseFloat(parts[2]) || 0,
      };
    });
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    onCreate({
      tableNumber: parseInt(tableNumber),
      items,
      total,
      status,
    });
    onClose();
    setTableNumber("");
    setItemsText("");
    setStatus("pending");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full">
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h2 className="font-h2 text-h2 text-black">Create New Order</h2>
            <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded-sm">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block font-label-caps text-label-caps text-secondary mb-2">
                Table Number
              </label>
              <input
                type="number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-black focus:ring-0"
                required
              />
            </div>
            <div>
              <label className="block font-label-caps text-label-caps text-secondary mb-2">
                Items (Name, Quantity, Price per line)
              </label>
              <textarea
                value={itemsText}
                onChange={(e) => setItemsText(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-black focus:ring-0"
                placeholder="Wagyu Ribeye, 1, 84&#10;Coke, 2, 3.5"
                required
              />
            </div>
            <div>
              <label className="block font-label-caps text-label-caps text-secondary mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:border-black focus:ring-0"
              >
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="preparing">Preparing</option>
                <option value="served">Served</option>
              </select>
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:opacity-90"
              >
                Create Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderModal;