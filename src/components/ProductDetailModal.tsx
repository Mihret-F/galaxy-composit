import React from 'react';
import { Product } from '../types';
import { X, Check, Phone, ShieldCheck, Clock, Layers, MessageSquare, ExternalLink } from 'lucide-react';
import { getWhatsAppLink } from './WhatsAppButton';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onInquire: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onInquire }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-neutral-900/80 hover:bg-neutral-900 text-white rounded-sm flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Media Preview */}
          <div className="bg-neutral-900 relative min-h-[280px] md:min-h-full flex items-center justify-center overflow-hidden rounded-t-sm md:rounded-tr-none md:rounded-l-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 bg-sky-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-sm shadow">
                {product.tag}
              </span>
            )}
          </div>

          {/* Details Content */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-1">
                {product.category}
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-900 leading-snug">
                {product.name}
              </h2>

              <div className="mt-3 text-lg font-black uppercase text-sky-600 bg-neutral-900 text-sky-400 border border-neutral-800 px-3 py-1.5 rounded-sm inline-block">
                {product.price}
              </div>

              <p className="mt-4 text-neutral-600 text-xs leading-relaxed">
                {product.description}
              </p>

              {/* Product Specifications */}
              <div className="mt-6 space-y-2.5 pt-4 border-t border-neutral-100">
                <h3 className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">
                  PRODUCT SPECIFICATIONS
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-neutral-700 font-semibold">
                      <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Meta Info */}
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs bg-neutral-50 p-3 rounded-sm border border-neutral-200">
                {product.dimensions && (
                  <div>
                    <span className="block text-neutral-400 font-bold uppercase text-[9px] tracking-wider">Dimensions</span>
                    <span className="font-bold text-neutral-800 text-xs">{product.dimensions}</span>
                  </div>
                )}
                {product.leadTime && (
                  <div>
                    <span className="block text-neutral-400 font-bold uppercase text-[9px] tracking-wider">Lead Time</span>
                    <span className="font-bold text-neutral-800 text-xs">{product.leadTime}</span>
                  </div>
                )}
                {product.material && (
                  <div className="col-span-2">
                    <span className="block text-neutral-400 font-bold uppercase text-[9px] tracking-wider">Material Grade</span>
                    <span className="font-bold text-neutral-800 text-xs">{product.material}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 pt-4 border-t border-neutral-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onInquire(product);
                  onClose();
                }}
                className="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-black uppercase text-xs tracking-widest py-3 px-4 rounded-sm shadow flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Request Formal Quote</span>
              </button>

              <a
                href={getWhatsAppLink(undefined, product.name)}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-xs tracking-wider py-3 px-4 rounded-sm flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
