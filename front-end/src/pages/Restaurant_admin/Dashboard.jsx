// src/pages/Restaurant_admin/Dashboard.jsx
import React, { useState } from "react";
import StatsCard from "../../components/Restaurant_admin/dashboard/StatsCard";
import RecentOrdersTable from "../../components/Restaurant_admin/dashboard/RecentOrdersTable";
import QRCard from "../../components/Restaurant_admin/dashboard/QRCard";
import StaffOnDuty from "../../components/Restaurant_admin/dashboard/StaffOnDuty";
import InventoryAlert from "../../components/Restaurant_admin/dashboard/InventoryAlert";

// Mock data
const mockOrders = [
  { id: "#ORD-2841", table: "Table 04", status: "Pending", amount: 124.5 },
  { id: "#ORD-2840", table: "Table 12", status: "Served", amount: 89.0 },
  { id: "#ORD-2839", table: "Bar 02", status: "Served", amount: 42.25 },
  { id: "#ORD-2838", table: "Table 07", status: "Pending", amount: 210.15 },
  { id: "#ORD-2837", table: "Table 05", status: "Served", amount: 67.8 },
];

const mockStaff = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Head Chef",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCFxTJskQXd8v-ISTg0x0kDhLpo1OyNcamyrKEjIRuRHfG-XFI6qzmwHyWc0OoHEqxlQCGUU_TU7WhAUoXq367N_yARxvVzh9gcmtzERUhXNHRMa3qcyuXhSnz-RxjdbhxGnmj164uBS5L-x5ecALzzo7F6IqBbfcLCgBf4myDgHOOUMHMia-esCpnP4BqVjpgrROtJqg5v9kM3YkcpuDBSXOsLyNzrvNG3KAYc_VHVBxVRZ1qbth-yet7RNHQdqPPzWvvMpqQLdSM",
  },
  {
    id: 2,
    name: "Marcus V.",
    role: "Floor Manager",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDiCFRx-t00NEybRarIbw3T_Tmuaq1r1_mvJ8zCxtV9Z7E7YRZPuQeXryfb2YzWvQlGWkrYxdqPUlp64Nun96lzwBqqlImFyFhZGo8LifkCOANQSJhH3766dVJS5y3kcvev5tt9Jl6WfU8Xt-dtwMlYjy-nk7x-LD4oM0bti-ADI1Yr5rd-WNlAKtu_7nqjcYshtg9dw24xlUGUqbU5EbZxpsuKRbUTa46HIxkBZN182vKL0FluHRUVG-Aoa9UFeAgMU9j9TNSxZ54",
  },
];

const Dashboard = () => {
  const [orders] = useState(mockOrders);
  const [staff] = useState(mockStaff);

  const handleViewAllOrders = () => {
    console.log("Navigate to orders page");
  };

  const handleDownloadQR = () => {
    console.log("Download QR codes");
  };

  const handleManageShift = () => {
    console.log("Open shift management");
  };

  const handleDismissInventory = () => {
    console.log("Dismiss alert");
  };

  const handleRestock = () => {
    console.log("Navigate to restock page");
  };

  const handleCreateOrder = () => {
    console.log("Open create order modal");
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* SideNavBar - exactly as in HTML */}
      {/* <aside className="fixed left-0 top-0 h-screen w-64 border-r border-neutral-200 bg-white flex flex-col p-8 space-y-8 z-50">
        <div className="flex flex-col space-y-1">
          <h1 className="text-sm font-black tracking-[0.2em] text-black uppercase">RESTAURANT OS</h1>
          <span className="text-[10px] font-label-caps text-neutral-400">Admin Console</span>
        </div>
        <nav className="flex flex-col space-y-6 flex-grow">
          <a href="#" className="flex items-center space-x-3 text-black font-bold border-b-2 border-black pb-1 active:scale-95 transition-all">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-sans text-sm tracking-tight">Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-neutral-500 font-medium hover:text-black transition-colors duration-200">
            <span className="material-symbols-outlined">restaurant_menu</span>
            <span className="font-sans text-sm tracking-tight">Menu</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-neutral-500 font-medium hover:text-black transition-colors duration-200">
            <span className="material-symbols-outlined">receipt_long</span>
            <span className="font-sans text-sm tracking-tight">Orders</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-neutral-500 font-medium hover:text-black transition-colors duration-200">
            <span className="material-symbols-outlined">group</span>
            <span className="font-sans text-sm tracking-tight">Staff</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-neutral-500 font-medium hover:text-black transition-colors duration-200">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-sans text-sm tracking-tight">Settings</span>
          </a>
        </nav>
        <div className="mt-auto pt-8 border-t border-neutral-100 flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200 overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAGMHTScKz75P-_bDWOSRE8yc9baXX3cOLCiBGYZrq0CBT40flOHoKvrkiRjdE-4162m9MNAkyeBvvSDn6fjRLC2a75OEaw9YOLRhuYg7dlGal_WU8qsZjH6fn1UcPtohwyreL8XVGBmhyVrvi2HcPzI9uJ254DHornqlHbuIpyaCRKthWGMXGX9CpYupDpF9U5REeRI288_VgVMsyaQUZ-Wgaetap7x4wuyr2DG4H5DyxPadVVt4Rwij_hAMx9e2SUPo6g9e9d2Q"
              alt="Administrator"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-bold text-black uppercase tracking-wider">Admin User</p>
            <p className="text-[10px] text-neutral-400">Main Branch</p>
          </div>
        </div>
      </aside> */}

      {/* Main Content */}
      <main className="min-h-screen pb-8">
        {/* TopAppBar */}
        <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 h-16">
          <div className="flex items-center flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm"></span>
              <input
                type="text"
                placeholder="Search analytics or orders..."
                className="w-full bg-neutral-50 border-neutral-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-0 focus:border-black transition-all"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              aria-label="Notifications"
              title="Notifications"
              className="p-2 hover:bg-neutral-100 rounded-sm transition-all duration-200 relative text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M13.73 21a2 2 0 01-3.46 0"
                />
              </svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-black border-2 border-white rounded-full"></span>
            </button>
            <button
              aria-label="Account"
              title="Account"
              className="p-2 hover:bg-neutral-100 rounded-sm transition-all duration-200 text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 20a8 8 0 0116 0"
                />
              </svg>
            </button>
          </div>
        </header>

        <section className="p-8 space-y-6 max-w-[1200px] mx-auto">
          {/* Page Header */}
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <h2 className="font-h1 text-h1 text-black">Dashboard</h2>
              <p className="font-body-sm text-secondary">
                Real-time overview of your restaurant performance.
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleCreateOrder}
                className="px-4 py-2 bg-black text-white text-sm font-medium rounded hover:bg-neutral-800 transition-colors flex items-center space-x-2"
              >
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
                <span>Create Order</span>
              </button>
            </div>
          </div>

          {/* Bento Grid Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="Total Menu Items"
              value="124"
              icon="restaurant"
              badge="+12%"
              badgeColor="green"
            />
            <StatsCard
              title="Total Orders"
              value="852"
              icon="shopping_bag"
              badge="Daily"
              badgeColor="black"
            />
            <StatsCard
              title="Total Staff"
              value="18"
              icon="person"
              badge="Active Now"
              badgeColor="neutral"
            />
          </div>

          {/* Main Section: Recent Orders & Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentOrdersTable
                orders={orders}
                onViewAll={handleViewAllOrders}
              />
            </div>
            <div className="space-y-6">
              <QRCard onDownload={handleDownloadQR} />
              <StaffOnDuty staff={staff} onManageShift={handleManageShift} />
            </div>
          </div>

          {/* Inventory Alerts Section */}
          <InventoryAlert
            itemCount={3}
            onDismiss={handleDismissInventory}
            onRestock={handleRestock}
          />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
