import React from 'react';

const AvailabilityToggle = ({ isAvailable, onToggle, size = 'default' }) => {
  const sizes = {
    small: { toggle: 'h-5 w-9', circle: 'h-3 w-3', translate: 'translate-x-4' },
    default: { toggle: 'h-6 w-11', circle: 'h-4 w-4', translate: 'translate-x-6' },
    large: { toggle: 'h-7 w-12', circle: 'h-5 w-5', translate: 'translate-x-6' }
  };

  const currentSize = sizes[size] || sizes.default;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isAvailable ? 'bg-green-500' : 'bg-gray-300'
      } ${currentSize.toggle}`}
      role="switch"
      aria-checked={isAvailable}
    >
      <span
        className={`inline-block transform rounded-full bg-white transition-transform ${
          isAvailable ? currentSize.translate : 'translate-x-1'
        } ${currentSize.circle}`}
      />
    </button>
  );
};

export default AvailabilityToggle;