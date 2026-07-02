

import React from "react";
import SummaryCard from "../../ui/SummaryCard";
import { UtensilsCrossed, Clock, Check, X, Users, DollarSign } from "lucide-react";

const SummaryCards = ({ stats }) => {
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

  console.log('[SummaryCards] Stats received:', stats);

  
  const totalRestaurants = stats.summary?.totalRestaurants || stats.totalRestaurants || 0;
  const totalUsers = stats.summary?.totalUsers || stats.totalUsers || 0;
  
  
  const pendingCount = stats.pendingRegistrations?.length || 
                       stats.restaurantStatus?.pending || 
                       stats.pendingRestaurants || 
                       0;
  
  const activeCount = stats.restaurantStatus?.active || stats.activeRestaurants || 0;
  const suspendedCount = stats.restaurantStatus?.suspended || stats.suspendedRestaurants || 0;

  console.log('[SummaryCards] Calculated values:', {
    totalRestaurants,
    totalUsers,
    pendingCount,
    activeCount,
    suspendedCount,
    pendingRegistrationsLength: stats.pendingRegistrations?.length
  });

  const cards = [
    {
      title: "TOTAL RESTAURANTS",
      value: totalRestaurants.toString(),
      description: "All registered establishments",
      icon: UtensilsCrossed,
      variant: "default",
    },
    {
      title: "TOTAL USERS",
      value: totalUsers.toString(),
      description: "All platform users",
      icon: Users,
      variant: "default",
    },
    {
      title: "PENDING APPROVAL",
      value: pendingCount.toString(),
      description: `${pendingCount} restaurants awaiting verification`,
      icon: Clock,
      variant: "error",
    },
    {
      title: "ACTIVE RESTAURANTS",
      value: activeCount.toString(),
      description: `${suspendedCount} suspended`,
      icon: Check,
      variant: "primary",
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