// src/components/admin/dashboard/StatsCard.jsx
import React from 'react';

const StatsCard = ({ title, value, icon, badge, badgeColor = 'neutral', trend = null }) => {
  const getBadgeClasses = () => {
    switch (badgeColor) {
      case 'green':
        return 'text-green-600 bg-green-50';
      case 'black':
        return 'text-black bg-neutral-100';
      default:
        return 'text-neutral-400 bg-neutral-50';
    }
  };

  return (
    <div className="bg-white p-6 border border-neutral-200 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex flex-col justify-between group hover:border-black transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="p-3 bg-neutral-50 rounded-lg group-hover:bg-black group-hover:text-white transition-colors">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {badge && (
          <span className={`text-xs px-2 py-1 rounded ${getBadgeClasses()}`}>
            {badge}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-[10px] text-secondary uppercase tracking-widest">{title}</p>
        <p className="font-display text-display text-black mt-1">{value}</p>
        {trend && <p className="text-xs text-secondary mt-1">{trend}</p>}
      </div>
    </div>
  );
};

export default StatsCard;