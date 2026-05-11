import React from 'react';

const HeroBanner = () => {
  return (
    <section className="relative w-full h-[300px] md:h-[450px] overflow-hidden rounded-lg mb-8">
      <img
        className="w-full h-full object-cover"
        alt="Restaurant interior"
        src="https://cdn.dribbble.com/userupload/33502197/file/original-d173b422cc193eee821db0baf7ba055d.jpg?resize=400x0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 md:p-12 text-white">
        <span className="font-label-caps text-label-caps mb-2 uppercase tracking-[0.16em]">
          Michelin Star Experience
        </span>
        <h2 className="font-display text-h1 md:text-display mb-2">
          Saison d'Hiver
        </h2>
        <p className="font-body-md max-w-xl opacity-90">
          A curated collection of seasonal ingredients, interpreted through
          modern minimalist techniques.
        </p>
      </div>
    </section>
  );
};

export default HeroBanner;