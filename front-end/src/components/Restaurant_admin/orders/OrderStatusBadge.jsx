
import React from "react";

const statusConfig = {
  pending: {
    classes: "bg-neutral-100 text-neutral-500 border border-neutral-200",
  },
  verified: {
    classes: "bg-neutral-200 text-neutral-700 border border-neutral-300",
  },
  preparing: {
    classes: "bg-neutral-800 text-white",
  },
  served: {
    classes: "bg-black text-white",
  },
  ready: {
    classes: "bg-neutral-700 text-white",
  },
  cancelled: {
    classes: "bg-neutral-300 text-neutral-600",
  },
};

const OrderStatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${config.classes}`}
    >
      {status}
    </span>
  );
};

export default OrderStatusBadge;