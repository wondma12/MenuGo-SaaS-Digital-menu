import React from "react";

const AvailabilityToggle = ({ isAvailable, onToggle, label = "Available" }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">{label}</span>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
          isAvailable ? "bg-green-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
            isAvailable ? "translate-x-4.5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
};

export default AvailabilityToggle;