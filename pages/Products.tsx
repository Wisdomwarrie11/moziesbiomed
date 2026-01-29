import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Product, CategoryItem } from '../types';
import { useLocation } from 'react-router-dom';

interface SelectedProduct extends Product {
  quantity: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubCats = onSnapshot(collection(db, 'categories'), (snapshot) => {
      setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CategoryItem)));
    });

    const unsubProds = onSnapshot(collection(db, 'products'), (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
      setLoading(false);
    });

    return () => { unsubCats(); unsubProds(); };
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const catId = queryParams.get('category');
    setSelectedCat(catId);
  }, [location.search]);

  const filtered = products.filter(p => !selectedCat || p.categoryId === selectedCat);

  const addToQuote = (product: Product) => {
    setSelectedProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsModalOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setSelectedProducts(prev => prev.map(p => {
      if (p.id === id) {
        const newQty = Math.max(1, p.quantity + delta);
        return { ...p, quantity: newQty };
      }
      return p;
    }));
  };

  const removeItem = (id: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== id));
  };

  const sendConsolidatedQuote = () => {
    const adminNumber = "2348138969404"; // Admin WhatsApp Number
    let message = "Hello, I am interested in a technical quote for the following biomedical solutions:\n\n";
    
    selectedProducts.forEach((p, idx) => {
      message += `${idx + 1}. ${p.name} (Quantity: ${p.quantity})\n`;
    });
    
    message += `\nTotal Items: ${selectedProducts.reduce((acc, curr) => acc + curr.quantity, 0)}\n`;
    message += "Please provide pricing and deployment lead times.";
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${adminNumber}?text=${encodedMessage}`, '_blank');
    setIsModalOpen(false);
  };

  if (loading) return (
    <div className="py-40 text-center">
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent animate-spin rounded-full mx-auto mb-6"></div>
      <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-xs">Accessing Engineering Portfolio...</p>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-32 relative">
      <div className="bg-white border-b border-gray-100 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-5 py-2 bg-red-50 rounded-full text-red-600 text-[10px] font-black tracking-[0.4em] uppercase mb-6">Hardware Portfolio</span>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 uppercase tracking-tighter">Biomedical <span className="text-red-600">Solutions</span></h1>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setSelectedCat(null)} 
              className={`px-8 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${!selectedCat ? 'bg-red-600 text-white shadow-2xl shadow-red-900/30' : 'bg-white border border-gray-200 text-gray-500 hover:border-red-600'}`}
            >
              All Hardware
            </button>
            {categories.map(c => (
              <button 
                key={c.id} 
                onClick={() => setSelectedCat(c.id)} 
                className={`px-8 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${selectedCat === c.id ? 'bg-red-600 text-white shadow-2xl shadow-red-900/30' : 'bg-white border border-gray-200 text-gray-500 hover:border-red-600'}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filtered.map(product => (
              <div key={product.id} className="bg-white rounded-[60px] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full">
                <div className="aspect-[4/3] rounded-[40px] overflow-hidden mb-8 relative bg-gray-50 shadow-inner">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-red-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                      {categories.find(c => c.id === product.categoryId)?.name || 'Biomedical'}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">{product.name}</h3>
                <p className="text-red-600 text-sm font-black uppercase tracking-[0.2em] mb-4">
                  {product.price || 'Quote Available'}
                </p>
                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 flex-grow">
                  {product.description}
                </p>
                
                {product.specifications && product.specifications.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {product.specifications.map((s, i) => (
                      <span key={i} className="text-[9px] font-black uppercase tracking-wider text-gray-400 border border-gray-100 px-3 py-1.5 rounded-xl bg-gray-50">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
                <button 
                  onClick={() => addToQuote(product)}
                  className="w-full bg-gray-900 text-white py-5 rounded-[22px] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-red-600 transition-all shadow-xl hover:shadow-red-900/20"
                >
                  Add to Quote List
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40">
            <h2 className="text-2xl font-black text-gray-300 uppercase tracking-tighter italic">Portfolio Syncing</h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-4">Consult our engineering team for custom deployments.</p>
          </div>
        )}
      </div>

      {/* Floating Quote Trigger */}
      {selectedProducts.length > 0 && !isModalOpen && (
        <button 
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-10 right-10 bg-red-600 text-white p-6 rounded-full shadow-2xl shadow-red-900/40 animate-bounce z-40 flex items-center gap-4 hover:scale-110 transition-all"
        >
          <div className="bg-white text-red-600 w-8 h-8 rounded-full flex items-center justify-center font-black text-xs">
            {selectedProducts.reduce((acc, curr) => acc + curr.quantity, 0)}
          </div>
          <span className="font-black text-[10px] uppercase tracking-widest pr-4">View Quote List</span>
        </button>
      )}

      {/* Quote Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-[60px] relative z-[110] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="bg-gray-50 p-10 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Technical <span className="text-red-600">Quote</span></h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Review your engineering selections</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-600 transition-colors shadow-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-10 space-y-6">
              {selectedProducts.length > 0 ? (
                selectedProducts.map((p) => (
                  <div key={p.id} className="flex items-center gap-6 p-6 bg-gray-50 rounded-[35px] border border-gray-100 group">
                    <img src={p.imageUrl} className="w-20 h-20 rounded-2xl object-cover shadow-sm" alt="" />
                    <div className="flex-grow">
                      <h4 className="font-black text-gray-900 uppercase text-sm tracking-tight">{p.name}</h4>
                      <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mt-1">{p.price || 'Pending Quote'}</p>
                    </div>
                    <div className="flex items-center bg-white rounded-2xl p-2 gap-4 shadow-sm">
                      <button onClick={() => updateQuantity(p.id, -1)} className="w-8 h-8 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center font-black">-</button>
                      <span className="font-black text-sm w-4 text-center">{p.quantity}</span>
                      <button onClick={() => updateQuantity(p.id, 1)} className="w-8 h-8 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center font-black">+</button>
                    </div>
                    <button onClick={() => removeItem(p.id)} className="p-3 text-gray-300 hover:text-red-600 transition-colors">
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                  <p className="text-gray-400 font-black text-xs uppercase tracking-widest">Your quote list is empty.</p>
                </div>
              )}
            </div>

            <div className="p-10 bg-white border-t border-gray-100 flex flex-col gap-4">
               <button 
                 disabled={selectedProducts.length === 0}
                 onClick={sendConsolidatedQuote}
                 className={`w-full bg-red-600 text-white py-6 rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-red-900/30 hover:bg-red-700 transition-all flex items-center justify-center gap-4 ${selectedProducts.length === 0 ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
               >
                 Finalize Engineering Request
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793 0-.852.448-1.271.607-1.445.16-.173.348-.217.464-.217.115 0 .231.001.332.005.109.004.258-.041.404.311.145.352.492 1.203.536 1.289.044.087.073.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.101-.177.211-.077.385.101.174.445.733.955 1.187.657.585 1.21.766 1.383.853.174.087.275.072.376-.044.101-.116.434-.506.549-.68.116-.174.232-.145.391-.087.159.058 1.013.477 1.187.564.174.087.289.13.332.203.045.072.045.419-.1.824z"/>
                 </svg>
               </button>
               <button 
                 onClick={() => setIsModalOpen(false)}
                 className="w-full bg-gray-100 text-gray-500 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all"
               >
                 Add More Products
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;