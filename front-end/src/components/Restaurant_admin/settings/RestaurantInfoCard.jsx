import React from 'react';

const RestaurantInfoCard = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white border border-neutral-200 p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-black">Store front</span>
        <h1 className="font-h2 text-h2">Restaurant Information</h1>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2 col-span-2">
          <label className="font-label-caps text-label-caps text-secondary uppercase">Restaurant Name</label>
          <input
            type="text"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            className="w-full border border-neutral-200 p-3 rounded text-on-surface focus:border-black focus:ring-0 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-caps text-label-caps text-secondary uppercase">Contact Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-neutral-200 p-3 rounded text-on-surface focus:border-black focus:ring-0 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-caps text-label-caps text-secondary uppercase">Business Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-neutral-200 p-3 rounded text-on-surface focus:border-black focus:ring-0 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfoCard;