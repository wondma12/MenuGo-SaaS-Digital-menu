import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, MessageCircle } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("general");

  const categories = [
    { id: "general", label: "General" },
    { id: "pricing", label: "Pricing" },
    { id: "features", label: "Features" },
    { id: "support", label: "Support" }
  ];

  const faqs = {
    general: [
      {
        question: "What is MenuGo and how does it work?",
        answer: "MenuGo is an all-in-one restaurant management platform that digitizes your menu, streamlines order management, and provides real-time analytics. Customers scan a QR code to view your digital menu, place orders directly from their phones, and pay seamlessly. Restaurant staff receive orders instantly on their dashboard or kitchen display."
      },
      {
        question: "Is MenuGo suitable for small restaurants?",
        answer: "Absolutely! MenuGo is designed to scale with your business. We have plans specifically for small restaurants starting at $29/month. You can start with basic features and upgrade as your business grows. Our platform is intuitive and requires minimal training."
      },
      {
        question: "How long does it take to set up?",
        answer: "Most restaurants are up and running within 24 hours. Our onboarding team helps you create your digital menu, set up QR codes, and train your staff. The process is straightforward and we provide step-by-step guidance throughout."
      },
      {
        question: "Do customers need to download an app?",
        answer: "No! Customers simply scan the QR code with their phone's camera and the digital menu opens in their browser instantly. No app download, registration, or login required. This makes the experience frictionless for your customers."
      }
    ],
    pricing: [
      {
        question: "What's included in the free trial?",
        answer: "The 14-day free trial includes all features of the Professional plan. You get unlimited orders, digital QR menus, analytics dashboard, staff management, and priority support. No credit card required."
      },
      {
        question: "Can I switch plans at any time?",
        answer: "Yes! You can upgrade or downgrade your plan at any time. If you upgrade, you'll get immediate access to new features. If you downgrade, the changes take effect at the next billing cycle. We'll never lock you into a plan."
      },
      {
        question: "Are there any hidden fees?",
        answer: "No hidden fees whatsoever. The price you see is the price you pay. There are no setup fees, transaction fees, or cancellation fees. We believe in transparent pricing."
      }
    ],
    features: [
      {
        question: "Can I customize my digital menu's appearance?",
        answer: "Yes! MenuGo offers extensive customization options. You can add your restaurant's logo, choose color schemes, organize items into categories, add high-quality photos, and include dietary information. Your digital menu will match your brand perfectly."
      },
      {
        question: "How does the kitchen display system work?",
        answer: "When a customer places an order, it appears instantly on your kitchen display. You can organize orders by table, prioritize them, mark them as in-progress or completed, and set preparation time estimates. The system works on any tablet or computer."
      },
      {
        question: "Can I integrate MenuGo with my existing POS system?",
        answer: "Yes! MenuGo integrates with most major POS systems. Our API allows for custom integrations as well. Contact our support team to check compatibility with your specific POS system."
      }
    ],
    support: [
      {
        question: "What kind of support do you offer?",
        answer: "We offer multiple support channels: 24/7 email support for all plans, priority phone support for Professional plans, and a dedicated account manager for Enterprise customers. We also have an extensive knowledge base and video tutorials."
      },
      {
        question: "Is my data secure with MenuGo?",
        answer: "Security is our top priority. We use bank-level 256-bit encryption, are PCI-DSS compliant for payment processing, and regularly undergo security audits. Your data is backed up in multiple secure locations and never shared with third parties."
      }
    ]
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
      {}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/3 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">FAQ</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about MenuGo
          </p>
        </motion.div>

        {}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setOpenIndex(null);
              }}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/25'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {faqs[activeCategory].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-primary/30 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  openIndex === index
                    ? 'bg-primary text-white rotate-180'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 md:p-12 border border-primary/20"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-primary/25 transition-all duration-300">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;