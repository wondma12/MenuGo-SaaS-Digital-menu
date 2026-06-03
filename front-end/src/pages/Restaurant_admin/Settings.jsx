import React, { useState } from "react";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
import RestaurantInfoCard from "../../components/Restaurant_admin/settings/RestaurantInfoCard";
import LocationCard from "../../components/Restaurant_admin/settings/LocationCard";
import VisualAssetsCard from "../../components/Restaurant_admin/settings/VisualAssetsCard";
import ProTipCard from "../../components/Restaurant_admin/settings/ProTipCard";

const Settings = () => {
  const [formData, setFormData] = useState({
    restaurantName: "L'Art Culinaire",
    phone: "+1 (555) 012-3456",
    email: "contact@artculinaire.com",
  });
  const [address, setAddress] = useState(
    "123 Gastronomy Way, Culinary District, NY 10001",
  );
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
    console.log("Saved:", { ...formData, address });
  };

  const currentYear = new Date().getFullYear();

  const handleDiscard = () => {
    setFormData({
      restaurantName: "L'Art Culinaire",
      phone: "+1 (555) 012-3456",
      email: "contact@artculinaire.com",
    });
    setAddress("123 Gastronomy Way, Culinary District, NY 10001");
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">

      {/* Main Content with proper spacing */}
      <main className=" min-h-screen bg-surface">
        <div className="p-8 max-w-[1200px] mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-gray-500 text-sm font-bold mb-2 uppercase tracking-widest">
                Restaurant Configuration
              </p>
              <h2 className="text-black text-5xl font-bold uppercase leading-none">
                Settings
              </h2>
              <p className="text-secondary mt-2">
                Manage your restaurant identity, visual assets, and physical location.
              </p>
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
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-black text-white px-5 py-3 rounded-lg shadow-modal text-sm font-medium animate-fade-in-out z-50">
          Settings saved successfully.
        </div>
      )}

      {/* Footer */}
      <footer className="fixed bottom-0 left-64 right-0 py-4 px-6 border-t border-neutral-100 flex justify-between items-center bg-white/50 z-30">
        <span className="font-label-caps text-label-caps text-neutral-400">
          © {currentYear} RESTAURANT OS. ALL RIGHTS RESERVED.
        </span>
        <div className="flex space-x-6">
          <a
            href="#"
            className="font-label-caps text-label-caps text-neutral-400 hover:text-black transition-colors uppercase"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="font-label-caps text-label-caps text-neutral-400 hover:text-black transition-colors uppercase"
          >
            Support
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Settings;