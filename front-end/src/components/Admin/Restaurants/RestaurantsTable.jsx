import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../ui/Table";
import { restaurantAPI } from "../../../services/admin";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Ban,
  Check,
} from "lucide-react";

const RestaurantsTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL STATUS");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch restaurants from API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const data = await restaurantAPI.getAll();
        setRestaurants(data);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setError("Failed to load restaurants");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL STATUS" || restaurant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const tableHeaders = [
    { label: "Restaurant" },
    { label: "Contact Email" },
    { label: "Status" },
    { label: "Created Date" },
  ];

  const renderTableRow = (restaurant, index) => (
    <tr
      key={restaurant.id || index}
      className="hover:bg-zinc-50 transition-colors group"
    >
      <td className="px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
            <img
              className="w-full h-full object-cover"
              src={restaurant.image || "https://via.placeholder.com/40"}
              alt={restaurant.name}
            />
          </div>
          <div>
            <p className="text-sm font-bold text-black">{restaurant.name}</p>
            <p className="text-xs text-zinc-400">
              {restaurant.type || restaurant.cuisine}
            </p>
          </div>
        </div>
      </td>
      <td className="px-8 py-5 text-zinc-500 text-sm">{restaurant.email}</td>
      <td className="px-8 py-5">
        <span
          className={`text-[10px] font-black px-2 py-1 rounded tracking-widest uppercase ${
            restaurant.status === "active"
              ? "bg-black text-white"
              : restaurant.status === "pending"
                ? "bg-zinc-100 text-zinc-500 border border-zinc-200"
                : restaurant.status === "suspended"
                  ? "bg-red-100 text-red-600 border border-red-100"
                  : "bg-zinc-100 text-zinc-500 border border-zinc-200"
          }`}
        >
          {restaurant.status
            ? restaurant.status.charAt(0).toUpperCase() +
              restaurant.status.slice(1)
            : "Unknown"}
        </span>
      </td>
      <td className="px-8 py-5 text-zinc-500 text-sm">
        {restaurant.createdDate
          ? new Date(restaurant.createdDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "N/A"}
      </td>
    </tr>
  );

  const handleAction = (action, restaurant) => {
    console.log(`Action: ${action} on restaurant: ${restaurant.name}`);

    switch (action) {
      case "view":
        // Navigate to restaurant detail page
        navigate(`/admin/restaurants/${restaurant.id || 1}`);
        break;
      case "edit":
        // Handle edit action
        break;
      case "suspend":
        // Handle suspend action
        break;
      case "delete":
        // Handle delete action
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-8">
        <div className="text-center text-zinc-500">Loading restaurants...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      {/* Table Filters */}
      <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
          <input
            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:ring-0 focus:border-black placeholder-zinc-400"
            placeholder="Search by name or email..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-bold px-4 py-2 focus:ring-0 focus:border-black"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>ALL STATUS</option>
            <option>ACTIVE</option>
            <option>PENDING</option>
            <option>SUSPENDED</option>
          </select>
        </div>
      </div>

      {/* Using the reusable Table component */}
      <Table
        headers={tableHeaders}
        data={filteredRestaurants}
        renderRow={renderTableRow}
        showActions={true}
        onAction={handleAction}
        className="rounded-none border-none shadow-none"
        tableClassName="border-none"
        theadClassName="border-b border-zinc-100 bg-zinc-50/50"
      />

      {/* Pagination */}
      <div className="p-8 border-t border-zinc-100 flex items-center justify-between bg-zinc-50/30">
        <p className="text-xs text-zinc-500 font-medium">
          Showing 1 to {filteredRestaurants.length} of {restaurants.length}{" "}
          restaurants
        </p>
        <div className="flex gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded border border-zinc-200 bg-white text-zinc-400 hover:text-black transition-colors">
            <ChevronLeft className="w-[18px] h-[18px]" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-black bg-black text-white text-[12px] font-bold">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-zinc-200 bg-white text-[12px] font-bold hover:bg-zinc-50">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-zinc-200 bg-white text-[12px] font-bold hover:bg-zinc-50">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-zinc-200 bg-white text-zinc-400 hover:text-black transition-colors">
            <ChevronRight className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsTable;
