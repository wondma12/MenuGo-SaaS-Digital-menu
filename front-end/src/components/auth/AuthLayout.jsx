
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UtensilsCrossed, 
  Star, 
  TrendingUp, 
  Shield, 
  Clock,
  ArrowLeft,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

const AuthLayout = ({ children, title, subtitle }) => {
  const stats = [
    { icon: TrendingUp, value: "500+", label: "Restaurants" },
    { icon: Star, value: "1M+", label: "Orders Processed" },
    { icon: Shield, value: "99.9%", label: "Uptime" },
    { icon: Clock, value: "24/7", label: "Support" }
  ];

  const testimonials = [
    {
      text: "MenuGo transformed our restaurant operations completely. The best decision we made!",
      author: "Sarah Johnson",
      role: "Owner, The Italian Place",
      rating: 5
    },
    {
      text: "Managing multiple locations has never been easier. The analytics are game-changing.",
      author: "Michael Chen",
      role: "CEO, Golden Dragon Group",
      rating: 5
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {}
        <div className="absolute inset-0">
          {}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          
          {}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gray-100/50 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-full" />
          
          {}
          <div className="absolute top-10 right-10 w-32 h-32 border border-gray-200 rounded-full opacity-50" />
          <div className="absolute bottom-10 left-10 w-48 h-48 border border-gray-200 rounded-full opacity-30" />
        </div>

        {}
        <div className="relative z-10 flex items-center justify-center w-full p-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg w-full"
          >
            {}
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="inline-flex items-center justify-center w-24 h-24 bg-black rounded-3xl mb-6 shadow-2xl shadow-gray-300/50 relative group"
              >
                <UtensilsCrossed className="w-12 h-12 text-white relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-5xl font-bold text-gray-900 mb-4"
              >
                MenuGo
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto"
              >
                Transform your restaurant's menu experience with our all-in-one digital solution
              </motion.p>
            </div>

            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 gap-4 mb-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="group relative overflow-hidden bg-white rounded-2xl p-5 border border-gray-200 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <stat.icon className="w-4 h-4 text-gray-700" />
                      </div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {stat.label}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Testimonial Carousel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="relative bg-white rounded-3xl p-6 border border-gray-200 shadow-lg shadow-gray-200/50"
            >
              {/* Quote decoration */}
              <div className="absolute top-4 right-4 text-gray-100">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-600 text-sm leading-relaxed mb-6 relative z-10"
                >
                  "{testimonials[currentTestimonial].text}"
                </motion.p>
              </AnimatePresence>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 font-semibold text-sm">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
                
                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentTestimonial
                          ? 'w-8 h-2 bg-black'
                          : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
                <Sparkles className="w-4 h-4 text-gray-700" />
                <span className="text-sm font-medium text-gray-600">
                  Trusted by 2,500+ restaurants worldwide
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form Area with Standard Grey/White Theme */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Back to Home Link */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to home
            </Link>
          </motion.div>

          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-4 shadow-lg shadow-gray-200"
            >
              <UtensilsCrossed className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900">
              MenuGo
            </h1>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 relative overflow-hidden"
          >
            {/* Card Decoration - subtle top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-black" />
            
            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {title}
              </h2>
              {subtitle && (
                <p className="text-gray-600">{subtitle}</p>
              )}
            </div>
            
            {children}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6"
          >
            <p className="text-sm text-gray-500">
              © 2026 MenuGo. All rights reserved.
            </p>
            <div className="flex items-center justify-center gap-4 mt-3">
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                Privacy Policy
              </a>
              <span className="text-gray-300">•</span>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                Terms of Service
              </a>
              <span className="text-gray-300">•</span>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                Contact
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;