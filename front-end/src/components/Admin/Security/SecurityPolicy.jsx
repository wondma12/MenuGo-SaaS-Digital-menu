import React from "react";
import { UserKey, ShieldCheck } from "lucide-react";

const SecurityPolicy = () => {
  const policies = [
    {
      icon: UserKey,
      title: "Password Complexity",
      description:
        "Enforce 12+ characters, special symbols, and rotation every 30 days.",
    },
    {
      icon: ShieldCheck,
      title: "Two-Factor Authentication",
      description:
        "Mandatory for all admin-level accounts across the platform.",
    },
  ];

  return (
    <div className="bg-white border border-outline-variant p-6 rounded-lg">
      <h3 className="text-h3 font-h3 mb-6">Security Policy</h3>

      <div className="space-y-6">
        {policies.map((policy, index) => {
          const Icon = policy.icon;
          return (
            <div key={index} className="flex items-start gap-4">
              <div className="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center shrink-0">
                <Icon className="text-on-surface w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-on-surface">{policy.title}</p>
                <p className="text-body-sm text-on-secondary-container">
                  {policy.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SecurityPolicy;
