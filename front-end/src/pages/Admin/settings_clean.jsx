// src/pages/Admin/settings_clean.jsx

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
import {
  PlatformInfo,
  SystemRules,
  SecuritySettings,
  AppearanceSettings,
  SettingsActionBar,
} from "../../components/Admin/settings/index";
import { settingsAPI } from "../../services/api";

const Settings = () => {
  const [formData, setFormData] = useState({
    platformName: "",
    supportEmail: "",
    contactPhone: "",
    defaultRestaurantStatus: "pending",
    allowSelfRegistration: true,
    requireVerification: false,
    minPasswordLength: 12,
    sessionTimeout: 60,
    enableEmailVerification: true,
    enableAccountSuspension: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // =========================================
  // FETCH SETTINGS
  // =========================================

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await settingsAPI.get();

      if (result) {
        setFormData({
          platformName: result.platform_name || result.platformName || "",
          supportEmail: result.support_email || result.supportEmail || "",
          contactPhone: result.contact_phone || result.contactPhone || "",
          defaultRestaurantStatus: result.default_restaurant_status || result.defaultRestaurantStatus || "pending",
          allowSelfRegistration: result.allow_self_registration !== undefined ? result.allow_self_registration : result.allowSelfRegistration !== undefined ? result.allowSelfRegistration : true,
          requireVerification: result.require_verification_documents !== undefined ? result.require_verification_documents : result.requireVerification !== undefined ? result.requireVerification : false,
          minPasswordLength: result.minimum_password_length || result.minPasswordLength || 12,
          sessionTimeout: result.session_timeout || result.sessionTimeout || 60,
          enableEmailVerification: result.enable_email_verification !== undefined ? result.enable_email_verification : result.enableEmailVerification !== undefined ? result.enableEmailVerification : true,
          enableAccountSuspension: result.enable_account_suspension !== undefined ? result.enable_account_suspension : result.enableAccountSuspension !== undefined ? result.enableAccountSuspension : true,
        });
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
      setError(err.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // HANDLERS
  // =========================================

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleToggleChange = (name) => (checked) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleFileSelect = (type) => (file) => {
    console.log(`Selected ${type}:`, file);
    // Handle file upload - convert to base64 or upload to cloud
  };

  const handleReset = async () => {
    if (window.confirm("Are you sure you want to reset to default settings?")) {
      await fetchSettings();
      setSuccessMessage("Settings reset to saved values");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccessMessage("");

      const payload = {
        platform_name: formData.platformName,
        support_email: formData.supportEmail,
        contact_phone: formData.contactPhone,
        default_restaurant_status: formData.defaultRestaurantStatus,
        allow_self_registration: formData.allowSelfRegistration,
        require_verification_documents: formData.requireVerification,
        minimum_password_length: parseInt(formData.minPasswordLength),
        session_timeout: parseInt(formData.sessionTimeout),
        enable_email_verification: formData.enableEmailVerification,
        enable_account_suspension: formData.enableAccountSuspension,
      };

      await settingsAPI.update(payload);
      setSuccessMessage("Settings saved successfully!");

      // Refresh data
      await fetchSettings();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error saving settings:", err);
      setError(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // LOADING STATE
  // =========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
        <Sidebar role="Platform_admin" />
        <TopHeader role="Platform_admin" title="Settings" />
        <main className=" min-h-screen bg-background">
          <div className="p-8 max-w-[1200px]">
            <div className="flex flex-col gap-10">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="md:col-span-2 bg-white border border-zinc-200 p-8 rounded-xl">
                    <div className="space-y-4">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="h-12 bg-gray-100 rounded animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // =========================================
  // ERROR STATE
  // =========================================

  if (error) {
    return (
      <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
        <Sidebar role="Platform_admin" />
        <TopHeader role="Platform_admin" title="Settings" />
        <main className=" min-h-screen bg-background">
          <div className="p-8 max-w-[1200px]">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-red-700 mb-2">Unable to Load Settings</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchSettings}
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

  // =========================================
  // SUCCESS STATE
  // =========================================

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
      <Sidebar role="Platform_admin" />
      <TopHeader role="Platform_admin" title="Settings" />

      <main className=" min-h-screen bg-background">
        <div className="p-8 max-w-[1200px]">
          {/* Page Header */}
          <div className="mb-8">
            <p className="text-gray-500 text-sm font-bold mb-2 uppercase tracking-widest">
              Platform Configuration
            </p>
            <h2 className="text-black text-4xl font-bold uppercase leading-none">
              Settings
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Manage global platform settings, security policies, and appearance.
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-10">
            <PlatformInfo
              formData={formData}
              handleInputChange={handleInputChange}
            />

            <hr className="border-zinc-200" />

            <SystemRules
              formData={formData}
              handleInputChange={handleInputChange}
              handleToggleChange={handleToggleChange}
            />

            <hr className="border-zinc-200" />

            <SecuritySettings
              formData={formData}
              handleInputChange={handleInputChange}
              handleToggleChange={handleToggleChange}
            />

            <hr className="border-zinc-200" />

            <AppearanceSettings handleFileSelect={handleFileSelect} />

            <SettingsActionBar
              handleReset={handleReset}
              handleSave={handleSave}
              saving={saving}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;