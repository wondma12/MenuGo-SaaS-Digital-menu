// src/components/Admin/Restaurants/RestaurantsSummaryCards.jsx

import React from "react";
import SummaryCard from "../../ui/SummaryCard";
import { TrendingUp, TrendingDown, Users, Store } from "lucide-react";

const RestaurantsSummaryCards = ({ stats }) => {
  // ✅ Handle loading/empty state
  if (!stats) {
    return (
      <div className="grid grid-cols-12 gap-6 mb-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="col-span-4 h-24 bg-gray-200 rounded-xl animate-pulse"></div>
        ))}
      </div>
    );
  }

  // ✅ Calculate growth from real data (mock for now, can be calculated from historical data)
  const total = stats.total || 0;
  const pending = stats.pending || 0;
  const active = stats.active || 0;
  const suspended = stats.suspended || 0;

  // ✅ Growth rate (can be calculated from previous month's data)
  const growthRate = total > 0 ? Math.round((active / total) * 100) : 0;
  const growthLabel = growthRate > 50 ? "Accelerating" : "Growing";
  const growthColor = growthRate > 50 ? "text-green-500" : "text-yellow-500";

  return (
    <div className="grid grid-cols-12 gap-6 mb-12">
      {/* Total Operational */}
      <div className="col-span-4">
        <SummaryCard
          title="TOTAL RESTAURANTS"
          value={total.toString()}
          description={`${active} active, ${suspended} suspended`}
          icon={Store}
          variant="default"
        />
      </div>

      {/* Pending Review */}
      <div className="col-span-3">
        <SummaryCard
          title="PENDING REVIEW"
          value={pending.toString()}
          description="Awaiting verification"
          icon={Users}
          variant="error"
        />
      </div>

      {/* Growth Velocity */}
      <div className="col-span-5 relative overflow-hidden bg-black p-6 rounded-xl text-white">
        <div className="relative z-10 h-full flex flex-col justify-between">
          <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">
            GROWTH VELOCITY
          </p>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-4xl font-bold">{growthRate}%</span>
              <p className="text-sm text-zinc-400 mt-1">{growthLabel}</p>
            </div>
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