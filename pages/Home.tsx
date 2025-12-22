
import React from 'react';
import Hero from '../components/Hero';
import { SERVICES, INITIAL_PRODUCTS, WHY_CHOOSE_US, WHO_SERVICES_FOR } from '../constants';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      
      {/* About Us Snippet - Organic Shape */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-[50px] overflow-hidden shadow-2xl z-10 relative border-8 border-gray-50">
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800" 
                  alt="Biomedical Team in Nigeria" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Blobs */}
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-red-100/50 rounded-full blur-3xl -z-10"></div>
              <div className="absolute top-1/4 -right-12 w-32 h-32 bg-gray-100 rounded-[30%] -z-10 rotate-45"></div>
              
              <div className="absolute -bottom-6 -right-6 bg-red-600 p-8 rounded-[30px] shadow-2xl z-20 hidden md:block border-4 border-white">
                <div className="text-white text-4xl font-black mb-1">15+</div>
                <div className="text-red-100 text-xs font-black uppercase tracking-widest">Years Experience</div>
              </div>
            </div>
            
            <div className="space-y-8 order-1 lg:order-2">
              <div className="inline-block px-5 py-2 bg-red-50 rounded-full text-red-600 text-xs font-black tracking-[0.2em] uppercase">
                The Mozies Story
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                Precision In <span className="text-red-600 underline decoration-red-200 decoration-8 underline-offset-8">Biomedical</span> Engineering
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We are a leading Biomedical and clinical engineering solution firm in Nigeria. With extensive experience, we provide high-quality engineering solutions to diverse healthcare facilities nationwide.
              </p>
              <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-[30px] border border-gray-100">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shrink-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.45l8.15 14.1H3.85L12 5.45zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z"/></svg>
                </div>
                <p className="text-sm font-bold text-gray-700 italic">"Our holistic approach ensures high quality and economic operational performance from the outset."</p>
              </div>
              <div className="pt-4">
                <Link to="/about" className="group inline-flex items-center gap-4 bg-gray-900 text-white px-10 py-5 rounded-[20px] font-black transition-all hover:bg-red-600 hover:gap-6 shadow-2xl shadow-gray-900/20">
                  Full Profile
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Red/Grey Contrast */}
      <section className="py-24 md:py-32 bg-red-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-500 rounded-full -translate-y-1/2 translate-x-1/4 blur-[120px] opacity-40"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-red-200 text-sm font-black uppercase tracking-[0.3em] mb-4">Our Advantage</h2>
            <p className="text-4xl md:text-5xl font-black leading-tight">
              Excellence Built on Trust and Expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div key={idx} className="p-12 rounded-[40px] bg-white/10 border border-white/10 hover:bg-white text-white hover:text-red-600 transition-all duration-500 group shadow-xl">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white text-red-600 transition-colors shadow-lg">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{item.title}</h3>
                <p className="text-red-50 group-hover:text-gray-600 leading-relaxed font-medium">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Services For - Modern Grid */}
      <section className="py-24 md:py-32 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-red-600 text-sm font-black uppercase tracking-[0.3em] mb-4">Serving Healthcare</h2>
              <p className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Strategic Partnerships for <span className="text-gray-500">Every Facility</span>
              </p>
            </div>
            <Link to="/contact" className="group bg-gray-900 text-white px-8 py-4 rounded-full font-black text-sm hover:bg-red-600 transition-all flex items-center gap-3">
              Become a Partner
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {WHO_SERVICES_FOR.map((item, idx) => (
              <div key={idx} className="group relative rounded-[45px] overflow-hidden h-[550px] shadow-xl hover:shadow-2xl transition-all duration-700">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-10 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl font-black text-white mb-4 uppercase">{item.title}</h3>
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-medium">
                    {item.description}
                  </p>
                  <div className="mt-8 w-12 h-1 bg-red-600 rounded-full group-hover:w-24 transition-all"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Red Accents */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-gray-400 text-sm font-black uppercase tracking-[0.4em] mb-4">Equipment Catalog</h2>
            <p className="text-4xl md:text-5xl font-black text-gray-900">Featured <span className="text-red-600">Inventory</span></p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {INITIAL_PRODUCTS.map((product) => (
               <div key={product.id} className="bg-white rounded-[40px] p-6 shadow-sm group border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className="aspect-square rounded-[35px] overflow-hidden mb-8 bg-gray-50 relative">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-5 right-5 bg-red-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {product.category}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium line-clamp-2">{product.description}</p>
                  <Link to="/products" className="flex items-center justify-center gap-3 w-full py-5 bg-gray-100 text-gray-900 rounded-[22px] font-black text-[13px] hover:bg-red-600 hover:text-white transition-all shadow-lg hover:shadow-red-900/20 uppercase tracking-widest">
                    Request Details
                  </Link>
               </div>
            ))}
          </div>
          <div className="text-center mt-24">
             <Link to="/products" className="inline-flex items-center gap-4 text-gray-900 font-black text-xl hover:text-red-600 transition-colors uppercase tracking-widest border-b-4 border-gray-100 hover:border-red-600 pb-2">
               Full Equipment Store
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
             </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Bold Red */}
      <section className="py-32 bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600 rounded-full opacity-20 blur-[150px]"></div>
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600 rounded-full opacity-10 blur-[100px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-10 leading-tight tracking-tight uppercase">
            Elevate Your <span className="text-red-600">Clinical</span> Performance
          </h2>
          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto font-bold opacity-80">
            Partner with Moziesbiomed for precision engineering and sustainable clinical outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/contact" className="bg-red-600 text-white px-12 py-6 rounded-[24px] font-black text-lg hover:scale-105 hover:bg-red-700 hover:shadow-2xl transition-all shadow-xl shadow-red-900/40 uppercase tracking-widest">
              Consult an Engineer
            </Link>
            <Link to="/about" className="bg-transparent text-white border-2 border-white/20 px-12 py-6 rounded-[24px] font-black text-lg hover:bg-white/10 transition-all uppercase tracking-widest">
              Our Journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
