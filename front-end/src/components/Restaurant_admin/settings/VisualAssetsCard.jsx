// src/components/Restaurant_admin/settings/VisualAssetsCard.jsx
import React, { useState, useRef } from "react";
import { Upload, X, Image, Eye } from "lucide-react";

const VisualAssetsCard = ({ visualAssets, onChange }) => {
  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const [localPreviews, setLocalPreviews] = useState({
    logo: null,
    banner: null,
  });

  /**
   * Convert File to base64 for preview and storage
   */
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  /**
   * Handle file selection
   */
  const handleFileSelect = async (type, file) => {
    if (!file) return;

    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (PNG, JPG, JPEG)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Create local preview URL
      const previewUrl = URL.createObjectURL(file);
      setLocalPreviews(prev => ({ ...prev, [type]: previewUrl }));

      // Convert to base64 for storage
      const base64 = await fileToBase64(file);
      
      // Update parent state with base64 string
      onChange({ [type]: base64 });
      
      console.log(`[VisualAssets] ${type} converted to base64, length:`, base64.length);

    } catch (error) {
      console.error(`[VisualAssets] Error processing ${type}:`, error);
      alert(`Failed to process ${type}. Please try again.`);
    }
  };

  /**
   * Remove uploaded file
   */
  const handleRemove = (type) => {
    // Revoke preview URL
    if (localPreviews[type]) {
      URL.revokeObjectURL(localPreviews[type]);
    }
    setLocalPreviews(prev => ({ ...prev, [type]: null }));
    
    // Clear the asset in parent state
    onChange({ [type]: "" });

    // Reset file input
    if (type === 'logo' && logoInputRef.current) {
      logoInputRef.current.value = '';
    } else if (type === 'banner' && bannerInputRef.current) {
      bannerInputRef.current.value = '';
    }
  };

  /**
   * Determine which URL to display
   */
  const getDisplayUrl = (type) => {
    // First check local preview (newly uploaded)
    if (localPreviews[type]) return localPreviews[type];
    
    // Then check the stored asset (could be URL or base64)
    const asset = visualAssets[type];
    if (asset && asset !== "" && asset !== "null" && asset !== "undefined") {
      return asset;
    }
    
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Visual Assets</h3>
        <p className="text-sm text-gray-500">Upload your restaurant logo and banner image</p>
      </div>

      {/* Logo Upload */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Restaurant Logo</label>
        <p className="text-xs text-gray-400">Recommended: 512x512px PNG with transparent background</p>
        
        {getDisplayUrl('logo') ? (
          <div className="relative group rounded-xl overflow-hidden border-2 border-gray-200">
            <img
              src={getDisplayUrl('logo')}
              alt="Restaurant Logo"
              className="w-full h-48 object-contain bg-gray-50"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => window.open(getDisplayUrl('logo'), '_blank')}
                className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                title="Preview"
              >
                <Eye className="w-5 h-5 text-gray-700" />
              </button>
              <button
                type="button"
                onClick={() => handleRemove('logo')}
                className="p-2 bg-white rounded-lg hover:bg-red-50 transition-colors"
                title="Remove"
              >
                <X className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => logoInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
          >
            <Upload className="mx-auto text-gray-400 w-8 h-8 mb-2" />
            <p className="text-sm text-gray-600 font-medium">Click to upload logo</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
          </div>
        )}
        <input
          ref={logoInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={(e) => handleFileSelect('logo', e.target.files[0])}
          className="hidden"
        />
        {visualAssets.logo && !localPreviews.logo && (
          <p className="text-xs text-green-600 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Logo uploaded (existing)
          </p>
        )}
      </div>

      {/* Banner Upload */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <label className="text-sm font-medium text-gray-700">Banner Image</label>
        <p className="text-xs text-gray-400">Recommended: 1200x400px for best display</p>
        
        {getDisplayUrl('banner') ? (
          <div className="relative group rounded-xl overflow-hidden border-2 border-gray-200">
            <img
              src={getDisplayUrl('banner')}
              alt="Banner"
              className="w-full h-32 object-cover bg-gray-50"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => window.open(getDisplayUrl('banner'), '_blank')}
                className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                title="Preview"
              >
                <Eye className="w-5 h-5 text-gray-700" />
              </button>
              <button
                type="button"
                onClick={() => handleRemove('banner')}
                className="p-2 bg-white rounded-lg hover:bg-red-50 transition-colors"
                title="Remove"
              >
                <X className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => bannerInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
          >
            <Image className="mx-auto text-gray-400 w-8 h-8 mb-2" />
            <p className="text-sm text-gray-600 font-medium">Click to upload banner</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
          </div>
        )}
        <input
          ref={bannerInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={(e) => handleFileSelect('banner', e.target.files[0])}
          className="hidden"
        />
        {visualAssets.banner && !localPreviews.banner && (
          <p className="text-xs text-green-600 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Banner uploaded (existing)
          </p>
        )}
      </div>
    </div>
  );
};

export default VisualAssetsCard;