import React, { useState } from 'react';
import { Product, PageType } from '../types';
import { Search, Filter, Eye, MessageSquare, ArrowUpDown, Tag } from 'lucide-react';

interface ProductsProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenQuickQuoteWithProduct: (productName: string) => void;
}

export const Products: React.FC<ProductsProps> = ({
  products,
  onSelectProduct,
  onOpenQuickQuoteWithProduct
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high'>('default');

  const categories = [
    'All',
    'Flower Pots',
    'Playground & Custom',
    'Decorative Panels',
    'Outdoor Furniture',
    'Play Systems'
  ];

  // Filter products
  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return (a.numericPrice || 99999) - (b.numericPrice || 99999);
    }
    if (sortBy === 'price-high') {
      return (b.numericPrice || 0) - (a.numericPrice || 0);
    }
    return 0;
  });

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="bg-neutral-900 text-white p-8 md:p-12 rounded-sm border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sky-500 bg-sky-950 px-3 py-1 rounded-sm border border-sky-800">
            01. OFFICIAL CATALOG
          </span>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
            Fiberglass <span className="text-sky-600">Products Catalog</span>
          </h1>
          <p className="text-neutral-400 text-xs md:text-sm">
            Decorative flower pots, playground systems, circular benches, water tanks, and custom fabrications in Addis Ababa.
          </p>
        </div>

      </div>

      {/* Controls: Search, Category Filter, Sort */}
      <div className="bg-white p-4 md:p-6 rounded-sm border border-neutral-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search products, planters, play systems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-sm text-xs font-bold focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <ArrowUpDown className="w-4 h-4 text-neutral-400" />
            <span className="text-xs text-neutral-600 font-extrabold uppercase tracking-wider">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-neutral-300 rounded-sm px-3 py-1.5 text-xs text-neutral-900 font-bold focus:ring-2 focus:ring-sky-500"
            >
              <option value="default">Featured / Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-sm text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-neutral-900 text-sky-500 shadow'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product List Count */}
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500">
        <span>Showing {sortedProducts.length} of {products.length} products</span>
        {selectedCategory !== 'All' && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-sky-600 font-black hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Grid of Product Cards */}
      {sortedProducts.length === 0 ? (
        <div className="bg-neutral-100 border border-neutral-200 rounded-sm p-12 text-center space-y-3">
          <Tag className="w-12 h-12 text-neutral-400 mx-auto" />
          <h3 className="text-base font-black uppercase text-neutral-800">No matching products found</h3>
          <p className="text-xs text-neutral-500">Try adjusting your search query or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-sm border border-neutral-200 overflow-hidden shadow-sm hover:border-sky-500 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 bg-neutral-100 overflow-hidden border-b border-neutral-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.tag && (
                    <span className="absolute top-3 left-3 bg-neutral-900 text-sky-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm shadow">
                      {product.tag}
                    </span>
                  )}
                  {product.isUserAdded && (
                    <span className="absolute top-3 right-3 bg-sky-600 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm shadow">
                      New Upload
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <span className="text-[10px] font-bold uppercase text-sky-600 tracking-widest">
                    {product.category}
                  </span>
                  <h3 className="font-black uppercase text-neutral-900 text-lg leading-tight line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-neutral-600 text-xs leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1 pt-1">
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[10px] text-neutral-700 font-bold uppercase tracking-wider">
                        <span className="text-sky-600 font-black">•</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-3 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-neutral-400 uppercase font-bold tracking-widest block">Price</span>
                  <span className="font-black text-neutral-900 text-base text-sky-600">
                    {product.price}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="p-2 text-neutral-800 bg-white border border-neutral-300 hover:bg-neutral-100 rounded-sm text-xs font-bold"
                    title="View Product Specs"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onOpenQuickQuoteWithProduct(product.name)}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-sm text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
