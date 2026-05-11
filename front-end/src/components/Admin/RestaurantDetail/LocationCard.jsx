import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const LocationCard = ({ location }) => {
  const handleOpenMaps = () => {
    console.log("Opening maps for location");
    // Add logic to open maps
  };

  // Handle null/undefined location and use mapLink instead of mapImage
  if (!location) {
    return (
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="aspect-square relative bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">No location data</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <div className="aspect-square relative">
        <img
          className="w-full h-full object-cover"
          src={
            location.mapLink || "https://via.placeholder.com/400x400?text=Map"
          }
          alt="Location map"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x400?text=Map";
          }}
        />
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
        <h3 className="text-xl font-semibold mb-4">Location</h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-zinc-400 mt-1 flex-shrink-0" />
            <p className="text-base text-zinc-700">{location.address}</p>
          </div>
          <div className="flex gap-3">
            <Phone className="w-5 h-5 text-zinc-400 mt-1 flex-shrink-0" />
            <p className="text-base text-zinc-700">{location.phone}</p>
          </div>
          <div className="flex gap-3">
            <Mail className="w-5 h-5 text-zinc-400 mt-1 flex-shrink-0" />
            <p className="text-base text-zinc-700">{location.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
