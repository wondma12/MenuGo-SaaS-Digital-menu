import React from "react";

const ToggleSwitch = ({ 
  checked = false, 
  onChange, 
  disabled = false,
  className = "",
  id 
}) => {
  const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in ${className}`}>
      <input
        type="checkbox"
        id={toggleId}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-surface-variant checked:right-0 right-6 transition-all duration-300"
      />
      <label 
        htmlFor={toggleId}
        className="toggle-label block overflow-hidden h-6 rounded-full bg-surface-variant cursor-pointer"
      />
    </div>
  );
};

export default ToggleSwitch;
