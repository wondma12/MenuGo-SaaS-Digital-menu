import React from "react";

const StaffStats = ({ stats }) => {
  const statCards = [
    { title: "Total Staff", value: stats.totalStaff, color: "blue", icon: "👥" },
    { title: "Active", value: stats.activeStaff, color: "green", icon: "✅" },
    { title: "Inactive", value: stats.inactiveStaff, color: "red", icon: "⭕" },
    { title: "Waiters", value: stats.waiters, color: "green", icon: "👨‍🍳" },
    { title: "Kitchen", value: stats.kitchen, color: "orange", icon: "🍳" },
    { title: "Managers", value: stats.managers, color: "blue", icon: "👔" },
    { title: "On Shift", value: stats.onShift, color: "purple", icon: "🕒" },
  ];

  const colorClasses = {
    blue: "border-blue-500",
    green: "border-green-500",
    red: "border-red-500",
    orange: "border-orange-500",
    purple: "border-purple-500",
  };

  const textColorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
    orange: "text-orange-600",
    purple: "text-purple-600",
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`bg-white rounded-lg p-4 shadow-sm border-l-4 ${colorClasses[stat.color]}`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">{stat.title}</p>
            <span className="text-lg">{stat.icon}</span>
          </div>
          <p className={`text-2xl font-bold mt-1 ${textColorClasses[stat.color]}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StaffStats;