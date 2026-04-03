import React from "react";
import RoleBadge from "./RoleBadge";
import { Edit2, Trash2, UserCheck, UserX, Mail, Phone } from "lucide-react";

const StaffRow = ({ staff, onEdit, onDelete, onToggleStatus }) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (id) => {
    const colors = ["bg-blue-100", "bg-green-100", "bg-purple-100", "bg-orange-100", "bg-pink-100"];
    return colors[id % colors.length];
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 ${getRandomColor(staff.id)} rounded-full flex items-center justify-center`}
          >
            <span className="text-sm font-semibold text-gray-600">
              {getInitials(staff.name)}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{staff.name}</p>
            <p className="text-xs text-gray-500">ID: {staff.id}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Mail size={14} className="text-gray-400" />
            <span>{staff.email}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Phone size={14} className="text-gray-400" />
            <span>{staff.phone}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <RoleBadge role={staff.role} />
      </td>
      <td className="px-4 py-3">
        <span
          className={`text-sm ${
            staff.shift === "Morning" ? "text-blue-600" : "text-purple-600"
          }`}
        >
          {staff.shift}
        </span>
      </td>
      <td className="px-4 py-3">
        <button
          onClick={() => onToggleStatus(staff.id)}
          className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full transition-colors ${
            staff.status === "active"
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {staff.status === "active" ? <UserCheck size={12} /> : <UserX size={12} />}
          {staff.status === "active" ? "Active" : "Inactive"}
        </button>
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">
        {new Date(staff.joinDate).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(staff)}
            className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit staff"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(staff.id)}
            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            title="Remove staff"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StaffRow;