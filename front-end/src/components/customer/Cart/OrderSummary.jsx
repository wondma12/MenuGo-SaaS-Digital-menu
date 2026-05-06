import React from 'react';

const OrderSummary = ({ subtotal, onPlaceOrder }) => {
  const tax = 0;
  const total = subtotal + tax;

  return (
    <div className="bg-white border border-primary p-5 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
      <h3 className="font-h2 text-h2 text-black mb-4">Order Summary</h3>
      <div className="space-y-4 border-b border-outline-variant pb-4 mb-5">
        <div className="flex justify-between font-body-md">
          <span className="text-on-surface-variant">Subtotal</span>
          <span className="text-on-surface">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-body-md">
          <span className="text-on-surface-variant">Tax (0%)</span>
          <span className="text-on-surface">$0.00</span>
        </div>
      </div>
      <div className="flex justify-between items-baseline mb-5">
        <span className="font-h3 text-h3 uppercase tracking-tighter">Total</span>
        <span className="font-display text-h1">${total.toFixed(2)}</span>
      </div>
      <button
        onClick={onPlaceOrder}
        className="w-full bg-black text-white py-2.5 font-button text-button uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all rounded-md"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;