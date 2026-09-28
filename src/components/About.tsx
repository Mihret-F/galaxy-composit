import React from 'react';
import { PageType } from '../types';
import { CORE_PRINCIPLES, PROCESS_STEPS, COMPANY_CONTACT_INFO } from '../data/initialData';
import { ShieldCheck, Award, Factory, Users, HeartHandshake, Check, Phone, ArrowRight } from 'lucide-react';

interface AboutProps {
  setActivePage: (page: PageType) => void;
  onOpenQuickQuote: () => void;
}

export const About: React.FC<AboutProps> = ({ setActivePage, onOpenQuickQuote }) => {
  return (
    <div className="space-y-16 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <section className="bg-neutral-900 text-white py-14 px-4 sm:px-6 lg:px-8 rounded-sm border border-neutral-800">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sky-500 bg-sky-950 px-3 py-1 rounded-sm border border-sky-800">
            COMPANY PROFILE
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white">
            Ethiopia's Premier <span className="text-sky-600">Composite & Fiberglass Manufacturer</span>
          </h1>
          <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
            Delivering precision-crafted fiberglass solutions from our facility at Supreme Court, Addis Ababa to communities, luxury hotels, and institutions nationwide.
          </p>
        </div>
      </section>

      {/* Vision & History Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600 block">
              OUR JOURNEY
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-neutral-900">
              Founded With A Simple Vision
            </h2>
            <div className="space-y-3 text-neutral-600 text-xs md:text-sm leading-relaxed">
              <p>
                <strong className="text-neutral-900 font-black">Galaxy Composite Manufacturing</strong> was founded with a clear vision: bring world-class fiberglass and composite manufacturing to Ethiopia. Starting from a specialized workshop in Addis Ababa, we have grown into one of the country's most trusted fiberglass suppliers — serving homeowners, luxury hotels, commercial plazas, and government bodies.
              </p>
              <p>
                Our state-of-the-art facility produces world-class fiberglass solutions — from decorative planters and water tanks to playground systems and custom architectural fabrications. Every product is crafted with precision, using heavy-duty weather-resistant gelcoats.
              </p>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-neutral-100 rounded-sm border border-neutral-200">
                <span className="block font-black text-neutral-900 text-base uppercase">Over 10+ Years</span>
                <span className="text-neutral-600 font-bold uppercase tracking-wider text-[10px]">Local manufacturing expertise</span>
              </div>
              <div className="p-4 bg-neutral-900 text-sky-400 rounded-sm border border-neutral-800">
                <span className="block font-black text-white text-base uppercase">All 11 Regions</span>
                <span className="text-sky-300 font-bold uppercase tracking-wider text-[10px]">Nationwide delivery & installation</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-sm overflow-hidden shadow-xl border border-neutral-300 bg-neutral-900 relative">
              <img
                src="/10.jpg"
                alt="Galaxy Composite Manufacturing Workshop"
                className="w-full h-[380px] object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white p-4">
                <p className="font-black text-sm uppercase tracking-tight text-white">Manufacturing at Supreme Court, Addis Ababa</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-sky-400">Precision Crafted Every Day</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Principles */}
      <section className="bg-neutral-100 py-16 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600 block">
              CORE VALUES
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-neutral-900">
              What Drives Everything We Do
            </h2>
            <p className="text-neutral-600 text-xs">
              Six core principles that guide every product we make and every relationship we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                className="bg-white p-6 rounded-sm border border-neutral-200 shadow-sm space-y-3 hover:border-sky-500 transition-all"
              >
                <div className="w-9 h-9 rounded-sm bg-neutral-900 text-sky-500 font-black text-sm flex items-center justify-center">
                  {principle.number}
                </div>
                <h3 className="text-base font-black uppercase tracking-tight text-neutral-900">{principle.title}</h3>
                <p className="text-neutral-600 text-xs leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600 block">
            HOW WE WORK
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-neutral-900">
            Simple & Transparent Process
          </h2>
          <p className="text-neutral-600 text-xs">
            From first inquiry to your door — a smooth experience every time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-white p-6 rounded-sm border border-neutral-200 shadow-sm space-y-3 relative"
            >
              <div className="w-8 h-8 rounded-sm bg-neutral-900 text-sky-500 font-black text-sm flex items-center justify-center">
                {step.number}
              </div>
              <h3 className="text-sm font-black uppercase text-neutral-900 tracking-wider">{step.title}</h3>
              <p className="text-neutral-600 text-xs leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Manufacturing Standards & Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 text-white rounded-sm p-8 md:p-12 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <h3 className="text-2xl font-black uppercase tracking-tighter text-white">
              Need Custom Fiberglass Architectural or Playground Components?
            </h3>
            <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
              Our engineering team handles technical drawings, resin formulations, and structural testing. Visit our facility at Supreme Court, Addis Ababa or request a free consultation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <button
              onClick={onOpenQuickQuote}
              className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-black uppercase text-xs tracking-widest rounded-sm shadow transition-all"
            >
              Request Consultation
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className="px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold uppercase text-xs tracking-wider rounded-sm border border-neutral-700"
            >
              Contact Workshop
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
