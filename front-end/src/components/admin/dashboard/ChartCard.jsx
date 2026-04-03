import React, { useState } from "react";
import Card from "../../ui/Card";
import { BarChart3, TrendingUp, Calendar } from "lucide-react";

const ChartCard = ({ title, children, onTimeRangeChange }) => {
  const [timeRange, setTimeRange] = useState("week");

  const handleRangeChange = (range) => {
    setTimeRange(range);
    if (onTimeRangeChange) onTimeRangeChange(range);
  };

  return (
    <Card title={title}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 size={18} className="text-gray-400" />
          <span className="text-xs text-gray-500">Analytics</span>
        </div>
        <div className="flex gap-1">
          {["day", "week", "month"].map((range) => (
            <button
              key={range}
              onClick={() => handleRangeChange(range)}
              className={`px-3 py-1 text-xs rounded-lg transition-all ${
                timeRange === range
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        {children}
      </div>
    </Card>
  );
};

export default ChartCard;