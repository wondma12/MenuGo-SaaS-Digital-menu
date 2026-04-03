import React, { useState } from "react";
import LogoUpload from "../../components/admin/appearance/LogoUpload";
import RestaurantNameForm from "../../components/admin/appearance/RestaurantNameForm";
import ColorPicker from "../../components/admin/appearance/ColorPicker";
import BackgroundUpload from "../../components/admin/appearance/BackgroundUpload";
import ThemeCustomizer from "../../components/admin/appearance/ThemeCustomizer";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { Save, Eye, RefreshCw, CheckCircle } from "lucide-react";

const Appearance = () => {
  const [settings, setSettings] = useState({
    logo: "",
    restaurantName: "MenuGo Restaurant",
    primaryColor: "#000000",
    secondaryColor: "#DC2626",
    backgroundColor: "#FFFFFF",
    backgroundImage: "",
    theme: {
      primaryColor: "#000000",
      backgroundColor: "#FFFFFF",
      fontFamily: "Inter",
      buttonStyle: "rounded",
      cardStyle: "shadow",
      darkMode: false,
    },
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveAll = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    // In real app, save to backend
    console.log("Saving settings:", settings);
  };

  const handleReset = () => {
    if (window.confirm("Reset all appearance settings to default?")) {
      setSettings({
        logo: "",
        restaurantName: "MenuGo Restaurant",
        primaryColor: "#000000",
        secondaryColor: "#DC2626",
        backgroundColor: "#FFFFFF",
        backgroundImage: "",
        theme: {
          primaryColor: "#000000",
          backgroundColor: "#FFFFFF",
          fontFamily: "Inter",
          buttonStyle: "rounded",
          cardStyle: "shadow",
          darkMode: false,
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appearance Settings</h1>
          <p className="text-gray-600 mt-1">Customize your restaurant's look and feel</p>
        </div>
        <div className="flex gap-3">
          {saveSuccess && (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg animate-fade-in">
              <CheckCircle size={16} />
              <span className="text-sm">Saved successfully!</span>
            </div>
          )}
          <Button 
            label="Reset to Default" 
            variant="secondary" 
            onClick={handleReset}
            icon={RefreshCw}
          />
          <Button 
            label="Preview" 
            variant="secondary" 
            onClick={() => setPreviewMode(true)}
            icon={Eye}
          />
          <Button 
            label="Save All Changes" 
            variant="primary" 
            onClick={handleSaveAll}
            icon={Save}
          />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
          <p className="text-xs text-gray-500">Logo Status</p>
          <p className="text-lg font-semibold text-gray-900">
            {settings.logo ? "✓ Uploaded" : "Not Set"}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
          <p className="text-xs text-gray-500">Restaurant Name</p>
          <p className="text-lg font-semibold text-gray-900 truncate">
            {settings.restaurantName}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-purple-500">
          <p className="text-xs text-gray-500">Primary Color</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-5 h-5 rounded-full" style={{ backgroundColor: settings.primaryColor }} />
            <p className="text-lg font-semibold text-gray-900">{settings.primaryColor}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-orange-500">
          <p className="text-xs text-gray-500">Theme</p>
          <p className="text-lg font-semibold text-gray-900 capitalize">
            {settings.theme.fontFamily}
          </p>
        </div>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <LogoUpload
            currentLogo={settings.logo}
            onLogoUpdate={(logo) => setSettings({ ...settings, logo })}
          />
          
          <RestaurantNameForm
            currentName={settings.restaurantName}
            onUpdate={(name) => setSettings({ ...settings, restaurantName: name })}
          />
          
          <BackgroundUpload
            currentBackground={settings.backgroundImage}
            onBackgroundUpdate={(bg) => setSettings({ ...settings, backgroundImage: bg })}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <ColorPicker
              title="Primary Color"
              currentColor={settings.primaryColor}
              onColorChange={(color) => setSettings({ ...settings, primaryColor: color })}
            />
            <ColorPicker
              title="Secondary Color"
              currentColor={settings.secondaryColor}
              onColorChange={(color) => setSettings({ ...settings, secondaryColor: color })}
            />
          </div>
          
          <ColorPicker
            title="Background Color"
            currentColor={settings.backgroundColor}
            onColorChange={(color) => setSettings({ ...settings, backgroundColor: color })}
          />
          
          <ThemeCustomizer
            onThemeChange={(theme) => setSettings({ ...settings, theme })}
          />
        </div>
      </div>

      {/* Live Preview Modal */}
      {previewMode && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Menu Preview</h2>
              <button
                onClick={() => setPreviewMode(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div 
                className="rounded-lg p-6 transition-all"
                style={{ 
                  backgroundColor: settings.theme.darkMode ? "#1a1a1a" : settings.backgroundColor,
                  fontFamily: settings.theme.fontFamily
                }}
              >
                {/* Header with Logo */}
                <div className="text-center mb-8">
                  {settings.logo && (
                    <img src={settings.logo} alt="Logo" className="h-20 mx-auto mb-4" />
                  )}
                  <h1 
                    className="text-3xl font-bold"
                    style={{ color: settings.theme.darkMode ? "#ffffff" : settings.primaryColor }}
                  >
                    {settings.restaurantName}
                  </h1>
                  <p className={settings.theme.darkMode ? "text-gray-400" : "text-gray-600"}>
                    Digital Menu
                  </p>
                </div>

                {/* Sample Menu Items */}
                <div className="space-y-4">
                  {[
                    { name: "Margherita Pizza", price: "$15.99", desc: "Fresh tomatoes, mozzarella, basil" },
                    { name: "Caesar Salad", price: "$8.99", desc: "Romaine, parmesan, croutons" },
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-lg transition-all"
                      style={{ 
                        backgroundColor: settings.theme.darkMode ? "#2a2a2a" : "#ffffff",
                        boxShadow: settings.theme.cardStyle !== "shadow-none" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`font-semibold ${settings.theme.darkMode ? "text-white" : "text-gray-900"}`}>
                            {item.name}
                          </h3>
                          <p className={`text-sm ${settings.theme.darkMode ? "text-gray-400" : "text-gray-500"}`}>
                            {item.desc}
                          </p>
                        </div>
                        <span className="font-bold" style={{ color: settings.primaryColor }}>
                          {item.price}
                        </span>
                      </div>
                      <button 
                        className={`mt-3 px-4 py-2 text-white text-sm transition-all ${
                          settings.theme.buttonStyle === "rounded" ? "rounded" :
                          settings.theme.buttonStyle === "rounded-lg" ? "rounded-lg" :
                          settings.theme.buttonStyle === "rounded-full" ? "rounded-full" : ""
                        }`}
                        style={{ backgroundColor: settings.primaryColor }}
                      >
                        Add to Order
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appearance;