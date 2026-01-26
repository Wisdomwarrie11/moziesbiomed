import React, { useState, useEffect } from 'react';
import { SERVICES_CONTENT } from '../constants';

const Services: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SERVICES_CONTENT.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white overflow-hidden pb-20">
      {/* Services Hero Carousel */}
      <section className="relative h-[550px] md:h-[650px] bg-black">
        {SERVICES_CONTENT.map((service, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 via-black/40 to-transparent z-10"></div>
            <img src={service.image} className="w-full h-full object-cover" alt={service.category} />
            <div className="absolute inset-0 z-20 flex items-center px-6 md:px-24 max-w-7xl mx-auto">
              <div className={`max-w-2xl transition-all duration-1000 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="inline-block px-5 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-8 shadow-xl shadow-red-900/40">Expertise Area 0{index + 1}</div>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter leading-none">{service.category}</h1>
                <p className="text-lg md:text-2xl text-gray-300 font-medium leading-relaxed mb-12 opacity-90 border-l-4 border-red-600 pl-8">
                  {service.description}
                </p>
                <button className="bg-white text-gray-900 px-10 py-5 rounded-[22px] font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                  {service.cta || 'Get In Touch'}
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-12 right-6 md:right-24 z-30 flex gap-4">
          {SERVICES_CONTENT.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentSlide(idx)} className={`h-2 rounded-full transition-all ${idx === currentSlide ? 'w-16 bg-red-600' : 'w-4 bg-white/20 hover:bg-white/40'}`} />
          ))}
        </div>
      </section>

      {/* Services Detail Sections */}
      <section className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-40">
          {SERVICES_CONTENT.map((service, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-20 lg:gap-32 items-center`}>
              <div className="w-full lg:w-1/2 space-y-12">
                <div>
                  <span className="text-red-600 block text-[10px] font-black tracking-[0.5em] mb-4 uppercase">Clinical Engineering Pillar</span>
                  <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                    {service.category}
                  </h2>
                </div>
                
                <div className="grid sm:grid-cols-1 gap-10">
                  {service.subsections.map((sub, sIdx) => (
                    <div key={sIdx} className="bg-gray-50 p-10 rounded-[50px] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-red-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-red-200">
                          {sIdx + 1}
                        </div>
                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight group-hover:text-red-600 transition-colors">{sub.title}</h3>
                      </div>
                      <ul className="grid sm:grid-cols-2 gap-4">
                        {sub.items.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-3 text-xs text-gray-500 font-bold uppercase tracking-wider leading-relaxed">
                            <span className="w-2 h-2 bg-red-600 rounded-full shrink-0 mt-1"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <button className="bg-gray-900 text-white px-12 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:bg-red-600 transition-all shadow-xl hover:shadow-red-900/20">
                    {service.cta}
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-1/2 relative">
                <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl relative z-10 border-8 border-gray-50">
                   <img src={service.image} alt={service.category} className="w-full h-full object-cover" />
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-red-100 rounded-full blur-[100px] opacity-60 -z-10"></div>
                <div className="absolute top-1/2 -left-12 w-32 h-32 bg-gray-100 rounded-[30%] -z-10 rotate-12 opacity-50"></div>
                <div className="absolute -top-6 -right-6 bg-red-600/10 w-24 h-24 rounded-full -z-10"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Leadling Specific */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-gray-900 rounded-[60px] py-24 md:py-32 relative overflow-hidden text-center md:text-left shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
             <svg viewBox="0 0 100 100" className="w-full h-full text-red-600" fill="currentColor"><path d="M0,0 L100,0 L100,100 Z" opacity="0.1"/></svg>
          </div>
          
          <div className="relative z-10 px-8 md:px-24 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter leading-tight">
                Specialized <span className="text-red-600">Leadlining</span> & Safety
              </h2>
              <p className="text-gray-400 text-lg font-medium mb-12 leading-relaxed">
                Protect your staff and patients with our expert radiation shielding solutions. From design to certified installation, we ensure your facility meets all clinical safety regulations.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-red-600 text-white px-12 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all">Request Safety Audit</button>
                <button className="bg-white/10 text-white border border-white/20 px-12 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">Download Portfolio</button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="aspect-square bg-white/5 rounded-[40px] border border-white/10 p-8 flex flex-col justify-center gap-8">
                <div className="space-y-2">
                  <div className="text-red-600 text-4xl font-black">99.9%</div>
                  <div className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Shielding Accuracy</div>
                </div>
                <div className="h-px bg-white/10 w-20"></div>
                <div className="space-y-2">
                  <div className="text-red-600 text-4xl font-black">Certified</div>
                  <div className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Regulatory Compliance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;