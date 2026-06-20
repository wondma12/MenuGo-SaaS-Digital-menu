// src/pages/Restaurant_admin/Settings.jsx

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
import RestaurantInfoCard from "../../components/Restaurant_admin/settings/RestaurantInfoCard";
import LocationCard from "../../components/Restaurant_admin/settings/LocationCard";
import VisualAssetsCard from "../../components/Restaurant_admin/settings/VisualAssetsCard";
import ProTipCard from "../../components/Restaurant_admin/settings/ProTipCard";
import QRCodeManagementCard from "../../components/Restaurant_admin/settings/QRCodeManagementCard";
import restaurantService from "../../services/restaurantService";
import { settingsAPI, qrCodeAPI } from "../../services/api";

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // State for restaurant data
  const [restaurant, setRestaurant] = useState(null);
  const [qrCodes, setQrCodes] = useState([]);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  
  const [formData, setFormData] = useState({
    restaurantName: "",
    phone: "",
    email: "",
    description: "",
    slogan: "",
    website_url: "",
  });
  
  const [address, setAddress] = useState({
    country: "",
    city: "",
    sub_city: "",
    street_address: "",
    map_link: "",
    latitude: "",
    longitude: "",
  });
  
  const [visualAssets, setVisualAssets] = useState({
    logo: "",
    banner: "",
    qr_code: "",
  });

  const currentYear = new Date().getFullYear();

  // ============================================================
  // LOAD SETTINGS
  // ============================================================

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get restaurant data
      const restaurantResult = await restaurantService.getMyRestaurant();
      
      if (restaurantResult.success) {
        const data = restaurantResult.data;
        setRestaurant(data);
        
        // Update form data
        setFormData({
          restaurantName: data.name || "",
          phone: data.phone || "",
          email: data.email || "",
          description: data.description || "",
          slogan: data.slogan || "",
          website_url: data.website_url || "",
        });
        
        // Update visual assets
        setVisualAssets({
          logo: data.logo || "",
          banner: data.banner || "",
          qr_code: data.qr_code || "",
        });

        // Update location if exists
        if (data.location) {
          setAddress({
            country: data.location.country || "",
            city: data.location.city || "",
            sub_city: data.location.sub_city || "",
            street_address: data.location.street_address || "",
            map_link: data.location.map_link || "",
            latitude: data.location.latitude || "",
            longitude: data.location.longitude || "",
          });
        }

        // Load QR codes
        await loadQRCodes();
      } else {
        setError(restaurantResult.error || "Failed to load restaurant settings");
      }
    } catch (err) {
      console.error("[Settings] Error loading settings:", err);
      setError(err.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

// src/pages/Restaurant_admin/Settings.jsx - Update loadQRCodes

const loadQRCodes = async () => {
  try {
    console.log('[Settings] Loading QR codes...');
    const result = await qrCodeAPI.getAll();
    console.log('[Settings] QR codes result:', result);
    
    if (result.success) {
      // ✅ Ensure we're setting an array
      const qrCodesData = result.data || [];
      setQrCodes(Array.isArray(qrCodesData) ? qrCodesData : []);
      console.log('[Settings] QR codes set:', qrCodesData);
    } else {
      console.warn('[Settings] Failed to load QR codes:', result.error);
      setQrCodes([]);
    }
  } catch (error) {
    console.error("[Settings] Error loading QR codes:", error);
    setQrCodes([]);
  }
};

  // ============================================================
  // QR CODE HANDLERS
  // ============================================================

  const handleGenerateQR = async () => {
    if (!restaurant || !restaurant.id) {
      showToastMessage("No restaurant found. Please save your restaurant first.", "error");
      return;
    }

    try {
      setIsGeneratingQR(true);
      
      const result = await qrCodeAPI.generate({
        restaurant_id: restaurant.id,
        qr_type: 'menu',
      });
      
      if (result.success) {
        showToastMessage("QR Code generated successfully!", "success");
        await loadQRCodes(); // Refresh QR codes list
        // Update visual assets with new QR code
        if (result.data && result.data.qr_image_url) {
          setVisualAssets(prev => ({
            ...prev,
            qr_code: result.data.qr_image_url,
          }));
        }
      } else {
        showToastMessage(result.error || "Failed to generate QR code", "error");
      }
    } catch (error) {
      console.error("[Settings] Error generating QR:", error);
      showToastMessage("Failed to generate QR code. Please try again.", "error");
    } finally {
      setIsGeneratingQR(false);
    }
  };

  const handleDownloadQR = (qrImageUrl, fileName) => {
    if (!qrImageUrl) {
      showToastMessage("No QR code to download", "error");
      return;
    }

    try {
      // If it's a data URL
      if (qrImageUrl.startsWith('data:image')) {
        const link = document.createElement('a');
        link.href = qrImageUrl;
        link.download = `${fileName || 'qr-code'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToastMessage("QR Code downloaded successfully!", "success");
        return;
      }

      // If it's a URL, fetch and download
      fetch(qrImageUrl)
        .then(response => response.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${fileName || 'qr-code'}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          showToastMessage("QR Code downloaded successfully!", "success");
        })
        .catch(error => {
          console.error("[Settings] Error downloading QR:", error);
          showToastMessage("Failed to download QR code", "error");
        });
    } catch (error) {
      console.error("[Settings] Error downloading QR:", error);
      showToastMessage("Failed to download QR code", "error");
    }
  };

  const handleToggleQRStatus = async (qrId, isActive) => {
    try {
      const result = await qrCodeAPI.updateStatus(qrId, isActive);
      if (result.success) {
        await loadQRCodes();
        showToastMessage(`QR code ${isActive ? 'activated' : 'deactivated'} successfully!`, "success");
      } else {
        showToastMessage(result.error || "Failed to update QR code status", "error");
      }
    } catch (error) {
      console.error("[Settings] Error updating QR status:", error);
      showToastMessage("Failed to update QR code status", "error");
    }
  };

  const handleDeleteQR = async (qrId) => {
    if (!window.confirm("Are you sure you want to delete this QR code?")) {
      return;
    }

    try {
      const result = await qrCodeAPI.delete(qrId);
      if (result.success) {
        await loadQRCodes();
        showToastMessage("QR code deleted successfully!", "success");
      } else {
        showToastMessage(result.error || "Failed to delete QR code", "error");
      }
    } catch (error) {
      console.error("[Settings] Error deleting QR:", error);
      showToastMessage("Failed to delete QR code", "error");
    }
  };

  // ============================================================
  // SAVE SETTINGS
  // ============================================================

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      // 1. Update restaurant info
      const restaurantUpdateData = {
        name: formData.restaurantName,
        phone: formData.phone,
        email: formData.email,
        description: formData.description,
        slogan: formData.slogan,
        website_url: formData.website_url,
        logo: visualAssets.logo,
        banner: visualAssets.banner,
        qr_code: visualAssets.qr_code,
      };

      const restaurantResult = await restaurantService.updateRestaurant(
        restaurant.id,
        restaurantUpdateData
      );

      if (!restaurantResult.success) {
        throw new Error(restaurantResult.error || "Failed to update restaurant info");
      }

      // 2. Update location if it exists
      if (address.country || address.city) {
        const locationData = {
          restaurant_id: restaurant.id,
          country: address.country,
          city: address.city,
          sub_city: address.sub_city,
          street_address: address.street_address,
          map_link: address.map_link,
          latitude: address.latitude ? parseFloat(address.latitude) : null,
          longitude: address.longitude ? parseFloat(address.longitude) : null,
        };

        const locationResult = await restaurantService.updateLocation(locationData);
        
        if (!locationResult.success) {
          console.warn("[Settings] Location update failed:", locationResult.error);
        }
      }

      showToastMessage("Settings saved successfully!", "success");
      await loadSettings();

    } catch (error) {
      console.error("[Settings] Error saving:", error);
      showToastMessage(error.message || "Failed to save settings", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (restaurant) {
      setFormData({
        restaurantName: restaurant.name || "",
        phone: restaurant.phone || "",
        email: restaurant.email || "",
        description: restaurant.description || "",
        slogan: restaurant.slogan || "",
        website_url: restaurant.website_url || "",
      });
      
      setVisualAssets({
        logo: restaurant.logo || "",
        banner: restaurant.banner || "",
        qr_code: restaurant.qr_code || "",
      });

      if (restaurant.location) {
        setAddress({
          country: restaurant.location.country || "",
          city: restaurant.location.city || "",
          sub_city: restaurant.location.sub_city || "",
          street_address: restaurant.location.street_address || "",
          map_link: restaurant.location.map_link || "",
          latitude: restaurant.location.latitude || "",
          longitude: restaurant.location.longitude || "",
        });
      }
    }
    showToastMessage("Changes discarded", "info");
  };

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // ============================================================
  // HANDLERS FOR CHILD COMPONENTS
  // ============================================================

  const handleFormDataChange = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleAddressChange = (updates) => {
    setAddress(prev => ({ ...prev, ...updates }));
  };

  const handleVisualAssetsChange = (updates) => {
    setVisualAssets(prev => ({ ...prev, ...updates }));
  };

  // ============================================================
  // RENDER - LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
        <main className="min-h-screen bg-surface">
          <div className="p-8 max-w-[1200px] mx-auto">
            {/* Skeleton Header */}
            <div className="flex justify-between items-end mb-6">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex space-x-4">
                <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Skeleton Content */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-7 space-y-6">
                <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
              <div className="col-span-12 lg:col-span-5 space-y-6">
                <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ============================================================
  // RENDER - ERROR
  // ============================================================

  if (error) {
    return (
      <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
        <main className="min-h-screen bg-surface">
          <div className="p-8 max-w-[1200px] mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-red-700 mb-2">Unable to Load Settings</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={loadSettings}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ============================================================
  // RENDER - SUCCESS
  // ============================================================

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
      <main className="min-h-screen bg-surface pb-20">
        <div className="p-8 max-w-[1200px] mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
            <div>
              <p className="text-gray-500 text-sm font-bold mb-2 uppercase tracking-widest">
                Restaurant Configuration
              </p>
              <h2 className="text-black text-3xl md:text-5xl font-bold uppercase leading-none">
                Settings
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Manage your restaurant identity, visual assets, QR codes, and physical location.
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleDiscard}
                disabled={saving}
                className="px-4 py-2 text-sm border border-black text-black hover:bg-neutral-50 transition-all rounded disabled:opacity-50"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 text-sm bg-black text-white hover:bg-neutral-800 transition-all rounded disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>

          {/* Two-column grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left column */}
            <div className="col-span-12 lg:col-span-7 space-y-6">
              <RestaurantInfoCard 
                formData={formData} 
                setFormData={setFormData}
                onChange={handleFormDataChange}
              />
              <LocationCard 
                address={address} 
                setAddress={setAddress}
                onChange={handleAddressChange}
              />
            </div>

            {/* Right column */}
            <div className="col-span-12 lg:col-span-5 space-y-6">
              <VisualAssetsCard 
                visualAssets={visualAssets}
                onChange={handleVisualAssetsChange}
              />
              
              {/* QR Code Management Card */}
              <QRCodeManagementCard
                qrCodes={qrCodes}
                restaurantName={restaurant?.name}
                onGenerate={handleGenerateQR}
                onDownload={handleDownloadQR}
                onToggleStatus={handleToggleQRStatus}
                onDelete={handleDeleteQR}
                isGenerating={isGeneratingQR}
              />
              
              <ProTipCard />
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed bottom-8 right-8 px-5 py-3 rounded-lg shadow-modal text-sm font-medium animate-fade-in-out z-50 ${
          toastType === "success" ? "bg-green-600 text-white" :
          toastType === "error" ? "bg-red-600 text-white" :
          "bg-black text-white"
        }`}>
          {toastMessage}
        </div>
      )}

      {/* Footer */}
      <footer className="fixed bottom-0 left-64 right-0 py-4 px-6 border-t border-neutral-100 flex justify-between items-center bg-white/50 z-30">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          © {currentYear} RESTAURANT OS. ALL RIGHTS RESERVED.
        </span>
        <div className="flex space-x-6">
          <a
            href="#"
            className="text-[10px] font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-[10px] font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest"
          >
            Support
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Settings;