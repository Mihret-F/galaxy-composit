import React, { useState } from 'react';
import { Product } from '../types';
import { X, PlusCircle, Image as ImageIcon, Video, CheckCircle, AlertCircle } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (newProduct: Product) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onAddProduct }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [category, setCategory] = useState<Product['category']>('Flower Pots');
  const [tag, setTag] = useState<'Popular' | 'New' | 'Custom Fabrication' | 'Best Seller'>('New');
  const [price, setPrice] = useState('From Br ');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [feature1, setFeature1] = useState('');
  const [feature2, setFeature2] = useState('');
  const [feature3, setFeature3] = useState('');
  const [leadTime, setLeadTime] = useState('7–14 days');
  const [dimensions, setDimensions] = useState('Custom sizes available');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) return;

    const chosenImage = image.trim() || '/no-image.svg';
    const featuresList = [feature1, feature2, feature3].filter((f) => f.trim().length > 0);
    if (featuresList.length === 0) {
      featuresList.push('UV-Resistant Finish', 'Weather-proof Fiberglass', 'Custom colors available');
    }

    const numericMatch = price.match(/\d+/);
    const numericPrice = numericMatch ? parseInt(numericMatch[0], 10) : undefined;

    const newProd: Product = {
      id: `prod-custom-${Date.now()}`,
      name,
      category,
      tag,
      description,
      price: price.startsWith('From Br') || price.toLowerCase().includes('contact') ? price : `From Br ${price}`,
      numericPrice,
      image: chosenImage,
      videoUrl: videoUrl.trim() || undefined,
      features: featuresList,
      dimensions,
      leadTime,
      material: 'Premium High-Density Fiber Glass Compound',
      isUserAdded: true
    };

    onAddProduct(newProd);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 p-6 md:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 p-2 rounded-sm"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-sm bg-neutral-900 text-sky-500 flex items-center justify-center font-bold">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900">Post & List New Product</h2>
            <p className="text-xs text-neutral-500">
              Add a new fiberglass item to Galaxy Composites / Bemnet FiberGlass's catalog.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle className="w-16 h-16 text-sky-600 mx-auto animate-bounce" />
            <h3 className="text-xl font-black uppercase text-neutral-900">Product Successfully Posted!</h3>
            <p className="text-sm text-neutral-600">
              It is now live on the website catalog for customers to view and request quotes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hexagonal Decorative Planter"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-sky-500 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Product['category'])}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-sky-500 text-xs"
                >
                  <option value="Flower Pots">Flower Pots</option>
                  <option value="Playground & Custom">Playground & Custom</option>
                  <option value="Decorative Panels">Decorative Panels</option>
                  <option value="Outdoor Furniture">Outdoor Furniture</option>
                  <option value="Play Systems">Play Systems</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-1">Price (ETB Birr) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. From Br 1,200 or Contact Us"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-sky-500 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-1">Badge Tag</label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value as any)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-sky-500 text-xs"
                >
                  <option value="New">New</option>
                  <option value="Popular">Popular</option>
                  <option value="Custom Fabrication">Custom Fabrication</option>
                  <option value="Best Seller">Best Seller</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-1">Product Description *</label>
              <textarea
                required
                rows={3}
                placeholder="Describe features, material grade, UV resistance, capacity and applications..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-sky-500 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-1">Image URL (Optional)</label>
                <div className="relative">
                  <ImageIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-sky-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-1">Video Link (Optional)</label>
                <div className="relative">
                  <Video className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="url"
                    placeholder="https://youtube.com/..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-sky-500 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-3 space-y-2">
              <label className="block font-bold text-neutral-800 uppercase tracking-wider text-[10px]">Key Features / Highlights</label>
              <input
                type="text"
                placeholder="Feature 1: e.g. UV-resistant weatherproof finish"
                value={feature1}
                onChange={(e) => setFeature1(e.target.value)}
                className="w-full px-3 py-1.5 border border-neutral-200 rounded-sm text-xs"
              />
              <input
                type="text"
                placeholder="Feature 2: e.g. Custom sizes and colors available"
                value={feature2}
                onChange={(e) => setFeature2(e.target.value)}
                className="w-full px-3 py-1.5 border border-neutral-200 rounded-sm text-xs"
              />
              <input
                type="text"
                placeholder="Feature 3: e.g. Heavy-duty reinforced fiberglass"
                value={feature3}
                onChange={(e) => setFeature3(e.target.value)}
                className="w-full px-3 py-1.5 border border-neutral-200 rounded-sm text-xs"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-neutral-300 font-bold uppercase tracking-wider rounded-sm text-neutral-600 hover:bg-neutral-50 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-black uppercase tracking-widest rounded-sm shadow text-xs"
              >
                Publish Product
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
