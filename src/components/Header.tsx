import React, { useState } from 'react';
import { PageType } from '../types';
import { COMPANY_CONTACT_INFO } from '../data/initialData';
import { Phone, Mail, MapPin, Clock, Menu, X, PlusCircle, MessageSquare, Sparkles, ShieldCheck } from 'lucide-react';
import { getWhatsAppLink } from './WhatsAppButton';

interface HeaderProps {
  activePage: PageType | 'admin';
  setActivePage: (page: PageType | 'admin') => void;
  onOpenQuickQuote: () => void;
  onOpenCursorPrompt: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  onOpenQuickQuote,
  onOpenCursorPrompt
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (page: PageType | 'admin') => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-neutral-200">
      {/* Top Bar - Contact Info */}
      <div className="bg-neutral-900 text-neutral-300 text-[11px] font-bold uppercase tracking-widest py-2 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-5">
            <a
              href={`mailto:${COMPANY_CONTACT_INFO.email}`}
              className="flex items-center gap-1.5 hover:text-sky-500 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-sky-500" />
              <span>{COMPANY_CONTACT_INFO.email}</span>
            </a>
            <div className="hidden sm:flex items-center gap-1.5 text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-sky-500" />
              <span>{COMPANY_CONTACT_INFO.address}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-sky-500" />
              <a href="tel:+251920104692" className="hover:text-sky-500 transition-colors">
                +251 92 010 4692
              </a>
            </div>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-xs text-[10px] font-extrabold transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-1 bg-neutral-800 hover:bg-neutral-700 text-sky-400 px-2.5 py-1 rounded-xs text-[10px] font-extrabold border border-neutral-700 transition-colors"
            >
              <ShieldCheck className="w-3 h-3 text-sky-500" />
              <span>Admin Panel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 bg-neutral-900 rounded-sm p-1 flex items-center justify-center border border-neutral-800 shadow-sm group-hover:border-sky-500 transition-colors">
              <img src="/logo.jpg" alt="Galaxy Composite Logo" className="w-full h-full object-contain rounded-xs" />
            </div>
            <div>
              <span className="block font-black text-xl sm:text-2xl tracking-tighter uppercase italic leading-none text-neutral-900">
                GALAXY <span className="text-sky-600">COMPOSITE</span>
              </span>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mt-0.5">
                MANUFACTURING ETHIOPIA
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-7 text-xs font-bold uppercase tracking-widest">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`py-1 transition-all ${
                    isActive
                      ? 'border-b-2 border-sky-600 text-sky-600 font-extrabold'
                      : 'text-neutral-700 hover:text-sky-600'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenQuickQuote}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-black uppercase tracking-widest text-white bg-sky-600 hover:bg-sky-500 rounded-sm shadow transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Request Quote</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-sm text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-4 pt-2 pb-4 space-y-2 shadow-lg animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-neutral-900 text-sky-500 font-extrabold border-l-4 border-sky-600'
                    : 'text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                <span>{link.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-neutral-200 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuickQuote();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-sky-600 text-white font-extrabold uppercase text-xs tracking-widest rounded-sm shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Get Free Quote</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavClick('admin');
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-neutral-900 text-sky-400 font-bold uppercase text-[11px] tracking-wider rounded-sm border border-neutral-800"
            >
              <ShieldCheck className="w-4 h-4 text-sky-500" />
              <span>Admin Portal Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
