

import React, { useState, useEffect } from "react";
import { UserKey, ShieldCheck, Lock, Fingerprint, Check, X, RefreshCw } from "lucide-react";
import { settingsAPI } from "../../../services/api";

const SecurityPolicy = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const defaultPolicies = [
    {
      id: 'password_complexity',
      icon: UserKey,
      title: "Password Complexity",
      description: "Enforce 12+ characters, special symbols, and rotation every 30 days.",
      enforced: true,
    },
    {
      id: 'two_factor_auth',
      icon: ShieldCheck,
      title: "Two-Factor Authentication",
      description: "Mandatory for all admin-level accounts across the platform.",
      enforced: true,
    },
    {
      id: 'session_timeout',
      icon: Lock,
      title: "Session Timeout",
      description: "Auto-logout after 30 minutes of inactivity.",
      enforced: false,
    },
    {
      id: 'ip_whitelisting',
      icon: Fingerprint,
      title: "IP Whitelisting",
      description: "Restrict access to trusted IP addresses only.",
      enforced: false,
    },
  ];

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await settingsAPI.get();
      
      if (result && result.security_policies) {
        
        const savedPolicies = result.security_policies;
        setPolicies(defaultPolicies.map(policy => ({
          ...policy,
          enforced: savedPolicies[policy.id] !== undefined ? savedPolicies[policy.id] : policy.enforced,
        })));
      } else {
        setPolicies(defaultPolicies);
      }
    } catch (error) {
      console.error("Error fetching policies:", error);
      setError(error.message || "Failed to load policies");
      setPolicies(defaultPolicies);
    } finally {
      setLoading(false);
    }
  };

  const togglePolicy = (id) => {
    setPolicies(policies.map(policy =>
      policy.id === id ? { ...policy, enforced: !policy.enforced } : policy
    ));
  };

  const handleSavePolicies = async () => {
    setSaving(true);
    try {
      const policySettings = policies.reduce((acc, policy) => {
        acc[policy.id] = policy.enforced;
        return acc;
      }, {});
      
      await settingsAPI.update({ security_policies: policySettings });
      alert("Security policies updated successfully!");
    } catch (error) {
      console.error("Error saving policies:", error);
      alert("Failed to save policies");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-zinc-200 p-6 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
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
            onClick={fetchPolicies}
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
        <h3 className="text-lg font-semibold">Security Policy</h3>
        <button
          onClick={handleSavePolicies}
          disabled={saving}
          className="px-4 py-1.5 bg-black text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center gap-1"
        >
          {saving ? (
            <>
              <RefreshCw className="w-3 h-3 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Policies"
          )}
        </button>
      </div>

      <div className="space-y-4">
        {policies.map((policy) => {
          const Icon = policy.icon;
          return (
            <div key={policy.id} className="flex items-start gap-4 p-3 border border-zinc-100 rounded-lg hover:bg-zinc-50 transition-colors">
              <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center shrink-0">
                <Icon className="text-zinc-600 w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">{policy.title}</p>
                <p className="text-sm text-zinc-500">{policy.description}</p>
              </div>
              <button
                onClick={() => togglePolicy(policy.id)}
                className={`px-3 py-1 text-xs font-bold rounded transition-colors flex items-center gap-1 ${
                  policy.enforced
                    ? "bg-black text-white"
                    : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200"
                }`}
              >
                {policy.enforced ? (
                  <>
                    <Check className="w-3 h-3" />
                    Enforced
                  </>
                ) : (
                  <>
                    <X className="w-3 h-3" />
                    Disabled
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SecurityPolicy;