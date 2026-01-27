import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import Admin from './pages/Admin';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-950 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center space-x-2 mb-10">
                <div className="bg-red-600 p-2.5 rounded-xl">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                      <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM18 13H15V19H13V13H11V19H9V13H6V11H9V5H11V11H13V5H15V11H18V13Z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase">
                  <span className="text-red-600">MOZIES</span>
                  <span className="text-white">BIOMED</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-10 font-medium">
                Premier Biomedical Engineering entity in Nigeria. Leading with technical precision in hardware maintenance and strategic healthcare facility architecture.
              </p>
              <div className="flex flex-wrap gap-4">
                {/* Social Icons */}
                <a href="" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-red-600 transition-all text-white" aria-label="Facebook">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.instagram.com/biomedngr?igsh=bTJ4cDgzemlvaDRx" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-red-600 transition-all text-white" aria-label="Instagram">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                {/* <a href="" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-red-600 transition-all text-white" aria-label="LinkedIn">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a> */}
                <a href="https://youtube.com/@biomedngr?si=7WAjBv1YuBrjtJBr" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-red-600 transition-all text-white" aria-label="YouTube">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://x.com/Biomedngr?t=aeJkYP-GB6fl_2A8HrhhGg&s=09" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-red-600 transition-all text-white" aria-label="X (Twitter)">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-red-600 mb-10">Navigation</h4>
              <ul className="space-y-5 text-gray-300 text-[13px] font-bold">
                <li><a href="#/products" className="hover:text-red-600 transition-colors uppercase tracking-widest">Engineering Store</a></li>
                <li><a href="#/services" className="hover:text-red-600 transition-colors uppercase tracking-widest">Our Expertise</a></li>
                <li><a href="#/about" className="hover:text-red-600 transition-colors uppercase tracking-widest">Company Profile</a></li>
                <li><a href="#/gallery" className="hover:text-red-600 transition-colors uppercase tracking-widest">Project History</a></li>
              </ul>
            </div>
            {/* <div>
              <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-red-600 mb-10">Connect</h4>
              <ul className="space-y-5 text-gray-300 text-[13px] font-bold">
                <li className="flex gap-4">
                   <span className="text-red-600">📍</span>
                   Lagos Hub: 123 Biomedical Way, VI
                </li>
                <li className="flex gap-4">
                   <span className="text-red-600">📍</span>
                   Abuja Hub: 45 Tech Square, Garki
                </li>
                <li className="flex gap-4 hover:text-red-600 transition-colors cursor-pointer group">
                   <span className="text-red-600 group-hover:scale-110 transition-transform">✉️</span>
                   engineering@moziesbiomed.com
                </li>
              </ul>
            </div> */}
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-red-600 mb-10">Update List</h4>
              <p className="text-gray-400 text-xs mb-8 font-medium uppercase tracking-wider">Subscribe for biomedical engineering insights.</p>
              <div className="flex gap-0 group">
                <input type="email" placeholder="EMAIL" className="bg-gray-900 border-none rounded-l-2xl px-6 py-4 text-[10px] w-full focus:ring-1 focus:ring-red-600 placeholder-gray-500 font-black" />
                <button className="bg-red-600 px-6 py-4 rounded-r-2xl font-black text-[10px] uppercase hover:bg-red-700 transition-all">Join</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-900 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
            <p>&copy; {new Date().getFullYear()} MOZIESBIOMED ENGINEERING. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-10">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Engineering Protocol</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;