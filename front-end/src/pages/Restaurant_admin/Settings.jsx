import React, { useState } from 'react';
// Page is wrapped by `AdminLayout` in routes (App.jsx). Do not re-wrap here.
import RestaurantInfoCard from '../../components/admin/settings/RestaurantInfoCard';
import LocationCard from '../../components/admin/settings/LocationCard';
import VisualAssetsCard from '../../components/admin/settings/VisualAssetsCard';
import ProTipCard from '../../components/admin/settings/ProTipCard';

const Settings = () => {
  const [formData, setFormData] = useState({
    restaurantName: "L'Art Culinaire",
    phone: '+1 (555) 012-3456',
    email: 'contact@artculinaire.com',
  });
  const [address, setAddress] = useState('123 Gastronomy Way, Culinary District, NY 10001');
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    // Simulate save action
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
    console.log('Saved:', { ...formData, address });
  };
const currentYear = new Date().getFullYear();
  const handleDiscard = () => {
    setFormData({
      restaurantName: "L'Art Culinaire",
      phone: '+1 (555) 012-3456',
      email: 'contact@artculinaire.com',
    });
    setAddress('123 Gastronomy Way, Culinary District, NY 10001');
  };

  return (
    <div>
    <div className="min-h-screen p-8 bg-surface">
      {/* Header Section - match Orders header */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 h-16 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center flex-1 max-w-md">
        <span className="p-2"> <b>Setting</b></span>
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"></span>
            <input
              type="text"
              placeholder="Search settings..."
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-0 focus:border-black transition-all"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button aria-label="Notifications" title="Notifications" className="p-2 hover:bg-neutral-100 rounded-sm transition-all duration-200 relative text-neutral-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            <span className="absolute top-2 right-2 w-2 h-2 bg-black border-2 border-white rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-neutral-100 rounded-full transition-all duration-200">
            <img
              alt="Administrator"
              className="w-8 h-8 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH86kPDT3rJ_pdfxQf81NLa1PGnEvAPBpzfONYLp4-5RiNH-84e-c9tEkq5OnP_kI0jvjzuyjWbalydHBWXYtTIRaOEvA2_-HvF7u_CRTB1B65NaypAqVLBt7YoDhHIKE2eThJiwXqZQuBt7zMaxcsI40GG_VENTZHRDVRy5W4ySJ-8l96Siiz2gvIXSk0GxuzLQw7JsbzMy-aeTaqK198t2Fzki1MQt_sGF02QfsuSsb588lgtl4RHh5zwcN6ydelRpvY1Y-pyR8"
            />
          </button>
        </div>
      </header>

          <div className="flex justify-between mt-6 items-end mb-6">
            <div className="space-y-1">
              <h1 className="font-h1 text-h1 text-on-surface">Configuration</h1>
              <p className="font-body-md text-secondary">Manage your restaurant identity, visual assets, and physical location.</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleDiscard}
                className="px-4 py-2 text-sm border border-black text-black hover:bg-neutral-50 transition-all rounded"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-black text-white hover:bg-neutral-800 transition-all rounded"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Two-column grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left column */}
            <div className="col-span-12 lg:col-span-7 space-y-6">
              <RestaurantInfoCard formData={formData} setFormData={setFormData} />
              <LocationCard address={address} setAddress={setAddress} />
            </div>

            {/* Right column */}
            <div className="col-span-12 lg:col-span-5 space-y-6">
              <VisualAssetsCard />
              <ProTipCard />
            </div>
          </div>
        </div>

      
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-black text-white px-5 py-3 rounded-lg shadow-modal text-sm font-medium animate-fade-in-out z-50">
          Settings saved successfully.
        </div>
      )}

    <footer className="py-4 px-6 border-t border-neutral-100 flex justify-between items-center bg-white/50">
      <span className="font-label-caps text-label-caps text-neutral-400">© {currentYear} RESTAURANT OS. ALL RIGHTS RESERVED.</span>
      <div className="flex space-x-lg">
        <a href="#" className="font-label-caps text-label-caps text-neutral-400 hover:text-black transition-colors uppercase">
          Privacy Policy
        </a>
        <a href="#" className="font-label-caps text-label-caps text-neutral-400 hover:text-black transition-colors uppercase">
          Support
        </a>
      </div>
    </footer>
    </div>
  );
};

export default Settings;