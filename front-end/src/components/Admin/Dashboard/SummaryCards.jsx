// src/components/Admin/Dashboard/SummaryCards.jsx

import React from "react";
import SummaryCard from "../../ui/SummaryCard";
import { UtensilsCrossed, Clock, Check, X } from "lucide-react";

const SummaryCards = ({ stats }) => {
  // ✅ Handle loading state
  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "TOTAL RESTAURANTS",
      value: stats.totalRestaurants?.toString() || "0",
      description: "All registered establishments",
      icon: UtensilsCrossed,
      variant: "default",
    },
    {
      title: "PENDING APPROVAL",
      value: stats.pendingRestaurants?.toString() || "0",
      description: "Awaiting verification",
      icon: Clock,
      variant: "error",
    },
    {
      title: "ACTIVE RESTAURANTS",
      value: stats.activeRestaurants?.toString() || "0",
      description: "Currently operational",
      icon: Check,
      variant: "primary",
    },
    {
      title: "SUSPENDED",
      value: stats.suspendedRestaurants?.toString() || "0",
      description: "Policy violations flagged",
      icon: X,
      variant: "default",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
      {cards.map((card, index) => (
        <SummaryCard
          key={index}
          title={card.title}
          value={card.value}
          description={card.description}
          icon={card.icon}
          variant={card.variant}
        />
      ))}
    </div>
  );
};

export default SummaryCards;