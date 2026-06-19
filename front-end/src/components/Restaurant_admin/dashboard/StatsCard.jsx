// src/components/Restaurant_admin/dashboard/StatsCard.jsx

import React from 'react';

const StatsCard = ({ title, value, icon, badge, badgeColor }) => {
  const badgeStyles = {
    green: 'bg-green-100 text-green-700',
    black: 'bg-black text-white',
    neutral: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          {title}
        </p>
        <span className="material-symbols-outlined text-gray-400">{icon}</span>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {badge && (
          <span className={`px-2 py-1 text-xs font-medium rounded ${badgeStyles[badgeColor] || 'bg-gray-100 text-gray-700'}`}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;