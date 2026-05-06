import React, { useRef, useState } from 'react';

const ImageUploader = ({ label, type, previewUrl, onImageSelect }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(previewUrl || null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith('image/'))) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageSelect?.(file, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-md">
      <label className="font-label-caps text-label-caps text-secondary uppercase">{label}</label>
      <div
        onClick={handleClick}
        className="drag-drop-zone h-40 w-40 flex flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors group overflow-hidden relative"
        style={{
          backgroundImage: preview
            ? 'none'
            : "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23E0E0E0' stroke-width='2' stroke-dasharray='8%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")",
        }}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <>
            <span className="material-symbols-outlined text-neutral-300 group-hover:text-black mb-2">add_photo_alternate</span>
            <span className="text-xs text-neutral-400 font-medium group-hover:text-black">Upload {type === 'logo' ? 'Logo' : 'Image'}</span>
          </>
        )}
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      <p className="text-[10px] text-neutral-400">{type === 'logo' ? 'Square PNG or SVG. Max 2MB.' : 'Recommended: 1920x600px'}</p>
    </div>
  );
};

export default ImageUploader;