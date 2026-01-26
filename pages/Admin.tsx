import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, updateDoc, deleteDoc, doc, setDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Product, CategoryItem, GalleryItem } from '../types';
import { INITIAL_CATEGORIES } from '../constants';

// Cloudinary Configuration (Ensure 'demo' is replaced with your actual cloud name in a real environment)
const CLOUDINARY_UPLOAD_PRESET = 'mozies_unsigned'; 
const CLOUDINARY_CLOUD_NAME = 'du87lncx2'; 

const Admin: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
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
      if (!resp.ok) throw new Error("Cloudinary upload failed");
      const res = await resp.json();
      return res.secure_url;
    } catch (err) {
      console.error(err);
      alert("Image upload failed. Please verify your Cloudinary cloud name and unsigned upload preset.");
      return null;
    } finally { setUploading(false); }
  };

  const handleCreateCategory = async () => {
    if (!newCatName.trim()) return;
    try {
      await addDoc(collection(db, 'categories'), { name: newCatName.trim() });
      setNewCatName('');
    } catch (err) { alert("Error adding category: " + err); }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.imageUrl) return alert("Hardware image is required.");
    if (!prodForm.categoryId) return alert("Please select a sector category.");
    
    try {
      const specs = typeof prodForm.specifications === 'string' 
        ? prodForm.specifications.split('\n').filter((s: string) => s.trim()) 
        : prodForm.specifications;
        
      if (editingProdId) {
        await updateDoc(doc(db, 'products', editingProdId), { ...prodForm, specifications: specs });
        alert("Product updated successfully.");
      } else {
        await addDoc(collection(db, 'products'), { ...prodForm, specifications: specs });
        alert("New biomedical product published.");
      }
      resetProdForm();
    } catch (err) { alert("Error saving product: " + err); }
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
    if (!galForm.imageUrl) return alert("Project photo required.");
    try {
      await addDoc(collection(db, 'gallery'), { ...galForm, date: new Date().toISOString() });
      setGalForm({ imageUrl: '', caption: '' });
      alert("Engineering portfolio updated.");
    } catch (err) { alert("Error saving gallery item: " + err); }
  };

  const deleteItem = async (col: string, id: string) => {
    if (confirm('Permanently remove this entry from public view?')) {
      await deleteDoc(doc(db, col, id));
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black text-red-600 uppercase tracking-widest">Initializing Secure Portal...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <form onSubmit={async (e) => { e.preventDefault(); try { await signInWithEmailAndPassword(auth, loginEmail, loginPassword); } catch { alert("Authentication Failed"); }}} className="bg-white p-12 rounded-[50px] shadow-2xl w-full max-w-md border border-gray-100">
          <h1 className="text-3xl font-black text-center mb-10 text-gray-900 uppercase tracking-tighter tracking-widest">ADMIN <span className="text-red-600">ACCESS</span></h1>
          <div className="space-y-4">
            <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-sm" placeholder="EMAIL" required />
            <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-sm" placeholder="PASSWORD" required />
            <button type="submit" className="w-full bg-red-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-900/20 hover:bg-red-700 transition-all">Verify Credentials</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-16 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter">Engineering <span className="text-red-600">Admin</span></h1>
        <button onClick={() => signOut(auth)} className="px-8 py-4 bg-gray-100 text-gray-400 rounded-2xl font-black text-xs uppercase hover:text-red-600 transition-all">
          Logout
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* PRODUCT SECTION */}
        <div className="space-y-12">
          <div ref={prodFormRef} className={`bg-white p-12 rounded-[50px] shadow-sm border-2 transition-all duration-500 relative overflow-hidden ${editingProdId ? 'border-red-600 ring-4 ring-red-50' : 'border-gray-100'}`}>
             {editingProdId && <div className="absolute top-0 left-0 bg-red-600 text-white px-6 py-2 text-[10px] font-black uppercase rounded-br-2xl animate-pulse">Mode: Active Post Edit</div>}
             <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">
               {editingProdId ? 'Modify' : 'Publish'} <span className="text-red-600">Biomedical Hardware</span>
             </h2>
             
             <form onSubmit={handleSaveProduct} className="space-y-6">
                <div onClick={() => prodFileRef.current?.click()} className={`aspect-video rounded-[30px] border-4 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group ${prodForm.imageUrl ? 'border-red-600' : 'border-gray-200 bg-gray-50 hover:border-red-600'}`}>
                  {prodForm.imageUrl ? <img src={prodForm.imageUrl} className="absolute inset-0 w-full h-full object-cover" alt="" /> : (
                    <div className="text-center group-hover:scale-110 transition-transform">
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Select Product Image</p>
                    </div>
                  )}
                  {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20"><div className="w-8 h-8 border-4 border-red-600 border-t-transparent animate-spin rounded-full"></div></div>}
                  <input type="file" ref={prodFileRef} className="hidden" accept="image/*" onChange={async e => { if (e.target.files?.[0]) { const url = await handleImageUpload(e.target.files[0]); if (url) setProdForm({...prodForm, imageUrl: url}); } }} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input required value={prodForm.name} onChange={e => setProdForm({...prodForm, name: e.target.value})} className="bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-xs" placeholder="HARDWARE MODEL" />
                  <input value={prodForm.price} onChange={e => setProdForm({...prodForm, price: e.target.value})} className="bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-xs" placeholder="PRICE (Optional)" />
                </div>

                <div className="space-y-4">
                  <select required value={prodForm.categoryId} onChange={e => setProdForm({...prodForm, categoryId: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-xs uppercase tracking-widest cursor-pointer">
                    <option value="">SELECT SECTOR CATEGORY</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <input value={newCatName} onChange={e => setNewCatName(e.target.value)} className="flex-grow bg-transparent border-none px-6 py-4 font-bold text-xs" placeholder="CREATE NEW CATEGORY..." />
                    <button type="button" onClick={handleCreateCategory} className="bg-gray-900 text-white px-6 rounded-xl font-black text-[10px] uppercase">Add</button>
                  </div>
                </div>

                <textarea required value={prodForm.description} onChange={e => setProdForm({...prodForm, description: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-xs h-32" placeholder="TECHNICAL OVERVIEW" />
                <textarea value={prodForm.specifications} onChange={e => setProdForm({...prodForm, specifications: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-xs h-24" placeholder="HARDWARE SPECS (NEW LINE FOR EACH)" />
                
                <div className="flex gap-4">
                   <button type="submit" disabled={uploading} className="flex-grow bg-red-600 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-red-900/20 hover:bg-red-700 transition-all">
                     {editingProdId ? 'Apply Updates' : 'Publish Product'}
                   </button>
                   {editingProdId && (
                     <button type="button" onClick={resetProdForm} className="px-10 bg-gray-100 text-gray-500 rounded-2xl font-black text-xs uppercase hover:bg-gray-200 transition-colors">Cancel</button>
                   )}
                </div>
             </form>
          </div>

          <div className="bg-white p-10 rounded-[50px] shadow-sm border border-gray-100 max-h-[600px] overflow-y-auto">
             <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-8">Biomedical Inventory</h3>
             <div className="space-y-4">
               {products.map(p => (
                 <div key={p.id} className={`flex items-center gap-4 p-4 rounded-2xl group transition-all ${editingProdId === p.id ? 'bg-red-50 shadow-inner ring-1 ring-red-200' : 'bg-gray-50 hover:bg-white hover:shadow-lg'}`}>
                    <img src={p.imageUrl} className="w-14 h-14 rounded-xl object-cover" alt="" />
                    <div className="flex-grow">
                      <p className="font-black text-[11px] uppercase tracking-tight text-gray-900">{p.name}</p>
                      <p className="text-[9px] font-bold text-red-600 uppercase tracking-widest">{categories.find(c => c.id === p.categoryId)?.name}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEditProduct(p)} title="Edit Entry" className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                      </button>
                      <button onClick={() => deleteItem('products', p.id)} title="Delete Entry" className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* GALLERY SECTION */}
        <div className="space-y-12">
           <div className="bg-white p-12 rounded-[50px] shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">Engineering <span className="text-red-600">Portfolio</span></h2>
              
              <form onSubmit={handleSaveGallery} className="space-y-6">
                <div onClick={() => galFileRef.current?.click()} className={`aspect-square rounded-[30px] border-4 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group ${galForm.imageUrl ? 'border-red-600' : 'border-gray-200 bg-gray-50 hover:border-red-600'}`}>
                   {galForm.imageUrl ? <img src={galForm.imageUrl} className="absolute inset-0 w-full h-full object-cover" alt="" /> : (
                     <div className="text-center group-hover:scale-110 transition-transform">
                       <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Select Project Photo</p>
                     </div>
                   )}
                   {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20"><div className="w-8 h-8 border-4 border-red-600 border-t-transparent animate-spin rounded-full"></div></div>}
                   <input type="file" ref={galFileRef} className="hidden" accept="image/*" onChange={async e => { if (e.target.files?.[0]) { const url = await handleImageUpload(e.target.files[0]); if (url) setGalForm({...galForm, imageUrl: url}); } }} />
                </div>

                <input required value={galForm.caption} onChange={e => setGalForm({...galForm, caption: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-xs uppercase" placeholder="BRIEF PROJECT CAPTION" />
                
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
                        <button onClick={() => deleteItem('gallery', g.id)} className="text-white hover:text-red-500">
                           <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;