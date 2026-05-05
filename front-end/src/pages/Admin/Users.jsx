import React, { useState } from "react";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
import UsersSummaryCards from "../../components/Platform_admin/Users/UsersSummaryCards";
import FilterTabs from "../../components/Platform_admin/Users/FilterTabs";
import UserGrid from "../../components/Platform_admin/Users/UserGrid";

const Users = () => {
  const [activeTab, setActiveTab] = useState("All Accounts");

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
          <UsersSummaryCards />

          {/* Filter Tabs */}
          <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* User Grid */}
          <UserGrid activeTab={activeTab} />
        </div>
      </main>
    </div>
  );
};

export default Users;
