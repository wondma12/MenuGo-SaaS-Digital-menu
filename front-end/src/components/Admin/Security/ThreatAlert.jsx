// src/components/Admin/Security/ThreatAlert.jsx

import React, { useState, useEffect } from "react";
import { ShieldAlert, AlertTriangle, Check, RefreshCw } from "lucide-react";
import { analyticsAPI } from "../../../services/api";

const ThreatAlert = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await analyticsAPI.getThreatAlerts?.();
      
      if (result && result.data) {
        setAlerts(result.data);
      } else {
        setAlerts([]);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
      setError(error.message || "Failed to load alerts");
      setAlerts([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAlerts();
  };

  const handleIgnoreAlert = (id) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, resolved: true } : alert
    ));
  };

  const activeAlerts = alerts.filter(a => !a.resolved);
  const hasActiveAlerts = activeAlerts.length > 0;

  if (loading) {
    return (
      <section className="col-span-12 bg-white border border-zinc-200 p-8 rounded-lg">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="flex gap-4">
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="w-full md:w-72 h-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="col-span-12 bg-white border border-zinc-200 p-8 rounded-lg">
        <div className="text-center text-red-500">
          <p className="font-semibold">{error}</p>
          <button
            onClick={fetchAlerts}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={`col-span-12 bg-white border p-8 rounded-lg relative overflow-hidden flex flex-col md:flex-row gap-8 items-center ${
      hasActiveAlerts ? 'border-red-200 bg-red-50/30' : 'border-zinc-200'
    }`}>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className={`inline-block px-3 py-1 text-[10px] font-bold rounded-full ${
            hasActiveAlerts 
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {hasActiveAlerts ? `⚠ ${activeAlerts.length} ACTIVE ALERT${activeAlerts.length > 1 ? 'S' : ''}` : '✓ ALL CLEAR'}
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors flex items-center gap-1"
          >
            <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <h2 className="text-2xl font-bold mt-4 mb-2">
          {hasActiveAlerts 
            ? `${activeAlerts[0]?.severity?.toUpperCase() || ''} Activity Detected` 
            : 'No Threats Detected'}
        </h2>
        <p className="text-zinc-600 max-w-2xl">
          {hasActiveAlerts 
            ? activeAlerts[0]?.message || 'Suspicious activity detected' 
            : 'All systems are secure. No active threats detected.'}
        </p>
        
        {hasActiveAlerts && activeAlerts.length > 0 && (
          <div className="mt-4 space-y-2">
            {activeAlerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-2 bg-white border border-zinc-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${
                    alert.severity === 'high' ? 'text-red-500' :
                    alert.severity === 'medium' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`} />
                  <span className="text-sm">{alert.message}</span>
                  <span className="text-xs text-zinc-400">{alert.time}</span>
                </div>
                <button
                  onClick={() => handleIgnoreAlert(alert.id)}
                  className="text-xs text-zinc-400 hover:text-red-500 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            ))}
          </div>
        )}

        {hasActiveAlerts && (
          <div className="mt-6">
            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors text-sm">
              View Full Report
            </button>
          </div>
        )}
      </div>

      <div className="w-full md:w-72 h-48 bg-zinc-100 border border-zinc-200 rounded flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent"></div>
        <div className="relative text-center">
          {hasActiveAlerts ? (
            <>
              <ShieldAlert className="w-10 h-10 text-red-500 mx-auto mb-2" />
              <p className="text-[10px] font-bold mt-2 tracking-widest uppercase text-zinc-600">
                {activeAlerts.length} Threat{activeAlerts.length > 1 ? 's' : ''} Detected
              </p>
            </>
          ) : (
            <>
              <Check className="w-10 h-10 text-green-500 mx-auto mb-2" />
              <p className="text-[10px] font-bold mt-2 tracking-widest uppercase text-zinc-600">
                System Secure
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ThreatAlert;