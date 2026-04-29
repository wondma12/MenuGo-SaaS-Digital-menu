import React from "react";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  verified: "bg-blue-100 text-blue-800",
  preparing: "bg-purple-100 text-purple-800",
  ready: "bg-indigo-100 text-indigo-800",
  served: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusIcons = {
  pending: "⏳",
  verified: "✓",
  preparing: "🔪",
  ready: "🍽️",
  served: "✅",
  cancelled: "✗",
};

const OrderStatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${statusStyles[status] || statusStyles.pending}`}
    >
      <span>{statusIcons[status] || "•"}</span>
      <span>{status?.toUpperCase() || "PENDING"}</span>
    </span>
  );
};

export default OrderStatusBadge;