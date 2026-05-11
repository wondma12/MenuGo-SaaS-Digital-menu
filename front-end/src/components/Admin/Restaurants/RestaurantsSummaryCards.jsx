import React from "react";
import SummaryCard from "../../ui/SummaryCard";
import { TrendingUp, TrendingDown, Users } from "lucide-react";

const RestaurantsSummaryCards = () => {
  return (
    <div className="grid grid-cols-12 gap-6 mb-12">
      {/* Total Operational */}
      <div className="col-span-4">
        <SummaryCard
          title="TOTAL OPERATIONAL"
          value="128"
          description="+12% from last month"
          icon={TrendingUp}
          variant="default"
        />
      </div>

      {/* Pending Review */}
      <div className="col-span-3">
        <SummaryCard
          title="PENDING REVIEW"
          value="14"
          description="Awaiting verification"
          icon={Users}
          variant="error"
        />
      </div>

      {/* Growth Velocity - Custom styled card */}
      <div className="col-span-5 relative overflow-hidden bg-black p-6 rounded-xl text-white">
        <div className="relative z-10 h-full flex flex-col justify-between">
          <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">
            GROWTH VELOCITY
          </p>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-bold">Accelerating</span>
            <TrendingUp className="text-4xl opacity-50" />
          </div>
        </div>
        {/* Subtle pattern background for the dark card */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default RestaurantsSummaryCards;
