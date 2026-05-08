// src/components/waiter/KitchenStatusCard.jsx
import React from "react";

const KitchenStatusCard = ({ stations }) => {
  const hasHighLoad = stations.some((station) => station.isHigh);

  return (
    <div className="col-span-1 lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Live Kitchen Status</h3>
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${hasHighLoad ? "bg-red-500" : "bg-black"}`}
          ></span>
          <p className="text-xs font-semibold uppercase">
            {hasHighLoad ? "High Load" : "Normal"}
          </p>
        </div>
      </div>

      {/* Station Status List */}
      <div className="flex flex-col gap-4">
        {stations.map((station, index) => (
          <div key={index} className="flex justify-between items-center">
            <p className="text-base">{station.station}</p>
            <div className="flex items-center gap-4">
              <div className="w-2/3 bg-gray-100 h-2 rounded-full">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    station.isHigh ? "bg-red-500" : "bg-black"
                  }`}
                  style={{ width: `${station.percentage}%` }}
                ></div>
              </div>
              <p
                className={`text-xs font-semibold ${
                  station.isHigh ? "text-red-500" : ""
                }`}
              >
                {station.percentage}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitchenStatusCard;
