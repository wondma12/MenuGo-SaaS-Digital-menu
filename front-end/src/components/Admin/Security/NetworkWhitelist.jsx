// src/components/Admin/Security/NetworkWhitelist.jsx

import React, { useState, useEffect } from "react";
import { Trash2, Plus, Network, RefreshCw } from "lucide-react";
import { settingsAPI } from "../../../services/api";

const NetworkWhitelist = () => {
  const [whitelist, setWhitelist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newIp, setNewIp] = useState("");
  const [newLabel, setNewLabel] = useState("");

  useEffect(() => {
    fetchWhitelist();
  }, []);

  const fetchWhitelist = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await settingsAPI.get();
      
      if (result && result.ip_whitelist) {
        setWhitelist(result.ip_whitelist.map(item => ({
          ...item,
          type: item.type || 'deletable',
        })));
      } else {
        setWhitelist([]);
      }
    } catch (error) {
      console.error("Error fetching whitelist:", error);
      setError(error.message || "Failed to load whitelist");
      setWhitelist([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIP = (indexToDelete) => {
    if (window.confirm("Remove this IP from whitelist?")) {
      setWhitelist(whitelist.filter((_, index) => index !== indexToDelete));
    }
  };

  const handleAddIP = () => {
    if (!newIp) return;
    setWhitelist([
      ...whitelist,
      { ip: newIp, label: newLabel || "Custom", type: "deletable" },
    ]);
    setNewIp("");
    setNewLabel("");
    setShowAdd(false);
  };

  const handleSaveWhitelist = async () => {
    setSaving(true);
    try {
      await settingsAPI.update({ ip_whitelist: whitelist });
      alert("Whitelist updated successfully!");
    } catch (error) {
      console.error("Error saving whitelist:", error);
      alert("Failed to save whitelist");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-zinc-200 p-6 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-100 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-zinc-200 p-6 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="text-center text-red-500">
          <p className="font-semibold">{error}</p>
          <button
            onClick={fetchWhitelist}
            className="mt-2 px-4 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-zinc-200 p-6 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-zinc-600" />
          <h3 className="text-lg font-semibold">Network Whitelist</h3>
          {whitelist.length > 0 && (
            <span className="px-2 py-0.5 bg-zinc-100 text-zinc-600 text-[10px] font-bold rounded-full">
              {whitelist.filter(i => i.type !== 'system').length} custom
            </span>
          )}
        </div>
        <button
          onClick={handleSaveWhitelist}
          disabled={saving}
          className="px-4 py-1.5 bg-black text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center gap-1"
        >
          {saving ? (
            <>
              <RefreshCw className="w-3 h-3 animate-spin" />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </button>
      </div>

      <div className="space-y-3">
        {whitelist.length === 0 ? (
          <div className="text-center py-8 text-zinc-400">
            <p>No IP addresses in whitelist</p>
            <p className="text-xs mt-1">Add IP addresses to restrict access</p>
          </div>
        ) : (
          whitelist.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
            >
              <span className="font-mono text-sm">
                {item.ip} 
                <span className="text-zinc-400 text-xs ml-2">({item.label})</span>
              </span>
              {item.type === "system" ? (
                <span className="text-[10px] font-bold text-zinc-400 uppercase">
                  System
                </span>
              ) : (
                <button
                  onClick={() => handleDeleteIP(index)}
                  className="text-zinc-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        )}

        {showAdd ? (
          <div className="p-3 border-2 border-dashed border-zinc-300 rounded-lg bg-zinc-50">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                className="flex-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:ring-0 focus:border-black"
                placeholder="IP or CIDR (e.g., 192.168.1.0/24)"
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
              />
              <input
                className="flex-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:ring-0 focus:border-black"
                placeholder="Label (e.g., Office)"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
              />
              <button
                onClick={handleAddIP}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors text-sm"
              >
                Add
              </button>
              <button
                onClick={() => setShowAdd(false)}
                className="px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAdd(true)}
            className="w-full py-3 border-2 border-dashed border-zinc-300 rounded-lg text-sm text-zinc-500 hover:border-black hover:text-black transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New IP Address
          </button>
        )}
      </div>
    </div>
  );
};

export default NetworkWhitelist;