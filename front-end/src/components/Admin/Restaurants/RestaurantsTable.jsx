// src/components/Admin/Restaurants/RestaurantsTable.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../ui/Table";
import { restaurantAPI } from "../../../services/api";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Ban,
  Check,
  Eye,
  MoreVertical,
} from "lucide-react";

const RestaurantsTable = ({
  restaurants: propRestaurants,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
  loading: propLoading,
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL STATUS");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  // ============================================================
  // FETCH RESTAURANTS
  // ============================================================

  useEffect(() => {
    // If restaurants are passed as props, use them
    if (propRestaurants) {
      setRestaurants(propRestaurants);
      setLoading(propLoading || false);
      return;
    }

    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const data = await restaurantAPI.getAll({
          page: currentPage,
          limit: itemsPerPage,
        });
        
        // Handle different response formats
        let restaurantsData = [];
        let totalCount = 0;
        
        if (Array.isArray(data)) {
          restaurantsData = data;
          totalCount = data.length;
        } else if (data && data.data && Array.isArray(data.data)) {
          restaurantsData = data.data;
          totalCount = data.pagination?.total || data.data.length;
        } else if (data && data.restaurants && Array.isArray(data.restaurants)) {
          restaurantsData = data.restaurants;
          totalCount = data.total || data.restaurants.length;
        } else {
          restaurantsData = data || [];
          totalCount = restaurantsData.length;
        }
        
        setRestaurants(restaurantsData);
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
        
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setError(err.message || "Failed to load restaurants");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [propRestaurants, propLoading, currentPage]);

  // ============================================================
  // FILTERS
  // ============================================================

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      (restaurant.name || "").toLowerCase().includes(searchLower) ||
      (restaurant.email || "").toLowerCase().includes(searchLower) ||
      (restaurant.phone || "").toLowerCase().includes(searchLower);
    
    const matchesStatus =
      statusFilter === "ALL STATUS" || 
      (restaurant.status || "").toUpperCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // ============================================================
  // TABLE CONFIG
  // ============================================================

  const tableHeaders = [
    { label: "Restaurant" },
    { label: "Contact Email" },
    { label: "Status" },
    { label: "Created Date" },
  ];

  // ============================================================
  // HELPERS
  // ============================================================

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  const getStatusStyles = (status) => {
    const statusMap = {
      active: {
        bg: "bg-black",
        text: "text-white",
        border: "border-black",
        label: "Active",
      },
      pending: {
        bg: "bg-zinc-100",
        text: "text-zinc-500",
        border: "border-zinc-200",
        label: "Pending",
      },
      suspended: {
        bg: "bg-red-100",
        text: "text-red-600",
        border: "border-red-100",
        label: "Suspended",
      },
    };
    return statusMap[status?.toLowerCase()] || statusMap.pending;
  };

  // ============================================================
  // RENDER ROW
  // ============================================================

  const renderTableRow = (restaurant, index) => {
    const statusStyle = getStatusStyles(restaurant.status);
    const logoUrl = restaurant.logo || 
                    restaurant.image || 
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(restaurant.name || 'R')}&background=000000&color=fff`;

    return (
      <tr
        key={restaurant.id || index}
        className="hover:bg-zinc-50 transition-colors group"
      >
        <td className="px-8 py-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
              <img
                className="w-full h-full object-cover"
                src={logoUrl}
                alt={restaurant.name || "Restaurant"}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(restaurant.name || 'R')}&background=000000&color=fff`;
                }}
              />
            </div>
            <div>
              <p className="text-sm font-bold text-black">
                {restaurant.name || "Unnamed Restaurant"}
              </p>
              <p className="text-xs text-zinc-400">
                {restaurant.slogan || restaurant.description || restaurant.cuisine || "Restaurant"}
              </p>
            </div>
          </div>
        </td>
        <td className="px-8 py-5 text-zinc-500 text-sm">
          {restaurant.email || "No email"}
        </td>
        <td className="px-8 py-5">
          <span
            className={`text-[10px] font-black px-2 py-1 rounded tracking-widest uppercase ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}
          >
            {statusStyle.label}
          </span>
        </td>
        <td className="px-8 py-5 text-zinc-500 text-sm">
          {formatDate(restaurant.created_at || restaurant.createdAt)}
        </td>
      </tr>
    );
  };

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleAction = (action, restaurant) => {
    console.log(`Action: ${action} on restaurant:`, restaurant);

    switch (action) {
      case "view":
        if (onView) {
          onView(restaurant.id);
        } else {
          navigate(`/admin/restaurants/${restaurant.id}`);
        }
        break;
      case "edit":
        if (onEdit) {
          onEdit(restaurant.id);
        }
        break;
      case "suspend":
        if (onStatusChange) {
          const newStatus = restaurant.status === "active" ? "suspended" : "active";
          onStatusChange(restaurant.id, newStatus);
        }
        break;
      case "delete":
        if (onDelete) {
          if (window.confirm(`Are you sure you want to delete "${restaurant.name}"?`)) {
            onDelete(restaurant.id);
          }
        }
        break;
      default:
        break;
    }
  };

  // ============================================================
  // RENDER - LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-8">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-zinc-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-500">Loading restaurants...</p>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER - ERROR
  // ============================================================

  if (error) {
    return (
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-8">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-3">⚠️</div>
          <p className="text-red-600 font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER - EMPTY
  // ============================================================

  if (filteredRestaurants.length === 0) {
    return (
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-8">
        <div className="text-center">
          <div className="text-4xl mb-3">🏪</div>
          <p className="text-zinc-600 font-semibold">No Restaurants Found</p>
          <p className="text-zinc-400 text-sm mt-1">
            {restaurants.length === 0 
              ? "No restaurants registered yet." 
              : "Try adjusting your search or filters."}
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER - SUCCESS
  // ============================================================

  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      {/* Table Filters */}
      <div className="p-4 border-b border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
          <input
            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:ring-0 focus:border-black placeholder-zinc-400"
            placeholder="Search by name or email..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select
            className="bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-bold px-4 py-2 focus:ring-0 focus:border-black flex-1 sm:flex-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>ALL STATUS</option>
            <option>ACTIVE</option>
            <option>PENDING</option>
            <option>SUSPENDED</option>
          </select>
          <span className="text-xs text-zinc-400 flex items-center px-2">
            {filteredRestaurants.length} results
          </span>
        </div>
      </div>

      {/* Table */}
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
      {filteredRestaurants.length > 0 && (
        <div className="p-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-50/30">
          <p className="text-xs text-zinc-500 font-medium">
            Showing 1 to {filteredRestaurants.length} of {restaurants.length} restaurants
          </p>
          <div className="flex gap-2">
            <button
              className="w-8 h-8 flex items-center justify-center rounded border border-zinc-200 bg-white text-zinc-400 hover:text-black transition-colors disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-[18px] h-[18px]" />
            </button>
            {[...Array(Math.min(3, totalPages))].map((_, idx) => (
              <button
                key={idx}
                className={`w-8 h-8 flex items-center justify-center rounded border text-[12px] font-bold transition-colors ${
                  currentPage === idx + 1
                    ? "border-black bg-black text-white"
                    : "border-zinc-200 bg-white hover:bg-zinc-50"
                }`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            {totalPages > 3 && (
              <span className="flex items-center text-zinc-400 px-1">...</span>
            )}
            <button
              className="w-8 h-8 flex items-center justify-center rounded border border-zinc-200 bg-white text-zinc-400 hover:text-black transition-colors disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantsTable;