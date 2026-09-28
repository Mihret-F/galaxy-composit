import React, { useState } from 'react';
import { Product } from '../../types';
import { Plus, Image, Video, Save, X, Check, UploadCloud } from 'lucide-react';

interface AdminAddProductProps {
  onAddProduct: (product: Product) => void;
  onCancel: () => void;
}

export const AdminAddProduct: React.FC<AdminAddProductProps> = ({ onAddProduct, onCancel }) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<'Flower Pots' | 'Playground & Custom' | 'Decorative Panels' | 'Outdoor Furniture' | 'Play Systems'>('Flower Pots');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [price, setPrice] = useState('From Br 500');
  const [material, setMaterial] = useState('Weatherproof Fiberglass Resin');
  const [dimensions, setDimensions] = useState('');
  const [color, setColor] = useState('Custom Colors Available');
  const [availability, setAvailability] = useState('In Stock / 3-5 days');
  const [features, setFeatures] = useState('UV-resistant, Weatherproof, Durable');
  const [badge, setBadge] = useState<'Popular' | 'New' | 'Custom Fabrication' | 'Best Seller'>('New');
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [image, setImage] = useState('/no-image.svg');
  const [videoUrl, setVideoUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
      }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (isDraft = false) => {
    if (!name) {
      alert('Product Name is required.');
      return;
    }

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name,
      category,
      tag: badge,
      description,
      price,
      image,
      videoUrl: videoUrl || undefined,
      features: features.split(',').map((f) => f.trim()).filter(Boolean),
      dimensions: dimensions || undefined,
      leadTime: availability,
      material,
      isUserAdded: true
    };

    onAddProduct(newProd);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-6 space-y-6 shadow-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-white italic">
            Add New <span className="text-sky-500">Composite Product</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Fill out technical specs, pricing, and media assets to list a new product.
          </p>
        </div>
        <button onClick={onCancel} className="p-2 text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(false); }} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
              }}
              required
              placeholder="e.g. Circular Garden Bench"
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="circular-garden-bench"
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-neutral-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
            >
              <option value="Flower Pots">Flower Pots</option>
              <option value="Outdoor Furniture">Outdoor Furniture</option>
              <option value="Playground & Custom">Playground & Custom</option>
              <option value="Play Systems">Play Systems</option>
              <option value="Decorative Panels">Decorative Panels</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Price Display
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. From Br 450"
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Badge / Tag
            </label>
            <select
              value={badge}
              onChange={(e) => setBadge(e.target.value as any)}
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
            >
              <option value="New">New</option>
              <option value="Popular">Popular</option>
              <option value="Best Seller">Best Seller</option>
              <option value="Custom Fabrication">Custom Fabrication</option>
            </select>
          </div>
        </div>

        {/* Technical Specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Material
            </label>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Dimensions
            </label>
            <input
              type="text"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
              placeholder="e.g. 1.2m x 0.8m"
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Availability / Lead Time
            </label>
            <input
              type="text"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
            Features (Comma-separated)
          </label>
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            placeholder="UV-resistant, Custom colors, 10-year lifespan"
            className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
            Full Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Detailed description of the product..."
            className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
          />
        </div>

        {/* Media */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-2">
              Main Image URL / Upload
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL"
                className="flex-1 p-2 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
              />
              <label className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-sm cursor-pointer flex items-center gap-1">
                <UploadCloud className="w-4 h-4 text-sky-500" />
                <span>Upload</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
            {image && (
              <img src={image} alt="Preview" className="w-32 h-24 object-cover rounded-sm border border-neutral-800" />
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-2">
              Product Video URL (Optional)
            </label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-neutral-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold uppercase rounded-sm"
          >
            Cancel
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase rounded-sm"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-black text-xs uppercase tracking-widest rounded-sm shadow"
            >
              Publish Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
