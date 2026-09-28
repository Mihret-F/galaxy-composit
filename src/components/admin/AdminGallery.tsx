import React, { ChangeEvent, useState } from 'react';
import { GalleryItem } from '../../types';
import { Image, Trash2, Search, Upload } from 'lucide-react';

interface AdminGalleryProps {
  items: GalleryItem[];
  onUpdate: (items: GalleryItem[]) => void;
}

export const AdminGallery: React.FC<AdminGalleryProps> = ({ items, onUpdate }) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('General');
  const [caption, setCaption] = useState('');
  const [imageData, setImageData] = useState('');
  const [filename, setFilename] = useState('');
  const [uploadError, setUploadError] = useState('');

  const filtered = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.caption?.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleDelete = (id: string) => {
    if (confirm('Delete this media item from gallery?')) {
      onUpdate(items.filter((i) => i.id !== id));
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image must be smaller than 5 MB.');
      return;
    }

    setUploadError('');
    setFilename(file.name);
    const reader = new FileReader();
    reader.onload = () => setImageData(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (!title.trim() || !imageData) {
      setUploadError('Add a title and choose an image before uploading.');
      return;
    }

    const newItem: GalleryItem = {
      id: `gallery-${crypto.randomUUID()}`,
      title: title.trim(),
      category,
      filename,
      image: imageData,
      caption: caption.trim()
    };
    onUpdate([newItem, ...items]);
    setTitle('');
    setCaption('');
    setImageData('');
    setFilename('');
    setUploadError('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-white italic">
            Gallery & Media <span className="text-sky-500">Asset Management</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Review and manage gallery assets, when available.
          </p>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Upload className="w-4 h-4 text-sky-500" />
          <h3 className="text-sm font-black uppercase text-white">Upload New Media</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Image title"
            className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as GalleryItem['category'])}
            className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
          >
            <option value="General">General</option>
            <option value="Pots">Pots</option>
            <option value="Projects">Projects</option>
          </select>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Image description"
            rows={2}
            className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white md:col-span-2"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-neutral-300 md:col-span-2"
          />
        </div>
        {imageData && <img src={imageData} alt="Upload preview" className="h-32 w-48 object-cover rounded-sm border border-neutral-700" />}
        {uploadError && <p className="text-xs text-red-400">{uploadError}</p>}
        <button
          onClick={handleUpload}
          className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-sm text-xs font-black uppercase tracking-wider flex items-center gap-2"
        >
          <Image className="w-4 h-4" />
          Add to Website Gallery
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-900 p-4 rounded-sm border border-neutral-800">
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media..."
            className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
          />
        </div>

        <div className="flex gap-2">
          {['All', 'General', 'Pots', 'Projects'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-sm ${
                categoryFilter === cat ? 'bg-sky-600 text-white' : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden group relative">
            <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
            <div className="p-3">
              <span className="text-[9px] font-bold uppercase tracking-widest text-sky-500 block">{item.category}</span>
              <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-2 right-2 p-1.5 bg-red-950/80 hover:bg-red-900 text-red-200 rounded-sm border border-red-800 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete Asset"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
