import React from "react";
import Select from "../../ui/Select";
import { Button } from "../../ui/button";
import { Settings } from "lucide-react";

const PlatformConfig = ({
  environment,
  setEnvironment,
  dataRetention,
  setDataRetention,
}) => {
  const handleEnvironmentChange = (e) => {
    setEnvironment(e.target.value);
  };

  const handleDataRetentionToggle = () => {
    setDataRetention(!dataRetention);
  };

  const handleUpdateSettings = () => {
    console.log("Updating global settings:", { environment, dataRetention });
    // Add API call here
  };

  return (
    <div className="bg-white border border-outline-variant p-6 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="text-black w-5 h-5" />
        <h3 className="text-h3 font-h3">Platform Config</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-label-caps text-on-secondary-container mb-2">
            Environment
          </label>
          <select
            value={environment}
            onChange={handleEnvironmentChange}
            className="w-full border-outline-variant rounded focus:ring-0 focus:border-black text-body-sm"
          >
            <option value="production">Production (Stable)</option>
            <option value="staging">Staging</option>
            <option value="development">Development</option>
          </select>
        </div>

        <div>
          <label className="block text-label-caps text-on-secondary-container mb-2">
            Global Data Retention
          </label>
          <div className="flex items-center justify-between p-3 bg-surface-container-low rounded">
            <span className="text-body-sm">90 Days Logs</span>
            <button
              onClick={handleDataRetentionToggle}
              className={`w-10 h-5 rounded-full relative flex items-center transition-all ${
                dataRetention ? "bg-black" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute w-3 h-3 bg-white rounded-full transition-transform ${
                  dataRetention ? "right-1" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="pt-2">
          <Button
            label="Update Global Settings"
            onClick={handleUpdateSettings}
            className="w-full py-3"
          />
        </div>
      </div>
    </div>
  );
};

export default PlatformConfig;
