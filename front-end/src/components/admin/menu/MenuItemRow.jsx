import React from "react";
import Button from "../../ui/Button";
import AvailabilityToggle from "./AvailabilityToggle";
import { Edit2, Trash2 } from "lucide-react";

const MenuItemRow = ({ item, onEdit, onDelete, onToggleAvailability }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-all duration-200">
      <div className="flex items-center gap-4 flex-1">
        {/* Image */}
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              No img
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            {!item.available && (
              <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full">
                Unavailable
              </span>
            )}
            {item.isPopular && (
              <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-600 rounded-full">
                ★ Popular
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-1 line-clamp-1">{item.description}</p>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-900 font-semibold">${item.price.toFixed(2)}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 capitalize">{item.category}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 ml-4">
        <AvailabilityToggle 
          isAvailable={item.available} 
          onToggle={() => onToggleAvailability(item.id)}
        />
        <button
          onClick={() => onEdit(item)}
          className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
          title="Edit item"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default MenuItemRow;