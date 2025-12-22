
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
      <div className="relative">
        {/* Animated Rings */}
        <div className="absolute inset-0 rounded-full border-4 border-red-50 animate-ping"></div>
        <div className="w-24 h-24 rounded-full border-t-4 border-red-600 animate-spin border-r-4 border-r-transparent"></div>
        
        {/* Logo Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM11 19H9V15H11V19ZM11 13H9V9H11V13ZM15 19H13V15H15V19ZM15 13H13V9H15V13ZM19 19H17V15H19V19ZM19 13H17V9H19V13Z" fill="#DC2626"/>
          </svg>
        </div>
      </div>
      <div className="mt-8 font-black text-2xl tracking-tighter uppercase">
        <span className="text-red-600">MOZIES</span>
        <span className="text-gray-400">BIOMED</span>
      </div>
      <div className="mt-2 text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Precision Engineering</div>
    </div>
  );
};

export default Loader;
