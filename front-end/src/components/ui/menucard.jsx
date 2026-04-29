import React from "react";
import Button from "./Button";

const MenuCard = ({ image, title, description, price, category, onOrder }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image || "https://via.placeholder.com/300x200"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <span className="text-lg font-bold text-gray-900">{price}</span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-gray-500">{description}</p>

        <div className="mt-auto flex flex-col gap-3">
          <div>
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-500/10">
              {category}
            </span>
          </div>

          <Button
            label="Order Now"
            onClick={onOrder}
            variant="primary"
            className="w-full font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuCard;