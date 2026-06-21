// src/pages/Admin/Users.jsx

import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
import UsersSummaryCards from "../../components/Admin/Users/UsersSummaryCards";
import FilterTabs from "../../components/Admin/Users/FilterTabs";
import UserGrid from "../../components/Admin/Users/UserGrid";
import { staffAPI } from "../../services/api";

const Users = () => {
  const [activeTab, setActiveTab] = useState("All Accounts");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =========================================
  // FETCH USERS
  // =========================================

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('[Users] Fetching users...');
      const result = await staffAPI.getAll();
      console.log('[Users] Result:', result);

      // Handle different response formats
      let usersData = [];
      if (Array.isArray(result)) {
        usersData = result;
      } else if (result && result.data && Array.isArray(result.data)) {
        usersData = result.data;
      } else if (result && result.users && Array.isArray(result.users)) {
        usersData = result.users;
      } else {
        usersData = result || [];
      }

      // Transform user data to match component expectations
      const transformedUsers = usersData.map(user => ({
        id: user.id,
        name: user.name || 'Unknown User',
        email: user.email || '',
        role: user.role || 'waiter',
        restaurant_id: user.restaurant_id || null,
        is_active: user.is_active !== false,
        created_at: user.created_at || user.createdAt,
        phone: user.phone || '',
        profile_image: user.profile_image || user.avatar || null,
        linkedRestaurant: user.restaurant_name || null,
        lastActive: user.last_login || user.lastLogin ? new Date(user.last_login || user.lastLogin).toLocaleDateString() : null,
        disabledDate: user.is_active === false ? new Date(user.updated_at || user.updatedAt).toLocaleDateString() : null,
      }));

      setUsers(transformedUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // =========================================
  // HANDLERS
  // =========================================

  const handleUserUpdate = async () => {
    await fetchUsers();
  };

  const handleUserDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await staffAPI.delete(userId);
      await fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  const handleUserStatusToggle = async (userId, currentStatus) => {
    try {
      await staffAPI.update(userId, { is_active: !currentStatus });
      await fetchUsers();
    } catch (err) {
      console.error("Error updating user status:", err);
      alert("Failed to update user status");
    }
  };

  // =========================================
  // LOADING STATE
  // =========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
        <Sidebar role="Platform_admin" />
        <TopHeader
          role="Platform_admin"
          title="Users"
          subtitle="User Management"
        />
        <main className="min-h-screen bg-background">
          <div className="max-w-[1200px] mx-auto p-12">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-zinc-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-zinc-500">Loading users...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // =========================================
  // ERROR STATE
  // =========================================

  if (error) {
    return (
      <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
        <Sidebar role="Platform_admin" />
        <TopHeader
          role="Platform_admin"
          title="Users"
          subtitle="User Management"
        />
        <main className="min-h-screen bg-background">
          <div className="max-w-[1200px] mx-auto p-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <p className="text-red-600 font-semibold text-lg">Error Loading Users</p>
              <p className="text-red-500 mt-2">{error}</p>
              <button
                onClick={fetchUsers}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // =========================================
  // SUCCESS STATE
  // =========================================

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
      <Sidebar role="Platform_admin" />
      <TopHeader
        role="Platform_admin"
        title="Users"
        subtitle="User Management"
      />

      <main className="min-h-screen bg-background">
        <div className="max-w-[1200px] mx-auto p-12">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <p className="text-gray-500 text-sm font-bold mb-2 uppercase tracking-widest">
                Access Control
              </p>
              <h2 className="text-black text-5xl font-bold uppercase leading-none">
                Users
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Manage platform administrators and restaurant owner credentials.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {users.length} users found
              </p>
            </div>
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:opacity-90 active:opacity-80 transition-all flex items-center gap-2 text-sm font-medium">
              <span className="text-[18px]">+</span>
              Create New User
            </button>
          </div>

          {/* Stats Bar */}
          <UsersSummaryCards users={users} />

          {/* Filter Tabs */}
          <FilterTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            users={users}
          />

          {/* User Grid */}
          <UserGrid 
            activeTab={activeTab} 
            users={users}
            onUserUpdate={handleUserUpdate}
            onUserDelete={handleUserDelete}
            onUserStatusToggle={handleUserStatusToggle}
          />
        </div>
      </main>
    </div>
  );
};

export default Users;