import React from 'react';

const CategoryTag = ({ category, size = 'default', onClick }) => {
  const categoryColors = {
    Food: 'bg-blue-100 text-blue-800',
    Drinks: 'bg-green-100 text-green-800',
    Desserts: 'bg-purple-100 text-purple-800',
    Specials: 'bg-orange-100 text-orange-800',
    Appetizers: 'bg-yellow-100 text-yellow-800',
    default: 'bg-gray-100 text-gray-800'
  };

  const sizes = {
    small: 'px-2 py-0.5 text-xs',
    default: 'px-2.5 py-0.5 text-sm',
    large: 'px-3 py-1 text-base'
  };

  const colorClass = categoryColors[category] || categoryColors.default;
  const sizeClass = sizes[size] || sizes.default;

  return (
    <span
      onClick={onClick}
      className={`inline-flex rounded-full font-medium ${colorClass} ${sizeClass} ${
        onClick ? 'cursor-pointer hover:opacity-75' : ''
      }`}
    >
      {category}
    </span>
  );
};

export default CategoryTag;