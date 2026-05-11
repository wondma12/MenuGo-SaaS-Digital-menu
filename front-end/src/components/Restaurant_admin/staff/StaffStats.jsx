// src/components/admin/Staff/StaffStats.jsx
import React from 'react';

const StaffStats = ({ stats }) => {
  const statItems = [
    { label: 'Total Staff', value: stats.totalStaff },
    { label: 'Active Now', value: stats.activeNow, dot: true },
    { label: 'Admins', value: stats.admins },
    { label: 'Waitstaff', value: stats.waitstaff },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10 h-24  mb-2">
      
      {statItems.map((item, idx) => (
        <div
          key={idx}
          className="bg-white p-lg  border border-neutral-200 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
        >
          <p className="font-label-caps font-display text-h1 mt-2 text-label-caps text-secondary mb-2 uppercase">{item.label}</p>
          {item.dot ? (
            <div className="flex items-baseline gap-2">
              <p className="font-h1 text-h1">{item.value}</p>
              <span className="w-2 h-2 rounded-full bg-black mb-1"></span>
            </div>
          ) : (
            <p className="font-h1 text-h1">{item.value}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default StaffStats;