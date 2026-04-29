import React, { useState } from "react";
import Card from "../../ui/card";
import { Check, Palette } from "lucide-react";

const presetColors = [
  "#000000",
  "#DC2626",
  "#059669",
  "#D97706",
  "#7C3AED",
  "#DB2777",
  "#0284C7",
  "#EA580C",
  "#4F46E5",
  "#0891B2",
  "#65A30D",
  "#C026D3",
];

const ColorPicker = ({
  currentColor,
  onColorChange,
  title = "Primary Color",
}) => {
  const [selectedColor, setSelectedColor] = useState(currentColor || "#000000");
  const [showPicker, setShowPicker] = useState(false);
  const [, setCustomColor] = useState(currentColor || "#000000");

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    onColorChange(color);
  };

  const handleCustomColor = (e) => {
    const color = e.target.value;
    setCustomColor(color);
    handleColorSelect(color);
  };

  return (
    <Card title={title}>
      <div className="space-y-4">
        {/* Current Color Display */}
        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
          <div
            className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm transition-transform hover:scale-105"
            style={{ backgroundColor: selectedColor }}
            onClick={() => setShowPicker(!showPicker)}
          />
          <div className="flex-1">
            <p className="text-xs text-gray-500">Selected Color</p>
            <p className="text-sm font-mono font-medium text-gray-900">
              {selectedColor}
            </p>
          </div>
          <Palette size={20} className="text-gray-400" />
        </div>

        {/* Color Picker Section */}
        {showPicker && (
          <div className="space-y-4 animate-fade-in">
            {/* Preset Colors */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">
                Preset Colors
              </p>
              <div className="grid grid-cols-6 gap-3">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    className="relative w-10 h-10 rounded-full border-2 border-gray-200 hover:scale-110 transition-transform shadow-sm"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                  >
                    {selectedColor === color && (
                      <Check
                        size={16}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white drop-shadow"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Color
              </label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={selectedColor}
                  onChange={handleCustomColor}
                  className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedColor}
                  onChange={(e) => handleColorSelect(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {showPicker ? "Hide color picker" : "Show color picker"}
        </button>
      </div>
    </Card>
  );
};

export default ColorPicker;
