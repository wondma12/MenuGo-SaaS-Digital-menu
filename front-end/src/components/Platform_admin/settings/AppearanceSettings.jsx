import React from 'react';
import FileUpload from '../../ui/FileUpload';
import { FilePlus, ImagePlus } from "lucide-react";

const AppearanceSettings = ({ handleFileSelect }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-black">APPEARANCE</h2>
        <p className="text-sm text-secondary">
          Customize the visual assets of the platform for internal and external
          consistency.
        </p>
      </div>
      <div className="md:col-span-2 bg-white border border-surface-variant p-8 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-black uppercase tracking-wider">
              PLATFORM LOGO
            </label>
            <FileUpload
              title="Click to upload or drag logo"
              maxSize="SVG, PNG, JPG (MAX 2MB)"
              icon={FilePlus}
              accept="image/*"
              onFileSelect={handleFileSelect("logo")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-black uppercase tracking-wider">
              FAVICON
            </label>
            <FileUpload
              title="Upload Favicon"
              maxSize="32X32 ICO/PNG"
              icon={ImagePlus}
              accept=".ico,.png"
              onFileSelect={handleFileSelect("favicon")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppearanceSettings;
