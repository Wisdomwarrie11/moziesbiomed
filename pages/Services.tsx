import React, { useState, useEffect } from 'react';
import { SERVICES_CONTENT } from '../constants';

const EngineeringIcon = ({ index }: { index: number }) => {
  const icons = [
    // Biomedical Services Icon
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>,
    // Project Management Icon
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <line x1="3" y1="9" x2="21" y2="9"/>
      <line x1="9" y1="21" x2="9" y2="9"/>
    </svg>,
    // Engineering Consultancy Icon
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ];
  return icons[index] || icons[0];
};

const Services: React.FC = () => {
  return (
    <div className="bg-white overflow-hidden pb-20">
      {/* Services Header */}
      <section className="bg-gray-950 py-32 md:py-48 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1),transparent_70%)]"></div>
        <div className="relative z-10">
          <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Our Expertise</span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 uppercase tracking-tighter">Biomedical <span className="text-red-600">Pillars</span></h1>
          <p className="max-w-2xl mx-auto text-gray-400 font-bold uppercase tracking-widest text-sm">Strategic engineering and technological orchestration for modern healthcare.</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {SERVICES_CONTENT.map((service, idx) => (
              <div key={idx} className="flex flex-col bg-gray-50 rounded-[60px] p-12 border border-gray-100 hover:bg-white hover:shadow-[0_50px_100px_-20px_rgba(220,38,38,0.15)] transition-all duration-500 group">
                <div className="w-20 h-20 bg-red-600 text-white rounded-[28px] flex items-center justify-center mb-10 shadow-xl shadow-red-900/20 group-hover:rotate-6 transition-transform">
                  <EngineeringIcon index={idx} />
                </div>
                
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-6 group-hover:text-red-600 transition-colors">
                  {service.category}
                </h2>
                
                <p className="text-gray-500 font-medium leading-relaxed mb-10 flex-grow">
                  {service.description}
                </p>

                <div className="space-y-8 mb-12">
                  {service.subsections.map((sub, sIdx) => (
                    <div key={sIdx} className="space-y-4">
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{sub.title}</h3>
                      <ul className="space-y-2">
                        {sub.items.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-center gap-3 text-[11px] font-black text-gray-900 uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-gray-900 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all">
                  Consult Experts
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Stats */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-red-600 rounded-[60px] py-20 px-12 md:px-24 flex flex-col md:flex-row justify-between items-center gap-12 shadow-2xl shadow-red-900/30">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">Precision Engineering</h2>
            <p className="text-white/80 font-bold uppercase tracking-widest text-xs">Certified compliance across all facility setups.</p>
          </div>
          <div className="flex gap-12 flex-wrap justify-center">
            <div className="text-center">
              <div className="text-4xl font-black text-white">99%</div>
              <div className="text-white/60 text-[9px] font-black uppercase tracking-widest mt-2">Up-Time Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-white">24/7</div>
              <div className="text-white/60 text-[9px] font-black uppercase tracking-widest mt-2">Technical Response</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-white">ISO</div>
              <div className="text-white/60 text-[9px] font-black uppercase tracking-widest mt-2">Standard Protocol</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;