// src/pages/Admin/AdminDashboard.jsx

import React, { useState, useEffect, useCallback } from "react";
// import Sidebar from "../../components/layout/sidebar";
// import TopHeader from "../../components/layout/TopHeader";
import SummaryCards from "../../components/Admin/Dashboard/SummaryCards";
import RecentRegistrations from "../../components/Admin/Dashboard/RecentRegistrations";
import { analyticsAPI } from "../../services/api";
import { AdminDashboardSkeleton } from "../../components/layout/DashboardSkeleton";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================================================
  // FETCH DASHBOARD STATS
  // ============================================================

  const fetchDashboardStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('[AdminDashboard] Fetching dashboard stats...');
      
      // ✅ Use analyticsAPI.getDashboard()
      const result = await analyticsAPI.getDashboard();
      console.log('[AdminDashboard] Raw result:', result);
      
      // ✅ Extract data correctly
      let dashboardData = {};
      if (result && typeof result === 'object') {
        // If result has a data property, use it
        if (result.data) {
          dashboardData = result.data;
        } else {
          dashboardData = result;
        }
      }
      
      console.log('[AdminDashboard] Processed stats:', dashboardData);
      setStats(dashboardData);
      
    } catch (err) {
      console.error("[AdminDashboard] Error fetching dashboard stats:", err);
      setError(err.message || "Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  // ============================================================
  // RENDER - LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
        <main className="min-h-screen bg-background">
          <div className="max-w-[1200px] mx-auto p-12">
            <AdminDashboardSkeleton />
          </div>
        </main>
      </div>
    );
  }

  // ============================================================
  // RENDER - ERROR
  // ============================================================

  if (error) {
    return (
      <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
        <main className="min-h-screen bg-background">
          <div className="max-w-[1200px] mx-auto p-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                Unable to Load Dashboard
              </h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchDashboardStats}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ============================================================
  // RENDER - SUCCESS
  // ============================================================

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
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
            <p className="text-gray-400 text-sm mt-2">
              Last updated: {new Date().toLocaleString()}
            </p>
          </div>

          {/* Summary Cards - ✅ Pass stats properly */}
          <SummaryCards stats={stats} />

          {/* Recent Registrations - ✅ No need to pass stats */}
          <div className="mt-12">
            <RecentRegistrations />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;