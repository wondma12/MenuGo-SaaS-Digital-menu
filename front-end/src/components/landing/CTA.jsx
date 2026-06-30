import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Star, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  const benefits = [
    { icon: Zap, text: "Free 14-day trial" },
    { icon: Shield, text: "No credit card required" },
    { icon: Star, text: "Cancel anytime" },
    { icon: Users, text: "24/7 support included" }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary">
        {/* Animated Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Floating Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            <Zap className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-semibold text-white">
              Limited Time Offer
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Ready to Transform Your{' '}
            <span className="text-yellow-300">Restaurant</span>?
          </h2>

          {/* Description */}
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Join 2,500+ restaurants already using MenuGo to streamline operations, 
            boost sales, and delight customers. Start your free trial today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/auth/signup"
              className="group px-8 py-4 bg-white text-primary rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/auth/login"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105"
            >
              Schedule Demo
            </Link>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-2 justify-center text-white/90"
              >
                <benefit.icon className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">{benefit.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="pt-8 flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              ))}
            </div>
            <p className="text-white/70 text-sm">
              Rated 4.9/5 by restaurant owners • 50,000+ daily orders processed
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;