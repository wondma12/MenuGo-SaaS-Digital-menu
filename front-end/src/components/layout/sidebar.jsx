// components/layout/Sidebar.jsx

import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Utensils,
  FolderOpen,
  ClipboardList,
  Users,
  Palette,
  QrCode,
  BarChart3,
  Settings,
  Clock,
  Shield,
} from "lucide-react";

const Sidebar = ({ role = "Restaurant_admin" }) => {
  const location = useLocation();

  // Get restaurant ID from user data
  const getUserRestaurantId = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.restaurantId;
  };

  const restaurantId = getUserRestaurantId();

  const adminLinks = [
    {
      name: "Dashboard",
      path: restaurantId
        ? `/Restaurant_admin/dashboard/${restaurantId}`
        : "/Restaurant_admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Menu",
      path: restaurantId
        ? `/Restaurant_admin/menu/${restaurantId}`
        : "/Restaurant_admin/menu",
      icon: FolderOpen,
    },
    {
      name: "Orders",
      path: restaurantId
        ? `/Restaurant_admin/orders/${restaurantId}`
        : "/Restaurant_admin/orders",
      icon: ClipboardList,
    },
    {
      name: "Staff",
      path: restaurantId
        ? `/Restaurant_admin/staff/${restaurantId}`
        : "/Restaurant_admin/staff",
      icon: Users,
    },
    {
      name: "Settings",
      path: restaurantId
        ? `/Restaurant_admin/RestuarantSettings/${restaurantId}`
        : "/Restaurant_admin/settings",
      icon: Settings,
    },
  ];

  const waiterLinks = [
    {
      name: "Orders",
      path: restaurantId ? `/waiter/orders/${restaurantId}` : "/waiter/orders",
      icon: ClipboardList,
    },
    {
      name: "Active Orders",
      path: restaurantId ? `/waiter/active/${restaurantId}` : "/waiter/active",
      icon: Clock,
    },
    {
      name: "Order For customer",
      path: restaurantId
        ? `/waiter/order-for-customer/${restaurantId}`
        : "/waiter/order-for-customer",
      icon: Users,
    },
  ];

  const PlatformadminLinks = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Restaurants",
      path: "/admin/restaurants",
      icon: Utensils,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Security",
      path: "/admin/security",
      icon: Shield,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  let links;
  switch (role) {
    case "waiter":
      links = waiterLinks;
      break;
    case "Restaurant_admin":
      links = adminLinks;
      break;
    case "Platform_admin":
      links = PlatformadminLinks;
      break;
    default:
      links = adminLinks;
      break;
  }
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-zinc-200 bg-white dark:bg-zinc-950 flex flex-col py-6 font-inter antialiased">
      <div className="px-8 mb-10">
        <h1 className="text-xl font-black tracking-tight text-black dark:text-white uppercase">
          PLATFORM
        </h1>
        <p className="text-xs font-medium text-zinc-400 mt-1 uppercase tracking-widest">
          SaaS Admin
        </p>
      </div>

      <nav className="flex-grow space-y-2 px-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 py-3 transition-colors transition-all hover-lift ${
                isActive
                  ? "text-black dark:text-white font-bold border-l-2 border-black dark:border-white pl-4"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white pl-4 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              }`}
            >
              <Icon
                className="text-lg"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              />
              <span className="text-sm">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-8 mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-900">
        <div className="flex items-center gap-3">
          <img
            alt="Admin Profile"
            className="w-10 h-10 rounded-lg object-cover border border-zinc-200"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0MIG45D2ffg84ns4KvPDaPqGM7cBGKAYnhWsuNZMAB2T31UJvQbF7kZhL3lK8mXurwKTZKdekCwaeER8sBnKj2BeT3tv4jxiu4IFhC9bxfQoCNasr8TrdsSh-nVlZrlHUGsUxMjedrHYYPQyKdYPLqfCMsSFBTuWIooLgTuF7WMztck3SaSyaMImMY8MalvZSg-duvhB3RnDE3RZsYFM5ktGLY6xVyjnH1UYNkXFWhXgPmZKbSVyWrfTB8a0uOMhRbFWKio8rluE"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-bold truncate">Alexander Vance</p>
            <p className="text-[10px] text-zinc-400 truncate uppercase tracking-tighter">
              Chief Administrator
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
