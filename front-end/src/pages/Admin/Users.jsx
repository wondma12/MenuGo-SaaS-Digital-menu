// src/pages/Admin/Users.jsx

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
import UsersSummaryCards from "../../components/Admin/Users/UsersSummaryCards";
import FilterTabs from "../../components/Admin/Users/FilterTabs";
import UserGrid from "../../components/Admin/Users/UserGrid";
import { staffAPI } from "../../services/api"; // Changed from userAPI to staffAPI

const Users = () => {
  const [activeTab, setActiveTab] = useState("All Accounts");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Using staffAPI.getAll() which fetches all users
        const data = await staffAPI.getAll();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Loading state
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

  // Error state
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
              <p className="text-red-600 font-semibold text-lg">Error Loading Users</p>
              <p className="text-red-500 mt-2">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
            </div>
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:opacity-90 active:opacity-80 transition-all flex items-center gap-2 text-sm font-medium">
              <span className="text-[18px]">+</span>
              Create New User
            </button>
          </div>

          {/* Stats Bar */}
          <UsersSummaryCards users={users} />

          {/* Filter Tabs */}
          <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* User Grid */}
          <UserGrid activeTab={activeTab} users={users} />
        </div>
      </main>
    </div>
  );
};

export default Users;