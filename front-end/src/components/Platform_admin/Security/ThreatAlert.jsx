import React from "react";
import { Button } from "../../ui/button";
import { ShieldAlert } from "lucide-react";

const ThreatAlert = () => {
  const handleViewReport = () => {
    console.log("Viewing full threat report...");
    // Add navigation to detailed report
  };

  const handleIgnoreAlert = () => {
    console.log("Ignoring alert...");
    // Add alert dismissal logic
  };

  return (
    <section className="col-span-12 bg-white border border-outline-variant p-8 rounded-lg relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
      <div className="flex-1">
        <div className="inline-block px-3 py-1 bg-red-100 text-red-700 text-[10px] font-bold rounded-full mb-4">
          ALERT CENTER
        </div>
        <h2 className="text-h2 font-h2 mb-4">Unusual API Activity Detected</h2>
        <p className="text-body-md text-on-secondary-container max-w-2xl">
          Our neural network analysis has flagged 3 suspicious request patterns
          from a non-standard IP range in the Singapore region. All requests
          were successfully blocked by the primary firewall.
        </p>
        <div className="mt-6 flex gap-4">
          <Button
            label="View Full Report"
            onClick={handleViewReport}
            className="px-6 py-2"
          />
          <Button
            label="Ignore Alert"
            onClick={handleIgnoreAlert}
            variant="secondary"
            className="px-6 py-2 border border-outline-variant"
          />
        </div>
      </div>

      <div className="w-full md:w-72 h-48 bg-surface-container border border-outline-variant rounded flex items-center justify-center relative overflow-hidden">
        {/* Abstract Pattern for Command Center look */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-black to-transparent"></div>
        <div className="relative text-center">
          <ShieldAlert className="w-10 h-10 text-black mx-auto mb-2" />
          <p className="text-[10px] font-bold mt-2 tracking-widest uppercase">
            Visualizing Threat Vector
          </p>
        </div>
      </div>
    </section>
  );
};

export default ThreatAlert;
