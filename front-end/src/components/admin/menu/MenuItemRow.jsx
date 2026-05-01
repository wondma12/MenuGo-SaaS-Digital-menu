// src/components/admin/menu/MenuItemRow.jsx
import React from 'react';

const MenuItemRow = ({ item, onEdit, onDelete }) => {
  const isAvailable = item.available;

  return (
    <tr className={`hover:bg-neutral-50 transition-colors group ${!isAvailable ? 'opacity-60' : ''}`}>
      <td className="px-6 py-4">
        <img 
          className={`w-12 h-12 rounded-lg object-cover border border-neutral-200 ${!isAvailable ? 'grayscale' : ''}`}
          src={item.imageUrl}
          alt={item.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/48x48?text=No+Image';
          }}
        />
      </td>
      <td className="px-6 py-4">
        <div className="font-h3 text-h3 text-black">{item.name}</div>
        <div className="text-xs text-secondary">{item.description}</div>
      </td>
      <td className="px-6 py-4">
        <span className="bg-surface-container px-3 py-1 rounded-full text-label-caps text-black uppercase text-xs">
          {item.category}
        </span>
      </td>
      <td className="px-6 py-4 font-body-md text-black">${item.price.toFixed(2)}</td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-black' : 'bg-neutral-300'}`}></div>
          <span className={`text-body-sm font-medium ${!isAvailable ? 'text-neutral-400' : ''}`}>
            {isAvailable ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="p-2 hover:bg-neutral-100 rounded-sm transition-colors"
            onClick={() => onEdit(item)}
            title="Edit"
          >
            <span className="material-symbols-outlined text-[20px] text-black">edit</span>
          </button>
          <button 
            className="p-2 hover:bg-neutral-100 rounded-sm transition-colors"
            onClick={() => onDelete(item.id)}
            title="Delete"
          >
            <span className="material-symbols-outlined text-[20px] text-error">delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MenuItemRow;