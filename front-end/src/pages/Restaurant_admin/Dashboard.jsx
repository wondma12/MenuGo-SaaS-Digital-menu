import React, { useState } from "react";
import StatsCard from "../../components/Restaurant_admin/dashboard/StatsCard";
import RecentOrdersTable from "../../components/Restaurant_admin/dashboard/RecentOrdersTable";
import QRCard from "../../components/Restaurant_admin/dashboard/QRCard";
import StaffOnDuty from "../../components/Restaurant_admin/dashboard/StaffOnDuty";
import InventoryAlert from "../../components/Restaurant_admin/dashboard/InventoryAlert";

// Mock data (keep as is)
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
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFxTJskQXd8v-ISTg0x0kDhLpo1OyNcamyrKEjIRuRHfG-XFI6qzmwHyWc0OoHEqxlQCGUU_TU7WhAUoXq367N_yARxvVzh9gcmtzERUhXNHRMa3qcyuXhSnz-RxjdbhxGnmj164uBS5L-x5ecALzzo7F6IqBbfcLCgBf4myDgHOOUMHMia-esCpnP4BqVjpgrROtJqg5v9kM3YkcpuDBSXOsLyNzrvNG3KAYc_VHVBxVRZ1qbth-yet7RNHQdqPPzWvvMpqQLdSM",
  },
  {
    id: 2,
    name: "Marcus V.",
    role: "Floor Manager",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiCFRx-t00NEybRarIbw3T_Tmuaq1r1_mvJ8zCxtV9Z7E7YRZPuQeXryfb2YzWvQlGWkrYxdqPUlp64Nun96lzwBqqlImFyFhZGo8LifkCOANQSJhH3766dVJS5y3kcvev5tt9Jl6WfU8Xt-dtwMlYjy-nk7x-LD4oM0bti-ADI1Yr5rd-WNlAKtu_7nqjcYshtg9dw24xlUGUqbU5EbZxpsuKRbUTa46HIxkBZN182vKL0FluHRUVG-Aoa9UFeAgMU9j9TNSxZ54",
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
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">

      {/* Main content - same margin/padding pattern as Platform Admin */}
      <main className=" min-h-screen bg-surface">
        <div className="p-8 space-y-6 max-w-[1200px]">
          {/* Page Header */}
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <p className="text-gray-500 text-sm font-bold mb-2 uppercase tracking-widest">
                Real-time overview
              </p>
              <h2 className="text-black text-5xl font-bold uppercase leading-none">
                of your restaurant performance.
              </h2>
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;