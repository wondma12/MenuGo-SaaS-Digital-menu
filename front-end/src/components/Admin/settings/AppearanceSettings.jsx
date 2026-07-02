

import React, { useState } from 'react';
import FileUpload from '../../ui/FileUpload';
import { FilePlus, ImagePlus, X } from "lucide-react";

const AppearanceSettings = ({ handleFileSelect }) => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);

  const handleFileChange = (type) => (file) => {
    
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'logo') {
        setLogoPreview(url);
      } else if (type === 'favicon') {
        setFaviconPreview(url);
      }
    }
    handleFileSelect(type)(file);
  };

  const handleRemoveFile = (type) => {
    if (type === 'logo') {
      setLogoPreview(null);
    } else if (type === 'favicon') {
      setFaviconPreview(null);
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-black">APPEARANCE</h2>
        <p className="text-sm text-zinc-500">
          Customize the visual assets of the platform for internal and external consistency.
        </p>
      </div>
      <div className="md:col-span-2 bg-white border border-zinc-200 p-8 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-black uppercase tracking-wider">
              PLATFORM LOGO
            </label>
            {logoPreview ? (
              <div className="relative border border-zinc-200 rounded-lg p-4 bg-zinc-50">
                <img 
                  src={logoPreview} 
                  alt="Logo preview" 
                  className="max-h-20 object-contain mx-auto"
                />
                <button
                  onClick={() => handleRemoveFile('logo')}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-zinc-100 transition-colors"
                >
                  <X className="w-4 h-4 text-zinc-500" />
                </button>
              </div>
            ) : (
              <FileUpload
                title="Click to upload or drag logo"
                maxSize="SVG, PNG, JPG (MAX 2MB)"
                icon={FilePlus}
                accept="image/*"
                onFileSelect={handleFileChange("logo")}
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-black uppercase tracking-wider">
              FAVICON
            </label>
            {faviconPreview ? (
              <div className="relative border border-zinc-200 rounded-lg p-4 bg-zinc-50">
                <img 
                  src={faviconPreview} 
                  alt="Favicon preview" 
                  className="w-10 h-10 object-contain mx-auto"
                />
                <button
                  onClick={() => handleRemoveFile('favicon')}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-zinc-100 transition-colors"
                >
                  <X className="w-4 h-4 text-zinc-500" />
                </button>
              </div>
            ) : (
              <FileUpload
                title="Upload Favicon"
                maxSize="32X32 ICO/PNG"
                icon={ImagePlus}
                accept=".ico,.png"
                onFileSelect={handleFileChange("favicon")}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppearanceSettings;