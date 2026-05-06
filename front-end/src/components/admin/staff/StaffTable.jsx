// src/components/admin/Staff/StaffTable.jsx
import React from 'react';
import StaffRow from './StaffRow';

const StaffTable = ({ staff = [], onEdit, onDelete, currentPage, totalPages, onPageChange }) => {
  const rows = Array.isArray(staff) ? staff : [];
  return (
    <div className="bg-white mt-10 border border-neutral-200 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-neutral-50 border-b border-neutral-200">
            <th className="px-6 py-4 font-label-caps text-label-caps text-secondary uppercase">
              Name &amp; Contact
            </th>
            <th className="px-6 py-4 font-label-caps text-label-caps text-secondary uppercase">
              Role
            </th>
            <th className="px-6 py-4 font-label-caps text-label-caps text-secondary uppercase">
              Status
            </th>
            <th className="px-6 py-4 font-label-caps text-label-caps text-secondary uppercase">
              Join Date
            </th>
            <th className="px-6 py-4 font-label-caps text-label-caps text-secondary uppercase text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {rows.map((member) => (
            <StaffRow key={member.id} staff={member} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
          <p className="font-body-sm text-neutral-500">
          Showing 1 to {rows.length} of {rows.length} staff members
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded bg-white hover:bg-neutral-100 transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm"></span>
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded bg-white hover:bg-neutral-100 transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffTable;