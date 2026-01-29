import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adminNumber = "+2348138969404"; // Replace with actual admin number
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
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">contact <span className="text-red-600">Us</span></h1>
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
                  placeholder="First and Last name"
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
                Send
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