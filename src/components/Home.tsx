import React from 'react';
import { GalleryItem, PageType, Product } from '../types';
import {
  COMPANY_STATS,
  CORE_PRINCIPLES,
  PROCESS_STEPS,
  FEATURED_PROJECTS,
  COMPANY_CONTACT_INFO
} from '../data/initialData';
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Award,
  Users,
  MapPin,
  Sparkles,
  Phone,
  PlusCircle,
  ExternalLink,
  ChevronRight,
  Eye,
  MessageSquare,
  Images
} from 'lucide-react';
import { getWhatsAppLink } from './WhatsAppButton';

interface HomeProps {
  products: Product[];
  galleryItems: GalleryItem[];
  setActivePage: (page: PageType) => void;
  onSelectProduct: (product: Product) => void;
  onOpenQuickQuote: () => void;
}

export const Home: React.FC<HomeProps> = ({
  products,
  galleryItems,
  setActivePage,
  onSelectProduct,
  onOpenQuickQuote
}) => {
  const featuredProds = products.slice(0, 6);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative bg-white text-neutral-900 overflow-hidden py-16 md:py-24 border-b border-neutral-200">
        {/* Radial Glow Overlay */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-950 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 text-sky-700 text-[10px] font-bold uppercase tracking-widest border border-sky-200 rounded-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Premier Composite & Fiberglass Manufacturing in Addis Ababa</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-[76px] leading-[0.88] font-black uppercase tracking-tighter text-neutral-900">
                GALAXY COMPOSITE<br />
                <span className="text-sky-600">MANUFACTURING</span>
              </h1>

              <p className="max-w-xl text-neutral-600 text-xs md:text-sm leading-relaxed mx-auto lg:mx-0">
                From our manufacturing facility at Supreme Court, Addis Ababa to Ethiopia's most trusted fiberglass supplier. Serving homeowners, luxury hotels, playgrounds, and government institutions with precision-engineered composites.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setActivePage('products')}
                  className="bg-sky-600 px-8 py-3.5 font-extrabold uppercase text-xs tracking-widest hover:bg-sky-500 text-white rounded-sm shadow-md transition-all flex items-center gap-2"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenQuickQuote}
                  className="border border-neutral-300 px-8 py-3.5 font-extrabold uppercase text-xs tracking-widest hover:bg-neutral-100 text-neutral-900 rounded-sm transition-all"
                >
                  Request Quote
                </button>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 px-6 py-3.5 font-bold uppercase text-xs tracking-wider text-white rounded-sm transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Quick Highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 text-left border-t border-neutral-200 text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>UV & Weatherproof</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>10+ Yrs Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>11 Regions Delivery</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Feature Badge */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="relative w-64 h-64 border border-sky-600/30 rounded-full flex items-center justify-center bg-sky-50/60 backdrop-blur-sm shadow-2xl">
                <div className="w-48 h-48 border border-sky-600/50 rounded-full flex items-center justify-center">
                  <div className="text-center space-y-1">
                    <span className="block text-5xl font-black text-sky-500 tracking-tighter">10+</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-600 block">Years Experience</span>
                    <span className="text-[9px] text-sky-400 uppercase font-black block">Galaxy Composite</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-sm shadow-md border border-neutral-200 p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {COMPANY_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl md:text-5xl font-black text-sky-600 tracking-tight">
                {stat.value}
              </div>
              <div className="text-[10px] font-extrabold text-neutral-600 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Company Vision & Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-100 rounded-sm p-8 md:p-12 border border-neutral-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600 block">
              OUR VISION & STORY
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-neutral-900 leading-tight">
              Crafted with Ethiopian Innovation
            </h2>
            <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
              Galaxy Composite Manufacturing was founded with a clear vision: bring world-class fiberglass and composite manufacturing to Ethiopia. Starting from a specialized facility at Supreme Court, Addis Ababa, we have grown into one of the country's most trusted fiberglass suppliers — serving homeowners, luxury hotels, commercial plazas, and government bodies.
            </p>
            <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
              Our state-of-the-art facility produces world-class fiberglass solutions — from decorative planters and water tanks to playground roundabouts and custom architectural components. Every product is crafted with precision, using heavy-duty weather-resistant gelcoats.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setActivePage('about')}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-sky-600 hover:text-sky-500 transition-colors"
              >
                <span>Read Full Company Story</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <img
              src="/logo.jpg"
              alt="Galaxy Composite logo"
              className="rounded-sm shadow border border-neutral-200 object-contain h-44 w-full"
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600 block">
              01. POPULAR CATALOG
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-neutral-900 mt-1">
              Popular Products
            </h2>
            <p className="text-neutral-500 text-xs mt-1">
              Explore our best-selling planters, playgrounds, circular benches, and custom fabrications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('products')}
              className="px-5 py-2 bg-neutral-900 text-white rounded-sm text-xs font-extrabold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
            >
              <span>View All ({products.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProds.map((product, idx) => (
            <div
              key={product.id}
              className="bg-white rounded-sm border border-neutral-200 overflow-hidden shadow-sm hover:border-sky-500 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-52 bg-neutral-100 overflow-hidden border-b border-neutral-100">
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
                      New Post
                    </span>
                  )}
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-sky-600">
                    <span>{String(idx + 1).padStart(2, '0')}. {product.category}</span>
                  </div>
                  <h3 className="font-black uppercase text-neutral-900 text-lg leading-tight line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-neutral-600 text-xs leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {product.features.slice(0, 2).map((feat, i) => (
                      <span key={i} className="text-[10px] bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider">
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-5 pt-3 border-t border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                <div>
                  <span className="text-[9px] text-neutral-400 uppercase font-bold block tracking-widest">Price</span>
                  <span className="font-black text-neutral-900 text-base text-sky-600">
                    {product.price}
                  </span>
                </div>

                <button
                  onClick={() => onSelectProduct(product)}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-sm text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600 block">
              02. WORKSHOP & PROJECT GALLERY
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-neutral-900 mt-1">
              Our Work in Pictures
            </h2>
            <p className="text-neutral-500 text-xs mt-1">
              Fiberglass products and sustainable agriculture projects from Galaxy Composite.
            </p>
          </div>
          <button
            onClick={() => setActivePage('gallery')}
            className="px-5 py-2 bg-neutral-900 text-white rounded-sm text-xs font-extrabold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center gap-1.5 self-start md:self-auto"
          >
            <Images className="w-3.5 h-3.5" />
            <span>Open Full Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {galleryItems.slice(0, 6).map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage('gallery')}
              className="group relative aspect-[4/3] overflow-hidden bg-neutral-100 border border-neutral-200 text-left"
              aria-label={`Open gallery: ${item.title}`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-neutral-950/75 px-3 py-2 text-[10px] md:text-xs font-bold uppercase text-white">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 6 Core Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600 block">
            OUR FOUNDATION
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-neutral-900 mt-1">
            Core Manufacturing Principles
          </h2>
          <p className="text-neutral-500 text-xs mt-1">
            Six pillars that guide every fiberglass mould, material mix, and customer delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="bg-white p-6 rounded-sm border border-neutral-200 shadow-sm hover:border-sky-500 transition-all space-y-3"
            >
              <div className="text-2xl font-black text-sky-600 tracking-tighter">
                {principle.number}
              </div>
              <h3 className="text-base font-black uppercase tracking-tight text-neutral-900">
                {principle.title}
              </h3>
              <p className="text-neutral-600 text-xs leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="bg-white text-neutral-900 py-16 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-500 block">
              02. CORE SERVICES & PROCESS
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-neutral-900 mt-1">
              Manufacturing Process
            </h2>
            <p className="text-neutral-600 text-xs mt-1">
              From design specs to finished fiberglass delivery across Ethiopia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="bg-neutral-50 p-6 rounded-sm border border-neutral-200 relative space-y-3"
              >
                <div className="w-9 h-9 bg-sky-600 text-white font-black text-base flex items-center justify-center rounded-sm">
                  {step.number}
                </div>
                <h3 className="text-sm font-black uppercase text-neutral-900 tracking-wider">{step.title}</h3>
                <p className="text-neutral-600 text-xs leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600 block">
              03. FEATURED PROJECT
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-neutral-900 mt-1">
              Completed Installations
            </h2>
            <p className="text-neutral-500 text-xs mt-1">
              Real projects delivered across sports clubs, schools, hotels, and urban plazas.
            </p>
          </div>

          <button
            onClick={() => setActivePage('projects')}
            className="px-5 py-2 bg-neutral-900 text-white rounded-sm text-xs font-extrabold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-sm border border-neutral-200 overflow-hidden shadow-sm hover:border-sky-500 transition-all"
            >
              <div className="h-48 bg-neutral-100 relative">
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                <span className="absolute bottom-3 left-3 bg-neutral-900 text-sky-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm">
                  {proj.category} · {proj.year}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-sky-600 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{proj.location}</span>
                </div>
                <h3 className="font-black uppercase text-neutral-900 text-base">{proj.title}</h3>
                <p className="text-neutral-600 text-xs line-clamp-3 leading-relaxed">
                  {proj.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map Teaser & Location */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sky-600 text-white rounded-sm p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-lg">
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-900 block bg-white/20 px-2.5 py-1 rounded-sm w-fit">
              VISIT OUR FACILITY
            </span>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">Supreme Court, Addis Ababa</h3>
            <p className="text-neutral-100 text-xs md:text-sm font-semibold">
              2P6J+2H Supreme Court, Addis Ababa, Ethiopia
            </p>
            <p className="text-neutral-200 text-xs">Mon - Sat: 8:00 AM - 6:00 PM (EAT)</p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=2P6J%2B2H+Supreme+Court,+Addis+Ababa"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold uppercase text-xs tracking-widest rounded-sm flex items-center gap-1.5"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-sky-500" />
              </a>
              <button
                onClick={() => setActivePage('contact')}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold uppercase text-xs tracking-wider rounded-sm border border-white/30"
              >
                Contact Directions
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 h-56 rounded-sm overflow-hidden border border-sky-500 shadow">
            <iframe
              title="Galaxy Composite Manufacturing Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15762.635900593433!2d38.7512!3d9.0222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85c2d3a33333%3A0x1234567890abcdef!2sSupreme%20Court%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1710000000000!5m2!1sen!2set"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
