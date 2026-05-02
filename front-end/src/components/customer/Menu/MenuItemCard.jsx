import React from 'react';

const MenuItemCard = ({ item, onAddToCart }) => {
  const handleOrder = () => {
    if (typeof onAddToCart === 'function') onAddToCart(item);
  };

  return (
    <div className="bg-surface-container-lowest border border-surface-variant p-4 flex flex-col group">
      <div className="relative w-full aspect-[4/3] overflow-hidden mb-4 rounded-md">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={item.image}
          alt={item.name}
        />
        {item.dietary && (
          <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded">
            <span className="font-label-caps text-[10px] uppercase text-black">Signature</span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-h3 text-h3 text-black uppercase">{item.name}</h3>
        <span className="font-h3 text-h3 text-black">${item.price}</span>
      </div>
      <p className="font-body-sm text-body-sm text-secondary mb-4 flex-grow">{item.description}</p>
      {item.dietary && (
        <div className="flex gap-2 mb-4">
          {item.dietary.map((d) => (
            <span key={d} className="bg-surface-container px-2 py-1 font-label-caps text-[10px] text-black uppercase rounded-sm">
              {d}
            </span>
          ))}
        </div>
      )}
      <button
        onClick={handleOrder}
        className="w-full bg-black text-white font-button text-button py-2 uppercase hover:opacity-90 transition-opacity rounded-md"
      >
        Order
      </button>
    </div>
  );
};

export default MenuItemCard;