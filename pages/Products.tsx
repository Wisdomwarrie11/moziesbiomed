
import React, { useState } from 'react';
import { INITIAL_PRODUCTS } from '../constants';
import { Category } from '../types';

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory 
    ? INITIAL_PRODUCTS.filter(p => p.category === selectedCategory)
    : INITIAL_PRODUCTS;

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Banner */}
      <div className="bg-white border-b border-gray-100 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="inline-block px-5 py-2 bg-red-50 rounded-full text-red-600 text-xs font-black tracking-[0.2em] uppercase mb-6">
              Equipment Store
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Precision <span className="text-red-600">Inventory</span></h1>
          </div>
          
          {/* Categories - Organic Chips */}
          <div className="flex flex-wrap gap-3 mt-12">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`px-8 py-3.5 rounded-2xl text-[12px] font-black transition-all uppercase tracking-widest ${!selectedCategory ? 'bg-red-600 text-white shadow-xl shadow-red-900/20' : 'bg-white border border-gray-200 text-gray-600 hover:border-red-600'}`}
            >
              All Equipment
            </button>
            {Object.values(Category).map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-3.5 rounded-2xl text-[12px] font-black transition-all uppercase tracking-widest ${selectedCategory === cat ? 'bg-red-600 text-white shadow-xl shadow-red-900/20' : 'bg-white border border-gray-200 text-gray-600 hover:border-red-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-[45px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full border border-gray-100">
              <div className="aspect-[4/3] relative overflow-hidden bg-gray-50">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">
                  {product.category}
                </div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-red-600 transition-colors uppercase tracking-tight">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-8 flex-grow leading-relaxed font-medium">
                  {product.description}
                </p>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {product.specifications.slice(0, 3).map((spec, i) => (
                      <span key={i} className="text-[10px] bg-gray-50 text-gray-600 font-black border border-gray-100 px-3 py-1 rounded-lg uppercase tracking-wider">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <button className="w-full bg-gray-900 text-white font-black py-5 rounded-[22px] hover:bg-red-600 transition-all text-xs border border-gray-800 uppercase tracking-[0.2em] shadow-xl hover:shadow-red-900/20">
                    Request Pricing
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
