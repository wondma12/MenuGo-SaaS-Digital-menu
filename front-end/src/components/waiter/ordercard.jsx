
import React from "react";
import { Utensils } from "lucide-react";
import { Timer } from "lucide-react";
const OrderCard = ({ order, onApprove, onReject, onNotifyWaiter }) => {
  const getStatusBadgeClasses = () => {
    switch (order.status) {
      case "PENDING":
        return "bg-black text-white";
      case "VERIFIED":
        return "bg-gray-200 text-gray-600";
      case "PREPARING":
        return "bg-gray-300 text-gray-600";
      case "REJECTED":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  const getActionButtons = () => {
    switch (order.status) {
      case "PENDING":
      case "VERIFIED":
        return (
          <div className="grid grid-cols-2 gap-2 pt-4">
            <button
              className="py-2 border border-black text-black text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => onReject(order.id)}
            >
              Reject
            </button>
            <button
              className="py-2 bg-black text-white text-sm font-medium rounded-lg hover:opacity-80 transition-opacity"
              onClick={() => onApprove(order.id)}
            >
              Approve
            </button>
          </div>
        );
      case "PREPARING":
        return (
          <div className="grid grid-cols-2 gap-2 pt-4">
            <button
              className="py-2 border border-black text-black text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => onNotifyWaiter(order.id)}
            >
              Notify Waiter
            </button>
            <button className="py-2 bg-gray-300 text-gray-600 text-sm font-medium rounded-lg cursor-not-allowed">
              In Progress
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-4 ${
        order.status === "PREPARING" ? "opacity-90" : ""
      }`}
    >
      {}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[42px] font-black leading-none">
            {order.tableNumber}
          </span>
          <p className="text-xs uppercase text-gray-500 mt-1 font-semibold">
            Table Number
          </p>
        </div>
        <div className="text-right">
          <span
            className={`px-2 py-1 rounded-lg text-[10px] font-semibold ${getStatusBadgeClasses()}`}
          >
            {order.status}
          </span>
          <p className="text-sm font-semibold mt-1">ID: {order.id}</p>
        </div>
      </div>

      {}
      <div className="flex justify-even gap-10 py-2 border-y border-gray-200 text-gray-500">
        <div className="flex items-center gap-2">
          <Utensils className="w-6 h-6" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700">
              {order.itemCount}
            </span>
            <span className="text-xs">Items</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Timer className="w-6 h-6" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700">
              {order.timeAgo.split(" ")[0]}
            </span>
            <span className="text-xs">
              {order.timeAgo.split(" ").slice(1).join(" ")}
            </span>
          </div>
        </div>
      </div>

      {}
      <div className="space-y-4 flex-grow">
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={item.image}
                alt={item.name}
              />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium">
              ${Number(item.price).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {}
      {getActionButtons()}
    </div>
  );
};

export default OrderCard;
