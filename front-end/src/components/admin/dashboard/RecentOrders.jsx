import React from "react";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import { Clock, Eye } from "lucide-react";

const RecentOrders = ({ orders, onViewAll, onViewOrder }) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      verified: "bg-blue-100 text-blue-800",
      preparing: "bg-purple-100 text-purple-800",
      ready: "bg-indigo-100 text-indigo-800",
      served: "bg-green-100 text-green-800",
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: "⏳",
      verified: "✓",
      preparing: "🔪",
      ready: "🍽️",
      served: "✅",
    };
    return icons[status] || "📋";
  };

  return (
    <Card title="Recent Orders">
      <div className="space-y-3">
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <Clock size={40} className="mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">No recent orders</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
              onClick={() => onViewOrder && onViewOrder(order)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">#{order.id}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{order.time}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span>Table {order.table}</span>
                  <span>•</span>
                  <span>{order.items} items</span>
                  {order.customer && (
                    <>
                      <span>•</span>
                      <span>{order.customer}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">${order.total.toFixed(2)}</div>
                <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full mt-1 ${getStatusColor(order.status)}`}>
                  <span>{getStatusIcon(order.status)}</span>
                  {order.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <Button 
          label="View All Orders" 
          variant="secondary" 
          onClick={onViewAll}
          className="w-full"
          icon={<Eye size={16} />}
        />
      </div>
    </Card>
  );
};

export default RecentOrders;