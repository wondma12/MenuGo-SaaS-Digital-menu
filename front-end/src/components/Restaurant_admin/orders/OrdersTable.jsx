// src/components/admin/orders/OrderTable.jsx
import React from "react";
import OrderRow from "./OrderRow";

const OrderTable = ({ orders, onViewOrder }) => {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-neutral-50 border-b border-neutral-200">
          <th className="px-6 py-4 font-label-caps text-label-caps text-secondary uppercase">
            Order ID
          </th>
          <th className="px-6 py-4 font-label-caps text-label-caps text-secondary uppercase">
            Table Number
          </th>
          <th className="px-6 py-4 font-label-caps text-label-caps text-secondary uppercase">
            Status
          </th>
          <th className="px-6 py-4 font-label-caps text-label-caps text-secondary uppercase">
            Time
          </th>
          <th className="px-6 py-4 font-label-caps text-label-caps text-secondary uppercase text-right">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-neutral-100">
        {orders.map((order) => (
          <OrderRow key={order.id} order={order} onView={onViewOrder} />
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;