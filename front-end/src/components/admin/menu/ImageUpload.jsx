import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ImageUpload = ({ onImageUpload, currentImage }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      onImageUpload(imageUrl);
      setPreviewError(false);
    } else if (file) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, etc.)');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      onImageUpload(imageUrl);
      setPreviewError(false);
    } else if (file) {
      alert('Please upload a valid image file');
    }
  };

  const handleRemoveImage = () => {
    onImageUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setPreviewError(false);
  };

  const handleImageError = () => {
    setPreviewError(true);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Item Image
      </label>
      
      {currentImage && !previewError ? (
        <div className="relative inline-block">
          <img 
            src={currentImage} 
            alt="Preview" 
            className="h-32 w-32 rounded-lg object-cover border border-gray-200"
            onError={handleImageError}
          />
          <button
            onClick={handleRemoveImage}
            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition-colors shadow-md"
            title="Remove image"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
            isDragging 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
        >
          <Upload className={`h-8 w-8 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
          <p className="mt-2 text-sm text-gray-500">
            Click or drag & drop to upload
          </p>
          <p className="text-xs text-gray-400">
            PNG, JPG, GIF up to 5MB
          </p>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {previewError && currentImage && (
        <p className="text-xs text-red-500">
          Failed to load image. Please upload a new one.
          <button 
            onClick={handleRemoveImage}
            className="ml-2 text-blue-500 underline"
          >
            Remove
          </button>
        </p>
      )}
    </div>
  );
};

export default ImageUpload;