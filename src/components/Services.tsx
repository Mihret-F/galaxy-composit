import React from 'react';
import { PageType } from '../types';
import { SERVICES, PROCESS_STEPS, COMPANY_CONTACT_INFO } from '../data/initialData';
import {
  PenTool,
  Factory,
  Truck,
  Wrench,
  ShieldCheck,
  Headphones,
  Check,
  ArrowRight,
  Phone,
  MessageSquare
} from 'lucide-react';
import { getWhatsAppLink } from './WhatsAppButton';

interface ServicesProps {
  setActivePage: (page: PageType) => void;
  onOpenQuickQuote: () => void;
}

export const Services: React.FC<ServicesProps> = ({ setActivePage, onOpenQuickQuote }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'PenTool':
        return <PenTool className="w-6 h-6 text-sky-500" />;
      case 'Factory':
        return <Factory className="w-6 h-6 text-sky-500" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-sky-500" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-sky-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-sky-500" />;
      default:
        return <Headphones className="w-6 h-6 text-sky-500" />;
    }
  };

  const handleAction = (action: string) => {
    if (action === 'products') {
      setActivePage('products');
    } else if (action === 'whatsapp') {
      window.open(getWhatsAppLink('Hello Galaxy Composite Manufacturing, I would like to request service support.'), '_blank');
    } else {
      onOpenQuickQuote();
    }
  };

  return (
    <div className="space-y-16 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <section className="bg-neutral-900 text-white py-14 px-4 sm:px-6 lg:px-8 rounded-sm border border-neutral-800">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sky-500 bg-sky-950 px-3 py-1 rounded-sm border border-sky-800">
            02. OUR SERVICES
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white">
            Manufacturing & <span className="text-sky-600">Custom Services</span>
          </h1>
          <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
            End-to-end fiberglass solutions — from first consultation to final delivery across all 11 regions of Ethiopia.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600 block">
            WHAT WE OFFER
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-neutral-900 mt-1">
            Complete Fiberglass Capabilities
          </h2>
          <p className="text-neutral-500 text-xs mt-1">
            From design consultation to manufacturing, delivery, and after-sales maintenance — we handle every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-sm border border-neutral-200 p-6 shadow-sm hover:border-sky-500 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-sm bg-neutral-900 flex items-center justify-center">
                    {getIcon(srv.iconName)}
                  </div>
                  <span className="text-xl font-black text-neutral-300">{srv.number}</span>
                </div>

                <h3 className="text-lg font-black uppercase text-neutral-900 tracking-tight">{srv.title}</h3>
                <p className="text-neutral-600 text-xs leading-relaxed">{srv.description}</p>

                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  {srv.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-800 font-bold">
                      <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleAction(srv.ctaAction)}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-sky-500 font-black uppercase tracking-wider rounded-sm text-xs flex items-center justify-center gap-2 border border-neutral-800 transition-colors"
              >
                <span>{srv.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Process "How It Works" */}
      <section className="bg-neutral-900 text-white py-16 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-500 block">
              TRANSPARENT STEPS
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
              How It Works
            </h2>
            <p className="text-neutral-400 text-xs md:text-sm">
              From first contact to final installation — smooth every time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-neutral-800 p-6 rounded-sm border border-neutral-700 space-y-3">
              <div className="w-8 h-8 rounded-sm bg-sky-600 text-white font-black text-sm flex items-center justify-center">
                1
              </div>
              <h3 className="font-black uppercase text-white text-base">Contact Us</h3>
              <p className="text-neutral-300 text-xs leading-relaxed">
                Call, WhatsApp, or submit our form. We respond with specs within 24 hours.
              </p>
            </div>

            <div className="bg-neutral-800 p-6 rounded-sm border border-neutral-700 space-y-3">
              <div className="w-8 h-8 rounded-sm bg-sky-600 text-white font-black text-sm flex items-center justify-center">
                2
              </div>
              <h3 className="font-black uppercase text-white text-base">Get Your Quote</h3>
              <p className="text-neutral-300 text-xs leading-relaxed">
                Detailed quote with exact pricing, mold specs, timeline, and delivery cost.
              </p>
            </div>

            <div className="bg-neutral-800 p-6 rounded-sm border border-neutral-700 space-y-3">
              <div className="w-8 h-8 rounded-sm bg-sky-600 text-white font-black text-sm flex items-center justify-center">
                3
              </div>
              <h3 className="font-black uppercase text-white text-base">We Manufacture</h3>
              <p className="text-neutral-300 text-xs leading-relaxed">
                Your product fabricated with heavy-duty gelcoats under strict quality testing.
              </p>
            </div>

            <div className="bg-neutral-800 p-6 rounded-sm border border-neutral-700 space-y-3">
              <div className="w-8 h-8 rounded-sm bg-sky-600 text-white font-black text-sm flex items-center justify-center">
                4
              </div>
              <h3 className="font-black uppercase text-white text-base">Delivered to You</h3>
              <p className="text-neutral-300 text-xs leading-relaxed">
                Safe, on-time delivery anywhere in Ethiopia — backed by our quality guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consult CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sky-600 text-white rounded-sm p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Ready to Order Custom Fiberglass Products?</h3>
            <p className="text-neutral-100 text-xs md:text-sm font-semibold">
              We serve municipal, commercial, hotel, and residential clients across Ethiopia.
            </p>
          </div>
          <button
            onClick={onOpenQuickQuote}
            className="px-8 py-3.5 bg-neutral-900 text-white font-extrabold uppercase text-xs tracking-widest rounded-sm shadow hover:bg-neutral-800 transition-colors shrink-0"
          >
            Get Free Quote Now
          </button>
        </div>
      </section>
    </div>
  );
};
