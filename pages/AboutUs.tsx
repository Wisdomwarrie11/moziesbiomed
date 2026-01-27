import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-red-600 py-32 md:py-48 px-6 text-center relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">Why we are Here</h1>
          <div className="w-24 h-2 bg-white mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-20 lg:gap-32 items-center">
          <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
            <h2 className="font-black text-gray-900 text-3xl md:text-4xl uppercase tracking-tighter leading-tight">
              World-class <span className="text-red-600">Biomedical Engineering</span> Firm in Nigeria
            </h2>
            <p className="font-bold text-gray-500 italic border-l-4 border-red-600 pl-6">
              With extensive experience in providing high-quality biomedical solutions to major health facilities nationwide.
            </p>
            <p className="font-medium text-gray-600">
              We are recognized for our creative, sustainable, and holistic approach. We strive to deliver visionary biomedical engineering solutions that maximize the operational lifecycle of critical healthcare equipment.
            </p>
            <p className="font-medium text-gray-600">
              We help clients reach the optimum potential of every facility build by combining creativity, expertise, and decades of engineering experience.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(220,38,38,0.25)] border-[12px] border-gray-50">
              <img 
                src = "CT.jpeg" 
                alt="Biomedical Engineering Team" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-red-100 rounded-full -z-10 blur-3xl opacity-50"></div>
          </div>
        </div>

        {/* Vision Stats */}
        <div className="mt-32 md:mt-48 bg-gray-900 rounded-[60px] p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full opacity-10 blur-[100px]"></div>
          <div className="max-w-4xl relative z-10">
            <h2 className="text-white text-4xl md:text-5xl font-black mb-10 tracking-tight uppercase">
              OUR <span className="text-red-600">CORE</span>
            </h2>
            <div className="space-y-8 text-gray-400 leading-relaxed text-xl font-medium">
              <p>
                As a leader in medical equipment supply and biomedical maintenance services, we offer comprehensive facility solutions using modern diagnostic techniques.
              </p>
              <p>
                Our engineering culture and long history in the sector inspire us to innovate for a brighter healthcare future in Africa.
              </p>
              
              <div className="pt-16 grid grid-cols-2 lg:grid-cols-4 gap-12">
                <div className="group">
                  <div className="text-4xl md:text-5xl font-black text-red-600 mb-2 group-hover:scale-110 transition-transform origin-left">500+</div>
                  <div className="text-xs text-gray-500 font-black uppercase tracking-[0.2em]">Deployments</div>
                </div>
                <div className="group">
                  <div className="text-4xl md:text-5xl font-black text-red-600 mb-2 group-hover:scale-110 transition-transform origin-left">150+</div>
                  <div className="text-xs text-gray-500 font-black uppercase tracking-[0.2em]">Retainer Clients</div>
                </div>
                <div className="group">
                  <div className="text-4xl md:text-5xl font-black text-red-600 mb-2 group-hover:scale-110 transition-transform origin-left">50+</div>
                  <div className="text-xs text-gray-500 font-black uppercase tracking-[0.2em]">Certified Engineers</div>
                </div>
                <div className="group">
                  <div className="text-4xl md:text-5xl font-black text-red-600 mb-2 group-hover:scale-110 transition-transform origin-left">24/7</div>
                  <div className="text-xs text-gray-500 font-black uppercase tracking-[0.2em]">Critical Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;