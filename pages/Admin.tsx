import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, updateDoc, deleteDoc, doc, setDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Product, CategoryItem, GalleryItem } from '../types';
import { INITIAL_CATEGORIES } from '../constants';

const CLOUDINARY_UPLOAD_PRESET = 'mozies_unsigned'; 
const CLOUDINARY_CLOUD_NAME = 'du87lncx2'; 

const Admin: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  
  // Product Form state
  const [prodForm, setProdForm] = useState<any>({ name: '', price: '', description: '', categoryId: '', imageUrl: '', specifications: '' });
  const [editingProdId, setEditingProdId] = useState<string | null>(null);
  
  // Gallery Form state
  const [galForm, setGalForm] = useState<any>({ imageUrl: '', caption: '' });
  const [newCatName, setNewCatName] = useState('');
  
  const prodFileRef = useRef<HTMLInputElement>(null);
  const galFileRef = useRef<HTMLInputElement>(null);
  const prodFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsubCats = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CategoryItem));
      if (cats.length === 0) seedCategories();
      setCategories(cats);
    });

    const unsubProds = onSnapshot(collection(db, 'products'), (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
    });

    const unsubGal = onSnapshot(query(collection(db, 'gallery'), orderBy('date', 'desc')), (snapshot) => {
      setGallery(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem)));
    });

    return () => { unsubCats(); unsubProds(); unsubGal(); };
  }, [user]);

  const seedCategories = async () => {
    for (const c of INITIAL_CATEGORIES) {
      await setDoc(doc(db, 'categories', c.id), { name: c.name });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (err) {
      alert("Authentication Failed: Please verify your administrator credentials.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    setUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
    try {
      const resp = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { 
        method: 'POST', 
        body: data 
      });
      const res = await resp.json();
      if (!resp.ok) throw new Error(res.error?.message || "Upload failed");
      return res.secure_url;
    } catch (err: any) {
      alert(`Cloudinary Error: ${err.message}`);
      return null;
    } finally { 
      setUploading(false); 
    }
  };

  const handleCreateCategory = async () => {
    if (!newCatName.trim()) return;
    try {
      await addDoc(collection(db, 'categories'), { name: newCatName.trim() });
      setNewCatName('');
    } catch (err) { alert("Error: " + err); }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.imageUrl) return alert("Product image is required.");
    if (!prodForm.categoryId) return alert("Please assign a category.");
    
    try {
      const specs = typeof prodForm.specifications === 'string' 
        ? prodForm.specifications.split('\n').filter((s: string) => s.trim()) 
        : prodForm.specifications;
        
      if (editingProdId) {
        await updateDoc(doc(db, 'products', editingProdId), { ...prodForm, specifications: specs });
        alert("Hardware update deployed successfully.");
      } else {
        await addDoc(collection(db, 'products'), { ...prodForm, specifications: specs });
        alert("New hardware published to catalog.");
      }
      resetProdForm();
    } catch (err) { alert("Database Error: " + err); }
  };

  const resetProdForm = () => {
    setProdForm({ name: '', price: '', description: '', categoryId: '', imageUrl: '', specifications: '' });
    setEditingProdId(null);
  };

  const startEditProduct = (p: Product) => {
    setEditingProdId(p.id);
    setProdForm({
      name: p.name,
      price: p.price || '',
      description: p.description,
      categoryId: p.categoryId,
      imageUrl: p.imageUrl,
      specifications: p.specifications.join('\n')
    });
    prodFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galForm.imageUrl) return alert("Project visual required.");
    try {
      await addDoc(collection(db, 'gallery'), { ...galForm, date: new Date().toISOString() });
      setGalForm({ imageUrl: '', caption: '' });
      alert("Engineering portfolio updated.");
    } catch (err) { alert("Error: " + err); }
  };

  const deleteItem = async (col: string, id: string) => {
    if (confirm('Permanently remove this entry?')) {
      await deleteDoc(doc(db, col, id));
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent animate-spin rounded-full"></div>
      <p className="mt-4 font-black text-red-600 uppercase tracking-widest text-xs">Initializing Secure Shell...</p>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md">
          <form onSubmit={handleLogin} className="bg-white p-12 rounded-[50px] shadow-2xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
            <h1 className="text-3xl font-black text-center mb-10 text-gray-900 uppercase tracking-tighter">ADMIN LOGIN </h1>
            
            <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Administrator Email</label>
                <input 
                  type="email" 
                  value={loginEmail} 
                  onChange={e => setLoginEmail(e.target.value)} 
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 focus:ring-red-600/20 transition-all" 
                  placeholder="admin@moziesbiomed.com" 
                  required 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Access Key</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={loginPassword} 
                    onChange={e => setLoginPassword(e.target.value)} 
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 focus:ring-red-600/20 transition-all pr-14" 
                    placeholder="••••••••" 
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors p-2"
                  >
                    {showPassword ? (
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/></svg>
                    ) : (
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    )}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoggingIn}
                className={`w-full bg-red-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-900/20 hover:bg-red-700 transition-all flex items-center justify-center gap-3 ${isLoggingIn ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoggingIn ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                    Verifying...
                  </>
                ) : (
                  'Authorize Access'
                )}
              </button>
            </div>
          </form>
          <p className="mt-8 text-center text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Restricted Access Protocol</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter">Engineering <span className="text-red-600">Admin</span></h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Logged in as {user.email}</p>
        </div>
        <button onClick={() => signOut(auth)} className="px-8 py-4 bg-gray-100 text-gray-400 rounded-2xl font-black text-xs uppercase hover:text-red-600 hover:bg-red-50 transition-all flex items-center gap-2">
          Terminate Session
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* HARDWARE INVENTORY MODULE */}
        <div className="space-y-12">
          <div ref={prodFormRef} className={`bg-white p-12 rounded-[50px] shadow-sm border-2 transition-all duration-500 relative overflow-hidden ${editingProdId ? 'border-red-600 ring-8 ring-red-50' : 'border-gray-100'}`}>
             {editingProdId && <div className="absolute top-0 left-0 bg-red-600 text-white px-6 py-2 text-[10px] font-black uppercase rounded-br-2xl animate-pulse">Mode: Editing Active Inventory</div>}
             <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">
               {editingProdId ? 'Update' : 'Publish'} <span className="text-red-600">Hardware Solution</span>
             </h2>
             
             <form onSubmit={handleSaveProduct} className="space-y-6">
                <div onClick={() => prodFileRef.current?.click()} className={`aspect-video rounded-[30px] border-4 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group ${prodForm.imageUrl ? 'border-red-600' : 'border-gray-200 bg-gray-50 hover:border-red-600'}`}>
                  {prodForm.imageUrl ? <img src={prodForm.imageUrl} className="absolute inset-0 w-full h-full object-cover" alt="" /> : (
                    <div className="text-center group-hover:scale-110 transition-transform">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
                      </div>
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Select Equipment Image</p>
                    </div>
                  )}
                  {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20"><div className="w-8 h-8 border-4 border-red-600 border-t-transparent animate-spin rounded-full"></div></div>}
                  <input type="file" ref={prodFileRef} className="hidden" accept="image/*" onChange={async e => { if (e.target.files?.[0]) { const url = await handleImageUpload(e.target.files[0]); if (url) setProdForm({...prodForm, imageUrl: url}); } }} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">Hardware Model</label>
                    <input required value={prodForm.name} onChange={e => setProdForm({...prodForm, name: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-xs" placeholder="e.g. X-Ray Gen 3" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">MSRP (Optional)</label>
                    <input value={prodForm.price} onChange={e => setProdForm({...prodForm, price: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-xs" placeholder="₦0,000,000" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">Industry Sector</label>
                    <select required value={prodForm.categoryId} onChange={e => setProdForm({...prodForm, categoryId: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-xs uppercase tracking-widest cursor-pointer">
                      <option value="">Choose Category</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <input value={newCatName} onChange={e => setNewCatName(e.target.value)} className="flex-grow bg-transparent border-none px-6 py-4 font-bold text-xs" placeholder="Add New Category..." />
                    <button type="button" onClick={handleCreateCategory} className="bg-gray-900 text-white px-6 rounded-xl font-black text-[10px] uppercase">Add</button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">Technical Description</label>
                  <textarea required value={prodForm.description} onChange={e => setProdForm({...prodForm, description: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-xs h-32" placeholder="Hardware capabilities..." />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">Specifications (One Per Line)</label>
                  <textarea value={prodForm.specifications} onChange={e => setProdForm({...prodForm, specifications: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-xs h-24" placeholder="• 240V Input&#10;• Digital Shielding" />
                </div>
                
                <div className="flex gap-4">
                   <button type="submit" disabled={uploading} className="flex-grow bg-red-600 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-red-900/20 hover:bg-red-700 transition-all">
                     {editingProdId ? 'Apply Update' : 'Publish to Catalog'}
                   </button>
                   {editingProdId && (
                     <button type="button" onClick={resetProdForm} className="px-10 bg-gray-100 text-gray-500 rounded-2xl font-black text-xs uppercase hover:bg-gray-200 transition-colors">Cancel</button>
                   )}
                </div>
             </form>
          </div>

          <div className="bg-white p-10 rounded-[50px] shadow-sm border border-gray-100 max-h-[600px] overflow-y-auto">
             <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-8">Hardware Portfolio</h3>
             <div className="space-y-4">
               {products.map(p => (
                 <div key={p.id} className={`flex items-center gap-4 p-4 rounded-2xl group transition-all ${editingProdId === p.id ? 'bg-red-50 ring-1 ring-red-200' : 'bg-gray-50 hover:bg-white hover:shadow-lg'}`}>
                    <img src={p.imageUrl} className="w-14 h-14 rounded-xl object-cover" alt="" />
                    <div className="flex-grow">
                      <p className="font-black text-[11px] uppercase tracking-tight text-gray-900">{p.name}</p>
                      <p className="text-[9px] font-bold text-red-600 uppercase tracking-widest">{categories.find(c => c.id === p.categoryId)?.name}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEditProduct(p)} className="p-3 bg-white text-gray-400 hover:text-red-600 rounded-xl shadow-sm transition-all" title="Edit Hardware">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                      </button>
                      <button onClick={() => deleteItem('products', p.id)} className="p-3 bg-white text-gray-400 hover:text-red-600 rounded-xl shadow-sm transition-all" title="Delete Hardware">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                 </div>
               ))}
               {products.length === 0 && (
                 <div className="text-center py-20 bg-gray-50 rounded-3xl">
                   <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest">Inventory Database Empty</p>
                 </div>
               )}
             </div>
          </div>
        </div>

        {/* PROJECT HIGHLIGHTS MODULE */}
        <div className="space-y-12">
           <div className="bg-white p-12 rounded-[50px] shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">Engineering <span className="text-red-600">Portfolio</span></h2>
              
              <form onSubmit={handleSaveGallery} className="space-y-6">
                <div onClick={() => galFileRef.current?.click()} className={`aspect-square rounded-[30px] border-4 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group ${galForm.imageUrl ? 'border-red-600' : 'border-gray-200 bg-gray-50 hover:border-red-600'}`}>
                   {galForm.imageUrl ? <img src={galForm.imageUrl} className="absolute inset-0 w-full h-full object-cover" alt="" /> : (
                     <div className="text-center group-hover:scale-110 transition-transform">
                       <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Add Project Visual</p>
                     </div>
                   )}
                   {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20"><div className="w-8 h-8 border-4 border-red-600 border-t-transparent animate-spin rounded-full"></div></div>}
                   <input type="file" ref={galFileRef} className="hidden" accept="image/*" onChange={async e => { if (e.target.files?.[0]) { const url = await handleImageUpload(e.target.files[0]); if (url) setGalForm({...galForm, imageUrl: url}); } }} />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">Installation Context</label>
                  <input required value={galForm.caption} onChange={e => setGalForm({...galForm, caption: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-xs uppercase" placeholder="e.g. LASUTH Radiology Dept" />
                </div>
                
                <button type="submit" disabled={uploading} className="w-full bg-gray-900 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-red-600 transition-all">Publish to Highlights</button>
              </form>
           </div>

           <div className="bg-white p-10 rounded-[50px] shadow-sm border border-gray-100">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-8">Recent Engineering Footprints</h3>
              <div className="grid grid-cols-3 gap-4">
                 {gallery.map(g => (
                   <div key={g.id} className="relative aspect-square rounded-2xl overflow-hidden group shadow-inner">
                      <img src={g.imageUrl} className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                        <button onClick={() => deleteItem('gallery', g.id)} className="text-white hover:text-red-500 p-4">
                           <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                   </div>
                 ))}
                 {gallery.length === 0 && (
                   <div className="col-span-3 text-center py-10">
                     <p className="text-gray-300 font-black text-[9px] uppercase tracking-widest">No Gallery Items Published</p>
                   </div>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;