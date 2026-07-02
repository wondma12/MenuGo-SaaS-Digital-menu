

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import TrustedBy from "../components/landing/TrustedBy";
import Features from "../components/landing/Features";
import ProductShowcase from "../components/landing/ProductShowcase";
import HowItWorks from "../components/landing/HowItWorks";
import Analytics from "../components/landing/Analytics";
import Testimonials from "../components/landing/Testimonials";
import Pricing from "../components/landing/Pricing";
import FAQ from "../components/landing/FAQ";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

//Landing page with scroll navigation and back to top button
const Landing = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, []);

  return (
    <div className="relative">
      <Navbar />
      
      <main>
        <Hero />
        <TrustedBy />
        <Features />
        <ProductShowcase />
        <HowItWorks />
        <Analytics />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      
      <Footer />
      
      <BackToTop />
      <ScrollProgress />
    </div>
  );
};

//Back to top button
const BackToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center group ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <svg
        className="w-5 h-5 group-hover:-translate-y-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
};


const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary via-primary-dark to-primary transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default Landing;