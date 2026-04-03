import React, { useState } from "react";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import { Check, Crown, CreditCard, Zap, TrendingUp, Calendar } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$29",
    period: "/month",
    yearlyPrice: "$290",
    features: [
      "Up to 50 menu items",
      "Basic QR code",
      "Email support",
      "Basic analytics",
      "Single location",
    ],
    popular: false,
    color: "gray",
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    yearlyPrice: "$790",
    features: [
      "Unlimited menu items",
      "Custom QR code",
      "Priority support",
      "Advanced analytics",
      "Multiple locations",
      "Order management",
      "Staff management",
    ],
    popular: true,
    color: "black",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    yearlyPrice: "Custom",
    features: [
      "Everything in Pro",
      "Dedicated support",
      "API access",
      "White-label solution",
      "Custom integrations",
      "SLA agreement",
      "24/7 phone support",
    ],
    popular: false,
    color: "purple",
  },
];

const SubscriptionPanel = ({ currentPlan = "Pro" }) => {
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isUpgrading, setIsUpgrading] = useState(false);

  const handleUpgrade = (planName) => {
    setIsUpgrading(true);
    setTimeout(() => {
      setSelectedPlan(planName);
      setIsUpgrading(false);
      alert(`Successfully upgraded to ${planName} plan!`);
    }, 1000);
  };

  const currentPlanData = plans.find(p => p.name === selectedPlan);

  return (
    <Card title="Subscription Plan">
      {/* Current Plan Banner */}
      <div className="mb-6 p-4 bg-gradient-to-r from-black to-gray-800 rounded-lg text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">Current Plan</p>
            <p className="text-2xl font-bold">{selectedPlan}</p>
            {selectedPlan !== "Enterprise" && (
              <p className="text-xs opacity-70 mt-1">
                {billingCycle === "monthly" ? currentPlanData?.price : currentPlanData?.yearlyPrice} / {billingCycle === "monthly" ? "month" : "year"}
              </p>
            )}
          </div>
          <Crown size={40} className="opacity-80" />
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 rounded-lg p-1 flex gap-1">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              billingCycle === "monthly" 
                ? "bg-black text-white" 
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
              billingCycle === "yearly" 
                ? "bg-black text-white" 
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Yearly
            <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-lg p-6 transition-all ${
              plan.popular ? "border-black shadow-lg relative" : "border-gray-200"
            } ${selectedPlan === plan.name ? "ring-2 ring-black" : ""}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full">
                Most Popular
              </div>
            )}
            
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-2">
                {plan.name !== "Enterprise" ? (
                  <>
                    <span className="text-3xl font-bold">
                      {billingCycle === "monthly" ? plan.price : plan.yearlyPrice}
                    </span>
                    <span className="text-gray-500">
                      {billingCycle === "monthly" ? plan.period : "/year"}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">Custom</span>
                )}
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              label={selectedPlan === plan.name ? "Current Plan" : "Upgrade"}
              variant={selectedPlan === plan.name ? "secondary" : "primary"}
              className="w-full"
              disabled={selectedPlan === plan.name || isUpgrading}
              onClick={() => handleUpgrade(plan.name)}
            />
          </div>
        ))}
      </div>

      {/* Billing Information */}
      <div className="mt-6 pt-6 border-t">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <CreditCard size={20} className="text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Billing Information</p>
              <p className="text-xs text-gray-500">Next billing date: April 15, 2026</p>
            </div>
          </div>
          <Button label="Manage Billing" variant="secondary" icon={CreditCard} />
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-4 pt-4 border-t">
        <p className="text-sm font-medium text-gray-900 mb-3">Payment Methods</p>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-7 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
            VISA
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Visa ending in 4242</p>
            <p className="text-xs text-gray-500">Expires 12/2028</p>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">Update</button>
        </div>
      </div>
    </Card>
  );
};

export default SubscriptionPanel;