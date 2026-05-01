import React, { useState } from 'react';
import ImageUploader from './ImageUploader';

const VisualAssetsCard = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  const handleLogoSelect = (file, preview) => {
    setLogoPreview(preview);
    console.log('Logo selected', file);
  };

  const handleBannerSelect = (file, preview) => {
    setBannerPreview(preview);
    console.log('Banner selected', file);
  };

  return (
    <div className="bg-white border border-neutral-200 p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-black">branding_watermark</span>
        <h2 className="font-h2 text-h2">Visual Identity</h2>
      </div>
      <div className="space-y-6">
        <ImageUploader label="Restaurant Logo" type="logo" previewUrl={logoPreview} onImageSelect={handleLogoSelect} />
        <ImageUploader
          label="Header Banner"
          type="banner"
          previewUrl={bannerPreview}
          onImageSelect={handleBannerSelect}
          customClass="w-full h-48"
        />
      </div>
    </div>
  );
};

export default VisualAssetsCard;