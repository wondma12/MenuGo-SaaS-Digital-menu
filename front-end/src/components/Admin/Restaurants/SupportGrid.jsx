import React from "react";
import { BarChart3, Headphones } from "lucide-react";

const SupportGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-8 mt-16">
      {/* Performance Audits */}
      <div className="p-6 border-2 border-dashed border-zinc-200 rounded-xl flex items-center gap-6 group hover:border-black transition-colors cursor-pointer">
        <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
          <BarChart3 className="w-8 h-8" />
        </div>
        <div>
          <h4 className="font-bold text-lg mb-1">Performance Audits</h4>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Review restaurant performance metrics and revenue distribution
            across all active regions.
          </p>
        </div>
      </div>

      {/* Escalation Queue */}
      <div className="p-6 border-2 border-dashed border-zinc-200 rounded-xl flex items-center gap-6 group hover:border-black transition-colors cursor-pointer">
        <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
          <Headphones className="w-8 h-8" />
        </div>
        <div>
          <h4 className="font-bold text-lg mb-1">Escalation Queue</h4>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Direct access to restaurant owner support tickets and critical
            infrastructure alerts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupportGrid;
