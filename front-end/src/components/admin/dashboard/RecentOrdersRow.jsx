// src/components/admin/dashboard/RecentOrdersRow.jsx
import React from 'react';

const RecentOrdersRow = ({ order }) => {
  const getStatusClasses = () => {
    switch (order.status) {
      case 'Served':
        return 'bg-black text-white';
      default:
        return 'bg-neutral-100 text-black';
    }
  };

  return (
    <tr className="hover:bg-neutral-50 transition-colors group">
      <td className="px-6 py-3 text-black font-semibold">{order.id}</td>
      <td className="px-6 py-3 text-secondary">{order.table}</td>
      <td className="px-6 py-3">
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${getStatusClasses()}`}>
          {order.status}
        </span>
      </td>
      <td className="px-6 py-3 text-right font-bold">${order.amount.toFixed(2)}</td>
    </tr>
  );
};

export default RecentOrdersRow;