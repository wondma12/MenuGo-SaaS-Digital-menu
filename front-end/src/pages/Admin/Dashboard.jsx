// src/pages/Admin/AdminDashboard.jsx

import React, { useState, useEffect } from "react";
// import Sidebar from "../../components/layout/sidebar";
// import TopHeader from "../../components/layout/TopHeader";
import SummaryCards from "../../components/Admin/Dashboard/SummaryCards";
import RecentRegistrations from "../../components/Admin/Dashboard/RecentRegistrations";
import { analyticsAPI } from "../../services/api"; // Changed from adminAPI to analyticsAPI
import { AdminDashboardSkeleton } from "../../components/layout/DashboardSkeleton";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard stats from API
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        // Use analyticsAPI.getDashboard() from your new API
        const data = await analyticsAPI.getDashboard();
        setStats(data);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError(err.message || "Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
        {/* <Sidebar role="Platform_admin" /> */}
        {/* <TopHeader role="Platform_admin" title="Dashboard" /> */}
        <main className="min-h-screen bg-background">
          <div className="max-w-[1200px] mx-auto p-12">
            <AdminDashboardSkeleton />
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
        {/* <Sidebar role="Platform_admin" /> */}
        {/* <TopHeader role="Platform_admin" title="Dashboard" /> */}
        <main className="min-h-screen bg-background">
          <div className="max-w-[1200px] mx-auto p-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600 font-semibold">Error Loading Dashboard</p>
              <p className="text-red-500 text-sm mt-2">{error}</p>
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
      {/* <Sidebar role="Platform_admin" /> */}
      {/* <TopHeader role="Platform_admin" title="Dashboard" /> */}

      <main className="min-h-screen bg-background">
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