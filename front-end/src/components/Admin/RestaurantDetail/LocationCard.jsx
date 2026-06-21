// src/components/Admin/RestaurantDetail/LocationCard.jsx

import React from "react";
import { MapPin, Phone, Mail, Globe, Home } from "lucide-react";

const LocationCard = ({ location }) => {
  const handleOpenMaps = () => {
    if (location?.map_link) {
      window.open(location.map_link, '_blank');
    } else {
      console.log("No map link available");
    }
  };

  // Handle null/undefined location
  if (!location) {
    return (
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="aspect-square relative bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <span className="text-gray-400">No location data</span>
          </div>
        </div>
      </div>
    );
  }

  // Build full address
  const fullAddress = [
    location.street_address || location.streetAddress,
    location.sub_city || location.subCity,
    location.city,
    location.country,
  ].filter(Boolean).join(", ");

  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <div className="aspect-square relative bg-gray-100">
        {location.map_link ? (
          <img
            className="w-full h-full object-cover"
            src={location.map_link}
            alt="Location map"
            onError={(e) => {
              e.target.src = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude || '0'},${location.longitude || '0'}&zoom=15&size=400x400&markers=${location.latitude || '0'},${location.longitude || '0'}`;
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">No map available</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
          <button
            onClick={handleOpenMaps}
            className="bg-white px-6 py-2.5 shadow-xl rounded-full text-sm font-bold flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <MapPin className="w-4 h-4" />
            Open in Maps
          </button>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Home className="w-5 h-5" />
          Location
        </h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-zinc-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-base text-zinc-700">{fullAddress || "No address provided"}</p>
              {location.sub_city && (
                <p className="text-sm text-zinc-400">{location.sub_city}</p>
              )}
            </div>
          </div>
          {location.latitude && location.longitude && (
            <div className="flex gap-3">
              <Globe className="w-5 h-5 text-zinc-400 mt-1 flex-shrink-0" />
              <p className="text-sm text-zinc-500">
                {location.latitude}, {location.longitude}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationCard;