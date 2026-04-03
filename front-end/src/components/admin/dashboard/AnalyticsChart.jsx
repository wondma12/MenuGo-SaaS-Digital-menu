import React, { useState } from "react";
import ChartCard from "./ChartCard";
import { TrendingUp, DollarSign, ShoppingBag } from "lucide-react";

const AnalyticsChart = ({ data, type = "orders" }) => {
  const [hoveredBar, setHoveredBar] = useState(null);

  const maxValue = Math.max(...(type === "orders" ? data.orders : data.revenue));
  const totalValue = type === "orders" 
    ? data.orders.reduce((a, b) => a + b, 0)
    : data.revenue.reduce((a, b) => a + b, 0);

  const chartData = type === "orders" ? data.orders : data.revenue;
  const color = type === "orders" ? "blue" : "green";

  return (
    <ChartCard title={type === "orders" ? "Order Trends" : "Revenue Analytics"}>
      <div className="space-y-4">
        {/* Summary Stats */}
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            {type === "orders" ? (
              <ShoppingBag size={18} className="text-blue-500" />
            ) : (
              <DollarSign size={18} className="text-green-500" />
            )}
            <span className="text-sm text-gray-600">
              Total {type === "orders" ? "Orders" : "Revenue"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {type === "orders" ? totalValue : `$${totalValue}`}
            </span>
            <span className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp size={12} />
              +12%
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="h-64">
          <div className="flex items-end gap-2 h-full">
            {chartData.map((value, idx) => {
              const height = (value / maxValue) * 200;
              const isHovered = hoveredBar === idx;
              
              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center gap-2 group"
                  onMouseEnter={() => setHoveredBar(idx)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className="relative w-full">
                    <div
                      className={`w-full bg-${color}-500 rounded-t-lg transition-all duration-300 cursor-pointer ${
                        isHovered ? `bg-${color}-600` : `bg-${color}-500`
                      }`}
                      style={{ height: `${height}px` }}
                    >
                      {/* Tooltip */}
                      <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap transition-opacity duration-200 ${
                        isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}>
                        {type === "orders" ? `${value} orders` : `$${value}`}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{data.labels[idx]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insights */}
        <div className="pt-4 border-t">
          <p className="text-xs text-gray-500">
            📊 Peak performance on{" "}
            <span className="font-semibold text-gray-700">
              {data.labels[chartData.indexOf(Math.max(...chartData))]}
            </span>
            {" "}with {type === "orders" ? Math.max(...chartData) : `$${Math.max(...chartData)}`}
          </p>
        </div>
      </div>
    </ChartCard>
  );
};

export default AnalyticsChart;