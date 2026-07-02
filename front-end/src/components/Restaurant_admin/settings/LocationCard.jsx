import React from 'react';

const LocationCard = ({ address, setAddress }) => {
  return (
    <div className="bg-white border border-neutral-200 p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-black">location_on</span>
        <h2 className="font-h2 text-h2">Location</h2>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="font-label-caps text-label-caps text-secondary uppercase">Physical Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Gastronomy Way, Culinary District, NY 10001"
            className="w-full border border-neutral-200 p-3 rounded text-on-surface focus:border-black focus:ring-0 transition-all"
          />
        </div>
        <div className="relative h-64 w-full bg-neutral-100 rounded-lg overflow-hidden group">
          <img
            alt="Location Map"
            className="h-full w-full object-cover grayscale opacity-80 group-hover:opacity-100 transition-opacity"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYGvwEDP_VuYJ7KtRCY7lRGEGNwUuQY8mPpv2dAWXyJ1fAypilOYePzYTzvJSASN6MDQfDyhDSWsxvxTedd3uLAEnbQCSzudxTyVSpk7qiMRlKFVFfAQahEx1JMgBycMLiVRqV6IZGxHgtqIFWFMa2imqmkKB1ZcCn_vdOwsFsXp6xKgf6rn4BMO2tJCyIGEndIzVAuFFJIYiCMj49orB-F3c504Q-dzfUsfTawrzJNvhfiJA1yo_VG1rnDxBZUyo-y562MY8JA2Q"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <a
              href="#"
              className="bg-black text-white px-4 py-2 text-sm rounded-full shadow-lg flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;