// src/components/customer/Menu/HeroBanner.jsx

import React, { useState } from 'react';

const HeroBanner = ({ restaurant }) => {
  const [imageError, setImageError] = useState(false);

  if (!restaurant) {
    return (
      <section className="relative w-full h-[300px] md:h-[450px] overflow-hidden rounded-lg mb-8">
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No restaurant data available</span>
        </div>
      </section>
    );
  }

  // ✅ Validate banner image URL
  const bannerUrl = restaurant.banner || restaurant.cover_image || '';
  const isValidImage = bannerUrl && 
                       (bannerUrl.startsWith('http://') || 
                        bannerUrl.startsWith('https://') || 
                        bannerUrl.startsWith('/')) && 
                        !bannerUrl.startsWith('data:image/') && 
                        bannerUrl.length < 5000;

  // ✅ Default fallback image
  const defaultImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=400&fit=crop";

  // ✅ Determine which image to use
  const imageSrc = (!isValidImage || imageError) ? defaultImage : bannerUrl;

  return (
    <section className="relative w-full h-[300px] md:h-[450px] overflow-hidden rounded-lg mb-8">
      <img
        className="w-full h-full object-cover"
        alt={`${restaurant.name || 'Restaurant'} interior`}
        src={imageSrc}
        onError={(e) => {
          console.error('[HeroBanner] Failed to load banner image:', bannerUrl);
          setImageError(true);
          e.target.src = defaultImage;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 md:p-12 text-white">
        <div className="flex items-center gap-3 mb-2">
          {restaurant.logo && restaurant.logo.startsWith('http') && (
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