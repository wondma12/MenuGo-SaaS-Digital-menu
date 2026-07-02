

import React from "react";

const ToggleSwitch = ({ 
  checked = false, 
  onChange, 
  disabled = false,
  className = "",
  id,
  label,
  size = "default",
}) => {
  const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;
  const [isChecked, setIsChecked] = React.useState(checked);

  React.useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const sizeClasses = {
    small: "w-8 h-4",
    default: "w-12 h-6",
    large: "w-14 h-7",
  };

  const handleSize = sizeClasses[size] || sizeClasses.default;

  return (
    <div className={`relative inline-block ${handleSize} align-middle select-none transition duration-200 ease-in ${className}`}>
      <input
        type="checkbox"
        id={toggleId}
        checked={isChecked}
        onChange={handleToggle}
        disabled={disabled}
        className="absolute block w-5 h-5 md:w-6 md:h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-zinc-300 checked:right-0 right-6 transition-all duration-300 z-10"
      />
      <label 
        htmlFor={toggleId}
        className={`block overflow-hidden h-full rounded-full cursor-pointer transition-colors duration-300 ${
          isChecked ? 'bg-black' : 'bg-zinc-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      {label && (
        <span className="ml-3 text-sm text-zinc-700">{label}</span>
      )}
    </div>
  );
};

export default ToggleSwitch;