

import React from 'react';

const FilterTabs = ({ activeTab, setActiveTab, users = [] }) => {
  
  const counts = {
    'All Accounts': users.length,
    'Platform Admins': users.filter(u => u.role === 'platform_admin').length,
    'Restaurant Admins': users.filter(u => u.role === 'restaurant_admin').length,
  };

  const tabs = [
    { label: "All Accounts", count: counts['All Accounts'] },
    { label: "Platform Admins", count: counts['Platform Admins'] },
    { label: "Restaurant Admins", count: counts['Restaurant Admins'] },
  ];

  return (
    <div className="flex flex-wrap gap-4 md:gap-8 mb-6 border-b border-zinc-200">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          className={`pb-4 border-b-2 text-sm font-bold transition-colors flex items-center gap-2 ${
            activeTab === tab.label
              ? "border-black text-black"
              : "border-transparent text-zinc-500 hover:text-black"
          }`}
          onClick={() => setActiveTab(tab.label)}
        >
          {tab.label}
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            activeTab === tab.label 
              ? "bg-black text-white" 
              : "bg-zinc-100 text-zinc-500"
          }`}>
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;