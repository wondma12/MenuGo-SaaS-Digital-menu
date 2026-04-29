import React from "react";
import { Edit, Trash2, CheckCircle2, XCircle } from "lucide-react";

const MenuItemRow = ({ item, onEdit, onDelete, onToggleAvailability }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-11 h-11 rounded-2xl object-cover border border-slate-200"
            />
          ) : (
            <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
              {item.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{item.name}</p>
            <p className="text-xs text-gray-500">{item.description}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-gray-700">${item.price.toFixed(2)}</td>
      <td className="px-4 py-3 text-gray-700">{item.category}</td>
      <td className="px-4 py-3 text-gray-700">{item.calories} kcal</td>
      <td className="px-4 py-3">
        <button
          onClick={() => onToggleAvailability(item.id)}
          className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full transition-colors ${
            item.isAvailable
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {item.isAvailable ? (
            <CheckCircle2 size={14} />
          ) : (
            <XCircle size={14} />
          )}
          {item.isAvailable ? "Available" : "Unavailable"}
        </button>
      </td>
      <td className="px-4 py-3 text-gray-500">
        {item.isPopular ? "Yes" : "No"}
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">
        {new Date(item.updatedAt).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit item"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            title="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MenuItemRow;
