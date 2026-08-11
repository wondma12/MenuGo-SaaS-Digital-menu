

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
import RestaurantsSummaryCards from "../../components/Admin/Restaurants/RestaurantsSummaryCards";
import RestaurantsTable from "../../components/Admin/Restaurants/RestaurantsTable";
import SupportGrid from "../../components/Admin/Restaurants/SupportGrid";
import { restaurantAPI } from "../../services/api";
import authService from "../../services/authservice";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    suspended: 0,
  });

  
  
  

  const navigate = useNavigate();

  const fetchRestaurants = useCallback(async () => {
    try {
      const user = authService.getCurrentUserFromStorage();
      if (!user || user.role !== 'platform_admin') {
        console.error('[Restaurants] Access denied: current user is not platform_admin', user);
        navigate('/auth/login');
        return;
      }

      setLoading(true);
      setError(null);

      console.log('[Restaurants] Fetching restaurants...');
      
      const result = await restaurantAPI.getAll({ page: 1, limit: 100 });
      console.log('[Restaurants] Raw result:', result);

      
      let restaurantsData = [];
      if (result) {
        if (Array.isArray(result)) {
          restaurantsData = result;
        } else if (result.data && Array.isArray(result.data)) {
          restaurantsData = result.data;
        } else if (result.restaurants && Array.isArray(result.restaurants)) {
          restaurantsData = result.restaurants;
        } else if (result.success === true && Array.isArray(result.data)) {
          restaurantsData = result.data;
        } else {
          restaurantsData = result;
        }
      }

      console.log('[Restaurants] Processed restaurants:', restaurantsData);
      setRestaurants(restaurantsData);

      
      const total = restaurantsData.length;
      const active = restaurantsData.filter(r => r.status === 'active').length;
      const pending = restaurantsData.filter(r => r.status === 'pending').length;
      const suspended = restaurantsData.filter(r => r.status === 'suspended').length;

      setStats({ total, active, pending, suspended });

    } catch (err) {
      console.error("[Restaurants] Error fetching restaurants:", err);
      setError(err.message || "Failed to load restaurants");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  
  
  

  const handleViewRestaurant = (id) => {
    console.log('[Restaurants] View restaurant:', id);
    window.location.href = `/admin/restaurants/${id}`;
  };

  const handleEditRestaurant = (id) => {
    console.log('[Restaurants] Edit restaurant:', id);
    
  };

  const handleDeleteRestaurant = async (id) => {
    if (!window.confirm('Are you sure you want to delete this restaurant?')) {
      return;
    }

    try {
      const result = await restaurantAPI.delete(id);
      if (result.success) {
        await fetchRestaurants();
      } else {
        alert(result.error || 'Failed to delete restaurant');
      }
    } catch (error) {
      console.error('[Restaurants] Error deleting:', error);
      alert('Failed to delete restaurant');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const result = await restaurantAPI.updateStatus(id, status);
      if (result.success) {
        await fetchRestaurants();
      } else {
        alert(result.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('[Restaurants] Error updating status:', error);
      alert('Failed to update status');
    }
  };

  
  
  

  if (loading) {
    return (
      <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
        <Sidebar role="Platform_admin" />
        <TopHeader role="Platform_admin" title="Restaurants" />
        <main className="min-h-screen bg-background">
          <div className="max-w-[1200px] mx-auto p-12">
            <div className="flex justify-between items-end mb-12">
              <div>
                <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-96 bg-gray-200 rounded animate-pulse mt-2"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6 mb-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="col-span-4 h-24 bg-gray-200 rounded-xl animate-pulse"></div>
              ))}
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-center min-h-[200px]">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-zinc-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-zinc-500">Loading restaurants...</p>
                  </div>
                </div>
              </div>
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
        <TopHeader role="Platform_admin" title="Restaurants" />
        <main className="min-h-screen bg-background">
          <div className="max-w-[1200px] mx-auto p-12">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                Unable to Load Restaurants
              </h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchRestaurants}
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

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
      <Sidebar role="Platform_admin" />
      <TopHeader role="Platform_admin" title="Restaurants" />

      <main className="min-h-screen bg-background">
        <div className="max-w-[1200px] mx-auto p-12">
          {}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <p className="text-gray-500 text-sm font-bold mb-2 uppercase tracking-widest">
                Platform Management
              </p>
              <h2 className="text-black text-4xl font-bold uppercase leading-none">
                Restaurant Directory
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Manage all registered dining establishments across the platform.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {restaurants.length} restaurants found
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-zinc-200 text-black rounded-lg hover:bg-zinc-50 transition-colors text-sm font-medium">
                Export CSV
              </button>
              <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-2 text-sm font-medium">
                <span className="text-[18px]">+</span>
                New Restaurant
              </button>
            </div>
          </div>

          {}
          <RestaurantsSummaryCards stats={stats} />

          {}
          <RestaurantsTable
            restaurants={restaurants}
            onView={handleViewRestaurant}
            onEdit={handleEditRestaurant}
            onDelete={handleDeleteRestaurant}
            onStatusChange={handleStatusChange}
            loading={loading}
          />

          {}
          <SupportGrid />
        </div>
      </main>
    </div>
  );
};

export default Restaurants;