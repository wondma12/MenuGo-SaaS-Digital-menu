import React from 'react';

const CategoryTabs = ({ categories = ['ALL', 'DRINKS', 'FOOD', 'DESSERTS'], activeCategory, onCategoryChange }) => {
  return (
    <nav className="sticky top-[68px] z-40 bg-background/80 backdrop-blur-md py-4 mb-lg flex gap-8 overflow-x-auto hide-scrollbar border-b border-outline-variant/30">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat.toUpperCase())}
          className={`font-label-caps text-label-caps uppercase whitespace-nowrap pb-2 transition-colors ${
            activeCategory === cat.toUpperCase()
              ? 'text-black border-b-2 border-black'
              : 'text-secondary hover:text-black'
          }`}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
};

export default CategoryTabs;