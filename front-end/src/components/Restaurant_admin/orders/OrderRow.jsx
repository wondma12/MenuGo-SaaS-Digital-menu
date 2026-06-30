
import React from "react";
import OrderStatusBadge from "./OrderStatusBadge";

const OrderRow = ({ order, onView }) => {
  return (
    <tr className="hover:bg-neutral-50 transition-colors">
      <td className="px-6 py-4 font-body-sm font-semibold text-black">
        {order.id}
      </td>
      <td className="px-6 py-4 font-body-sm text-secondary">
        Table {order.tableNumber}
      </td>
      <td className="px-6 py-4">
        <OrderStatusBadge status={order.status} />
      </td>
      <td className="px-6 py-4 font-body-sm text-secondary">{order.time}</td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={() => onView(order)}
          className="text-black font-button text-xs hover:underline decoration-2 underline-offset-4"
        >
          View
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;