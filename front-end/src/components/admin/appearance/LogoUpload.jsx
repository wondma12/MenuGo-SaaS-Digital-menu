import React, { useState, useRef } from "react";
import Card from "../../ui/card";
import Button from "../../ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";

const LogoUpload = ({ currentLogo, onLogoUpdate }) => {
  const [preview, setPreview] = useState(currentLogo || "");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPEG, PNG, WEBP)");
      return false;
    }
    if (file.size > maxSize) {
      setError("Image size must be less than 2MB");
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
        onLogoUpdate(reader.result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onLogoUpdate("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card title="Restaurant Logo">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Logo Preview */}
          <div className="relative">
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Restaurant Logo"
                  className="w-32 h-32 object-contain border rounded-lg p-2 bg-white shadow-sm"
                />
                <button
                  onClick={handleRemove}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                <ImageIcon size={32} className="text-gray-400" />
              </div>
            )}
          </div>

          {/* Upload Area */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Logo
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageUpload}
              className="hidden"
              id="logo-upload"
            />
            <label
              htmlFor="logo-upload"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
            >
              <Upload size={16} />
              Choose File
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Recommended: 200x200px. PNG, JPG, WEBP up to 2MB
            </p>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
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

export default LogoUpload;
