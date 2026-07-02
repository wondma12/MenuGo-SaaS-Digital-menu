

import React from "react";
import {
  Shield,
  UserCheck,
  Store,
  Utensils,
  Ban,
  ChevronRight,
  UserPlus,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";

const UserCard = ({ user, onAction }) => {
  const getRoleIcon = (role) => {
    switch (role) {
      case "platform_admin":
        return Shield;
      case "restaurant_admin":
        return Store;
      case "waiter":
        return Utensils;
      default:
        return Shield;
    }
  };

  const getRoleDisplay = (role) => {
    switch (role) {
      case "platform_admin":
        return "Platform Admin";
      case "restaurant_admin":
        return "Restaurant Owner";
      case "waiter":
        return "Waiter";
      default:
        return role || "User";
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "platform_admin":
        return "bg-black text-white";
      case "restaurant_admin":
        return "bg-zinc-100 text-black";
      case "waiter":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-zinc-100 text-black";
    }
  };

  const getCardStyles = () => {
    if (user.is_active === false) {
      return "bg-zinc-50 border-dashed border-zinc-300 opacity-60";
    }
    return "bg-white border-zinc-200 hover:border-black";
  };

  const RoleIcon = getRoleIcon(user.role);
  const isDisabled = user.is_active === false;

  
  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return null;
    }
  };

  
  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div
      className={`border rounded-lg overflow-hidden flex flex-col group transition-colors duration-300 ${getCardStyles()}`}
    >
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <span
            className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded ${getRoleBadge(user.role)}`}
          >
            {getRoleDisplay(user.role)}
          </span>
          <RoleIcon className="w-5 h-5 text-zinc-300" />
        </div>

        {}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {user.profile_image ? (
              <img 
                src={user.profile_image} 
                alt={user.name} 
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.textContent = getInitials(user.name);
                }}
              />
            ) : (
              getInitials(user.name)
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-black">{user.name || "Unknown User"}</h3>
            <div className="flex items-center gap-1 text-sm text-zinc-500">
              <Mail className="w-3 h-3" />
              <span className="text-xs truncate max-w-[150px]">{user.email}</span>
            </div>
          </div>
        </div>

        {}
        <div className="space-y-1 text-xs text-zinc-500 mt-3">
          {user.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3" />
              <span>{user.phone}</span>
            </div>
          )}
          {user.created_at && (
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              <span>Joined {formatDate(user.created_at)}</span>
            </div>
          )}
        </div>

        {}
        {user.restaurant_id && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-50 rounded-full border border-zinc-100 mt-3">
            <span className="text-[10px] font-bold uppercase tracking-tighter text-zinc-500">
              Linked:
            </span>
            <span className="text-xs font-bold text-black truncate max-w-[120px]">
              {user.linkedRestaurant || `Restaurant #${user.restaurant_id}`}
            </span>
          </div>
        )}

        {}
        {isDisabled && (
          <p className="text-[10px] text-red-600 font-bold uppercase mt-2">
            Disabled on {formatDate(user.updated_at) || 'Unknown date'}
          </p>
        )}
      </div>

      {}
      <div
        className={`p-4 flex flex-col gap-1 border-t ${isDisabled ? "bg-zinc-100/50 border-zinc-200" : "border-zinc-100 bg-zinc-50"}`}
      >
        {isDisabled ? (
          <button
            className="w-full text-center py-2 text-xs font-bold border border-zinc-300 bg-white rounded hover:bg-black hover:text-white transition-colors"
            onClick={() => onAction("reactivate", user)}
          >
            Reactivate Account
          </button>
        ) : (
          <>
            {user.restaurant_id && (
              <button
                className="w-full text-left px-3 py-2 text-xs font-bold bg-black text-white rounded flex justify-between items-center hover:bg-zinc-800 transition-colors"
                onClick={() => onAction("viewRestaurant", user)}
              >
                View Linked Restaurant
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <div className="flex gap-2">
              <button
                className="flex-1 text-center py-2 text-xs font-bold border border-zinc-200 bg-white rounded hover:bg-black hover:text-white transition-colors"
                onClick={() => onAction("resetPassword", user)}
              >
                Reset PW
              </button>
              <button
                className="flex-1 text-center py-2 text-xs font-bold border border-zinc-200 bg-white rounded hover:border-red-600 hover:text-red-600 transition-colors"
                onClick={() => onAction("disable", user)}
              >
                Disable
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCard;