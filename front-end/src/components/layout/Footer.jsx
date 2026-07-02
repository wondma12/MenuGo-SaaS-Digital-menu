// src/components/layout/Footer.jsx

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { restaurantAPI } from "../../services/api";

const Footer = ({ restaurant = null }) => {
  const { restaurantId } = useParams();
  const [restaurantData, setRestaurantData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ If restaurant prop is passed, use it
  // Otherwise, fetch from API using restaurantId from URL
  useEffect(() => {
    // If restaurant prop is provided, use it
    if (restaurant) {
      setRestaurantData(restaurant);
      setLoading(false);
      return;
    }

    // If no restaurant prop but we have restaurantId in URL, fetch it
    const fetchRestaurant = async () => {
      if (!restaurantId) {
        setLoading(false);
        return;
      }

      try {
        // Try to get from public endpoint first
        const result = await restaurantAPI.getPublicRestaurant?.(restaurantId) ||
                       await restaurantAPI.getById(restaurantId);
        if (result) {
          setRestaurantData(result);
        }
      } catch (error) {
        console.error("[Footer] Error fetching restaurant:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurant, restaurantId]);

  // ✅ Get restaurant name from data
  const restaurantName = restaurantData?.name || 
                         restaurant?.name || 
                         "MenuGo";
  const currentYear = new Date().getFullYear();

  // ✅ Show loading state (optional)
  if (loading && !restaurant) {
    return (
      <footer className="bg-neutral-50 border-t border-neutral-200 mt-12">
        <div className="max-w-container-max mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mt-2"></div>
          </div>
          <div className="flex gap-6">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </footer>
    );
  }

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
          <Link 
            to={restaurantId ? `/restaurant/${restaurantId}/staff-login` : "/restaurant/1/staff-login"} 
            className="font-['Inter'] text-xs font-light text-neutral-900 underline"
          >
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