
import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { db } from '../firebase';
import { collection, getDocs, limit, query, onSnapshot } from 'firebase/firestore';
import { WHY_CHOOSE_US, WHO_SERVICES_FOR } from '../constants';
import { Link } from 'react-router-dom';
import { Product, CategoryItem } from '../types';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time synchronization for a "Live" command center feel
    const unsubCats = onSnapshot(collection(db, 'categories'), (snapshot) => {
      setCategories(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CategoryItem)));
    });

    const unsubProds = onSnapshot(query(collection(db, 'products'), limit(3)), (snapshot) => {
      setFeaturedProducts(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Product)));
      setLoading(false);
    });

    return () => { unsubCats(); unsubProds(); };
  }, []);

  return (
    <div className="overflow-x-hidden bg-white selection:bg-red-100 selection:text-red-600">
      <Hero />
      
      {/* Category Fast-Track: Clinical Pillars */}
    

      {/* Authority Section: Engineering Excellence */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white transform hover:rotate-2 transition-transform duration-500">
                    <img src="CT.jpeg" alt="Tech" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-red-600 p-10 rounded-[40px] text-white shadow-xl shadow-red-900/20">
                    <div className="text-5xl font-black mb-2 tracking-tighter">15+</div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Years Engineering Mastery</div>
                  </div>
                </div>
                <div className="pt-12 space-y-6">
                  <div className="bg-gray-900 p-10 rounded-[40px] text-white">
                    <div className="text-3xl font-black mb-2 tracking-tighter">100+</div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Clinical Projects</div>
                  </div>
                  <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white transform hover:-rotate-2 transition-transform duration-500">
                    <img src="Endo.jpeg" alt="Tech" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              {/* Decorative HUD Elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 border-t-4 border-l-4 border-red-600 rounded-tl-[60px] opacity-20"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border-b-4 border-r-4 border-gray-900 rounded-br-[60px] opacity-20"></div>
            </div>
            
            <div className="space-y-10">
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] uppercase">
                Redefining <span className="text-red-600">Clinical</span> Performance
              </h2>
              <div className="space-y-6">
                <p className="text-xl text-gray-600 font-medium leading-relaxed">
                  Moziesbiomed stands at the intersection of medical science and technical mastery. We don't just supply equipment; we architect healthcare efficiency.
                </p>
                <div className="grid grid-cols-2 gap-10 pt-4">
                  <div>
                    <h4 className="font-black text-gray-900 uppercase tracking-tight text-lg mb-2">Sustainable Design</h4>
                    <p className="text-sm text-gray-500 font-medium">Holistic approaches that maximize economic operational life.</p>
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 uppercase tracking-tight text-lg mb-2">Expert Synergy</h4>
                    <p className="text-sm text-gray-500 font-medium">Multidisciplinary teams tackling high-complexity facility builds.</p>
                  </div>
                </div>
              </div>
              <div className="pt-8">
                <Link to="/about" className="bg-gray-900 text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-red-600 transition-all shadow-2xl shadow-gray-900/20 inline-block">
                  Our Mission
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Inventory: Precision Hardware */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 text-gray-100 font-black text-[20vw] leading-none select-none pointer-events-none uppercase tracking-tighter">
          TECH
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">
                Clinical <span className="text-red-600">Store</span>
              </h2>
              <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px]">Direct Access to Mission-Critical Inventory</p>
            </div>
            <Link to="/products" className="group flex items-center gap-4 text-red-600 font-black text-xs uppercase tracking-[0.3em]">
              View Full catalog
              <span className="w-10 h-10 rounded-full border-2 border-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </span>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts.length > 0 ? featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-[50px] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 group flex flex-col h-full">
                <div className="aspect-[4/3] rounded-[35px] overflow-hidden mb-8 relative bg-gray-50 shadow-inner">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-red-600/90 backdrop-blur-md text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                      {categories.find(c => c.id === product.categoryId)?.name || 'New Batch'}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">{product.name}</h3>
                <p className="text-red-600 text-xs font-black uppercase tracking-[0.2em] mb-4">{product.price || 'Quote Required'}</p>
                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 flex-grow line-clamp-3">
                  {product.description}
                </p>
                <Link to="/contact" className="w-full bg-gray-100 text-gray-900 py-5 rounded-[22px] font-black text-[10px] uppercase tracking-[0.2em] group-hover:bg-red-600 group-hover:text-white transition-all">
                  Inquire Now
                </Link>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center">
                <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 animate-spin rounded-full mx-auto mb-6"></div>
                <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Awaiting Inventory Dispatch...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Spectrum: Diversity in Support */}
      <section className="py-30 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-16 rounded-[60px] text-white space-y-8 md:col-span-2 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>
               <div className="relative z-10">
                 <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Service Cluster 01</span>
                 <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">Engineering <br/><span className="text-red-600">& Consultancy</span></h3>
                 <p className="text-gray-400 text-lg font-medium max-w-xl mb-10 leading-relaxed">
                   Strategic advisory services for clinical upgrades, radiation safety, and regulatory compliance. We architect the future of your facility.
                 </p>
                 <Link to="/services" className="inline-flex items-center gap-4 text-white font-black text-xs uppercase tracking-[0.3em] group-hover:text-red-600 transition-colors">
                    Explore Services Matrix
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                 </Link>
               </div>
            </div>
            <div className="bg-red-600 p-16 rounded-[60px] text-white space-y-8 group hover:bg-red-700 transition-colors duration-500">
               <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Service Cluster 02</span>
               <h3 className="text-4xl font-black uppercase tracking-tighter mb-6 leading-none">Project <br/>Management</h3>
               <p className="text-white/80 text-sm font-bold uppercase tracking-widest leading-relaxed">
                 Turnkey facility setup from design to clinical operation.
               </p>
               <div className="pt-4">
                 <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                   <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Impact CTA */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-gray-950 rounded-[60px] p-12 md:p-32 text-center relative overflow-hidden shadow-3xl shadow-red-900/10">
          {/* Animated Background Pulse */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15),transparent_70%)] animate-pulse"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-12">
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
              Initialize Your <br/><span className="text-red-600 underline decoration-red-900/50 decoration-8 underline-offset-8 italic">Clinical Strategy</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-bold uppercase tracking-[0.2em] max-w-2xl mx-auto">
              Ready to implement world-class biomedical solutions in your facility?
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link to="/contact" className="bg-red-600 text-white px-16 py-7 rounded-[28px] font-black text-xl hover:scale-105 hover:bg-red-700 transition-all shadow-2xl shadow-red-900/40 uppercase tracking-widest">
                Start Consultation
              </Link>
              <Link to="/gallery" className="text-white font-black text-xs uppercase tracking-[0.4em] hover:text-red-600 transition-colors border-b-2 border-white/10 hover:border-red-600 pb-2">
                Review Project History
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
