import React from "react";
import SummaryCard from "../../ui/SummaryCard";
import { UtensilsCrossed, Clock, Check, X } from "lucide-react";

const SummaryCards = ({ stats }) => {
  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
        <div className="text-center text-zinc-500">Loading statistics...</div>
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
