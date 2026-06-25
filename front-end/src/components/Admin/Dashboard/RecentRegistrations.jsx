// src/components/Admin/Dashboard/RecentRegistrations.jsx

import React, { useState, useEffect } from "react";
import Table from "../../ui/Table";
import { UtensilsCrossed } from "lucide-react";
import { analyticsService } from "../../../services/index.js";

const RecentRegistrations = ({ stats }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingRegistrations = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // ✅ FIRST: Check if stats has pendingRegistrations
        if (stats?.pendingRegistrations && Array.isArray(stats.pendingRegistrations) && stats.pendingRegistrations.length > 0) {
          console.log('[RecentRegistrations] Using stats from parent:', stats.pendingRegistrations);
          const registrations = stats.pendingRegistrations.slice(0, 4);
          setRestaurants(registrations);
          setIsLoading(false);
          return;
        }

        // ✅ SECOND: If no data in stats, try fetching directly
        console.log('[RecentRegistrations] No data in stats, fetching from API...');
        const result = await analyticsService.getPlatformDashboard();
        console.log('[RecentRegistrations] API result:', result);
        
        if (result.success && result.data?.pendingRegistrations) {
          const registrations = result.data.pendingRegistrations.slice(0, 4);
          setRestaurants(registrations);
        } else if (result.data?.data?.pendingRegistrations) {
          // Handle nested data structure
          const registrations = result.data.data.pendingRegistrations.slice(0, 4);
          setRestaurants(registrations);
        } else {
          setRestaurants([]);
        }
      } catch (error) {
        console.error("[RecentRegistrations] Error:", error);
        setError(error.message || "Failed to load recent registrations");
        setRestaurants([]);
      } finally {
        setIsLoading(false);  // ✅ ALWAYS set loading to false
      }
    };

    fetchPendingRegistrations();
  }, [stats]);

  // =========================================
  // LOADING STATE
  // =========================================

  if (isLoading) {
    return (
      <section className="w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mt-2"></div>
          </div>
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // =========================================
  // ERROR STATE
  // =========================================

  if (error) {
    return (
      <section className="w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900">Recent Registrations</h3>
            <p className="text-sm text-zinc-500 mt-1">Latest restaurants waiting for platform approval.</p>
          </div>
          <button className="px-5 py-2 border border-black text-xs font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-200 rounded-md">
            View All
          </button>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600 font-semibold">Unable to Load Registrations</p>
          <p className="text-red-500 text-sm mt-1">{error}</p>
        </div>
      </section>
    );
  }

  // =========================================
  // EMPTY STATE
  // =========================================

  if (restaurants.length === 0) {
    return (
      <section className="w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900">Recent Registrations</h3>
            <p className="text-sm text-zinc-500 mt-1">Latest restaurants waiting for platform approval.</p>
          </div>
          <button className="px-5 py-2 border border-black text-xs font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-200 rounded-md">
            View All
          </button>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <div className="text-4xl mb-3">🎉</div>
          <p className="text-gray-500 font-medium">No Pending Registrations</p>
          <p className="text-gray-400 text-sm mt-1">All restaurants have been reviewed.</p>
        </div>
      </section>
    );
  }

  // =========================================
  // TABLE HEADERS
  // =========================================

  const tableHeaders = [
    { label: "Restaurant" },
    { label: "Location" },
    { label: "Owner" },
    { label: "Created At" },
    { label: "Status", align: "right" },
  ];

  // =========================================
  // FORMAT DATE
  // =========================================

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return "-";
    }
  };

  // =========================================
  // STATUS STYLE
  // =========================================

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "active":
        return "text-green-600 bg-green-50";
      case "suspended":
        return "text-red-600 bg-red-50";
      default:
        return "text-zinc-600 bg-zinc-50";
    }
  };

  const getStatusDot = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-500";
      case "active":
        return "bg-green-500";
      case "suspended":
        return "bg-red-500";
      default:
        return "bg-zinc-500";
    }
  };

  // =========================================
  // TABLE ROW
  // =========================================

  const renderTableRow = (restaurant, index) => (
    <tr key={restaurant.id || index} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-zinc-100 flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-zinc-500" />
          </div>
          <div>
            <p className="font-semibold text-sm text-zinc-900">
              {restaurant.name || "Unknown"}
            </p>
            <p className="text-xs text-zinc-500">
              {restaurant.email || "No email"}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-5 text-sm text-zinc-600">
        {restaurant.location 
          ? `${restaurant.location.city || ""}, ${restaurant.location.country || ""}`
          : "-"}
      </td>
      <td className="px-6 py-5 text-sm text-zinc-600">
        {restaurant.owner?.name || restaurant.owner_name || "-"}
      </td>
      <td className="px-6 py-5 text-sm text-zinc-600">
        {formatDate(restaurant.created_at)}
      </td>
      <td className="px-6 py-5 text-right">
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(restaurant.status)}`}>
          <span className={`w-2 h-2 rounded-full ${getStatusDot(restaurant.status)}`} />
          {restaurant.status || 'pending'}
        </span>
      </td>
    </tr>
  );

  // =========================================
  // RENDER
  // =========================================

  return (
    <section className="w-full">
      {/* HEADER */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
            Recent Registrations
          </h3>
          <p className="text-sm text-zinc-500 mt-1">
            Latest restaurants waiting for platform approval.
          </p>
        </div>
        <button className="px-5 py-2 border border-black text-xs font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-200 rounded-md">
          View All
        </button>
      </div>

      {/* TABLE */}
      <Table
        headers={tableHeaders}
        data={restaurants}
        renderRow={renderTableRow}
      />
    </section>
  );
};

export default RecentRegistrations;