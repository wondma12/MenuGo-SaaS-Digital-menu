// src/components/Admin/Security/PlatformConfig.jsx

import React, { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Settings, RefreshCw } from "lucide-react";
import { settingsAPI } from "../../../services/api";

const PlatformConfig = ({
  environment,
  setEnvironment,
  dataRetention,
  setDataRetention,
}) => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setFetchLoading(true);
      const result = await settingsAPI.get();
      if (result) {
        setSettings(result);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleEnvironmentChange = (e) => {
    setEnvironment(e.target.value);
  };

  const handleDataRetentionToggle = () => {
    setDataRetention(!dataRetention);
  };

  const handleUpdateSettings = async () => {
    setLoading(true);
    try {
      await settingsAPI.update({
        ...settings,
        environment,
        data_retention: dataRetention ? 90 : 0,
      });
      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="bg-white border border-zinc-200 p-6 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          <div className="h-16 bg-gray-100 rounded animate-pulse"></div>
          <div className="h-16 bg-gray-100 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-zinc-200 p-6 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="text-black w-5 h-5" />
        <h3 className="text-lg font-semibold">Platform Config</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
            Environment
          </label>
          <select
            value={environment}
            onChange={handleEnvironmentChange}
            className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:ring-0 focus:border-black"
          >
            <option value="production">Production (Stable)</option>
            <option value="staging">Staging</option>
            <option value="development">Development</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
            Global Data Retention
          </label>
          <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg">
            <span className="text-sm">90 Days Logs</span>
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
          <button
            onClick={handleUpdateSettings}
            disabled={loading}
            className="w-full py-3 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Global Settings"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlatformConfig;