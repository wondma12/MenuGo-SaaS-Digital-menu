import React from "react";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
import SummaryCards from "../../components/Platform_admin/Dashboard/SummaryCards";
import RecentRegistrations from "../../components/Platform_admin/Dashboard/RecentRegistrations";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
      <Sidebar role="Platform_admin" />
      <TopHeader role="Platform_admin" title="Dashboard" />

      <main className="ml-64 pt-16 min-h-screen bg-background">
        <div className="max-w-[1200px] mx-auto p-12">
          {/* Welcome Header */}
          <div className="mb-12">
            <p className="text-gray-500 text-sm font-bold mb-2 uppercase tracking-widest">
              Operational Insights
            </p>
            <h2 className="text-black text-5xl font-bold uppercase leading-none">
              Global Snapshot
            </h2>
          </div>

          {/* Summary Cards */}
          <SummaryCards />

          {/* Recent Registrations Section */}
          <RecentRegistrations />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

{
  /* <div class="mb-12">
  <p class="text-label-caps text-on-secondary-container mb-2 uppercase tracking-widest">
    Operational Insights
  </p>
  <h2 class="font-display text-display text-primary uppercase leading-none">
    Global Snapshot
  </h2>
</div>; */
}
