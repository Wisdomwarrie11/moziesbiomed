
import React, { useState } from 'react';
import { INITIAL_PRODUCTS } from '../constants';
import { Product, Category } from '../types';

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    category: Category.DIAGNOSTIC,
    imageUrl: '',
    specifications: []
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProduct.id) {
      // Update
      setProducts(products.map(p => p.id === currentProduct.id ? (currentProduct as Product) : p));
    } else {
      // Create
      const newProduct = {
        ...currentProduct,
        id: Math.random().toString(36).substr(2, 9)
      } as Product;
      setProducts([...products, newProduct]);
    }
    setIsEditing(false);
    setCurrentProduct({ name: '', description: '', category: Category.DIAGNOSTIC, imageUrl: '', specifications: [] });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black text-blue-900">Admin Panel</h1>
          <p className="text-gray-500">Manage Moziesbiomed product catalog</p>
        </div>
        <button 
          onClick={() => { setIsEditing(true); setCurrentProduct({ name: '', description: '', category: Category.DIAGNOSTIC, imageUrl: '', specifications: [] }); }}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
        >
          + Add New Product
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-black text-blue-900 mb-6">{currentProduct.id ? 'Edit Product' : 'Create Product'}</h2>
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                <input 
                  required
                  value={currentProduct.name}
                  onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                  placeholder="e.g. MRI Scanner Pro"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select 
                  value={currentProduct.category}
                  onChange={e => setCurrentProduct({...currentProduct, category: e.target.value as Category})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {Object.values(Category).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                <input 
                  required
                  value={currentProduct.imageUrl}
                  onChange={e => setCurrentProduct({...currentProduct, imageUrl: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                  placeholder="https://..."
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea 
                  required
                  value={currentProduct.description}
                  onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none h-32" 
                />
              </div>
              <div className="col-span-2 flex justify-end gap-4 mt-4">
                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 font-bold text-gray-500 hover:text-gray-700">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20">
                  {currentProduct.id ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">Product</th>
              <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-right text-xs font-black text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img src={product.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover mr-4" />
                    <div className="font-bold text-gray-900">{product.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => { setIsEditing(true); setCurrentProduct(product); }}
                    className="text-blue-600 hover:text-blue-900 mr-4 font-bold"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900 font-bold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
