import React from "react";
import OrderStatusBadge from "./OrderStatusBadge";
import { Eye } from "lucide-react";

const OrderRow = ({ order, onStatusChange, onViewDetails }) => {
  const statusOptions = ["pending", "verified", "preparing", "ready", "served", "cancelled"];

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-medium text-gray-900">#{order.id}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Table {order.tableNumber}</span>
          {order.isTakeaway && (
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">Takeaway</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-600 space-y-1">
          {order.items.slice(0, 2).map((item, idx) => (
            <div key={idx}>
              {item.quantity}x {item.name}
            </div>
          ))}
          {order.items.length > 2 && (
            <div className="text-xs text-gray-400">+{order.items.length - 2} more</div>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-semibold text-gray-900">
          ${order.total.toFixed(2)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <OrderStatusBadge status={order.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <select
            value={order.status}
            onChange={(e) => onStatusChange(order.id, e.target.value)}
            className="px-2 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <button
            onClick={() => onViewDetails(order)}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default OrderRow;