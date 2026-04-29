import React from "react";
import { Shield, Users, Coffee, ChefHat } from "lucide-react";

const RoleBadge = ({ role }) => {
  const roleConfig = {
    admin: {
      label: "Admin",
      color: "bg-purple-100 text-purple-800",
      icon: Shield,
    },
    manager: {
      label: "Manager",
      color: "bg-blue-100 text-blue-800",
      icon: Users,
    },
    waiter: {
      label: "Waiter",
      color: "bg-green-100 text-green-800",
      icon: Coffee,
    },
    kitchen: {
      label: "Kitchen Staff",
      color: "bg-orange-100 text-orange-800",
      icon: ChefHat,
    },
  };

  const config = roleConfig[role] || roleConfig.waiter;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.color}`}
    >
      <Icon size={12} />
      {config.label}
    </span>
  );
};

export default RoleBadge;