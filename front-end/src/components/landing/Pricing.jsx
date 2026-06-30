import React, { useState } from "react";
import { Check, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small restaurants getting started",
      monthlyPrice: 29,
      annualPrice: 24,
      popular: false,
      features: [
        "Digital QR Menu",
        "Up to 100 orders/day",
        "Basic analytics",
        "1 location",
        "Email support",
        "Mobile responsive"
      ],
      cta: "Start Free Trial",
      gradient: "from-gray-700 to-gray-900"
    },
    {
      name: "Professional",
      description: "Best for growing restaurants",
      monthlyPrice: 79,
      annualPrice: 66,
      popular: true,
      features: [
        "Everything in Starter",
        "Unlimited orders",
        "Advanced analytics",
        "Staff management",
        "3 locations",
        "Priority support",
        "Custom branding",
        "API access"
      ],
      cta: "Start Free Trial",
      gradient: "from-primary to-primary-dark"
    },
    {
      name: "Enterprise",
      description: "For large restaurant chains",
      monthlyPrice: 199,
      annualPrice: 166,
      popular: false,
      features: [
        "Everything in Professional",
        "Unlimited locations",
        "Custom integrations",
        "Dedicated manager",
        "SLA guarantee",
        "White-label option",
        "Advanced security",
        "24/7 phone support"
      ],
      cta: "Contact Sales",
      gradient: "from-gray-700 to-gray-900"
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Pricing Plans
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Simple,{' '}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Transparent
            </span>{' '}
            Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your restaurant. All plans include a 14-day free trial.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-semibold ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                isAnnual ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <motion.div
                animate={{ x: isAnnual ? 32 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
              />
            </button>
            <span className={`text-sm font-semibold ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
              <span className="ml-1 text-green-500 text-xs font-bold bg-green-50 px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group ${
                plan.popular ? 'md:-mt-4 md:mb-4' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                    <Star className="w-4 h-4 fill-white" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`relative h-full bg-white rounded-3xl border-2 transition-all duration-300 ${
                plan.popular
                  ? 'border-primary shadow-2xl shadow-primary/20 scale-105'
                  : 'border-gray-200 hover:border-primary/30 hover:shadow-xl'
              }`}>
                <div className="p-8">
                  {/* Plan Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold bg-gradient-to-br text-gray-900">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    {isAnnual && (
                      <p className="text-sm text-green-600 mt-1">
                        Billed annually (${plan.annualPrice * 12}/year)
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    to="/auth/signup"
                    className={`block w-full text-center py-4 rounded-2xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg hover:shadow-primary/25 hover:scale-105'
                        : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    {plan.cta}
                    {plan.popular && <Zap className="w-4 h-4 inline ml-1" />}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            💳 All plans include a 14-day free trial. No credit card required.{' '}
            <span className="text-primary font-semibold">30-day money-back guarantee.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;