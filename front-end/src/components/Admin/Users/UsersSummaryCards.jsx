import React from "react";

const UsersSummaryCards = ({ users }) => {
  if (!users) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="text-center text-zinc-500">
          Loading user statistics...
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Active Users",
      value: users.length?.toString() || "0",
    },
    {
      label: "Platform Admins",
      value: users.filter((u) => u.role === "admin").length?.toString() || "0",
    },
    {
      label: "Restaurant Owners",
      value:
        users.filter((u) => u.role === "restaurant_owner").length?.toString() ||
        "0",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 border border-zinc-200 rounded-lg"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
            {stat.label}
          </p>
          <p className="text-3xl font-bold text-black">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default UsersSummaryCards;
