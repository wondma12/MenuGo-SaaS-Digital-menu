import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

const ImageUpload = ({ currentImage, onImageUpload, onImageRemove, label = "Item Image" }) => {
  const [preview, setPreview] = useState(currentImage || "");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
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

  const handleFileChange = (file) => {
    if (file && validateFile(file)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onImageRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
          } ${error ? "border-red-500" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files[0])}
          />
          <Upload size={32} className="mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">Click or drag to upload</p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default ImageUpload;