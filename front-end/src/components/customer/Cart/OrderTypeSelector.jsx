import React from 'react';

const OrderTypeSelector = ({ orderType, setOrderType, tableNumber, setTableNumber }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-container-low p-6 rounded-xl">
      <div>
        <label className="font-label-caps text-label-caps text-on-surface uppercase block mb-md">Order Type</label>
        <div className="flex bg-white border border-outline-variant p-1 rounded-md">
          <button
            onClick={() => setOrderType('Dine-in')}
            className={`flex-1 py-2 font-button text-button rounded-sm transition-all ${
              orderType === 'Dine-in' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Dine-in
          </button>
          <button
            onClick={() => setOrderType('Takeaway')}
            className={`flex-1 py-2 font-button text-button rounded-sm transition-all ${
              orderType === 'Takeaway' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Takeaway
          </button>
        </div>
      </div>
      {orderType === 'Dine-in' && (
        <div>
          <label className="font-label-caps text-label-caps text-on-surface uppercase block mb-md">Table Number</label>
          <input
            type="number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            placeholder="e.g. 12"
            className="w-full bg-white border border-outline-variant px-4 py-2 rounded-md focus:border-primary focus:ring-0 transition-all font-body-md"
          />
        </div>
      )}
    </section>
  );
};

export default OrderTypeSelector;