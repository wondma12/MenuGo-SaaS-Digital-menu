import React, { useState } from "react";
import Table from "../../ui/Table";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL STATUS");

  const restaurants = [
    {
      name: "L'Atelier Noir",
      type: "Fine Dining • Paris",
      email: "contact@ateliernoir.com",
      status: "Approved",
      statusColor: "bg-black text-white",
      createdDate: "Oct 12, 2023",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCgQ0VY68Q4mC-OTyA3N2AfuiogJeaA1xvnCJuT9RL10ayzEjNReJSrgkCk5dvZYPI_xpKrQMgvdtpl-9wfns0ZQr438oS2nnsS6JUbq54xv_h0fDtuE47GsAP-__uATgPaCMQJ1F8GRKU4WInXTBqy0VXE1MgB-SmyqB-D85CJLN6ByN_7IopTJDk7_k-qzIGewpTlKO33PmYYMNZi_xoh-6uiVE7aZrmppt6d-4lAqa3tyBJ5dNU8PKlXZeDHpn8b2eqRqGY-jfE",
    },
    {
      name: "The Monolith",
      type: "Modern Bistro • Berlin",
      email: "hello@monolith-berlin.de",
      status: "Pending",
      statusColor: "bg-zinc-100 text-zinc-500 border border-zinc-200",
      createdDate: "Nov 04, 2023",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBF7HUJMeSbhk1EpSt0hx-SnrD09_Bgj0wTnGLUlUxTp6VTvux8-OR7FB5OVyU5za6tmV-NnOyoNfBlClhGeApQghRb8YsCgks2aPMfhGB9fveYf31TfqraDljuiZc_KC92Ky5-jK8i861YZgjFBqZGvdESqtwA1qEvHrZPfS49DSD-6nWP1wJTMYRltexCY6MP5DfOX5SqI-c_sEFPOa-obtcL4WXj8w51KkuAEr0wpm8wYSwouRjEUQ-iS__USDWEcknfnEW8E0U",
    },
    {
      name: "Veritas Grill",
      type: "Steakhouse • NYC",
      email: "ops@veritasgrill.com",
      status: "Suspended",
      statusColor: "bg-red-100 text-red-600 border border-red-100",
      createdDate: "Aug 21, 2023",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBE86-emJonko92BIY-Ur1R6Cprwu-oNJ9rUNILxxQUiZBzarm0FijtjUr6sF_R2nC7sVr6UBxRzmDZk9b4bx3CZUDc1Si8u7z5PPbSL3ViuB8DTiNIeBIylzgLWPo35E4kxlEWkPZHNCCM6ooqP6RL3gzBWiD2HGg95PIVLrICF4Tsx6JFXA0aw1oLAaxSAmU8cJi4YcO6rQdwoVM6H_AwLCUTVT2amxBqI0J45lGqHOWSY-oL9WFWvtQqzctb7_gazOH3Y7rwQ1M",
    },
    {
      name: "Shio & Umami",
      type: "Japanese • Tokyo",
      email: "info@shioumami.jp",
      status: "Approved",
      statusColor: "bg-black text-white",
      createdDate: "Dec 01, 2023",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAQeHiSWcjqY2-HTcA90v3lz3uHOSVWX8nuxMmD53aYMJ2JvtWsPL7pBx8EnKVij6Qdb--N2gng0U9ltro5P2HNo0_Na05RunCFjG1tBVmLC9kKIv6Zw7s9SRutxiy5dmrxfIlqtMlkwCLCIEdBfQhB0gOnLmCfcz3YuHalh-j6bbmVx51ozsIK3k0FPd9rDFFKhIICAQZTwMINRM19V99dd1RtRFI9zyfqNKzWKNY9PkysSVBS_BdQCs5_BR5KiIGrwJDIjua6QGo",
    },
  ];

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
    <tr key={index} className="hover:bg-zinc-50 transition-colors group">
      <td className="px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
            <img
              className="w-full h-full object-cover"
              src={restaurant.image}
              alt={restaurant.name}
            />
          </div>
          <div>
            <p className="text-sm font-bold text-black">{restaurant.name}</p>
            <p className="text-xs text-zinc-400">{restaurant.type}</p>
          </div>
        </div>
      </td>
      <td className="px-8 py-5 text-zinc-500 text-sm">{restaurant.email}</td>
      <td className="px-8 py-5">
        <span
          className={`text-[10px] font-black px-2 py-1 rounded tracking-widest uppercase ${restaurant.statusColor}`}
        >
          {restaurant.status}
        </span>
      </td>
      <td className="px-8 py-5 text-zinc-500 text-sm">
        {restaurant.createdDate}
      </td>
    </tr>
  );

  const handleAction = (action, restaurant) => {
    console.log(`Action: ${action} on restaurant: ${restaurant.name}`);
    // Here you can add logic for different actions
    switch (action) {
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
            <option>APPROVED</option>
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
