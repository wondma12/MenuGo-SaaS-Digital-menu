import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Owner, The Italian Place",
      image: "https://i.pravatar.cc/100?img=1",
      rating: 5,
      text: "MenuGo transformed our restaurant operations completely. The QR menu system is incredibly intuitive, and our customers love the convenience. We've seen a 40% increase in order efficiency since implementing it.",
      metrics: { label: "Revenue Increase", value: "+35%" }
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CEO, Golden Dragon Group",
      image: "https://i.pravatar.cc/100?img=3",
      rating: 5,
      text: "Managing multiple locations was always a challenge until we found MenuGo. The centralized dashboard gives us real-time insights across all our restaurants. The analytics have been game-changing for our business decisions.",
      metrics: { label: "Efficiency Gain", value: "+50%" }
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Manager, Fresh Bites Cafe",
      image: "https://i.pravatar.cc/100?img=5",
      rating: 4,
      text: "The staff management features are phenomenal. Scheduling, permissions, and performance tracking have never been easier. Our team productivity has improved significantly, and the support team is incredibly responsive.",
      metrics: { label: "Time Saved", value: "20hrs/wk" }
    },
    {
      id: 4,
      name: "David Park",
      role: "Founder, Sushi Master",
      image: "https://i.pravatar.cc/100?img=8",
      rating: 5,
      text: "We tried several restaurant management platforms before MenuGo. None compare to the seamless experience and comprehensive features. The real-time kitchen display system has reduced our order errors by 90%.",
      metrics: { label: "Error Reduction", value: "-90%" }
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Director, Bistro Deluxe",
      image: "https://i.pravatar.cc/100?img=9",
      rating: 5,
      text: "MenuGo's customer feedback system has been invaluable. We're able to address issues in real-time and improve our service quality continuously. Our customer satisfaction scores have never been higher.",
      metrics: { label: "Customer Satisfaction", value: "4.9/5" }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Restaurant Owners
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our customers are saying about MenuGo
          </p>
        </motion.div>

        {}
        <div className="max-w-4xl mx-auto relative">
          <div className="relative overflow-hidden" style={{ minHeight: '400px' }}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute w-full"
              >
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 relative">
                  {}
                  <div className="absolute top-6 right-6 text-primary/10">
                    <Quote className="w-16 h-16" />
                  </div>

                  <div className="relative">
                    {}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {}
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-light">
                      "{testimonials[currentIndex].text}"
                    </p>

                    {}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-primary/20"
                        />
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {testimonials[currentIndex].name}
                          </h4>
                          <p className="text-gray-500">
                            {testimonials[currentIndex].role}
                          </p>
                        </div>
                      </div>

                      {}
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl px-6 py-3 border border-primary/20">
                        <p className="text-sm text-gray-600">
                          {testimonials[currentIndex].metrics.label}
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {testimonials[currentIndex].metrics.value}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrevious}
              className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-primary hover:bg-primary/5 flex items-center justify-center transition-all duration-300 group"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
            </button>

            {}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 h-3 bg-primary rounded-full'
                      : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-primary hover:bg-primary/5 flex items-center justify-center transition-all duration-300 group"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>

        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 pt-16 border-t border-gray-100"
        >
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">
            Trusted by leading restaurants worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-50">
            {['Restaurant A', 'Bistro Co', 'FoodChain', 'Cafe Pro', 'Dining Plus'].map((brand) => (
              <div
                key={brand}
                className="text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;