import React from 'react';
import { FEATURED_PROJECTS, COMPANY_STATS, COMPANY_CONTACT_INFO } from '../data/initialData';
import { PageType } from '../types';
import { MapPin, Calendar, Award, CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';

interface ProjectsProps {
  setActivePage: (page: PageType) => void;
  onOpenQuickQuoteWithProduct: (projectName: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ setActivePage, onOpenQuickQuoteWithProduct }) => {
  return (
    <div className="space-y-16 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <section className="bg-neutral-900 text-white py-14 px-4 sm:px-6 lg:px-8 rounded-sm border border-neutral-800">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sky-500 bg-sky-950 px-3 py-1 rounded-sm border border-sky-800">
            04. CASE STUDIES & PROJECTS
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white">
            Completed <span className="text-sky-600">Fiberglass Projects</span>
          </h1>
          <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
            Real installations, real results — serving communities, parks, luxury developments, and institutions across Ethiopia.
          </p>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-sm shadow-sm border border-neutral-200 p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {COMPANY_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl md:text-4xl font-black text-sky-600">
                {stat.value}
              </div>
              <div className="text-[10px] font-extrabold text-neutral-700 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Detailed List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600 block">
            PORTFOLIO SHOWCASE
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-neutral-900">
            Featured Case Studies
          </h2>
          <p className="text-neutral-500 text-xs">
            From sports stadium seating to educational playgrounds and urban landscaping — Bemnet FiberGlass delivers custom solutions built to last.
          </p>
        </div>

        <div className="space-y-12">
          {FEATURED_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-sm border border-neutral-200 overflow-hidden shadow-sm hover:border-sky-500 transition-all grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-5 h-72 lg:h-auto relative bg-neutral-900">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-neutral-900 text-sky-400 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-sm shadow border border-neutral-800">
                  {proj.category}
                </div>
              </div>

              <div className="lg:col-span-7 p-6 md:p-8 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
                    <span className="flex items-center gap-1 text-sky-600">
                      <MapPin className="w-3.5 h-3.5" />
                      {proj.location}
                    </span>
                    <span className="flex items-center gap-1 text-neutral-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {proj.year}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black uppercase tracking-tight text-neutral-900">{proj.title}</h3>
                  <p className="text-neutral-600 text-xs md:text-sm leading-relaxed mt-2">
                    {proj.description}
                  </p>

                  <div className="mt-4 space-y-2">
                    {proj.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-800 font-bold">
                        <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenQuickQuoteWithProduct(`Similar project to ${proj.title}`)}
                    className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white text-xs font-black uppercase tracking-widest rounded-sm shadow flex items-center gap-2"
                  >
                    <span>Request Similar Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Location Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 text-white rounded-sm p-8 border border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-500 block">
              FIND US AT FIGA
            </span>
            <h3 className="text-xl font-black uppercase tracking-tight text-white">Our Main Workshop</h3>
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
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
