import React, { useEffect, useState } from 'react';
import { X, Send, CheckCircle, MessageSquare, Phone } from 'lucide-react';
import { getWhatsAppLink } from './WhatsAppButton';

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

export const QuickQuoteModal: React.FC<QuickQuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct = ''
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [productType, setProductType] = useState(preselectedProduct || 'Flower Pots');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setProductType(preselectedProduct || 'Flower Pots');
      setSubmitError('');
    }
  }, [isOpen, preselectedProduct]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: name,
          email,
          phone,
          product: productType,
          subject: `Quote Request for ${productType}`,
          message
        })
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || 'The quote request could not be saved.');
      }
      setSent(true);
    } catch (err) {
      console.error(err);
      setSubmitError(err instanceof Error ? err.message : 'The quote request could not be saved.');
      return;
    }
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2500);
  };

  const whatsappMsgText = `Hello Galaxy Composite Manufacturing! Name: ${name || 'Customer'}, Phone: ${phone}, Interest: ${productType}. Note: ${message}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-sm max-w-lg w-full p-6 md:p-8 shadow-2xl border border-neutral-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 p-2 rounded-sm"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-sm bg-neutral-900 text-sky-500 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900">Request Custom Quote</h2>
            <p className="text-xs text-neutral-500">
              Get pricing and lead times from Galaxy Composite Manufacturing.
            </p>
          </div>
        </div>

        {sent ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-lg font-black uppercase text-neutral-900">Quote Request Submitted!</h3>
            <p className="text-xs text-neutral-600">
              Our engineering team will contact you promptly at <span className="font-bold">{phone || 'your phone number'}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Abebe Bikila"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-sky-500 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+251 92 010 4692"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-sky-500 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-sky-500 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-1">Product Category</label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-sky-500 text-xs"
              >
                <option value="Flower Pots">Decorative Flower Pots & Planters</option>
                <option value="Playground & Custom">Playground Equipment & Roundabouts</option>
                <option value="Play Systems">Rainbow Adventure Play System</option>
                <option value="Outdoor Furniture">Circular Benches & Canopies</option>
                <option value="Decorative Panels">Decorative Panels & Facades</option>
                <option value="Custom Works">Custom Fiberglass Fabrication</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-1">Project Details / Quantities</label>
              <textarea
                rows={3}
                placeholder="Specify dimensions, quantities, delivery city or custom design requirements..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-sky-500 text-xs"
              />
            </div>

            <div className="pt-2 space-y-2">
              {submitError && (
                <p className="text-xs font-semibold text-red-600" role="alert">
                  {submitError}
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-black uppercase tracking-widest rounded-sm shadow text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Quote Request</span>
              </button>

              <a
                href={getWhatsAppLink(whatsappMsgText)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider rounded-sm text-xs flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant Chat via WhatsApp</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
