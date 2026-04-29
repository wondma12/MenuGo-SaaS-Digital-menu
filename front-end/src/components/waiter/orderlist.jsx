// components/OrdersList.jsx

import OrderCard from "./ordercard";
import { Clipboard } from "lucide-react";

const OrdersList = ({ orders, handlers }) => {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-gray-100 rounded-full p-6 mb-4">
          <Clipboard className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No orders yet
        </h3>
        <p className="text-gray-500 text-center">
          New orders will appear here when customers place them
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Active Orders</h2>
        <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
          {orders.length} {orders.length === 1 ? "order" : "orders"}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="transform transition-all duration-200 hover:scale-101"
          >
            <OrderCard
              order={order}
              onApprove={handlers.approve}
              onReject={handlers.reject}
              onUpdate={handlers.update}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
