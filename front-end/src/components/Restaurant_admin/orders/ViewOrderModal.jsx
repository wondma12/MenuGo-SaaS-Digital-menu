
import React from "react";
import OrderStatusBadge from "./OrderStatusBadge";

const ViewOrderModal = ({ order, onClose }) => {
  if (!order) return null;

  const total = order.total ?? (order.items ? order.items.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0) : 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full">
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h2 className="font-h2 text-h2 text-black">Order {order.id}</h2>
            <div className="flex items-center space-x-3">
              <OrderStatusBadge status={order.status} />
              <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded-sm">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex justify-between">
              <div className="text-sm text-secondary">Table</div>
              <div className="font-semibold">{order.tableNumber}</div>
            </div>
            <div>
              <div className="text-sm text-secondary mb-2">Items</div>
              <ul className="divide-y divide-neutral-100">
                {order.items && order.items.length ? (
                  order.items.map((it, idx) => (
                    <li key={idx} className="flex items-center justify-between py-3">
                      <div>
                        <div className="font-medium">{it.name}</div>
                        <div className="text-xs text-neutral-500">Qty: {it.quantity ?? 1}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${((it.price ?? 0) * (it.quantity ?? 1)).toFixed(2)}</div>
                        <div className="text-xs text-neutral-500">${(it.price ?? 0).toFixed(2)} ea</div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="py-2 text-neutral-500">No items</li>
                )}
              </ul>
            </div>

            <div className="flex justify-between pt-3 border-t border-neutral-100">
              <div className="text-sm text-secondary">Total</div>
              <div className="font-semibold">${total.toFixed(2)}</div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button onClick={onClose} className="flex-1 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;
