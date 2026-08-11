import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  QrCode, Mail, Phone, MapPin, ArrowRight
} from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    product: {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Integrations", href: "#" },
        { label: "Changelog", href: "#" },
        { label: "API Documentation", href: "#" }
      ]
    },
    solutions: {
      title: "Solutions",
      links: [
        { label: "QR Menus", href: "#" },
        { label: "Order Management", href: "#" },
        { label: "Analytics", href: "#" },
        { label: "Staff Management", href: "#" },
        { label: "Multi-Location", href: "#" }
      ]
    },
    resources: {
      title: "Resources",
      links: [
        { label: "Blog", href: "#" },
        { label: "Help Center", href: "#" },
        { label: "Community", href: "#" },
        { label: "Webinars", href: "#" },
        { label: "Partners", href: "#" }
      ]
    },
    company: {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Press", href: "#" },
        { label: "Legal", href: "#" }
      ]
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {}
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {}
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-2.5 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                  <QrCode className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <span className="text-2xl font-bold">MenuGo</span>
              </Link>
              <p className="text-gray-400 mb-6 max-w-sm">
                Transform your restaurant operations with our all-in-one digital platform. 
                Join thousands of restaurants already using MenuGo.
              </p>

              {}
              <form onSubmit={handleSubscribe} className="space-y-3">
                <label className="text-sm font-semibold text-gray-300">
                  Subscribe to our newsletter
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 bg-gradient-to-r from-primary to-primary-dark rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                {subscribed && (
                  <p className="text-green-400 text-sm">✅ Thanks for subscribing!</p>
                )}
              </form>
            </div>

            {}
            {Object.values(footerLinks).map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-primary transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© 2026 MenuGo. All rights reserved.</span>
              <span className="hidden md:inline">·</span>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <span className="hidden md:inline">·</span>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>

            {}
            <div className="flex items-center gap-4">
              {[
                { icon: FaTwitter, href: "#", name: "twitter" },
                { icon: FaLinkedin, href: "#", name: "linkedin" },
                { icon: FaGithub, href: "#", name: "github" },
                { icon: FaInstagram, href: "#", name: "instagram" },
                { icon: FaYoutube, href: "#", name: "youtube" }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;