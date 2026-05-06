// src/components/admin/dashboard/StaffOnDuty.jsx
import React from 'react';

const StaffOnDuty = ({ staff, onManageShift }) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-h3 text-[16px] text-black">Active Staff</h4>
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
      </div>
      <div className="space-y-3">
        {staff.map((member) => (
          <div key={member.id} className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-neutral-100 overflow-hidden grayscale">
              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-black">{member.name}</p>
              <p className="text-[10px] text-neutral-400 uppercase tracking-tighter">{member.role}</p>
            </div>
          </div>
        ))}
        <button
          onClick={onManageShift}
          className="w-full py-2 border border-neutral-200 rounded text-sm font-medium hover:border-black transition-colors"
        >
          Manage Shift
        </button>
      </div>
    </div>
  );
};

export default StaffOnDuty;