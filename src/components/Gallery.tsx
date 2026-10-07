import React, { useState } from 'react';
import { COMPANY_CONTACT_INFO } from '../data/initialData';
import { GalleryItem } from '../types';
import { X, ZoomIn, MapPin, Download, ExternalLink, ArrowRight } from 'lucide-react';

interface GalleryProps {
  items: GalleryItem[];
}

export const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);
  const [portfolioRequested, setPortfolioRequested] = useState(false);

  const categories = ['All', 'General', 'Pots', 'Projects'];

  const filteredItems = items.filter((item) => {
    if (selectedFilter === 'All') return true;
    return item.category === selectedFilter;
  });

  return (
    <div className="space-y-12 pb-12 animate-fadeIn">
      {/* Header */}
      <section className="bg-neutral-900 text-white py-14 px-4 sm:px-6 lg:px-8 rounded-sm border border-neutral-800">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sky-500 bg-sky-950 px-3 py-1 rounded-sm border border-sky-800">
            03. PORTFOLIO GALLERY
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white">
            Our Work <span className="text-sky-600">in Action</span>
          </h1>
          <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
            Explore our fiberglass products and solar-powered hydroponic fodder projects.
          </p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => {
          const isActive = selectedFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-5 py-2.5 rounded-sm text-xs font-black uppercase tracking-wider transition-all ${
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

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveLightbox(item)}
            className="group cursor-pointer bg-white rounded-sm overflow-hidden border border-neutral-200 shadow-sm hover:border-sky-500 transition-all relative"
          >
            <div className="relative h-64 bg-neutral-100 overflow-hidden border-b border-neutral-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <ZoomIn className="w-8 h-8 text-sky-500" />
              </div>
              <span className="absolute top-3 left-3 bg-neutral-900 text-sky-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm shadow">
                {item.category}
              </span>
            </div>

            <div className="p-4 space-y-1">
              <h3 className="font-black uppercase text-neutral-900 text-sm leading-snug line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-1 font-semibold">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Request Full Portfolio Callout */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-neutral-100 rounded-sm p-8 border border-neutral-200 text-center space-y-4">
          <h3 className="text-xl font-black uppercase text-neutral-900 tracking-tight">
            Want to see more of our work?
          </h3>
          <p className="text-neutral-600 text-xs md:text-sm max-w-xl mx-auto">
            We have many more completed projects across luxury hotels, parks, schools, and municipal installations in Ethiopia.
          </p>

          {portfolioRequested ? (
            <div className="p-4 bg-sky-950 text-sky-400 border border-sky-800 rounded-sm text-xs font-black uppercase tracking-widest inline-block">
              ✓ Full Portfolio PDF Download Sent to Your Request!
            </div>
          ) : (
            <button
              onClick={() => setPortfolioRequested(true)}
              className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-black uppercase tracking-widest rounded-sm text-xs shadow inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Request Full Portfolio PDF</span>
            </button>
          )}
        </div>
      </section>

      {/* Location Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 text-white rounded-sm p-8 border border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-500 block">
              VISIT OUR WORKSHOP
            </span>
            <h3 className="text-xl font-black uppercase tracking-tight text-white">Figa, Addis Ababa Location</h3>
            <p className="text-neutral-300 text-xs md:text-sm">
              Figa Infront of Noah Real Estate | ኖህ ሪልስቴት ፊትለፊት
            </p>
            <p className="text-neutral-400 text-xs">Addis Ababa, Ethiopia · {COMPANY_CONTACT_INFO.workingHours}</p>
          </div>

          <div className="flex flex-wrap md:justify-end gap-3">
            <a
              href="https://maps.google.com/?q=Figa+Noah+Real+Estate+Addis+Ababa"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-sky-600 text-white font-extrabold uppercase text-xs tracking-widest rounded-sm hover:bg-sky-500 flex items-center gap-1.5"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-h-[75vh] bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 text-white space-y-1">
              <span className="text-xs text-emerald-400 font-bold uppercase">
                {activeLightbox.category}
              </span>
              <h2 className="text-lg font-bold">{activeLightbox.title}</h2>
              <p className="text-xs text-slate-400">{activeLightbox.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
