// src/components/admin/dashboard/RecentOrdersTable.jsx
import React from 'react';
import RecentOrdersRow from './RecentOrdersRow';

const RecentOrdersTable = ({ orders, onViewAll }) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
        <h3 className="font-h3 text-h3 text-black">Recent Orders</h3>
        <button
          onClick={onViewAll}
          className="text-sm font-medium text-secondary hover:text-black transition-colors underline underline-offset-4"
        >
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-100">
              <th className="px-6 py-3 text-neutral-400 uppercase text-[10px]">Order ID</th>
              <th className="px-6 py-3 text-neutral-400 uppercase text-[10px]">Table</th>
              <th className="px-6 py-3 text-neutral-400 uppercase text-[10px]">Status</th>
              <th className="px-6 py-3 text-neutral-400 uppercase text-[10px] text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {orders.map((order) => (
              <RecentOrdersRow key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;