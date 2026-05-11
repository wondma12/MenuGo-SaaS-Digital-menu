import React, { useState, useEffect } from "react";
import Table from "../../ui/Table";
import { Coffee, BarChart3, UtensilsCrossed, Home } from "lucide-react";
import { restaurantAPI } from "../../../services/admin";
import registrationService from "../../../services/registration";

const RecentRegistrations = ({ stats }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending registrations from API
  useEffect(() => {
    const fetchPendingRegistrations = async () => {
      try {
        setLoading(true);
        const result = await registrationService.getPendingRegistrations();

        if (result.success) {
          // Get only the 4 most recent pending registrations for dashboard
          const recentRegistrations = result.data.slice(-4).reverse();
          setRestaurants(recentRegistrations);
        } else {
          setError(result.error);
        }
      } catch (err) {
        console.error("Error fetching pending registrations:", err);
        setError("Failed to load recent registrations");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRegistrations();
  }, []);

  if (loading) {
    return (
      <section>
        <div className="text-center text-zinc-500">
          Loading recent registrations...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="text-center text-red-500">{error}</div>
      </section>
    );
  }

  const tableHeaders = [
    { label: "Restaurant Name" },
    { label: "Location" },
    { label: "Onboard Date" },
    { label: "Tier" },
    { label: "Status", align: "right" },
  ];

  const renderTableRow = (restaurant, index) => (
    <tr key={index} className="hover:bg-zinc-50 transition-colors">
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center rounded">
            <UtensilsCrossed className="text-zinc-400 w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-sm tracking-tight">
              {restaurant.name}
            </p>
            <p className="text-[10px] text-zinc-400 font-medium">
              {restaurant.type}
            </p>
          </div>
        </div>
      </td>
      <td className="px-8 py-6 text-sm text-zinc-600">{restaurant.location}</td>
      <td className="px-8 py-6 text-sm text-zinc-600">
        {restaurant.onboardDate}
      </td>
      <td className="px-8 py-6">
        <span className="px-3 py-1 bg-zinc-100 text-[10px] font-black uppercase tracking-tighter rounded-full">
          {restaurant.tier}
        </span>
      </td>
      <td className="px-8 py-6 text-right">
        <span
          className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-${restaurant.statusColor}-600`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full bg-${restaurant.statusColor}-600`}
          ></span>
          {restaurant.status}
        </span>
      </td>
    </tr>
  );

  return (
    <section>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h3 className="font-h2 text-[1.5rem] font-bold uppercase tracking-tight">
            Recent Registrations
          </h3>
          <p className="font-body-sm text-on-secondary-container mt-1">
            Latest entities onboarded to the hospitality ecosystem.
          </p>
        </div>
        <button className="px-6 py-2 border border-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-200">
          View All
        </button>
      </div>
      <Table
        headers={tableHeaders}
        data={restaurants}
        renderRow={renderTableRow}
      />
    </section>
  );
};

export default RecentRegistrations;
