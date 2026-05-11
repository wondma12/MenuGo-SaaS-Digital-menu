import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
import UsersSummaryCards from "../../components/Admin/Users/UsersSummaryCards";
import FilterTabs from "../../components/Admin/Users/FilterTabs";
import UserGrid from "../../components/Admin/Users/UserGrid";
import { userAPI } from "../../services/admin";

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
        const data = await userAPI.getAll();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
        <Sidebar role="Platform_admin" />
        <TopHeader
          role="Platform_admin"
          title="Users"
          subtitle="User Management"
        />
        <main className="ml-64 pt-16 min-h-screen bg-background">
          <div className="max-w-[1200px] mx-auto p-12">
            <div className="text-center text-zinc-500">Loading users...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
        <Sidebar role="Platform_admin" />
        <TopHeader
          role="Platform_admin"
          title="Users"
          subtitle="User Management"
        />
        <main className="ml-64 pt-16 min-h-screen bg-background">
          <div className="max-w-[1200px] mx-auto p-12">
            <div className="text-center text-red-500">{error}</div>
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

      <main className="ml-64 pt-16 min-h-screen bg-background">
        <div className="max-w-[1200px] mx-auto p-12">
          {/* Page Header */}
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-black text-5xl font-bold uppercase leading-none">
                Access Control
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Manage platform administrators and restaurant owner credentials.
              </p>
            </div>
            <button className="px-6 py-3 bg-black text-white rounded-lg active:opacity-80 transition-all flex items-center gap-2 text-sm font-medium">
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
