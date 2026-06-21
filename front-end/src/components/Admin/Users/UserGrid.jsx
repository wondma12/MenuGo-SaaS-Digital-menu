// src/components/Admin/Users/UserGrid.jsx

import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const UserGrid = ({ 
  activeTab, 
  users = [], 
  onUserUpdate, 
  onUserDelete, 
  onUserStatusToggle 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [localUsers, setLocalUsers] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);

  // Sync users prop with local state
  useEffect(() => {
    setLocalUsers(users || []);
  }, [users]);

  const getFilteredUsers = () => {
    switch (activeTab) {
      case "Platform Admins":
        return localUsers.filter(
          (user) => user.role === "platform_admin"
        );
      case "Restaurant Admins":
        return localUsers.filter(
          (user) => user.role === "restaurant_admin" || user.role === "waiter"
        );
      default:
        return localUsers;
    }
  };

  const filteredUsers = getFilteredUsers();
  const usersPerPage = 6;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handleAction = async (action, user) => {
    setActionLoading(true);
    console.log(`Action: ${action} on user:`, user);

    try {
      switch (action) {
        case "resetPassword":
          // Handle password reset - would send email
          if (window.confirm(`Send password reset email to ${user.name}?`)) {
            alert(`Password reset email sent to ${user.email}`);
          }
          break;

        case "disable":
          if (window.confirm(
            `Are you sure you want to disable ${user.name}? This will prevent them from accessing the platform.`
          )) {
            if (onUserStatusToggle) {
              await onUserStatusToggle(user.id, user.is_active);
            }
          }
          break;

        case "reactivate":
          if (window.confirm(`Are you sure you want to reactivate ${user.name}?`)) {
            if (onUserStatusToggle) {
              await onUserStatusToggle(user.id, user.is_active);
            }
          }
          break;

        case "viewRestaurant":
          if (user.restaurant_id) {
            window.location.href = `/admin/restaurants/${user.restaurant_id}`;
          }
          break;

        case "delete":
          if (window.confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
            if (onUserDelete) {
              await onUserDelete(user.id);
            }
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(`Error handling action ${action}:`, error);
      alert(`Failed to ${action}. Please try again.`);
    } finally {
      setActionLoading(false);
    }
  };

  // No users found
  if (filteredUsers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">👤</div>
        <p className="text-zinc-600 font-semibold">No Users Found</p>
        <p className="text-zinc-400 text-sm mt-1">
          {activeTab === "All Accounts" 
            ? "No users registered yet." 
            : `No users found with role: ${activeTab}`}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* User Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {currentUsers.map((user) => (
          <UserCard 
            key={user.id} 
            user={user} 
            onAction={handleAction}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 border-t border-zinc-200">
          <p className="text-sm text-zinc-500">
            Showing{" "}
            <span className="font-bold text-black">
              {startIndex + 1} - {Math.min(endIndex, filteredUsers.length)}
            </span>{" "}
            of {filteredUsers.length} users
          </p>
          <div className="flex gap-2">
            <button
              className="w-10 h-10 border border-zinc-200 bg-white flex items-center justify-center rounded hover:border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {[...Array(Math.min(totalPages, 5))].map((_, index) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = index + 1;
              } else if (currentPage <= 3) {
                pageNum = index + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + index;
              } else {
                pageNum = currentPage - 2 + index;
              }

              if (pageNum < 1 || pageNum > totalPages) return null;

              return (
                <button
                  key={pageNum}
                  className={`w-10 h-10 border flex items-center justify-center rounded transition-colors ${
                    currentPage === pageNum
                      ? "border-black bg-black text-white"
                      : "border-zinc-200 bg-white hover:border-black"
                  }`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="flex items-center text-zinc-400 px-1">...</span>
            )}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                className="w-10 h-10 border border-zinc-200 bg-white flex items-center justify-center rounded hover:border-black transition-colors"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            )}

            <button
              className="w-10 h-10 border border-zinc-200 bg-white flex items-center justify-center rounded hover:border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGrid;