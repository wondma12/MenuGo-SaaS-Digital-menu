import React from 'react';

const HeroBanner = () => {
  return (
    <section className="relative w-full h-[300px] md:h-[450px] overflow-hidden rounded-lg mb-8">
      <img
        className="w-full h-full object-cover"
        alt="Restaurant interior"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK5-eJI0gdK-TTGgpuLl7RAcAo84UjuSkVeeOy2v3ditoXFdv4Gjp1qNnmwEpG9dnWzRz-ik__b0u6xw4uP4oxeQM9Zae0H-i-SAw0KeIvYRQNJNHUyX8b6knbKrN2Hd8TXkH8lc6oBL4TjYnZEucnrRCVdrXwjuWgP2WDtvaqhGV8U2lWFMdVlG0kqLQ1LpKMKIwSaF1_ziCehfx_EmLGrNjse8Qk5i_pKU8ExlKO6j4gZoK-zN9VHns-9GGL2GkL3qcgwGEMGEo"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 md:p-12 text-white">
        <span className="font-label-caps text-label-caps mb-2 uppercase tracking-[0.16em]">Michelin Star Experience</span>
        <h2 className="font-display text-h1 md:text-display mb-2">Saison d'Hiver</h2>
        <p className="font-body-md max-w-xl opacity-90">
          A curated collection of seasonal ingredients, interpreted through modern minimalist techniques.
        </p>
      </div>
    </section>
  );
};

export default HeroBanner;