// src/components/admin/Staff/StaffRow.jsx
import React from 'react';
import RoleBadge from './RoleBadge';

const StaffRow = ({ staff, onEdit, onDelete }) => {
  const isOnShift = staff.status === 'active';
  const statusColor = isOnShift ? 'bg-black' : 'bg-neutral-300';
  const statusText = isOnShift ? 'On Shift' : 'Offline';

  return (
    <tr className="hover:bg-neutral-50/50 transition-colors">
      <td className="px-6 py-3">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-full bg-neutral-100 overflow-hidden border border-neutral-200">
            <img
              src={staff.avatar || 'https://via.placeholder.com/40'}
              alt={staff.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-h3 text-[15px] text-on-surface">{staff.name}</p>
            <p className="text-[13px] text-secondary">{staff.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-3">
        <RoleBadge role={staff.role} />
      </td>
      <td className="px-6 py-3">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${statusColor}`}></span>
          <span className={`font-body-sm ${isOnShift ? 'text-on-surface' : 'text-secondary'}`}>
            {statusText}
          </span>
        </div>
      </td>
      <td className="px-6 py-3 text-secondary font-body-sm">{staff.joinDate}</td>
      <td className="px-6 py-3 text-right">
        <div className="flex justify-end gap-3">
          <button
            onClick={() => onEdit(staff)}
            aria-label="Edit staff"
            title="Edit"
            className="p-1 rounded-sm text-neutral-500 hover:text-black transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(staff.id)}
            aria-label="Delete staff"
            title="Delete"
            className="p-1 rounded-sm text-neutral-500 hover:text-error transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StaffRow;