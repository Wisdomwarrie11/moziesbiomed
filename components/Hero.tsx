
import React, { useState, useEffect } from 'react';
import { HERO_SLIDES } from '../constants';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[650px] md:h-[750px] lg:h-[850px] w-full overflow-hidden bg-black">
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === current ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
        >
          {/* Enhanced Overlay with stronger side-shading for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 to-transparent z-10" />
          
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          
          {/* Responsive container with fixed margins for large screens */}
          <div className="absolute inset-0 z-20 flex items-center px-6 sm:px-16 lg:px-32 xl:px-56">
            <div className={`max-w-4xl transition-all duration-1000 delay-300 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-red-600 rounded-full text-white text-[10px] font-black tracking-[0.4em] uppercase mb-10 shadow-xl shadow-red-900/20">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                Mozies BioMed Engineering
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1] mb-10 tracking-tighter">
                {slide.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 !== 0 ? 'text-red-600 block' : 'block'}>
                    {word}
                  </span>
                ))}
              </h1>
              
              <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl font-medium leading-relaxed opacity-90 border-l-4 border-red-600 pl-8">
                {slide.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/products" className="bg-red-600 text-white px-12 py-5 rounded-[24px] font-black text-lg hover:scale-105 hover:bg-red-700 transition-all shadow-2xl shadow-red-900/40 text-center uppercase tracking-widest">
                  View Catalog
                </Link>
                <Link to="/services" className="bg-white/10 text-white backdrop-blur-md border-2 border-white/20 px-12 py-5 rounded-[24px] font-black text-lg hover:bg-white/20 hover:border-white transition-all text-center uppercase tracking-widest">
                  Our Expertise
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators - Moved to left to align with text on large screens */}
      <div className="absolute bottom-12 left-6 sm:left-16 lg:left-32 xl:left-56 z-30 flex items-center space-x-8">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className="group flex items-center gap-4"
          >
            <span className={`text-[12px] font-black transition-all ${index === current ? 'text-red-600 scale-125' : 'text-white/40'}`}>
              0{index + 1}
            </span>
            <div className={`h-[2px] transition-all duration-700 ${
              index === current ? 'w-20 bg-red-600' : 'w-4 bg-white/20'
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
