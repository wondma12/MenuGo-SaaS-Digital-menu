import React, { useState } from "react";
import Card from "../../ui/card";
import Button from "../../ui/button";
import { Monitor, Type, Layout, Square, Circle, Sun, Moon } from "lucide-react";

const ThemeCustomizer = ({ onThemeChange }) => {
  const [theme, setTheme] = useState({
    primaryColor: "#000000",
    backgroundColor: "#FFFFFF",
    fontFamily: "Inter",
    buttonStyle: "rounded",
    cardStyle: "shadow",
    darkMode: false,
  });

  const fontOptions = [
    { value: "Inter", label: "Inter (Modern)" },
    { value: "Arial", label: "Arial (Classic)" },
    { value: "Helvetica", label: "Helvetica (Clean)" },
    { value: "Georgia", label: "Georgia (Elegant)" },
    { value: "Times New Roman", label: "Times New Roman (Traditional)" },
    { value: "Poppins", label: "Poppins (Friendly)" },
  ];

  const buttonStyles = [
    { value: "rounded", label: "Rounded", icon: Square },
    { value: "rounded-lg", label: "Large Rounded", icon: Square },
    { value: "rounded-full", label: "Fully Rounded", icon: Circle },
    { value: "rounded-none", label: "Square", icon: Square },
  ];

  const cardStyles = [
    { value: "shadow", label: "With Shadow", icon: Layout },
    { value: "shadow-lg", label: "Large Shadow", icon: Layout },
    { value: "shadow-none", label: "No Shadow", icon: Layout },
  ];

  const handleChange = (key, value) => {
    const newTheme = { ...theme, [key]: value };
    setTheme(newTheme);
    onThemeChange(newTheme);
  };

  return (
    <Card title="Theme Customizer">
      <div className="space-y-5">
        {/* Font Family */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Type size={16} />
            Font Family
          </label>
          <select
            value={theme.fontFamily}
            onChange={(e) => handleChange("fontFamily", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
          <div
            className="mt-2 p-3 bg-gray-50 rounded-lg text-center"
            style={{ fontFamily: theme.fontFamily }}
          >
            <p className="text-gray-700">
              Preview: The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>

        {/* Button Style */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Square size={16} />
            Button Style
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {buttonStyles.map((style) => (
              <button
                key={style.value}
                className={`px-4 py-2 bg-black text-white text-sm transition-all ${
                  style.value === "rounded"
                    ? "rounded"
                    : style.value === "rounded-lg"
                      ? "rounded-lg"
                      : style.value === "rounded-full"
                        ? "rounded-full"
                        : ""
                } ${theme.buttonStyle === style.value ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
                onClick={() => handleChange("buttonStyle", style.value)}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        {/* Card Style */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Layout size={16} />
            Card Style
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {cardStyles.map((style) => (
              <button
                key={style.value}
                className={`p-4 bg-white border rounded-lg text-sm transition-all ${
                  theme.cardStyle === style.value
                    ? "border-black ring-2 ring-black"
                    : "border-gray-200 hover:border-gray-300"
                } ${style.value === "shadow" ? "shadow" : style.value === "shadow-lg" ? "shadow-lg" : ""}`}
                onClick={() => handleChange("cardStyle", style.value)}
              >
                <Layout size={20} className="mx-auto mb-2 text-gray-500" />
                {style.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Sun size={16} />
            Dark Mode
          </label>
          <button
            onClick={() => handleChange("darkMode", !theme.darkMode)}
            className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
              theme.darkMode
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <div className="flex items-center gap-2">
              {theme.darkMode ? <Moon size={18} /> : <Sun size={18} />}
              <span>
                {theme.darkMode ? "Dark Mode Enabled" : "Light Mode Enabled"}
              </span>
            </div>
            <div
              className={`w-10 h-5 rounded-full transition-colors ${theme.darkMode ? "bg-blue-600" : "bg-gray-300"}`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform mt-0.5 ${theme.darkMode ? "translate-x-5" : "translate-x-0.5"}`}
              />
            </div>
          </button>
        </div>

        {/* Preview Info */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-xs text-blue-700">
            💡 Tip: Changes here will affect how your menu appears to customers.
            Click "Preview" to see the live effect.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ThemeCustomizer;
