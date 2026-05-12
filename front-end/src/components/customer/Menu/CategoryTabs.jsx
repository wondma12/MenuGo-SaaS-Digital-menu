import React from "react";
import { Utensils, Coffee, Cake, Grid3X3 } from "lucide-react";

const getCategoryIcon = (category) => {
  const cat =
    typeof category === "string"
      ? category.toUpperCase()
      : category.name?.toUpperCase() || "ALL";
  switch (cat) {
    case "ALL":
      return <Grid3X3 className="w-4 h-4" />;
    case "FOOD":
    case "APPETIZERS":
      return <Utensils className="w-4 h-4" />;
    case "DRINKS":
      return <Coffee className="w-4 h-4" />;
    case "DESSERTS":
      return <Cake className="w-4 h-4" />;
    default:
      return <Utensils className="w-4 h-4" />;
  }
};

const CategoryTabs = ({
  categories = ["ALL", "DRINKS", "FOOD", "DESSERTS"],
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <nav className="sticky top-[55px] z-40 bg-background/80 backdrop-blur-md py-4 px-4 mb-lg flex gap-8 overflow-x-auto hide-scrollbar border-b border-outline-variant/30">
      {categories.map((cat) => {
        const categoryName =
          typeof cat === "string"
            ? cat.toUpperCase()
            : cat.name?.toUpperCase() || "ALL";
        const isActive = activeCategory === categoryName;
        return (
          <button
            key={cat.id || cat}
            onClick={() => onCategoryChange(categoryName)}
            className={`relative flex items-center gap-2 font-label-caps text-label-caps uppercase whitespace-nowrap pb-2 transition-all group
    ${isActive ? "text-black" : "text-secondary hover:text-black"}
    
    after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-black 
    after:transition-transform after:duration-300 after:ease-in-out
    ${isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}
  `}
          >
            <span
              className={`transition-colors duration-300 ${
                isActive
                  ? "text-black"
                  : "text-secondary group-hover:text-black"
              }`}
            >
              {getCategoryIcon(categoryName)}
            </span>
            {cat.name || cat}
          </button>
        );
      })}
    </nav>
  );
};

export default CategoryTabs;
