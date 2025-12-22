
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Category } from '../types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Products', 
      path: '/products',
      dropdown: Object.values(Category).map(cat => ({ name: cat, path: `/products?category=${cat}` }))
    },
    { 
      name: 'Services', 
      path: '/services',
      dropdown: [
        { name: 'Equipment Maintenance', path: '/services' },
        { name: 'Clinical Consultancy', path: '/services' },
        { name: 'Technical Training', path: '/services' }
      ]
    },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-red-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-200">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM18 13H15V19H13V13H11V19H9V13H6V11H9V5H11V11H13V5H15V11H18V13Z" fill="currentColor"/>
               </svg>
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase">
              <span className="text-red-600">MOZIES</span>
              <span className="text-gray-500">BIOMED</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group px-1">
                <Link
                  to={link.path}
                  className={`px-4 py-8 text-[14px] font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive(link.path)
                      ? 'text-red-600'
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  {link.name}
                  {link.dropdown && (
                    <svg className="w-3.5 h-3.5 opacity-50 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                
                {/* Dropdown Menu */}
                {link.dropdown && (
                  <div className="absolute top-[90%] left-1/2 -translate-x-1/2 w-64 bg-white shadow-2xl rounded-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-[60] p-3">
                    <div className="space-y-1">
                      {link.dropdown.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          className="block px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {isActive(link.path) && (
                  <div className="absolute bottom-6 left-4 right-4 h-1 bg-red-600 rounded-full"></div>
                )}
              </div>
            ))}
            <div className="pl-4">
              <Link to="/products" className="bg-red-600 text-white px-8 py-3.5 rounded-2xl text-[13px] font-black hover:bg-red-700 transition-all shadow-xl shadow-red-900/20 hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-wider">
                Get Quote
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 text-gray-600 hover:bg-gray-50 rounded-2xl transition-colors"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-in fade-in slide-in-from-top-4 overflow-hidden">
          <div className="px-6 pt-6 pb-12 space-y-4 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.path} className="space-y-2">
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-5 py-4 rounded-2xl text-lg font-black ${
                    isActive(link.path)
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-900 hover:bg-gray-50 hover:text-red-600'
                  }`}
                >
                  {link.name}
                </Link>
                {link.dropdown && (
                  <div className="pl-8 space-y-1">
                    {link.dropdown.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-sm font-bold text-gray-500 hover:text-red-600"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/products"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-red-600 text-white px-6 py-5 rounded-2xl font-black mt-8 shadow-xl shadow-red-900/20 uppercase"
            >
              Browse Store
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
