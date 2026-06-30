
import React from 'react';
import MenuItemRow from './MenuItemRow';

const MenuItemList = ({ items, onEdit, onDelete }) => {
  if (items.length === 0) {
    return (
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-6xl text-neutral-300 mb-4">restaurant_menu</span>
          <p className="text-secondary font-body-md">No menu items found</p>
          <p className="text-secondary text-sm mt-1">Try adjusting your search or filter</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-low border-b border-neutral-200">
            <th className="px-6 py-4 font-label-caps text-label-caps text-black">Image</th>
            <th className="px-6 py-4 font-label-caps text-label-caps text-black">Name</th>
            <th className="px-6 py-4 font-label-caps text-label-caps text-black">Category</th>
            <th className="px-6 py-4 font-label-caps text-label-caps text-black">Price</th>
            <th className="px-6 py-4 font-label-caps text-label-caps text-black">Availability</th>
            <th className="px-6 py-4 font-label-caps text-label-caps text-black text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {items.map((item) => (
            <MenuItemRow 
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuItemList;