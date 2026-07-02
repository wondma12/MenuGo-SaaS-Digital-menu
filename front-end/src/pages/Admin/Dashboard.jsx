

import React, { useState, useEffect } from "react";
import SummaryCards from "../../components/Admin/Dashboard/SummaryCards";
import RecentRegistrations from "../../components/Admin/Dashboard/RecentRegistrations";
import { analyticsService } from "../../services/index.js";
import { AdminDashboardSkeleton } from "../../components/layout/DashboardSkeleton";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        
        const data = await analyticsService.getDashboardStats();
        console.log('[AdminDashboard] Stats:', data);
        
        if (data.success) {
          
          const combinedStats = {
            ...data.data,
            
            restaurantStatus: data.data.restaurantStatus || {
              active: data.data.activeRestaurants || 0,
              pending: data.data.pendingRestaurants || 0,
              suspended: data.data.suspendedRestaurants || 0,
            }
          };
          setStats(combinedStats);
        } else {
          setError(data.error || "Failed to load dashboard statistics");
        }
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError(err.message || "Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
      <main className="min-h-screen bg-background">
        <div className="max-w-[1200px] mx-auto p-12">
          <div className="mb-12">
            <p className="text-gray-500 text-sm font-bold mb-2 uppercase tracking-widest">
              Platform Insights
            </p>
            <h2 className="text-black text-5xl font-bold uppercase leading-none">
              Global Snapshot
            </h2>
          </div>

          <SummaryCards stats={stats} />
          <RecentRegistrations stats={stats} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;