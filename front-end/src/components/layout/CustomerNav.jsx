

import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const CustomerHeader = ({
  cartCount = 0,
  showMobileMenu = true,
  onMobileMenuClick,
  restaurant = null,  
}) => {
  const location = useLocation();
  const { restaurantId } = useParams();

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  
  const restaurantName = restaurant?.name || "MenuGo";
  const restaurantLogo = restaurant?.logo || null;

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 md:px-12 bg-white border-b border-neutral-200">
      <div className="flex items-center gap-4">
        {showMobileMenu && (
          <button
            onClick={onMobileMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-50"
          >
            <span className="material-symbols-outlined text-neutral-900">
              menu
            </span>
          </button>
        )}
        <Link to={restaurantId ? `/customer/${restaurantId}` : "/customer"}>
          <div className="flex items-center gap-2">
            {restaurantLogo ? (
              <img 
                src={restaurantLogo} 
                alt={restaurantName} 
                className="h-8 w-8 object-contain rounded-full"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : null}
            <h1 className="text-lg font-black tracking-tighter text-neutral-900 uppercase">
              {restaurantName}
            </h1>
          </div>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-6">
        {}
        <Link
          to={restaurantId ? `/customer/${restaurantId}` : "/customer"}
          className={`relative flex items-center gap-2 text-neutral-600 hover:text-neutral-900 pb-1 transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-neutral-900 after:transition-transform after:duration-300 after:ease-in-out ${
            isActiveLink(
              restaurantId ? `/customer/${restaurantId}` : "/customer",
            )
              ? "text-black after:scale-x-100"
              : "after:scale-x-0 hover:after:scale-x-100"
          }`}
        >
          <span className="material-symbols-outlined"></span>
          <span className="font-label-caps text-label-caps">Menu</span>
        </Link>

        {}
        <Link
          to={restaurantId ? `/customer/${restaurantId}/search` : "/search"}
          className={`relative flex items-center gap-2 text-neutral-600 hover:text-neutral-900 pb-1 transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-neutral-900 after:transition-transform after:duration-300 after:ease-in-out ${
            isActiveLink(
              restaurantId ? `/customer/${restaurantId}/search` : "/search",
            )
              ? "text-black after:scale-x-100"
              : "after:scale-x-0 hover:after:scale-x-100"
          }`}
        >
          <span className="material-symbols-outlined"></span>
          <span className="font-label-caps text-label-caps">Search</span>
        </Link>

        {}
        <Link
          to={restaurantId ? `/customer/${restaurantId}/cart` : "/cart"}
          className={`relative flex items-center gap-2 text-neutral-600 hover:text-neutral-900 pb-1 transition-all ${
            isActiveLink(
              restaurantId ? `/customer/${restaurantId}/cart` : "/cart",
            )
              ? "text-black"
              : "group"
          }`}
        >
          <span className="material-symbols-outlined"></span>
          <span className="font-label-caps text-label-caps">Orders</span>

          <span
            className={`absolute bottom-0 left-0 h-[2px] w-full bg-neutral-900 transition-transform duration-300 ease-in-out ${
              isActiveLink(
                restaurantId ? `/customer/${restaurantId}/cart` : "/cart",
              )
                ? "scale-x-100"
                : "scale-x-0 group-hover:scale-x-100"
            }`}
          />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-black text-white text-[11px] font-bold px-2 py-0.5 rounded-full z-10">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};


const BottomNav = ({ cartCount = 0, restaurant = null }) => {
  const location = useLocation();
  const { restaurantId } = useParams();

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-soft md:hidden">
      <Link
        to={restaurantId ? `/customer/${restaurantId}` : "/customer"}
        className={`flex flex-col items-center justify-center px-3 py-1 rounded-md ${
          isActiveLink(restaurantId ? `/customer/${restaurantId}` : "/customer")
            ? "bg-neutral-100 text-neutral-900"
            : "text-neutral-400"
        }`}
      >
        <span className="material-symbols-outlined"></span>
        <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-widest mt-1">
          Menu
        </span>
      </Link>
      <Link
        to={restaurantId ? `/customer/${restaurantId}/search` : "/search"}
        className={`flex flex-col items-center justify-center ${
          isActiveLink(
            restaurantId ? `/customer/${restaurantId}/search` : "/search",
          )
            ? "text-neutral-900"
            : "text-neutral-400"
        }`}
      >
        <span className="material-symbols-outlined"></span>
        <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-widest mt-1">
          Search
        </span>
      </Link>
      <Link
        to={restaurantId ? `/customer/${restaurantId}/cart` : "/cart"}
        className={`flex flex-col items-center justify-center relative ${
          isActiveLink(
            restaurantId ? `/customer/${restaurantId}/cart` : "/cart",
          )
            ? "text-neutral-900"
            : "text-neutral-400"
        }`}
      >
        <span className="material-symbols-outlined"></span>
        <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-widest mt-1">
          Orders
        </span>
        {cartCount > 0 && (
          <span className="absolute -top-1 right-8 bg-black text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
};


export { CustomerHeader, BottomNav };
export default CustomerHeader;