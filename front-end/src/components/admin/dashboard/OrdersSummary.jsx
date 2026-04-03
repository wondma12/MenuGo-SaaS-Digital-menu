import React from "react";
import Card from "../../ui/Card";
import { Clock, CheckCircle, Package, Truck } from "lucide-react";

const OrdersSummary = ({ orders }) => {
  const statuses = [
    { 
      label: "Pending", 
      value: orders.filter(o => o.status === "pending").length, 
      color: "yellow",
      icon: Clock,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700"
    },
    { 
      label: "Verified", 
      value: orders.filter(o => o.status === "verified").length, 
      color: "blue",
      icon: CheckCircle,
      bgColor: "bg-blue-50",
      textColor: "text-blue-700"
    },
    { 
      label: "Preparing", 
      value: orders.filter(o => o.status === "preparing").length, 
      color: "purple",
      icon: Package,
      bgColor: "bg-purple-50",
      textColor: "text-purple-700"
    },
    { 
      label: "Ready/Served", 
      value: orders.filter(o => o.status === "ready" || o.status === "served").length, 
      color: "green",
      icon: Truck,
      bgColor: "bg-green-50",
      textColor: "text-green-700"
    },
  ];

  const totalOrders = orders.length;
  const completionRate = ((orders.filter(o => o.status === "served").length / totalOrders) * 100).toFixed(1);

  return (
    <Card title="Orders Summary">
      <div className="space-y-4">
        {/* Status Grid */}
        <div className="grid grid-cols-2 gap-3">
          {statuses.map((status) => {
            const Icon = status.icon;
            return (
              <div key={status.label} className={`${status.bgColor} rounded-lg p-3`}>
                <div className="flex items-center justify-between mb-2">
                  <Icon size={18} className={status.textColor} />
                  <span className={`text-lg font-bold ${status.textColor}`}>{status.value}</span>
                </div>
                <p className={`text-xs font-medium ${status.textColor}`}>{status.label}</p>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="pt-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Completion Rate</span>
            <span>{completionRate}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Avg. Time</p>
            <p className="text-sm font-semibold text-gray-900">18 min</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Peak Hour</p>
            <p className="text-sm font-semibold text-gray-900">7:00 PM</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrdersSummary;