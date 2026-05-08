// src/components/waiter/NewOrderCard.jsx
import React from "react";

const NewOrderCard = () => {
  return (
    <div className="bg-gray-100 border border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center opacity-60 hover:opacity-80 transition-opacity cursor-pointer">
      <span className="material-symbols-outlined text-[48px] mb-4">
        add_circle
      </span>
      <p className="text-lg font-semibold">New Order Ready</p>
      <p className="text-sm max-w-[200px] mt-2">
        Start a new table service from the sidebar.
      </p>
    </div>
  );
};

export default NewOrderCard;
