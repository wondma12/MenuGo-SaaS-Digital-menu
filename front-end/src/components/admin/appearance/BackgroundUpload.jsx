import React, { useState, useRef } from "react";
import Card from "../../ui/card";
import Button from "../../ui/button";
import { Upload, X, Image as ImageIcon, Layout } from "lucide-react";

const BackgroundUpload = ({ currentBackground, onBackgroundUpdate }) => {
  const [preview, setPreview] = useState(currentBackground || "");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const presets = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop",
      name: "Restaurant Interior",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=400&fit=crop",
      name: "Cozy Dining",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop",
      name: "Modern Restaurant",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=400&fit=crop",
      name: "Outdoor Seating",
    },
  ];

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPEG, PNG, WEBP)");
      return false;
    }
    if (file.size > maxSize) {
      setError("Image size must be less than 5MB");
      return false;
    }
    setError("");
    return true;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onBackgroundUpdate(reader.result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetSelect = (url) => {
    setPreview(url);
    onBackgroundUpdate(url);
    setError("");
  };

  const handleRemove = () => {
    setPreview("");
    onBackgroundUpdate("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card title="Landing Background Image">
      <div className="space-y-4">
        {/* Current Background Preview */}
        {preview ? (
          <div className="relative group">
            <div
              className="h-48 rounded-lg bg-cover bg-center shadow-sm"
              style={{ backgroundImage: `url(${preview})` }}
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50">
            <Layout size={40} className="text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              No background image selected
            </p>
          </div>
        )}

        {/* Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Custom Background
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleImageUpload}
            className="hidden"
            id="bg-upload"
          />
          <label
            htmlFor="bg-upload"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
          >
            <Upload size={16} />
            Choose Image
          </label>
          <p className="text-xs text-gray-500 mt-2">
            Recommended: 1920x1080px. JPG, PNG, WEBP up to 5MB
          </p>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        {/* Preset Backgrounds */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Or Choose from Presets
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset.url)}
                className="group relative"
              >
                <div
                  className="h-24 rounded-lg bg-cover bg-center hover:ring-2 hover:ring-black transition-all"
                  style={{ backgroundImage: `url(${preset.url})` }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all flex items-center justify-center">
                  <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100">
                    Select
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  {preset.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {isUploading && (
          <div className="text-sm text-blue-600 flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            Uploading...
          </div>
        )}
      </div>
    </Card>
  );
};

export default BackgroundUpload;
