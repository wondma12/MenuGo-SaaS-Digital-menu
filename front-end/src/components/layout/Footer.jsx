// src/components/layout/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ restaurant = null }) => {
  // ✅ Get restaurant name or fallback
  const restaurantName = restaurant?.name || "MenuGo";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 mt-12">
      <div className="max-w-container-max mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <span className="font-bold text-neutral-900 uppercase tracking-tighter">
            {restaurantName}
          </span>
          <p className="font-['Inter'] text-xs font-light text-neutral-500 mt-1">
            © {currentYear} {restaurantName}. POWERED BY MENUGO.
          </p>
        </div>
        <div className="flex gap-6">
          <Link to="/privacy" className="font-['Inter'] text-xs font-light text-neutral-500 hover:text-black">
            Privacy Policy
          </Link>
          <Link to="/restaurant/1/staff-login" className="font-['Inter'] text-xs font-light text-neutral-900 underline">
            Staff Login
          </Link>
          <Link to="/support" className="font-['Inter'] text-xs font-light text-neutral-500 hover:text-black">
            Contact Support
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;