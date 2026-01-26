
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Product, CategoryItem, SubcategoryItem } from '../types';
import { useLocation } from 'react-router-dom';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [subcategories, setSubcategories] = useState<SubcategoryItem[]>([]);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catSnap = await getDocs(collection(db, 'categories'));
        const subSnap = await getDocs(collection(db, 'subcategories'));
        const prodSnap = await getDocs(collection(db, 'products'));

        setCategories(catSnap.docs.map(d => ({ id: d.id, ...d.data() } as CategoryItem)));
        setSubcategories(subSnap.docs.map(d => ({ id: d.id, ...d.data() } as SubcategoryItem)));
        setProducts(prodSnap.docs.map(d => ({ id: d.id, ...d.data() } as Product)));
      } catch (err) {
        console.error("Firestore Fetch Error: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const queryParams = new URLSearchParams(location.search);
    const catId = queryParams.get('category');
    if (catId) setSelectedCat(catId);
  }, [location.search]);

  const filtered = selectedCat ? products.filter(p => p.categoryId === selectedCat) : products;

  if (loading) return (
    <div className="py-40 text-center">
      <div className="w-10 h-10 border-4 border-red-600 border-t-transparent animate-spin rounded-full mx-auto mb-4"></div>
      <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Accessing Database...</p>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-12">
            <div className="inline-block px-5 py-2 bg-red-50 rounded-full text-red-600 text-[10px] font-black tracking-[0.4em] uppercase mb-6">Equipment Catalog</div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 uppercase tracking-tighter">Precision <span className="text-red-600">Inventory</span></h1>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setSelectedCat(null)} 
              className={`px-10 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${!selectedCat ? 'bg-red-600 text-white shadow-2xl shadow-red-900/30' : 'bg-white border border-gray-200 text-gray-500 hover:border-red-600'}`}
            >
              All Store
            </button>
            {categories.map(c => (
              <button 
                key={c.id} 
                onClick={() => setSelectedCat(c.id)} 
                className={`px-10 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${selectedCat === c.id ? 'bg-red-600 text-white shadow-2xl shadow-red-900/30' : 'bg-white border border-gray-200 text-gray-500 hover:border-red-600'}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filtered.map(product => {
            const catName = categories.find(c => c.id === product.categoryId)?.name;
            const subName = subcategories.find(s => s.id === product.subcategoryId)?.name;
            
            return (
              <div key={product.id} className="bg-white rounded-[60px] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full">
                <div className="aspect-[4/3] rounded-[40px] overflow-hidden mb-8 relative">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className="bg-red-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                      {catName}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">{product.name}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 flex-grow">{product.description}</p>
                
                <div className="space-y-6">
                  {product.specifications?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {product.specifications.map((s, i) => (
                        <span key={i} className="text-[9px] font-black uppercase tracking-wider text-gray-400 border border-gray-100 px-3 py-1 rounded-lg bg-gray-50">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                  <button className="w-full bg-gray-900 text-white py-5 rounded-[22px] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-red-600 transition-all shadow-xl hover:shadow-red-900/20">
                    Request Quotation
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
