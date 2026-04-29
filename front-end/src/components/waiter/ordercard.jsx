// components/OrderCard.jsx

import StatusBadge from "./statusbage";
import { Home, Check, X, Plus, CheckCircle, Clock, Users } from "lucide-react";

const OrderCard = ({ order, onApprove, onReject, onUpdate }) => {
  // Calculate total items and estimated time
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const estimatedTime = Math.ceil(totalItems * 5); // 5 minutes per item

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Header Section */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 rounded-lg p-2">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Table #{order.tableNumber}
              </h3>
              <p className="text-sm text-gray-500">Order #{order.id}</p>
            </div>
          </div>
          <StatusBadge status={order.status} />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4">
        {/* Order Info */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{totalItems} items</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>~{estimatedTime} min</span>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Order Items
          </h4>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                {/* Item Image */}
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image || "/api/placeholder/64/64"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-semibold text-gray-900 truncate">
                    {item.name}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {item.description || "Delicious item"}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-bold text-gray-900">
                      ${item.price || "0.00"}
                    </span>
                    <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded-md border border-gray-200">
                      × {item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto space-y-3">
          {order.status === "Pending" && (
            <div className="flex gap-2">
              <button
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-green-600 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                onClick={() => onApprove(order.id)}
              >
                <Check className="w-4 h-4" />
                Approve
              </button>
              <button
                className="flex-1 bg-gray-100 hover:bg-gray-300 text-red-600 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                onClick={() => onReject(order.id)}
              >
                <X className="w-4 h-4" />
                Reject
              </button>
            </div>
          )}

          {order.status === "Verified" && (
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              onClick={() => onUpdate(order.id, "Preparing")}
            >
              <Plus className="w-4 h-4" />
              Start Preparing
            </button>
          )}

          {order.status === "Preparing" && (
            <button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              onClick={() => onUpdate(order.id, "Served")}
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Served
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
