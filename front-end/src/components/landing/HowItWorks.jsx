import React from "react";
import { motion } from "framer-motion";
import { QrCode, Smartphone, ChefHat, Bell, CreditCard, Star } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: QrCode,
      step: "01",
      title: "Scan QR Code",
      description: "Customer scans the unique QR code on their table using their smartphone camera. No app download needed.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      image: "📱"
    },
    {
      icon: Smartphone,
      step: "02",
      title: "Browse & Order",
      description: "Digital menu appears instantly. Customers browse items, customize orders, and add to cart with ease.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      image: "🛒"
    },
    {
      icon: ChefHat,
      step: "03",
      title: "Kitchen Receives Order",
      description: "Order instantly appears on the kitchen display. Chefs can prioritize and track preparation time.",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      image: "👨‍🍳"
    },
    {
      icon: Bell,
      step: "04",
      title: "Real-Time Updates",
      description: "Customer receives live updates on order status. Staff gets notified when orders are ready for serving.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      image: "🔔"
    },
    {
      icon: CreditCard,
      step: "05",
      title: "Secure Payment",
      description: "Multiple payment options available. Customers can pay via card, digital wallet, or split the bill.",
      color: "from-indigo-500 to-violet-500",
      bgColor: "bg-indigo-50",
      image: "💳"
    },
    {
      icon: Star,
      step: "06",
      title: "Feedback & Analytics",
      description: "Collect customer feedback and gain insights. Improve service quality with data-driven decisions.",
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-yellow-50",
      image: "⭐"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-0 w-72 h-72 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Simple 6-Step{' '}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From scanning to payment, experience the seamless journey that makes 
            MenuGo the preferred choice for modern restaurants.
          </p>
        </motion.div>

        {/* Timeline Process */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Vertical Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20 transform -translate-x-1/2" />

          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
                    <div className={`inline-flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                      <span className="text-5xl font-bold bg-gradient-to-r from-primary/20 to-primary/10 bg-clip-text text-transparent">
                        {step.step}
                      </span>
                      <div className={`w-12 h-12 rounded-xl ${step.bgColor} flex items-center justify-center`}>
                        <step.icon className={`w-6 h-6 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="hidden lg:flex items-center justify-center relative z-10">
                  <div className="w-16 h-16 bg-white rounded-full shadow-lg border-4 border-primary flex items-center justify-center">
                    <span className="text-2xl">{step.image}</span>
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to streamline your restaurant operations?
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;