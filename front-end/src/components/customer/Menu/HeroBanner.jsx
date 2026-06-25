// src/components/customer/Menu/HeroBanner.jsx

import React from "react";

const HeroBanner = ({ restaurant }) => {
  if (!restaurant) {
    return (
      <section className="relative w-full h-[300px] md:h-[450px] overflow-hidden rounded-lg mb-8">
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No restaurant data available</span>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[300px] md:h-[450px] overflow-hidden rounded-lg mb-8">
      <img
        className="w-full h-full object-cover"
        alt={`${restaurant.name} interior`}
        src={
          restaurant.banner ||
          restaurant.cover_image ||
          "https://cdn.dribbble.com/userupload/33502197/file/original-d173b422cc193eee821db0baf7ba055d.jpg?resize=400x0"
        }
        onError={(e) => {
          e.target.src = "https://cdn.dribbble.com/userupload/33502197/file/original-d173b422cc193eee821db0baf7ba055d.jpg?resize=400x0";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 md:p-12 text-white">
        <div className="flex items-center gap-3 mb-2">
          {restaurant.logo && (
            <img 
              src={restaurant.logo} 
              alt={restaurant.name} 
              className="w-12 h-12 rounded-full object-cover border-2 border-white/50"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
          <span className="font-label-caps text-label-caps uppercase tracking-[0.16em]">
            {restaurant.name || "Restaurant"}
          </span>
        </div>
        <h2 className="font-display text-h1 md:text-display mb-2">
          {restaurant.slogan || restaurant.description || "Welcome to our restaurant"}
        </h2>
        <p className="font-body-md max-w-xl opacity-90">
          {restaurant.status === "active"
            ? "Order online or visit us for an amazing dining experience"
            : "Restaurant is currently not accepting orders"}
        </p>
      </div>
    </section>
  );
};

export default HeroBanner;