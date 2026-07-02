

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Utensils,
  FolderOpen,
  ClipboardList,
  Users,
  Settings,
  Clock,
  Shield,
  LogOut,
  ChevronUp,
  User,
} from "lucide-react";
import { authAPI, staffAPI } from "../../services/api"; 
import { memo } from 'react';

const Sidebar = ({ role = "Restaurant_admin" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
    restaurantId: null,
    restaurantName: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const user = authAPI.getUser();
        
        if (user) {
          setUserData({
            id: user.id,
            name: user.name || (role === "Platform_admin" ? "Platform Admin" : "Restaurant Admin"),
            email: user.email || "admin@example.com",
            role: user.role || role,
            restaurantId: user.restaurant_id || null,
            restaurantName: user.restaurant_name || "",
            avatar: user.avatar && user.avatar !== "" 
              ? user.avatar 
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=000000&color=fff`,
          });
          setLoading(false);
          return;
        }

        
        const token = authAPI.getToken();
        if (token) {
          try {
            const result = await authAPI.getCurrentUser();
            if (result.success && result.user) {
              const userData = result.user;
              setUserData({
                id: userData.id,
                name: userData.name || (role === "Platform_admin" ? "Platform Admin" : "Restaurant Admin"),
                email: userData.email || "admin@example.com",
                role: userData.role || role,
                restaurantId: userData.restaurant_id || null,
                restaurantName: userData.restaurant_name || "",
                avatar: userData.avatar && userData.avatar !== "" 
                  ? userData.avatar 
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || "User")}&background=000000&color=fff`,
              });
              setLoading(false);
              return;
            }
          } catch (apiError) {
            console.error("API fetch failed:", apiError);
          }
        }

        
        console.warn("No user data found, using default values");
        setUserData({
          id: null,
          name: role === "Platform_admin" ? "Platform Admin" : "Restaurant Admin",
          email: "admin@example.com",
          role: role,
          restaurantId: null,
          restaurantName: "",
          avatar: `https://ui-avatars.com/api/?name=${role === "Platform_admin" ? "PA" : "RA"}&background=000000&color=fff`,
        });
      } catch (error) {
        console.error("Error in fetchUserData:", error);
        setUserData({
          id: null,
          name: role === "Platform_admin" ? "Platform Admin" : "Restaurant Admin",
          email: "admin@example.com",
          role: role,
          restaurantId: null,
          restaurantName: "",
          avatar: `https://ui-avatars.com/api/?name=${role === "Platform_admin" ? "PA" : "RA"}&background=000000&color=fff`,
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [role]);

  const restaurantId = userData.restaurantId;

  
  const handleLogout = () => {
    authAPI.logout(); 
    setIsProfileOpen(false);
    navigate("/auth/login");
  };

  
  const getUserInfo = () => {
    switch (role) {
      case "Platform_admin":
        return {
          name: userData.name || "Platform Admin",
          title: "Platform Administrator",
          email: userData.email || "admin@platform.com",
          avatar: userData.avatar && userData.avatar !== "" 
            ? userData.avatar 
            : "https://ui-avatars.com/api/?name=PA&background=000000&color=fff",
        };
      case "Restaurant_admin":
        return {
          name: userData.name || "Restaurant Admin",
          title: userData.restaurantName 
            ? `Manager at ${userData.restaurantName}` 
            : "Restaurant Manager",
          email: userData.email || "admin@restaurant.com",
          avatar: userData.avatar && userData.avatar !== "" 
            ? userData.avatar 
            : "https://ui-avatars.com/api/?name=RA&background=000000&color=fff",
        };
      case "waiter":
        return {
          name: userData.name || "Waiter",
          title: userData.restaurantName 
            ? `Waiter at ${userData.restaurantName}` 
            : "Service Staff",
          email: userData.email || "waiter@restaurant.com",
          avatar: userData.avatar && userData.avatar !== "" 
            ? userData.avatar 
            : "https://ui-avatars.com/api/?name=WA&background=000000&color=fff",
        };
      default:
        return {
          name: userData.name || "User",
          title: "Team Member",
          email: userData.email || "user@example.com",
          avatar: userData.avatar && userData.avatar !== "" 
            ? userData.avatar 
            : "https://ui-avatars.com/api/?name=US&background=000000&color=fff",
        };
    }
  };

  const userInfo = getUserInfo();

  
  const getStatusColor = () => {
    switch (role) {
      case "Platform_admin":
        return "bg-purple-500";
      case "Restaurant_admin":
        return "bg-green-500";
      case "waiter":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  
  const getPlatformName = () => {
    switch (role) {
      case "Platform_admin":
        return "PLATFORM OS";
      case "Restaurant_admin":
        return "RESTAURANT OS";
      case "waiter":
        return "SERVICE OS";
      default:
        return "RESTAURANT OS";
    }
  };

  const getPlatformSubtitle = () => {
    switch (role) {
      case "Platform_admin":
        return "Admin Console";
      case "Restaurant_admin":
        return "Management Portal";
      case "waiter":
        return "Service Portal";
      default:
        return "Management Portal";
    }
  };

  
  const adminLinks = [
    {
      name: "Dashboard",
      path: restaurantId ? `/Restaurant_admin/dashboard/${restaurantId}` : "/Restaurant_admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Menu",
      path: restaurantId ? `/Restaurant_admin/menu/${restaurantId}` : "/Restaurant_admin/menu",
      icon: FolderOpen,
    },
    {
      name: "Orders",
      path: restaurantId ? `/Restaurant_admin/orders/${restaurantId}` : "/Restaurant_admin/orders",
      icon: ClipboardList,
    },
    {
      name: "Staff",
      path: restaurantId ? `/Restaurant_admin/staff/${restaurantId}` : "/Restaurant_admin/staff",
      icon: Users,
    },
    {
      name: "Settings",
      path: restaurantId ? `/Restaurant_admin/settings/${restaurantId}` : "/Restaurant_admin/settings",
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
      path: restaurantId ? `/waiter/order-for-customer/${restaurantId}` : "/waiter/order-for-customer",
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

  
  if (loading) {
    return (
      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-zinc-200 bg-white dark:bg-zinc-950 flex flex-col py-6">
        <div className="px-8 mb-10">
          <div className="h-6 w-32 bg-zinc-200 animate-pulse rounded"></div>
        </div>
        <div className="flex-grow px-4 space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-zinc-100 animate-pulse rounded"></div>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-zinc-200 bg-white dark:bg-zinc-950 flex flex-col py-6 font-inter antialiased z-50">
      {}
      <div className="px-8 mb-10">
        <h1 className="text-xl font-black tracking-tight text-black dark:text-white uppercase">
          {getPlatformName()}
        </h1>
        <p className="text-xs font-medium text-zinc-400 mt-1 uppercase tracking-widest">
          {getPlatformSubtitle()}
        </p>
      </div>

      {}
      <nav className="flex-grow space-y-2 px-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 py-3 transition-colors ${
                isActive
                  ? "text-black dark:text-white font-bold border-l-2 border-black dark:border-white pl-4"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white pl-4 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              }`}
            >
              <Icon className="text-lg" />
              <span className="text-sm">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {}
      <div className="px-4 mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-900">
        <div className="relative">
          {}
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-200"
          >
            {}
            <div className="relative">
              {userInfo.avatar && userInfo.avatar !== "" ? (
                <img
                  alt={userInfo.name}
                  className="w-10 h-10 rounded-xl object-cover border-2 border-white dark:border-zinc-800 shadow-sm"
                  src={userInfo.avatar}
                  onError={(e) => {
                    
                    e.target.src = `https://ui-avatars.com/api/?name=${userInfo.name.charAt(0)}&background=000000&color=fff`;
                  }}
                />
              ) : (
                
                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center border-2 border-white dark:border-zinc-800 shadow-sm">
                  <span className="text-white text-sm font-bold">
                    {userInfo.name?.charAt(0) || "U"}
                  </span>
                </div>
              )}
              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getStatusColor()} rounded-full border-2 border-white dark:border-zinc-800`} />
            </div>
            
            {}
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-black dark:text-white truncate">
                {userInfo.name}
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                {userInfo.title}
              </p>
            </div>
            
            {}
            <ChevronUp 
              className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                isProfileOpen ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>

          {}
          {isProfileOpen && (
            <>
              {}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsProfileOpen(false)}
              />
              
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-zinc-950 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden z-50">
                {}
                <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-900">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Signed in as
                  </p>
                  <p className="text-sm font-semibold text-black dark:text-white truncate">
                    {userInfo.email}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-1.5 h-1.5 ${getStatusColor()} rounded-full`} />
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                      {role === "Platform_admin" ? "Platform Access" : 
                       role === "Restaurant_admin" ? "Management Access" : 
                       "Service Access"}
                    </p>
                  </div>
                </div>
                
                {}
                <div className="py-2">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate(role === "Platform_admin" ? "/admin/profile" : "/profile");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>View Profile</span>
                  </button>
                  
                  <div className="border-t border-zinc-100 dark:border-zinc-900 my-1" />
                  
                  {}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default memo(Sidebar);