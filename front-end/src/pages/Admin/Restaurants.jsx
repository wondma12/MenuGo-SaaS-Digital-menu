import React from "react";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
import RestaurantsSummaryCards from "../../components/Admin/Restaurants/RestaurantsSummaryCards";
import RestaurantsTable from "../../components/Admin/Restaurants/RestaurantsTable";
import SupportGrid from "../../components/Admin/Restaurants/SupportGrid";

const Restaurants = () => {
  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
      <Sidebar role="Platform_admin" />
      <TopHeader role="Platform_admin" title="Restaurants" />

      <main className="  min-h-screen bg-background">
        <div className="max-w-[1200px] mx-auto p-12">
          {/* Page Header */}
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-black text-4xl font-bold uppercase leading-none">
                Restaurant Directory
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Manage all registered dining establishments across the platform.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-zinc-200 text-black rounded-lg hover:bg-zinc-50 transition-colors text-sm font-medium">
                Export CSV
              </button>
              <button className="px-4 py-2 bg-black text-white rounded-lg active:opacity-80 transition-all flex items-center gap-2 text-sm font-medium">
                <span className="text-[18px]">+</span>
                New Restaurant
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <RestaurantsSummaryCards />

          {/* Table Section */}
          <RestaurantsTable />

          {/* Support Grid */}
          <SupportGrid />
        </div>
      </main>
    </div>
  );
};

export default Restaurants;
