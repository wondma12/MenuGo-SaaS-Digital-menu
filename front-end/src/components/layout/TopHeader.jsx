// components/layout/TopHeader.jsx

import React from "react";
import { Bell } from "lucide-react";

const TopHeader = ({
  role = "Restaurant_admin",
  title = "Dashboard",
  showNotification = true,
  showPageInfo = true,
}) => {
  // Role-specific titles
  const roleTitles = {
    Restaurant_admin: "Command Center",
    Platform_admin: "Admin Dashboard",
    waiter: "Waiter Panel",
  };

  // Page-specific info
  const pageInfo = {
    Dashboard: "Dashboard Overview",
    Menu: "Menu Management",
    Orders: "Order Management",
    Staff: "Staff Management",
    Appearance: "Appearance Settings",
    "QR Code": "QR Code Generator",
    Settings: "Settings",
    Restaurants: "Restaurant Management",
    Users: "User Management",
    Security: "Security Settings",
    active: "Active Orders",
    forcustomer: "Customer Orders",
  };

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md flex justify-between items-center h-16 px-8 ml-64 z-10">
      <div className="flex items-center">
        <span className="text-lg font-bold text-black dark:text-white font-inter tracking-tight">
          {roleTitles[role] || "Dashboard"}
        </span>
      </div>
      <div className="flex items-center gap-6">
        {showNotification && (
          <div className="relative scale-95 active:scale-100 transition-transform">
            <Bell className="text-zinc-500 hover:text-black cursor-pointer w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-black rounded-full border border-white"></div>
          </div>
        )}
        <div className="h-8 w-px bg-zinc-200"></div>
        {showPageInfo && (
          <div className="flex items-center gap-3">
            <span className="font-inter text-sm font-medium">
              {pageInfo[title] || title}
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopHeader;
