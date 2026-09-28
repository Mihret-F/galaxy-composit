import React, { useState } from 'react';
import { Product } from '../../types';
import { Search, Filter, Edit, Trash2, Plus, Eye, EyeOff, Star, Check, AlertTriangle, X } from 'lucide-react';

interface AdminProductsProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  onNavigateToAddProduct: () => void;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({
  products,
  onUpdateProducts,
  onNavigateToAddProduct
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  const categories = ['All', 'Flower Pots', 'Outdoor Furniture', 'Playground & Custom', 'Play Systems', 'Decorative Panels'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteConfirm = () => {
    if (!deletingProductId) return;
    const updated = products.filter((p) => p.id !== deletingProductId);
    onUpdateProducts(updated);
    setDeletingProductId(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    const updated = products.map((p) => (p.id === editingProduct.id ? editingProduct : p));
    onUpdateProducts(updated);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-white italic">
            Product <span className="text-sky-500">Catalog Management</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Create, edit, search, and manage products displayed on the public catalog.
          </p>
        </div>
        <button
          onClick={onNavigateToAddProduct}
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs uppercase tracking-widest rounded-sm shadow flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filters & Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-neutral-900 p-4 rounded-sm border border-neutral-800">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-neutral-300 focus:outline-none focus:border-sky-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>Category: {cat}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center text-xs text-neutral-400 font-bold uppercase tracking-wider justify-end">
          Total Listed: {filteredProducts.length}
        </div>
      </div>

      {/* Product Table / Cards */}
      <div className="bg-neutral-900 rounded-sm border border-neutral-800 overflow-x-auto shadow-xl">
        <table className="w-full text-left text-xs text-neutral-300">
          <thead className="bg-neutral-950 text-[10px] font-black uppercase tracking-wider text-neutral-400 border-b border-neutral-800">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Material</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {filteredProducts.map((p) => (
              <tr key={p.id} className="hover:bg-neutral-800/50 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-sm border border-neutral-700 shrink-0" />
                  <div>
                    <span className="font-bold text-white block text-sm">{p.name}</span>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest">{p.tag || 'Standard'}</span>
                  </div>
                </td>
                <td className="p-4 font-semibold text-sky-400">{p.category}</td>
                <td className="p-4 font-bold text-white">{p.price}</td>
                <td className="p-4 text-neutral-400">{p.material || 'Fiberglass'}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingProduct(p)}
                      className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-sm"
                      title="Edit Product"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingProductId(p.id)}
                      className="p-1.5 bg-red-950 hover:bg-red-900 text-red-300 rounded-sm border border-red-800/50"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-neutral-500 text-xs uppercase tracking-wider font-bold">
                  No products found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingProductId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 text-red-500 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-black uppercase tracking-tight text-white">Delete Product Confirmation</h3>
            </div>
            <p className="text-xs text-neutral-300 mb-6 leading-relaxed">
              Are you sure you want to delete this product? <br />
              <strong className="text-red-400">This action cannot be undone.</strong>
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeletingProductId(null)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold uppercase rounded-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase rounded-sm shadow"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
              <h3 className="text-base font-black uppercase tracking-tight text-white">
                Edit Product: <span className="text-sky-500">{editingProduct.name}</span>
              </h3>
              <button onClick={() => setEditingProduct(null)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Product Name</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    required
                    className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                    className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Price String</label>
                  <input
                    type="text"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Material</label>
                  <input
                    type="text"
                    value={editingProduct.material || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
                    className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Description</label>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={3}
                  className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold uppercase rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-black uppercase rounded-sm shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
