import React from 'react';
import { PageType } from '../types';
import { COMPANY_CONTACT_INFO } from '../data/initialData';
import { Phone, Mail, MapPin, Clock, ArrowRight, MessageSquare, ShieldCheck, Map } from 'lucide-react';
import { getWhatsAppLink } from './WhatsAppButton';

interface FooterProps {
  setActivePage: (page: PageType | 'admin') => void;
  onOpenQuickQuote: () => void;
  onOpenCursorPrompt: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onOpenQuickQuote }) => {
  const handleNav = (page: PageType | 'admin') => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-neutral-700 pt-16 pb-6 border-t border-neutral-200">
      {/* Call To Action Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-neutral-100 rounded-sm p-8 md:p-12 border border-neutral-200 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-sky-500 mb-2">
              GET STARTED TODAY
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-neutral-900">
              Ready for Your <span className="text-sky-600">Next Project?</span>
            </h2>
            <p className="mt-3 text-neutral-600 text-xs md:text-sm leading-relaxed">
              Get a free consultation and custom quote. Our manufacturing team at Supreme Court, Addis Ababa is ready to deliver world-class fiberglass fabrications.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenQuickQuote}
              className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold uppercase text-xs tracking-widest rounded-sm shadow transition-all"
            >
              Request Quote
            </button>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-xs tracking-widest rounded-sm transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-neutral-200">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-neutral-100 rounded-sm p-1 flex items-center justify-center border border-neutral-200">
              <img src="/logo.jpg" alt="Galaxy Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="block font-black text-lg tracking-tighter uppercase italic leading-none text-neutral-900">
                GALAXY <span className="text-sky-600">COMPOSITE</span>
              </span>
              <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
                MANUFACTURING ETHIOPIA
              </span>
            </div>
          </div>
          <p className="text-neutral-600 text-xs leading-relaxed">
            Ethiopia's premier manufacturer of high-quality fiberglass and composite products — serving homeowners, luxury hotels, playgrounds, and government institutions.
          </p>
          <div className="pt-2">
            <button
              onClick={() => handleNav('admin')}
              className="inline-flex items-center gap-1.5 text-xs text-sky-500 hover:text-sky-400 font-bold uppercase tracking-wider"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Control Panel Login</span>
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-4">
            Navigation
          </h3>
          <ul className="space-y-2.5 text-xs font-bold uppercase tracking-wider">
            <li>
              <button onClick={() => handleNav('home')} className="hover:text-sky-500 transition-colors">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('about')} className="hover:text-sky-500 transition-colors">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('products')} className="hover:text-sky-500 transition-colors">
                Products
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('services')} className="hover:text-sky-500 transition-colors">
                Services
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('gallery')} className="hover:text-sky-500 transition-colors">
                Gallery
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('projects')} className="hover:text-sky-500 transition-colors">
                Projects
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('contact')} className="hover:text-sky-500 transition-colors">
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-4">
            Products
          </h3>
          <ul className="space-y-2.5 text-xs font-bold uppercase tracking-wider">
            <li>
              <button onClick={() => handleNav('products')} className="hover:text-sky-500 transition-colors">
                Flower Pots
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('products')} className="hover:text-sky-500 transition-colors">
                Garden Planters
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('products')} className="hover:text-sky-500 transition-colors">
                Children's Roundabout
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('products')} className="hover:text-sky-500 transition-colors">
                Rainbow Play System
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('products')} className="hover:text-sky-500 transition-colors">
                Custom Fabrications
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-4">
            Visit & Contact
          </h3>
          <div className="flex items-start gap-2.5 text-xs text-neutral-700">
            <Phone className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5 font-semibold">
              <a href="tel:+251920104692" className="block hover:text-sky-500">
                +251 92 010 4692
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-neutral-700 font-semibold">
            <Mail className="w-4 h-4 text-sky-500 shrink-0" />
            <a href="mailto:Djgoodluck2015@gmail.com" className="hover:text-sky-500">
              Djgoodluck2015@gmail.com
            </a>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-neutral-700">
            <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
            <span>2P6J+2H Supreme Court, Addis Ababa</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-neutral-300 pt-1">
            <a
              href="https://maps.google.com/?q=2P6J%2B2H+Supreme+Court,+Addis+Ababa"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sky-400 hover:underline font-bold text-[11px]"
            >
              <Map className="w-3.5 h-3.5" />
              <span>Google Maps Location</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] font-bold uppercase tracking-widest text-neutral-500 gap-4">
        <div>
          © 2026 Galaxy Composite Manufacturing. Quality First · Sustainability · Integrity
        </div>
        <div className="text-[10px] text-neutral-400">
          Galaxy Composite Manufacturing · Addis Ababa, Ethiopia
        </div>
      </div>
    </footer>
  );
};
