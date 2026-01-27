import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adminNumber = "2348000000000"; // Replace with actual admin number
    const companyText = formData.company ? `, from ${formData.company}` : '';
    const message = `Hello my name is ${formData.name}${companyText}. I need your services.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${adminNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-950 py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15),transparent_70%)]"></div>
        <div className="relative z-10">
          <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Direct Protocol</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">Initialize <span className="text-red-600">Contact</span></h1>
          <div className="w-24 h-2 bg-red-600 mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="bg-gray-50 rounded-[60px] p-8 md:p-16 border border-gray-100 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white border-none rounded-3xl px-8 py-5 font-bold text-gray-900 focus:ring-2 focus:ring-red-600/20 transition-all shadow-sm"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white border-none rounded-3xl px-8 py-5 font-bold text-gray-900 focus:ring-2 focus:ring-red-600/20 transition-all shadow-sm"
                  placeholder="+234..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Company Name (Optional)</label>
              <input 
                type="text" 
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full bg-white border-none rounded-3xl px-8 py-5 font-bold text-gray-900 focus:ring-2 focus:ring-red-600/20 transition-all shadow-sm"
                placeholder="Health Facility Name"
              />
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                className="w-full bg-red-600 text-white py-7 rounded-[30px] font-black text-lg uppercase tracking-widest hover:bg-red-700 hover:scale-[1.02] transition-all shadow-2xl shadow-red-900/30 flex items-center justify-center gap-4"
              >
                Connect on WhatsApp
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793 0-.852.448-1.271.607-1.445.16-.173.348-.217.464-.217.115 0 .231.001.332.005.109.004.258-.041.404.311.145.352.492 1.203.536 1.289.044.087.073.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.101-.177.211-.077.385.101.174.445.733.955 1.187.657.585 1.21.766 1.383.853.174.087.275.072.376-.044.101-.116.434-.506.549-.68.116-.174.232-.145.391-.087.159.058 1.013.477 1.187.564.174.087.289.13.332.203.045.072.045.419-.1.824z"/>
                </svg>
              </button>
            </div>
          </form>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mx-auto font-black text-xl">01</div>
            <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Submit Info</h3>
            <p className="text-gray-400 text-[10px] font-bold uppercase">Provide basic facility details.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mx-auto font-black text-xl">02</div>
            <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Instant Chat</h3>
            <p className="text-gray-400 text-[10px] font-bold uppercase">Redirected to lead engineer.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mx-auto font-black text-xl">03</div>
            <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Deployment</h3>
            <p className="text-gray-400 text-[10px] font-bold uppercase">Begin engineering strategy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;