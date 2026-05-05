import React from "react";
import SummaryCard from "../../ui/SummaryCard";
import { UtensilsCrossed, Clock, Check, X } from "lucide-react";

const SummaryCards = () => {
  const cards = [
    {
      title: "Total",
      value: "1,284",
      description: "Global infrastructure count",
      icon: UtensilsCrossed,
      variant: "default",
    },
    {
      title: "Pending",
      value: "42",
      description: "Awaiting verification",
      icon: Clock,
      variant: "error",
    },
    {
      title: "Active",
      value: "1,190",
      description: "Operational units live",
      icon: Check,
      variant: "primary",
    },
    {
      title: "Suspended",
      value: "52",
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
