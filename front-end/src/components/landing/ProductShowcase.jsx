import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, Monitor, Tablet, QrCode, 
  ShoppingCart, ChefHat, BarChart3, Check , Users
} from "lucide-react";

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState("customer");
  const [activeDevice, setActiveDevice] = useState("phone");

  const tabs = [
    { 
      id: "customer", 
      label: "For Customers",
      icon: Users
    },
    { 
      id: "staff", 
      label: "For Staff",
      icon: ChefHat
    },
    { 
      id: "owner", 
      label: "For Owners",
      icon: BarChart3
    }
  ];

  const devices = [
    { id: "phone", icon: Smartphone, label: "Phone" },
    { id: "tablet", icon: Tablet, label: "Tablet" },
    { id: "desktop", icon: Monitor, label: "Desktop" }
  ];

  const showcaseContent = {
    customer: {
      title: "Seamless Customer Experience",
      description: "Customers scan, browse, order, and pay - all from their phone. No app download required.",
      features: [
        "QR code scanning from table",
        "Beautiful digital menu with images",
        "Easy customization of orders",
        "Multiple payment options",
        "Real-time order tracking",
        "Feedback submission"
      ],
      image: (
        <div className="relative w-64 h-[500px] bg-gray-900 rounded-[3rem] border-4 border-gray-800 p-3 mx-auto">
          <div className="w-full h-8 bg-gray-900 rounded-t-3xl flex items-center justify-center">
            <div className="w-20 h-5 bg-gray-800 rounded-full" />
          </div>
          <div className="bg-white rounded-3xl h-full p-4 space-y-4">
            <div className="h-40 bg-gray-100 rounded-2xl" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded-full w-3/4" />
                    <div className="h-3 bg-gray-200 rounded-full w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    staff: {
      title: "Efficient Staff Dashboard",
      description: "Real-time order management, table tracking, and communication tools for your team.",
      features: [
        "Instant order notifications",
        "Kitchen display system",
        "Table management",
        "Order prioritization",
        "Staff communication",
        "Performance tracking"
      ],
      image: (
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Active Orders</h3>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">Live</span>
          </div>
          <div className="space-y-3">
            {[
              { table: "T7", items: "2x Pizza", time: "5 min", color: "bg-orange-100 text-orange-700" },
              { table: "T3", items: "Salad + Drink", time: "2 min", color: "bg-red-100 text-red-700" },
              { table: "T12", items: "Pasta", time: "8 min", color: "bg-yellow-100 text-yellow-700" }
            ].map((order, i) => (
              <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary">
                  {order.table}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{order.items}</p>
                  <p className="text-xs text-gray-500">{order.time} ago</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${order.color}`}>Preparing</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    owner: {
      title: "Powerful Analytics Dashboard",
      description: "Get real-time insights into sales, performance, and customer behavior across all locations.",
      features: [
        "Real-time revenue tracking",
        "Customer analytics",
        "Staff performance metrics",
        "Menu optimization insights",
        "Multi-location dashboard",
        "Exportable reports"
      ],
      image: (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Revenue</h3>
            <span className="text-green-600 text-sm font-semibold">+12.5%</span>
          </div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-50 rounded-xl flex items-end p-4 gap-2">
              {[65, 75, 85, 70, 90, 95, 80].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  className="flex-1 bg-primary/20 rounded-t-lg"
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Total Orders", value: "847", color: "text-blue-600" },
                { label: "Avg. Value", value: "$42", color: "text-green-600" }
              ].map((stat, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Product Showcase
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Designed for{' '}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Everyone
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Beautiful interfaces for customers, staff, and owners
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/25'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Device Preview */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              {showcaseContent[activeTab].image}
            </motion.div>
          </AnimatePresence>

          {/* Right - Content */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {showcaseContent[activeTab].title}
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  {showcaseContent[activeTab].description}
                </p>

                <div className="space-y-4">
                  {showcaseContent[activeTab].features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <button className="mt-8 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105">
                  Learn More
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;