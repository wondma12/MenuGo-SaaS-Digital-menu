// src/pages/Admin/RestaurantDetail.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
import IdentitySection from "../../components/Admin/RestaurantDetail/IdentitySection";
import StaffOverview from "../../components/Admin/RestaurantDetail/StaffOverview";
import LocationCard from "../../components/Admin/RestaurantDetail/LocationCard";
import QRCodeCard from "../../components/Admin/RestaurantDetail/QRCodeCard";
import { restaurantAPI, verificationAPI, staffAPI } from "../../services/api"; // Updated imports

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch restaurant details from API
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch restaurant details using the new API
        const restaurantData = await restaurantAPI.getById(id);
        
        // Fetch staff for this restaurant
        let staffData = [];
        try {
          const staffResult = await staffAPI.getByRestaurant(id);
          staffData = staffResult || [];
        } catch (staffErr) {
          console.warn("Could not fetch staff:", staffErr);
        }
        
        // Fetch verification status
        let verificationData = null;
        try {
          const verificationResult = await verificationAPI.getAll({ restaurant_id: id });
          verificationData = verificationResult?.verifications?.[0] || null;
        } catch (verificationErr) {
          console.warn("Could not fetch verification:", verificationErr);
        }
        
        // Combine all data
        const combinedData = {
          ...restaurantData,
          staff: staffData,
          verification: verificationData,
          location: restaurantData.location || null,
        };
        
        setRestaurant(combinedData);
      } catch (err) {
        console.error("Error fetching restaurant details:", err);
        setError(err.message || "Failed to load restaurant details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRestaurantDetails();
    }
  }, [id]);

  const handleAction = async (action) => {
    if (!restaurant) return;

    // Get current user from authAPI
    const userStr = localStorage.getItem("user");
    const currentUser = userStr ? JSON.parse(userStr) : null;
    const reviewedBy = currentUser?.id;

    try {
      setActionLoading(true);

      if (action === "approve") {
        // First find the verification record
        const verifications = await verificationAPI.getAll({ restaurant_id: restaurant.id });
        const verification = verifications?.verifications?.[0];
        
        if (!verification) {
          alert("No verification record found for this restaurant");
          return;
        }
        
        // Approve the verification
        const result = await verificationAPI.review(
          verification.id,
          'approved',
          'Restaurant approved by platform admin'
        );
        
        if (result) {
          // Also update restaurant status to active
          await restaurantAPI.updateStatus(restaurant.id, 'active');
          alert("✅ Restaurant approved and activated successfully!");
          // Refresh data
          window.location.reload();
        } else {
          alert("❌ Failed to approve restaurant");
        }
      } else if (action === "suspend") {
        const reason = prompt("Please enter reason for suspension:");
        if (reason) {
          // Find verification record
          const verifications = await verificationAPI.getAll({ restaurant_id: restaurant.id });
          const verification = verifications?.verifications?.[0];
          
          if (!verification) {
            alert("No verification record found for this restaurant");
            return;
          }
          
          // Reject the verification
          const result = await verificationAPI.review(
            verification.id,
            'rejected',
            reason
          );
          
          if (result) {
            // Also update restaurant status to suspended
            await restaurantAPI.updateStatus(restaurant.id, 'suspended');
            alert("⛔ Restaurant suspended successfully!");
            window.location.reload();
          } else {
            alert("❌ Failed to suspend restaurant");
          }
        }
      }
    } catch (error) {
      console.error("Action error:", error);
      alert(`Action failed: ${error.message || "Please try again."}`);
    } finally {
      setActionLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
        <Sidebar role="Platform_admin" />
        <TopHeader
          role="Platform_admin"
          title="Restaurants"
          subtitle="Loading..."
          breadcrumbs={["Command Center", "Restaurants"]}
        />
        <main className="ml-64 pt-16 min-h-screen bg-background">
          <div className="max-w-7xl mx-auto p-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-zinc-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-zinc-500">Loading restaurant details...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
        <Sidebar role="Platform_admin" />
        <TopHeader
          role="Platform_admin"
          title="Restaurants"
          subtitle="Error"
          breadcrumbs={["Command Center", "Restaurants"]}
        />
        <main className="ml-64 pt-16 min-h-screen bg-background">
          <div className="max-w-7xl mx-auto p-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
              <p className="text-red-600 font-semibold text-lg">Error Loading Restaurant</p>
              <p className="text-red-500 mt-2">{error}</p>
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

  // No restaurant found
  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
        <Sidebar role="Platform_admin" />
        <TopHeader
          role="Platform_admin"
          title="Restaurants"
          subtitle="Not Found"
          breadcrumbs={["Command Center", "Restaurants"]}
        />
        <main className="ml-64 pt-16 min-h-screen bg-background">
          <div className="max-w-7xl mx-auto p-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
              <p className="text-yellow-600 font-semibold text-lg">Restaurant Not Found</p>
              <p className="text-yellow-500 mt-2">The restaurant you're looking for doesn't exist.</p>
              <button
                onClick={() => navigate("/admin/restaurants")}
                className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:opacity-90 transition-colors"
              >
                Back to Restaurants
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
      <TopHeader
        role="Platform_admin"
        title="Restaurants"
        subtitle={restaurant.name}
        breadcrumbs={["Command Center", "Restaurants", restaurant.name]}
      />

      <main className="ml-64 pt-16 min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-8">
          {/* Page Header & Action Panel */}
          <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-zinc-200">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white border border-zinc-200 rounded-lg flex items-center justify-center p-2">
                {restaurant.logo ? (
                  <img
                    className="w-full h-full object-cover"
                    src={restaurant.logo}
                    alt={restaurant.name}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(restaurant.name)}&background=000000&color=fff`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {restaurant.name?.charAt(0) || "R"}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-4xl font-bold text-black uppercase leading-none">
                  {restaurant.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-body-md text-zinc-500">
                    {restaurant.type || "Restaurant"}
                  </p>
                  <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    restaurant.status === 'active' ? 'bg-green-100 text-green-700' :
                    restaurant.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {restaurant.status || 'pending'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              {restaurant.status !== 'suspended' && (
                <button
                  onClick={() => handleAction("suspend")}
                  disabled={actionLoading}
                  className="px-6 py-2.5 bg-white border border-zinc-200 text-zinc-700 font-medium text-sm rounded-lg hover:bg-zinc-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading ? "Processing..." : "Suspend"}
                </button>
              )}
              {restaurant.status !== 'active' && (
                <button
                  onClick={() => handleAction("approve")}
                  disabled={actionLoading}
                  className="px-6 py-2.5 bg-black text-white font-medium text-sm rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading ? "Processing..." : "Approve & Activate"}
                </button>
              )}
            </div>
          </section>

          {/* Grid Layout */}
          <div className="grid grid-cols-12 gap-8 mt-8">
            {/* Left Column: Identity & Documentation */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              <IdentitySection restaurant={restaurant} />
              <StaffOverview staff={restaurant.staff || []} />
            </div>

            {/* Right Column: Location & Insights */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
              <LocationCard location={restaurant.location} />
              <QRCodeCard restaurantName={restaurant.name} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RestaurantDetail;