// src/components/ui/FileUpload.jsx

import React, { useState } from "react";
import { FilePlus, Upload, X } from "lucide-react";

const FileUpload = ({
  title,
  subtitle,
  accept,
  maxSize,
  icon: Icon = FilePlus,
  className = "",
  onFileSelect,
  value,
  required = false,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    // Validate file size
    if (maxSize) {
      const maxBytes = parseInt(maxSize);
      if (selectedFile.size > maxBytes) {
        setError(`File size exceeds ${maxSize} limit`);
        return;
      }
    }

    // Validate file type
    if (accept) {
      const acceptedTypes = accept.split(',').map(t => t.trim());
      const fileType = selectedFile.type;
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      
      const isValid = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return `.${fileExtension}` === type;
        }
        if (type.includes('/*')) {
          return fileType.startsWith(type.replace('/*', ''));
        }
        return fileType === type;
      });

      if (!isValid) {
        setError(`File type not accepted. Please upload: ${accept}`);
        return;
      }
    }

    setFile(selectedFile);
    setError(null);
    if (onFileSelect) {
      onFileSelect(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  return (
    <div className={`mt-2 ${className}`}>
      <div
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-3 transition-all ${
          dragActive 
            ? "border-black bg-zinc-50" 
            : file 
              ? "border-green-500 bg-green-50" 
              : "border-surface-variant hover:border-black"
        } ${error ? "border-red-500 bg-red-50" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          id={`file-upload-${title.replace(/\s/g, '-')}`}
          required={required}
        />
        
        <label
          htmlFor={`file-upload-${title.replace(/\s/g, '-')}`}
          className="cursor-pointer flex flex-col items-center justify-center gap-3 w-full"
        >
          {file ? (
            <div className="flex items-center gap-3 w-full justify-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Upload className="text-green-600 w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-black">{file.name}</p>
                <p className="text-xs text-zinc-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-1 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-zinc-400 hover:text-red-500" />
              </button>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-surface flex items-center justify-center rounded-lg border border-surface-variant">
                <Icon className="text-secondary text-3xl group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-body-sm text-secondary font-medium">{title}</span>
              <span className="text-[10px] text-on-tertiary-container uppercase">
                {maxSize || "No size limit"}
              </span>
              {subtitle && (
                <span className="text-xs text-zinc-400">{subtitle}</span>
              )}
            </>
          )}
        </label>
      </div>
      
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;