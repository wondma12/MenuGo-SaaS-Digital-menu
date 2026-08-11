import React, { useState } from "react";
import { 
  QrCode, BarChart3, Users, Zap, MessageSquare, Shield,
  Smartphone, Clock, Globe, CreditCard, Headphones, Settings 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: QrCode,
      title: "Digital QR Menus",
      description: "Create stunning digital menus accessible via QR codes. Update items, prices, and images instantly without reprinting.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      details: ["Instant QR generation", "Multi-language support", "Real-time updates", "Custom branding"]
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Get real-time insights into your restaurant's performance. Track sales, popular items, peak hours, and customer preferences.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      details: ["Sales dashboard", "Customer insights", "Peak hour analysis", "Export reports"]
    },
    {
      icon: Users,
      title: "Staff Management",
      description: "Manage your team efficiently with role-based access, scheduling, and performance tracking.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      details: ["Role permissions", "Shift scheduling", "Performance metrics", "Team communication"]
    },
    {
      icon: Zap,
      title: "Order Management",
      description: "Streamline your order flow from customer to kitchen. Real-time tracking and automated notifications.",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      details: ["Real-time tracking", "Kitchen display", "Order prioritization", "Auto-notifications"]
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Accept payments securely with multiple options. PCI-compliant and encrypted transactions.",
      color: "from-indigo-500 to-violet-500",
      bgColor: "bg-indigo-50",
      details: ["Multiple gateways", "PCI compliant", "Split payments", "Auto-reconciliation"]
    },
    {
      icon: Globe,
      title: "Multi-Location",
      description: "Manage multiple restaurant locations from a single dashboard. Consistent experience across all outlets.",
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
      details: ["Central dashboard", "Location analytics", "Menu syncing", "Cross-location reports"]
    }
  ];

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Powerful Features
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of tools is designed to streamline your restaurant 
            operations and enhance customer experience.
          </p>
        </motion.div>

        {}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setActiveFeature(index)}
              className="group relative"
            >
              <div className={`relative p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer
                ${activeFeature === index 
                  ? 'border-primary shadow-2xl shadow-primary/10 bg-white scale-105' 
                  : 'border-gray-100 hover:border-primary/30 bg-white hover:shadow-xl'
                }`}
              >
                {}
                <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`} />
                </div>

                {}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>

                {}
                <AnimatePresence>
                  {activeFeature === index && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2 pt-4 border-t border-gray-100"
                    >
                      {feature.details.map((detail, i) => (
                        <motion.li
                          key={detail}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {detail}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                {}
                <button className="mt-6 text-primary font-semibold text-sm flex items-center gap-1 group/btn">
                  Learn more
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;















