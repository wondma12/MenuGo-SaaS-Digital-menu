import React from "react";
import { FilePlus, ImagePlus } from "lucide-react";

const FileUpload = ({
  title,
  subtitle,
  accept,
  maxSize,
  icon: Icon = FilePlus ,
  className = "",
  onFileSelect,
}) => {
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div
      className={`mt-2 border-2 border-dashed border-surface-variant rounded-lg p-8 flex flex-col items-center justify-center gap-3 hover:border-black transition-colors cursor-pointer group ${className}`}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        id={`file-upload-${title}`}
      />
      <label
        htmlFor={`file-upload-${title}`}
        className="cursor-pointer flex flex-col items-center justify-center gap-3"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="w-16 h-16 bg-surface flex items-center justify-center rounded-lg border border-surface-variant">
          <Icon className="text-secondary text-3xl group-hover:scale-110 transition-transform" />
        </div>
        <span className="text-body-sm text-secondary font-medium">{title}</span>
        <span className="text-[10px] text-on-tertiary-container uppercase">
          {maxSize}
        </span>
      </label>
    </div>
  );
};

export default FileUpload;
