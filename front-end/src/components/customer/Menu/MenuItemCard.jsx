import React, { useState } from "react";

const MenuItemCard = ({ item, onAddToCart }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleOrder = () => {
    if (typeof onAddToCart === "function") onAddToCart(item);
  };

  return (
    <div className="bg-surface-container-lowest border border-surface-variant p-4 flex flex-col group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative w-full aspect-[4/3] overflow-hidden mb-4 rounded-md bg-gradient-to-br from-gray-100 to-gray-200">
        {item.image ? (
          <div className="relative w-full h-full">
            <img
              className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:translate-y-2 ${
                isImageLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              src={item.image}
              alt={item.name}
              onLoad={() => setIsImageLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            <span className="text-gray-400 text-4xl group-hover:scale-110 transition-transform duration-300">
              🍽️
            </span>
          </div>
        )}
        {item.dietary && (
          <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md shadow-md transform translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-out">
            <span className="font-label-caps text-[10px] uppercase text-black">
              Signature
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-start mb-2 group/content">
        <h3 className="font-h3 text-h3 text-black uppercase group-hover/content:text-primary transition-colors duration-300">
          {item.name}
        </h3>
        <span className="font-h3 text-h3 text-black group-hover/content:scale-110 transition-transform duration-300">
          ${item.price}
        </span>
      </div>
      <p className="font-body-sm text-body-sm text-secondary mb-4 flex-grow line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
        {item.description}
      </p>
      {item.dietary && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {item.dietary.map((d, index) => (
            <span
              key={d}
              className="bg-surface-container px-2 py-1 font-label-caps text-[10px] text-black uppercase rounded-sm hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {d}
            </span>
          ))}
        </div>
      )}
      <button
        onClick={handleOrder}
        className="w-full bg-black text-white font-button text-button py-2 uppercase hover:bg-primary hover:shadow-lg transition-all duration-300 rounded-md hover:-translate-y-0.5 active:scale-95 transform relative overflow-hidden group/btn"
      >
        <span className="relative z-10">Order</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
      </button>
    </div>
  );
};

export default MenuItemCard;
