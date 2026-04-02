import React, { useState } from 'react';
import { Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
// import Button from '../../../global-component/ui/Button';
import AvailabilityToggle from './AvailabilityToggle';

const MenuItemRow = ({ item, onEdit, onDelete, onToggleAvailability }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* Item Image & Name */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.name}
              className="h-12 w-12 rounded-lg object-cover"
            />
          ) : (
            <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-xs text-gray-500">No img</span>
            </div>
          )}
          <div>
            <div className="font-medium text-gray-900">{item.name}</div>
            <div className="text-sm text-gray-500 line-clamp-1">{item.description}</div>
          </div>
        </div>
      </td>
      
      {/* Category */}
      <td className="px-6 py-4">
        <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
          {item.category}
        </span>
      </td>
      
      {/* Price */}
      <td className="px-6 py-4">
        <span className="font-semibold text-gray-900">${parseFloat(item.price).toFixed(2)}</span>
      </td>
      
      {/* Status */}
      <td className="px-6 py-4">
        <AvailabilityToggle 
          isAvailable={item.isAvailable}
          onToggle={() => onToggleAvailability(item.id, item.isAvailable)}
        />
        <span className="ml-2 text-xs text-gray-500">
          {item.isAvailable ? 'Available' : 'Out of stock'}
        </span>
      </td>
      
      {/* Actions */}
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(item)}
            className="rounded-lg p-2 text-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-colors"
            title="Edit Item"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="rounded-lg p-2 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
            title="Delete Item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MenuItemRow;