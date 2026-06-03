import React, { useState, useEffect } from "react";
import Table from "../../ui/Table";
import { UtensilsCrossed } from "lucide-react";

import registrationService from "../../../services/registration";

// IMPORTANT:
// Rename your loading component to:
// Loading.jsx or Loading.tsx
// Then import like this:

const RecentRegistrations = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // =========================================
  // FETCH RECENT PENDING REGISTRATIONS
  // =========================================
  useEffect(() => {
    const fetchPendingRegistrations = async () => {
      try {
        setIsLoading(true);

        const result =
          await registrationService.getPendingRegistrations();

        if (result.success) {
          // LAST 4 RECENT PENDING REGISTRATIONS
          const recentRegistrations = result.data
            .slice(-4)
            .reverse();

          setRestaurants(recentRegistrations);
        } else {
          setError(result.error);
        }
      } catch (error) {
        console.error(
          "Error fetching registrations:",
          error
        );

        setError(
          "Failed to load recent registrations"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingRegistrations();
  }, []);

  // =========================================
  // LOADING
  // =========================================
  if (isLoading) {
  }

  // =========================================
  // ERROR
  // =========================================
  if (error) {
    return (
      <section className="py-10">
        <div className="text-center text-red-500 font-medium">
          {error}
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

    return new Date(dateString).toLocaleDateString();
  };

  // =========================================
  // STATUS STYLE
  // =========================================
  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600";

      case "active":
        return "text-green-600";

      case "suspended":
        return "text-red-600";

      default:
        return "text-zinc-600";
    }
  };

  // =========================================
  // TABLE ROW
  // =========================================
  const renderTableRow = (restaurant, index) => (
    <tr
      key={index}
      className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors"
    >
      {/* RESTAURANT */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-zinc-100 flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-zinc-500" />
          </div>

          <div>
            <p className="font-semibold text-sm text-zinc-900">
              {restaurant.name}
            </p>

            <p className="text-xs text-zinc-500">
              {restaurant.email}
            </p>
          </div>
        </div>
      </td>

      {/* LOCATION */}
      <td className="px-6 py-5 text-sm text-zinc-600">
        {restaurant.location
          ? `${restaurant.location.city}, ${restaurant.location.country}`
          : "-"}
      </td>

      {/* OWNER */}
      <td className="px-6 py-5 text-sm text-zinc-600">
        {restaurant.owner?.name || "-"}
      </td>

      {/* CREATED AT */}
      <td className="px-6 py-5 text-sm text-zinc-600">
        {formatDate(restaurant.created_at)}
      </td>

      {/* STATUS */}
      <td className="px-6 py-5 text-right">
        <span
          className={`inline-flex items-center gap-2 text-xs font-semibold capitalize ${getStatusStyle(
            restaurant.status
          )}`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              restaurant.status === "pending"
                ? "bg-yellow-500"
                : restaurant.status === "active"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />

          {restaurant.status}
        </span>
      </td>
    </tr>
  );

  return (
    <section className="w-full">
      {/* HEADER */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
            Recent Registrations
          </h3>

          <p className="text-sm text-zinc-500 mt-1">
            Latest restaurants waiting for platform
            approval.
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