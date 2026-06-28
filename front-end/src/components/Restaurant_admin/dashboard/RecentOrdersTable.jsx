// src/components/admin/dashboard/RecentOrdersTable.jsx

import React from 'react';
import RecentOrdersRow from './RecentOrdersRow';

const RecentOrdersTable = ({ orders = [], onViewAll }) => {
  // ✅ Ensure orders is an array
  const ordersArray = Array.isArray(orders) ? orders : [];

  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-900">Recent Orders</h3>
        <button
          onClick={onViewAll}
          className="text-xs font-medium text-gray-500 hover:text-black transition-colors"
        >
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-neutral-50/50 border-b border-neutral-100">
            <tr>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500">Order ID</th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500">Table</th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {ordersArray.length > 0 ? (
              ordersArray.map((order) => (
                <RecentOrdersRow key={order.id || order.order_number} order={order} />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-400">
                  No recent orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;