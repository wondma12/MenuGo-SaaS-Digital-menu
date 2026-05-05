import React from "react";
import {
  Shield,
  UserCheck,
  Store,
  Utensils,
  Ban,
  ChevronRight,
  UserPlus,
} from "lucide-react";

const UserCard = ({ user, onAction }) => {
  const getRoleIcon = (role) => {
    switch (role) {
      case "Platform Admin":
        return Shield;
      case "Platform Admin Verified":
        return UserCheck;
      case "Restaurant Owner":
        return Store;
      case "Restaurant Owner Menu":
        return Utensils;
      case "Disabled":
        return Ban;
      default:
        return Shield;
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "Platform Admin":
      case "Platform Admin Verified":
        return "bg-black text-white";
      case "Restaurant Owner":
      case "Restaurant Owner Menu":
        return "bg-zinc-100 text-black";
      case "Disabled":
        return "bg-zinc-400 text-white";
      default:
        return "bg-zinc-100 text-black";
    }
  };

  const getCardStyles = (role) => {
    if (role === "Disabled") {
      return "bg-zinc-50 border-dashed border-zinc-300 opacity-60";
    }
    return "bg-white border-zinc-200 hover:border-black";
  };

  const RoleIcon = getRoleIcon(user.role);

  if (user.type === "addNew") {
    return (
      <button className="border-2 border-dashed border-zinc-200 rounded-lg flex flex-col items-center justify-center p-8 gap-4 hover:border-black hover:bg-white transition-all group">
        <div className="w-12 h-12 rounded-full border-2 border-zinc-200 flex items-center justify-center group-hover:border-black transition-colors">
          <UserPlus className="w-6 h-6 text-zinc-300 group-hover:text-black" />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-black">Add New Entry</p>
          <p className="text-xs text-zinc-500">
            Invite a new administrator or owner
          </p>
        </div>
      </button>
    );
  }

  return (
    <div
      className={`border rounded-lg overflow-hidden flex flex-col group transition-colors duration-300 ${getCardStyles(user.role)}`}
    >
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <span
            className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded ${getRoleBadge(user.role)}`}
          >
            {user.role}
          </span>
          <RoleIcon className="w-5 h-5 text-zinc-300" />
        </div>

        <h3 className="text-xl font-bold text-black mb-1">{user.name}</h3>
        <p className="text-sm text-zinc-500 mb-4">{user.email}</p>

        {user.lastActive && (
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="text-sm">⏱</span>
            <span className="text-xs">Last active: {user.lastActive}</span>
          </div>
        )}

        {user.linkedRestaurant && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-50 rounded-full border border-zinc-100 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-tighter text-zinc-500">
              Linked:
            </span>
            <span className="text-xs font-bold text-black">
              {user.linkedRestaurant}
            </span>
          </div>
        )}

        {user.disabledDate && (
          <p className="text-[10px] text-red-600 font-bold uppercase">
            Disabled on {user.disabledDate}
          </p>
        )}
      </div>

      <div
        className={`p-4  flex flex-col gap-1 border-t ${user.role === "Disabled" ? "bg-zinc-100/50 border-zinc-200" : " border-zinc-100  bg-zinc-50 "}`}
      >
        {user.role === "Disabled" ? (
          <button
            className="w-full text-center py-2 text-xs font-bold border border-zinc-300 bg-white rounded hover:bg-black hover:text-white transition-colors"
            onClick={() => onAction("reactivate", user)}
          >
            Reactivate Account
          </button>
        ) : (
          <>
            {user.linkedRestaurant && (
              <div className="mb-2">
                <button
                  className="w-full text-left px-3 py-2 text-xs font-bold bg-black text-white rounded flex justify-between items-center group-hover:bg-zinc-800"
                  onClick={() => onAction("viewRestaurant", user)}
                >
                  View Linked Restaurant
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
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
                {user.role === "Restaurant Owner" ? "Disable User" : "Disable"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCard;
