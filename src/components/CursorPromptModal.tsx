import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Terminal } from 'lucide-react';

interface CursorPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CursorPromptModal: React.FC<CursorPromptModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  const cursorPromptText = `You are an expert full-stack web developer and UI designer. Generate a highly dynamic, interactive, and modern web application for "GALAXY COMPOSITE MANUFACTURING", Ethiopia's trusted manufacturer of premium fiberglass products in Addis Ababa.

### Core Business Overview:
- Company Name: GALAXY COMPOSITE MANUFACTURING (Galaxy Composite)
- Industry: Fiberglass & Composite Manufacturing (flower pots, garden planters, children's play systems, outdoor benches, water tanks, decorative panels, and custom fabrications)
- Location: 2P6J+2H Supreme Court, Addis Ababa, Ethiopia
- Contact Info: Phone/WhatsApp (+251 92 010 4692), Email (Djgoodluck2015@gmail.com)

### Required Key Pages & Architecture:
1. Header & Top Info Bar: Contact phone number (+251 92 010 4692), email, location, logo, and navigation links (Home, About, Products, Services, Gallery, Projects, Contact Us) + WhatsApp CTA button.
2. Home Page: High-impact hero section, company vision story, 4 company stats metrics (500+ Projects, 11+ Cities, 50+ Institutions, 10+ Years), featured products showcase, 6 core principles, 4-step process, featured projects, and map teaser.
3. About Page: Detailed origin story, 6 core principles, and 4-step manufacturing process.
4. Products Page (Dynamic Catalog & Admin Management):
   - Interactive search and category filters.
   - Live product list with pricing in Ethiopian Birr.
   - "View Details" Modal with full specifications, lead times, dimensions, and WhatsApp quote generator.
5. Admin Dashboard (/admin):
   - Secure server-side authentication (Express + bcryptjs + HttpOnly session cookie).
   - CRUD management for Products, Inquiry Messages, Gallery Assets, and Company Settings.
6. Services Page:
   - 6 Core Services: Design Consultation, Custom Manufacturing, Nationwide Delivery, Installation Support, Repair & Refinishing, After-Sales Support.
7. Contact Page:
   - Integrated contact form with server submission.
   - Direct WhatsApp quote message generator.
   - Embedded Google Map for Supreme Court, Addis Ababa.

### Tech Stack & Styling Guidelines:
- Framework: React with TypeScript, Vite, Tailwind CSS, Express backend server.
- Icons: Lucide-react.
- UI Design: Modern, ultra-clean orange & dark slate accents, responsive layout, fluid modals, smooth transitions, high visual polish.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cursorPromptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-neutral-900 text-neutral-100 rounded-sm max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-neutral-800 relative">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-neutral-800 text-sky-500 flex items-center justify-center border border-neutral-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
                Cursor AI Prompt Generator
              </h2>
              <p className="text-xs text-neutral-400">
                Copy this prompt directly into Cursor AI, v0, or ChatGPT to generate this complete composite manufacturing website.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-2 rounded-sm"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prompt Code View */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="bg-neutral-950 p-4 rounded-sm border border-neutral-800 font-mono text-xs text-sky-400 leading-relaxed whitespace-pre-wrap select-all">
            {cursorPromptText}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-800 flex items-center justify-between bg-neutral-900 rounded-b-sm">
          <span className="text-xs text-neutral-400 flex items-center gap-1.5 uppercase font-bold text-[10px] tracking-wider">
            <Terminal className="w-4 h-4 text-sky-500" />
            <span>Ready for Cursor AI Agent & Composer</span>
          </span>

          <button
            onClick={handleCopy}
            className={`px-5 py-2.5 rounded-sm font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow transition-all ${
              copied
                ? 'bg-sky-500 text-neutral-950'
                : 'bg-sky-600 hover:bg-sky-500 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Prompt Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Cursor Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
