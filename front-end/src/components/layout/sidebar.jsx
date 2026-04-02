// components/layout/Sidebar.jsx

import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  FolderOpen,
  ClipboardList,
  Users,
  Palette,
  QrCode,
  BarChart3,
  Settings,
  Clock,
} from "lucide-react";

const Sidebar = ({ role = "admin" }) => {
  const location = useLocation();

  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Menu", path: "/admin/menu", icon: UtensilsCrossed },
    { name: "Categories", path: "/admin/categories", icon: FolderOpen },
    { name: "Orders", path: "/admin/orders", icon: ClipboardList },
    { name: "Staff", path: "/admin/staff", icon: Users },
    { name: "Appearance", path: "/admin/appearance", icon: Palette },
    { name: "QR Code", path: "/admin/qr", icon: QrCode },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const waiterLinks = [
    { name: "Orders", path: "/waiter/orders", icon: ClipboardList },
    { name: "Active Orders", path: "/waiter/active", icon: Clock },
  ];

  const links = role === "waiter" ? waiterLinks : adminLinks;

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-blue-50 to-white border-r border-gray-200 shadow-lg flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-white" />
          </div>
          MenuGo
        </h2>
        <p className="text-sm text-gray-500 mt-1">Digital Menu System</p>
      </div>

      <nav className="p-4 flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-blue-100 text-blue-700 shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-500 group-hover:text-gray-700"
                    }`}
                  />
                  <span className="font-medium">{link.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500">Logged in as {role}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
