import React from "react";

const SummaryCard = ({
  title,
  value,
  description,
  icon: Icon,
  variant = "default",
  className = "",
}) => {
  const getCardStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-black text-white";
      case "error":
        return "bg-white text-black border border-zinc-200";
      default:
        return "bg-white text-black border border-zinc-200";
    }
  };

  const getTitleStyles = () => {
    switch (variant) {
      case "primary":
        return "text-zinc-400";
      case "error":
        return "text-black";
      default:
        return "text-zinc-500";
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case "primary":
        return "text-zinc-700";
      case "error":
        return "text-black";
      default:
        return "text-zinc-300";
    }
  };

  const getValueStyles = () => {
    switch (variant) {
      case "primary":
        return "text-white";
      case "error":
        return "text-black";
      default:
        return "text-black";
    }
  };

  const getDescriptionStyles = () => {
    switch (variant) {
      case "primary":
        return "text-zinc-500";
      case "error":
        return "text-zinc-500";
      default:
        return "text-zinc-400";
    }
  };

  return (
    <div
      className={`p-8 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 ${getCardStyles()} ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-label-caps uppercase tracking-widest ${getTitleStyles()}`}
        >
          {title}
        </span>
        {Icon && <Icon className={`text-lg ${getIconStyles()}`} />}
      </div>
      <div className="mt-auto">
        <span
          className={`text-[56px] font-black leading-none tracking-tighter ${getValueStyles()}`}
        >
          {value}
        </span>
        <p className={`text-xs mt-2 ${getDescriptionStyles()}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
