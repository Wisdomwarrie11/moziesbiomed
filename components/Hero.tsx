
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
    <div className="relative h-[600px] md:h-[700px] lg:h-[800px] w-full overflow-hidden bg-black">
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === current ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
        >
          {/* Red/Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-red-950/80 via-black/50 to-transparent z-10" />
          
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 z-20 flex items-center px-6 sm:px-12 lg:px-24">
            <div className={`max-w-4xl transition-all duration-1000 delay-300 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="inline-block px-5 py-2.5 bg-red-600/20 backdrop-blur-sm rounded-full text-red-400 text-xs font-black tracking-[0.3em] uppercase mb-8 border border-red-500/20">
                Mozies Engineering Excellence
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
                {slide.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 !== 0 ? 'text-red-600 block sm:inline' : 'block sm:inline mr-4'}>{word}</span>
                ))}
              </h1>
              <p className="text-lg md:text-2xl text-gray-200 mb-12 max-w-xl font-medium leading-relaxed opacity-90">
                {slide.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/products" className="bg-red-600 text-white px-10 py-5 rounded-[20px] font-black text-lg hover:scale-105 hover:bg-red-700 transition-all shadow-2xl shadow-red-900/40 text-center uppercase tracking-wider">
                  Browse Products
                </Link>
                <Link to="/services" className="bg-white/10 text-white backdrop-blur-md border-2 border-white/20 px-10 py-5 rounded-[20px] font-black text-lg hover:bg-white/20 hover:border-white transition-all text-center uppercase tracking-wider">
                  Our Expertise
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators - Custom Shape */}
      <div className="absolute bottom-12 right-6 lg:right-24 z-30 flex items-center space-x-6">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className="group flex items-center gap-3"
          >
            <span className={`text-[12px] font-black tracking-widest transition-all ${index === current ? 'text-red-500 scale-125' : 'text-white/40 group-hover:text-white'}`}>
              0{index + 1}
            </span>
            <div className={`h-[2px] rounded-full transition-all duration-700 ${
              index === current ? 'w-16 bg-red-500' : 'w-4 bg-white/20'
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
