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
      <footer className="bg-gray-900 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center space-x-2 mb-8">
                <div className="bg-red-600 p-2 rounded-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                      <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM18 13H15V19H13V13H11V19H9V13H6V11H9V5H11V11H13V5H15V11H18V13Z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase">
                  <span className="text-red-600">MOZIES</span>
                  <span className="text-white">BIOMED</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium">
                Leading Biomedical Engineering Firm in Nigeria. Expert hardware maintenance and strategic facility design for healthcare excellence.
              </p>
            </div>
            <div>
              <h4 className="font-black text-sm uppercase tracking-[0.2em] text-red-600 mb-8">Navigation</h4>
              <ul className="space-y-4 text-gray-300 text-[13px] font-bold">
                <li><a href="#/products" className="hover:text-red-500 transition-colors uppercase">Engineering Store</a></li>
                <li><a href="#/services" className="hover:text-red-500 transition-colors uppercase">Our Services</a></li>
                <li><a href="#/about" className="hover:text-red-500 transition-colors uppercase">Company Profile</a></li>
                <li><a href="#/gallery" className="hover:text-red-500 transition-colors uppercase">Project History</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-sm uppercase tracking-[0.2em] text-red-600 mb-8">Connect</h4>
              <ul className="space-y-4 text-gray-300 text-[13px] font-bold">
                <li className="flex gap-3">
                   <span className="text-red-500">📍</span>
                   Lagos Hub: 123 Biomedical Way, VI
                </li>
                <li className="flex gap-3">
                   <span className="text-red-500">📍</span>
                   Abuja Hub: 45 Tech Square, Garki
                </li>
                <li className="flex gap-3 hover:text-red-500 transition-colors cursor-pointer">
                   <span className="text-red-500">✉️</span>
                   engineering@moziesbiomed.com
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-sm uppercase tracking-[0.2em] text-red-600 mb-8">Update List</h4>
              <p className="text-gray-400 text-xs mb-6 font-medium uppercase tracking-wider">Stay updated with biomedical innovations.</p>
              <div className="flex gap-0 group">
                <input type="email" placeholder="EMAIL ADDRESS" className="bg-gray-800 border-none rounded-l-2xl px-6 py-4 text-[10px] w-full focus:ring-1 focus:ring-red-600 placeholder-gray-500 font-black" />
                <button className="bg-red-600 px-6 py-4 rounded-r-2xl font-black text-[10px] uppercase hover:bg-red-700 transition-all">Join</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} MOZIESBIOMED BIOMEDICAL ENGINEERING. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
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
          <Route path="/contact" element={<div className="py-40 text-center"><h2 className="text-4xl font-black text-gray-900 uppercase">Contact Us</h2><p className="mt-4 text-gray-500 font-bold uppercase tracking-widest text-xs">Speak with our lead engineers.</p></div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;