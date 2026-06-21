// src/components/Admin/Users/UsersSummaryCards.jsx

import React from 'react';

const UsersSummaryCards = ({ users }) => {
  if (!users) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="bg-white p-6 border border-zinc-200 rounded-lg animate-pulse">
          <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-8 w-16 bg-gray-200 rounded"></div>
        </div>
        <div className="bg-white p-6 border border-zinc-200 rounded-lg animate-pulse">
          <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-8 w-16 bg-gray-200 rounded"></div>
        </div>
        <div className="bg-white p-6 border border-zinc-200 rounded-lg animate-pulse">
          <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-8 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Calculate stats from real data
  const totalUsers = users.length;
  const platformAdmins = users.filter(u => u.role === 'platform_admin').length;
  const restaurantAdmins = users.filter(u => u.role === 'restaurant_admin').length;
  const waiters = users.filter(u => u.role === 'waiter').length;
  const activeUsers = users.filter(u => u.is_active !== false).length;

  const stats = [
    {
      label: "Total Active Users",
      value: activeUsers,
      description: `${totalUsers} total users`,
    },
    {
      label: "Platform Admins",
      value: platformAdmins,
      description: "System administrators",
    },
    {
      label: "Restaurant Admins",
      value: restaurantAdmins,
      description: `${waiters} waiters`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 border border-zinc-200 rounded-lg hover:border-black transition-colors"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
            {stat.label}
          </p>
          <p className="text-3xl font-bold text-black">{stat.value}</p>
          <p className="text-xs text-zinc-400 mt-1">{stat.description}</p>
        </div>
      ))}
    </div>
  );
};

export default UsersSummaryCards;