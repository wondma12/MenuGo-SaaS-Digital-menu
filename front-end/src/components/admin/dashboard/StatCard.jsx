import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({ title, value, color = "black", trend, trendValue, subtitle, icon }) => {
  const colorClasses = {
    orange: "bg-orange-50 text-orange-600 border-orange-500",
    blue: "bg-blue-50 text-blue-600 border-blue-500",
    green: "bg-green-50 text-green-600 border-green-500",
    purple: "bg-purple-50 text-purple-600 border-purple-500",
    red: "bg-red-50 text-red-600 border-red-500",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-500",
    pink: "bg-pink-50 text-pink-600 border-pink-500",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-500",
    black: "bg-gray-900 text-white border-gray-900",
  };

  const classes = colorClasses[color] || colorClasses.black;
  const parts = classes.split(" ");

  const Icon = icon;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-2xl font-bold mt-2 text-gray-900">{value}</p>
            {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
            {trend && (
              <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${parts[0]} ${parts[1]}`}>
            {Icon ? <Icon size={24} /> : null}
          </div>
        </div>
      </div>
      <div className={`h-1 ${parts[2] || ''}`} />
    </div>
  );
};

export default StatCard;