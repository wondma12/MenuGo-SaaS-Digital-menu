import React from 'react';

const CartItemRow = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center gap-3 bg-white border border-outline-variant p-3 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
      <div className="w-20 h-20 flex-shrink-0 bg-surface-container overflow-hidden rounded-md">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-grow">
        <h3 className="font-h3 text-h3 text-black">{item.name}</h3>
        <p className="font-body-sm text-secondary">${item.price}</p>
      </div>
      <div className="flex items-center border border-outline-variant rounded-md overflow-hidden">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="px-3 py-2 hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-sm">remove</span>
        </button>
        <span className="px-3 font-bold font-body-md">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="px-3 py-2 hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-sm">add</span>
        </button>
      </div>
    </div>
  );
};

export default CartItemRow;