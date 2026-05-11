import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
import SummaryCards from "../../components/Admin/Dashboard/SummaryCards";
import RecentRegistrations from "../../components/Admin/Dashboard/RecentRegistrations";
import { adminAPI } from "../../services/admin";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard stats from API
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const data = await adminAPI.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
        <Sidebar role="Platform_admin" />
        <TopHeader role="Platform_admin" title="Dashboard" />
        <main className="ml-64 pt-16 min-h-screen bg-background">
          <div className="max-w-[1200px] mx-auto p-12">
            <div className="text-center text-zinc-500">
              Loading dashboard...
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
        <Sidebar role="Platform_admin" />
        <TopHeader role="Platform_admin" title="Dashboard" />
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
          <SummaryCards stats={stats} />

          {/* Recent Registrations Section */}
          <RecentRegistrations stats={stats} />
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
