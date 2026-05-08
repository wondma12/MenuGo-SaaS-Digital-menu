import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Delete } from "lucide-react";

const NetworkWhitelist = () => {
  const [whitelist, setWhitelist] = useState([
    {
      ip: "127.0.0.1",
      label: "Localhost",
      type: "system",
    },
    {
      ip: "192.168.1.0/24",
      label: "Office",
      type: "deletable",
    },
    {
      ip: "45.2.19.112",
      label: "Cloud Proxy",
      type: "deletable",
    },
  ]);

  const handleDeleteIP = (indexToDelete) => {
    setWhitelist(whitelist.filter((_, index) => index !== indexToDelete));
  };

  const handleAddIP = () => {
    console.log("Adding new IP address...");
    // Add IP address modal/form logic
  };

  return (
    <div className="bg-white border border-outline-variant p-6 rounded-lg">
      <h3 className="text-h3 font-h3 mb-6">Network Whitelist</h3>

      <div className="space-y-3">
        {whitelist.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border border-outline-variant rounded"
          >
            <span className="font-mono text-body-sm">
              {item.ip} ({item.label})
            </span>
            {item.type === "system" ? (
              <span className="text-[10px] font-bold text-on-secondary-container uppercase">
                System
              </span>
            ) : (
              <button
                onClick={() => handleDeleteIP(index)}
                className="text-error hover:text-red-700 transition-colors"
              >
                <Delete className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}

        <Button
          label="+ Add New IP Address"
          onClick={handleAddIP}
          variant="secondary"
          className="w-full border-2 border-dashed border-outline-variant py-2 text-body-sm text-on-secondary-container hover:bg-zinc-50"
        />
      </div>
    </div>
  );
};

export default NetworkWhitelist;
