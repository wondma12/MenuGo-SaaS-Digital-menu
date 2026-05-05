import React from "react";

const FilterTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["All Accounts", "Platform Admins", "Restaurant Owners"];

  return (
    <div className="flex gap-8 mb-6 border-b border-zinc-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`pb-4 border-b-2 text-sm font-bold transition-colors ${
            activeTab === tab
              ? "border-black text-black"
              : "border-transparent text-zinc-500 hover:text-black"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
