

import React from 'react';

const PlatformInfo = ({ formData, handleInputChange }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-black">PLATFORM INFORMATION</h2>
        <p className="text-sm text-zinc-500">Manage the public-facing identity and primary support contacts for the entire SaaS environment.</p>
      </div>
      <div className="md:col-span-2 bg-white border border-zinc-200 p-8 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-black uppercase tracking-wider">PLATFORM NAME</label>
            <input
              name="platformName"
              value={formData.platformName || ''}
              onChange={handleInputChange}
              className="w-full border border-zinc-200 rounded-lg p-4 focus:border-black outline-none transition-all text-base"
              placeholder="Enter platform name"
              type="text"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-black uppercase tracking-wider">SUPPORT EMAIL</label>
              <input
                name="supportEmail"
                value={formData.supportEmail || ''}
                onChange={handleInputChange}
                className="w-full border border-zinc-200 rounded-lg p-4 focus:border-black outline-none transition-all text-base"
                placeholder="e.g. hello@domain.com"
                type="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-black uppercase tracking-wider">CONTACT PHONE</label>
              <input
                name="contactPhone"
                value={formData.contactPhone || ''}
                onChange={handleInputChange}
                className="w-full border border-zinc-200 rounded-lg p-4 focus:border-black outline-none transition-all text-base"
                placeholder="+1 (000) 000-0000"
                type="tel"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformInfo;