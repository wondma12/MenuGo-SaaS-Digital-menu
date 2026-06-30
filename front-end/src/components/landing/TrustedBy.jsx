import React from "react";
import { motion } from "framer-motion";
import { Star, Award, Shield, Heart, ThumbsUp, TrendingUp } from "lucide-react";

const TrustedBy = () => {
  const stats = [
    { icon: TrendingUp, value: "2,500+", label: "Active Restaurants" },
    { icon: ThumbsUp, value: "1M+", label: "Orders Processed" },
    { icon: Heart, value: "98%", label: "Customer Satisfaction" },
    { icon: Shield, value: "99.9%", label: "Uptime Guarantee" }
  ];

  const reviews = [
    { platform: "Google", rating: 4.8, reviews: "2,500+", color: "from-blue-500 to-blue-600" },
    { platform: "Trustpilot", rating: 4.7, reviews: "1,800+", color: "from-green-500 to-green-600" },
    { platform: "G2", rating: 4.9, reviews: "1,200+", color: "from-orange-500 to-orange-600" },
    { platform: "Capterra", rating: 4.8, reviews: "950+", color: "from-purple-500 to-purple-600" }
  ];

  const awards = [
    { name: "Best Restaurant Tech 2025", icon: Award },
    { name: "Top 50 Startups 2025", icon: Star },
    { name: "Innovation Award 2024", icon: TrendingUp }
  ];

  return (
    <section className="py-16 bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-center text-2xl font-bold text-gray-900 mb-8">
            Rated Excellent Across Platforms
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.platform}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${review.color} text-white text-sm font-semibold mb-4`}>
                  <Star className="w-3 h-3 fill-white" />
                  {review.rating}/5
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{review.platform}</h4>
                <p className="text-sm text-gray-600">{review.reviews} reviews</p>
                <div className="flex justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-center text-2xl font-bold text-gray-900 mb-8">
            Awards & Recognition
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={award.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center gap-3 bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl px-6 py-4 hover:shadow-lg transition-all"
              >
                <award.icon className="w-8 h-8 text-yellow-600" />
                <span className="font-semibold text-gray-900">{award.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8"
        >
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Shield className="w-5 h-5 text-green-500" />
            <span>PCI DSS Compliant</span>
          </div>
          <div className="w-px h-6 bg-gray-300" />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Shield className="w-5 h-5 text-green-500" />
            <span>GDPR Ready</span>
          </div>
          <div className="w-px h-6 bg-gray-300" />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Shield className="w-5 h-5 text-green-500" />
            <span>SOC 2 Certified</span>
          </div>
          <div className="w-px h-6 bg-gray-300" />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Shield className="w-5 h-5 text-green-500" />
            <span>256-bit SSL Encryption</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;