import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Star, Users, TrendingUp, Shield } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const stats = [
    { icon: Users, value: "2,500+", label: "Restaurants" },
    { icon: TrendingUp, value: "1M+", label: "Orders Processed" },
    { icon: Shield, value: "99.9%", label: "Uptime" },
    { icon: Star, value: "4.9/5", label: "Rating" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-primary/5 to-primary/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-light/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 to-transparent rounded-full" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 shadow-lg shadow-primary/5"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm font-semibold text-gray-700">
                Trusted by 2,500+ restaurants worldwide
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-900">Run Your Restaurant</span>
                <br />
                <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  Smarter & Faster
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
              Transform your restaurant operations with MenuGo's all-in-one platform. 
              Digital menus, real-time orders, analytics, and staff management — 
              everything you need to grow your business.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/auth/signup"
                className="group relative px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="relative z-10">Start Free Trial</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
              <button className="group px-8 py-4 bg-white border-2 border-gray-200 hover:border-primary/30 rounded-2xl font-semibold text-lg text-gray-700 hover:text-primary transition-all duration-300 hover:shadow-xl inline-flex items-center justify-center gap-2">
                <Play className="w-5 h-5 fill-primary text-primary" />
                Watch Demo
              </button>
            </div>

            {/* Trust Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center group cursor-default"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Floating Dashboard Preview */}
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 space-y-4">
                {/* Mock Browser Window */}
                <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-2 bg-gray-100 rounded-full w-3/4" />
                  </div>
                </div>

                {/* Mock Dashboard Content */}
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-3">
                        <div className="h-2 bg-primary/20 rounded-full w-1/2 mb-2" />
                        <div className="h-4 bg-primary/20 rounded-full w-3/4" />
                      </div>
                    ))}
                  </div>
                  <div className="h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-20 bg-primary/10 rounded-xl" />
                    <div className="h-20 bg-primary/10 rounded-xl" />
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl rotate-12 shadow-xl flex items-center justify-center">
                <Star className="w-8 h-8 text-white" fill="white" />
              </div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl -rotate-6 shadow-xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;