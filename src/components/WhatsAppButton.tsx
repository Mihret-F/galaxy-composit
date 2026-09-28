import React from 'react';
import { MessageSquare } from 'lucide-react';
import { COMPANY_CONTACT_INFO } from '../data/initialData';

export const getWhatsAppLink = (customText?: string, productName?: string, subject?: string) => {
  const number = COMPANY_CONTACT_INFO.whatsapp;
  let text = customText || 'Hello Galaxy Composite Manufacturing,\nI would like to request more information about your products/services.';
  
  if (!customText && productName) {
    text = `Hello Galaxy Composite Manufacturing,\nI am interested in ${productName}.\nPlease provide more information and a quotation.`;
  } else if (!customText && subject) {
    text = `Hello Galaxy Composite Manufacturing,\nInquiry regarding: ${subject}.\nPlease provide details and quotation.`;
  }
  
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};

interface FloatingWhatsAppButtonProps {
  productName?: string;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({ productName }) => {
  const link = getWhatsAppLink(undefined, productName);

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-emerald-400/40 group"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageSquare className="w-6 h-6 animate-pulse" />
      <span className="hidden sm:inline font-bold uppercase tracking-wider text-xs">
        Chat on WhatsApp
      </span>
    </a>
  );
};

export const WhatsAppButton = FloatingWhatsAppButton;
