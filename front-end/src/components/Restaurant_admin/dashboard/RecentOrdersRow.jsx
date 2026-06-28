// src/components/admin/dashboard/RecentOrdersRow.jsx

import React from 'react';

const RecentOrdersRow = ({ order }) => {
  // ✅ Get status with fallback
  const status = order?.status || 'pending';
  
  const getStatusClasses = () => {
    switch (status) {
      case 'Served':
      case 'served':
        return 'bg-black text-white';
      case 'Pending':
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Verified':
      case 'verified':
        return 'bg-blue-100 text-blue-700';
      case 'Preparing':
      case 'preparing':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-neutral-100 text-black';
    }
  };

  // ✅ Get amount with fallback
  const amount = order?.total_price || order?.amount || 0;
  const orderId = order?.order_number || order?.id || 'N/A';
  const tableNumber = order?.table_number || order?.table || 'N/A';

  return (
    <tr className="hover:bg-neutral-50 transition-colors group">
      <td className="px-6 py-3 text-black font-semibold">{orderId}</td>
      <td className="px-6 py-3 text-secondary">{tableNumber}</td>
      <td className="px-6 py-3">
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${getStatusClasses()}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-3 text-right font-bold">
        ${typeof amount === 'number' ? amount.toFixed(2) : '0.00'}
      </td>
    </tr>
  );
};

export default RecentOrdersRow;