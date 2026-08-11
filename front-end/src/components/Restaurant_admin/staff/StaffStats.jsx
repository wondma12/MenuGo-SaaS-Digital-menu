
import React from 'react';

const StaffStats = ({ stats }) => {
  const statItems = [
    { label: 'Total Staff', value: stats.totalStaff },
    { label: 'Active Now', value: stats.activeNow },
    { label: 'Admins', value: stats.admins },
    { label: 'Waitstaff', value: stats.waitstaff },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
      {statItems.map((item, idx) => (
        <div
          key={idx}
          className="bg-white p-6 border border-neutral-200 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
        >
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            {item.label}
          </span>
          <p className="text-3xl font-bold text-black mt-2">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StaffStats;