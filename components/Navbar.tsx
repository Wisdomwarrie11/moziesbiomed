import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { CategoryItem } from '../types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const location = useLocation();

  useEffect(() => {
    // Real-time listener for categories so the navbar updates instantly
    const unsub = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CategoryItem));
      setCategories(cats);
    });
    return () => unsub();
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Products', 
      path: '/products',
      dropdown: categories.map(cat => ({
        name: cat.name,
        path: `/products?category=${cat.id}`
      }))
    },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Admin', path: '/admin' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-2 group shrink-0">
            <div className="bg-red-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-red-200">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM18 13H15V19H13V13H11V19H9V13H6V11H9V5H11V11H13V5H15V11H18V13Z" fill="currentColor"/>
               </svg>
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase">
              <span className="text-red-600">MOZIES</span>
              <span className="text-gray-500">BIOMED</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group px-1">
                <Link
                  to={link.path}
                  className={`px-4 py-8 text-[13px] font-black transition-all duration-200 flex items-center gap-1.5 uppercase tracking-wider ${
                    isActive(link.path) ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  {link.name}
                  {link.dropdown && link.dropdown.length > 0 && (
                    <svg className="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                  )}
                </Link>
                {link.dropdown && link.dropdown.length > 0 && (
                  <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-64 bg-white shadow-2xl rounded-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-[60] p-3">
                    <div className="space-y-1">
                      {link.dropdown.map((item, idx) => (
                        <Link key={idx} to={item.path} className="block px-4 py-2.5 text-xs font-black text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors uppercase tracking-widest">{item.name}</Link>
                      ))}
                    </div>
                  </div>
                )}
                {isActive(link.path) && <div className="absolute bottom-6 left-4 right-4 h-1 bg-red-600 rounded-full"></div>}
              </div>
            ))}
            <div className="pl-4">
              <Link to="/contact" className="bg-red-600 text-white px-8 py-3.5 rounded-2xl text-[11px] font-black hover:bg-red-700 transition-all shadow-xl shadow-red-900/20 uppercase tracking-widest">Contact Now</Link>
            </div>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-3 text-gray-600 hover:bg-gray-50 rounded-2xl transition-colors">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-in fade-in slide-in-from-top-4 overflow-hidden">
          <div className="px-6 pt-6 pb-12 space-y-4 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.path} className="space-y-2">
                <Link to={link.path} onClick={() => setIsOpen(false)} className={`block px-5 py-4 rounded-2xl text-lg font-black uppercase ${isActive(link.path) ? 'bg-red-50 text-red-600' : 'text-gray-900 hover:bg-gray-50 hover:text-red-600'}`}>{link.name}</Link>
                {link.dropdown && (
                  <div className="pl-8 space-y-1">
                    {link.dropdown.map((item, idx) => (
                      <Link key={idx} to={item.path} onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm font-bold text-gray-500 hover:text-red-600 uppercase">{item.name}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;