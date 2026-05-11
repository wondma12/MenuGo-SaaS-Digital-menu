import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
import IdentitySection from "../../components/Admin/RestaurantDetail/IdentitySection";
import StaffOverview from "../../components/Admin/RestaurantDetail/StaffOverview";
import LocationCard from "../../components/Admin/RestaurantDetail/LocationCard";
import QRCodeCard from "../../components/Admin/RestaurantDetail/QRCodeCard";
import { adminAPI } from "../../services/admin";
import registrationService from "../../services/registration";

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
        const data = await adminAPI.getRestaurantWithDetails(id);
        setRestaurant(data);
      } catch (err) {
        console.error("Error fetching restaurant details:", err);
        setError("Failed to load restaurant details");
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

    const currentUser = JSON.parse(localStorage.getItem("user"));
    const reviewedBy = currentUser?.id;

    try {
      setActionLoading(true);

      if (action === "approve") {
        const result = await registrationService.approveRegistration(
          restaurant.id,
          reviewedBy,
        );
        if (result.success) {
          alert("Restaurant approved and activated successfully!");
          // Refresh data or navigate
          window.location.reload();
        } else {
          alert(result.error || "Failed to approve restaurant");
        }
      } else if (action === "suspend") {
        const reason = prompt("Please enter reason for suspension:");
        if (reason) {
          const result = await registrationService.rejectRegistration(
            restaurant.id,
            reviewedBy,
            reason,
          );
          if (result.success) {
            alert("Restaurant suspended successfully!");
            window.location.reload();
          } else {
            alert(result.error || "Failed to suspend restaurant");
          }
        }
      }
    } catch (error) {
      console.error("Action error:", error);
      alert("Action failed. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

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
            <div className="text-center text-zinc-500">
              Loading restaurant details...
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
        <TopHeader
          role="Platform_admin"
          title="Restaurants"
          subtitle="Error"
          breadcrumbs={["Command Center", "Restaurants"]}
        />
        <main className="ml-64 pt-16 min-h-screen bg-background">
          <div className="max-w-7xl mx-auto p-8">
            <div className="text-center text-red-500">{error}</div>
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
                <img
                  className="w-full h-full object-cover"
                  src={restaurant.logo}
                  alt={restaurant.name}
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-black uppercase leading-none">
                  {restaurant.name}
                </h2>
                <p className="font-body-md text-zinc-500 mt-1">
                  {restaurant.type}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleAction("suspend")}
                disabled={actionLoading}
                className="px-6 py-2.5 bg-white border border-zinc-200 text-zinc-700 font-medium text-sm rounded-lg hover:bg-zinc-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? "Processing..." : "Suspend"}
              </button>
              <button
                onClick={() => handleAction("approve")}
                disabled={actionLoading}
                className="px-6 py-2.5 bg-black text-white font-medium text-sm rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? "Processing..." : "Approve & Activate"}
              </button>
            </div>
          </section>

          {/* Grid Layout */}
          <div className="grid grid-cols-12 gap-8 mt-8">
            {/* Left Column: Identity & Documentation */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              <IdentitySection restaurant={restaurant} />
              <StaffOverview staff={restaurant.staff} />
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
