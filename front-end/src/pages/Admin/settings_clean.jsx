import React, { useState } from "react";
import Sidebar from "../../components/layout/sidebar";
import TopHeader from "../../components/layout/TopHeader";
import {
  PlatformInfo,
  SystemRules,
  SecuritySettings,
  AppearanceSettings,
  SettingsActionBar,
} from "../../components/Platform_admin/settings/index";

const Settings = () => {
  const [formData, setFormData] = useState({
    platformName: "MenuOS Pro",
    supportEmail: "support@menuos.app",
    contactPhone: "+1 (555) 000-1234",
    defaultRestaurantStatus: "pending",
    allowSelfRegistration: true,
    requireVerification: false,
    minPasswordLength: 12,
    sessionTimeout: 60,
    enableEmailVerification: true,
    enableAccountSuspension: true,
  });

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
  };

  const handleReset = () => {
    setFormData({
      platformName: "MenuOS Pro",
      supportEmail: "support@menuos.app",
      contactPhone: "+1 (555) 000-1234",
      defaultRestaurantStatus: "pending",
      allowSelfRegistration: true,
      requireVerification: false,
      minPasswordLength: 12,
      sessionTimeout: 60,
      enableEmailVerification: true,
      enableAccountSuspension: true,
    });
  };

  const handleSave = () => {
    console.log("Saving settings:", formData);
  };

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased">
      <Sidebar role="Platform_admin" />
      <TopHeader role="Platform_admin" title="Settings" />

      <main className="ml-64 pt-24 pb-12 px-8 max-w-[1200px]">
        <div className="py-10 flex flex-col gap-10">
          <PlatformInfo
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <hr className="border-surface-variant" />

          <SystemRules
            formData={formData}
            handleInputChange={handleInputChange}
            handleToggleChange={handleToggleChange}
          />

          <hr className="border-surface-variant" />

          <SecuritySettings
            formData={formData}
            handleInputChange={handleInputChange}
            handleToggleChange={handleToggleChange}
          />

          <hr className="border-surface-variant" />

          <AppearanceSettings handleFileSelect={handleFileSelect} />

          <SettingsActionBar
            handleReset={handleReset}
            handleSave={handleSave}
          />
        </div>
      </main>
    </div>
  );
};

export default Settings;
