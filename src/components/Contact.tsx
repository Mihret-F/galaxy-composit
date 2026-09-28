import React, { useState } from 'react';
import { COMPANY_CONTACT_INFO } from '../data/initialData';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  ExternalLink,
  Map,
  Navigation
} from 'lucide-react';
import { getWhatsAppLink } from './WhatsAppButton';

export const Contact: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [productInterest, setProductInterest] = useState('Flower Pots');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // FAQ open toggles
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What composite products do you manufacture at Galaxy Composite Manufacturing?',
      a: "We manufacture decorative fiberglass flower pots and planters, children's playground roundabouts and play systems, outdoor circular benches with canopy, water tanks, decorative wall panels, and custom bespoke fiberglass fabrications."
    },
    {
      q: 'Do you offer custom sizes and corporate finishes?',
      a: 'Yes! Every product can be customized in terms of dimensions, capacity, shape, gelcoat finish, and custom corporate or decorative colors.'
    },
    {
      q: 'How long does manufacturing take at your Addis Ababa facility?',
      a: 'Standard products in stock ship within 1–3 days. Custom fabrications typically take 7–30 days depending on complexity and volume.'
    },
    {
      q: 'Do you deliver across Ethiopia?',
      a: 'Yes, we provide secure packaging and nationwide delivery across all regional states of Ethiopia including Hawassa, Adama, Bahir Dar, Mekelle, Dire Dawa, and Bishoftu.'
    },
    {
      q: 'What is the minimum order quantity?',
      a: 'We serve individual homeowners ordering single planters as well as commercial institutions, hotels, and government agencies ordering bulk quantities.'
    },
    {
      q: 'How do I request an official quotation?',
      a: 'You can fill out our contact message form below, call us directly at +251 92 010 4692, or chat directly via WhatsApp for instant quotation and response.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          product: productInterest,
          subject: `Inquiry regarding ${productInterest}`,
          message
        })
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to send message. Please try calling or WhatsApp.');
      }
    } catch (err) {
      alert('Error sending message. Please try WhatsApp directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const currentWhatsappText = `Hello Galaxy Composite Manufacturing! My name is ${firstName} ${lastName}, Phone: ${phone}. I am interested in: ${productInterest}. Message: ${message}`;

  return (
    <div className="space-y-16 pb-12 animate-fadeIn">
      {/* Header */}
      <section className="bg-neutral-900 text-white py-14 px-4 sm:px-6 lg:px-8 rounded-sm border border-neutral-800">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sky-500 bg-sky-950 px-3 py-1 rounded-sm border border-sky-800">
            05. CONTACT & INQUIRIES
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white">
            Get In <span className="text-sky-600">Touch</span>
          </h1>
          <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
            We respond within 24 hours — visit our Supreme Court facility or request a detailed quotation.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 bg-neutral-900 text-white p-8 rounded-sm border border-neutral-800 space-y-8 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white">Contact Details</h2>

            <div className="space-y-4 text-xs text-neutral-300">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-sm bg-neutral-800 text-sky-500 flex items-center justify-center shrink-0 border border-neutral-700">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold text-neutral-400 uppercase tracking-wider text-[10px]">Phone / WhatsApp</span>
                  <a href="tel:+251920104692" className="block text-white font-bold hover:text-sky-400 text-sm">
                    +251 92 010 4692
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-sm bg-neutral-800 text-sky-500 flex items-center justify-center shrink-0 border border-neutral-700">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold text-neutral-400 uppercase tracking-wider text-[10px]">Official Email</span>
                  <a href="mailto:Djgoodluck2015@gmail.com" className="text-white font-bold hover:text-sky-400">
                    Djgoodluck2015@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-sm bg-neutral-800 text-sky-500 flex items-center justify-center shrink-0 border border-neutral-700">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold text-neutral-400 uppercase tracking-wider text-[10px]">Location</span>
                  <p className="text-white font-bold">
                    2P6J+2H Supreme Court
                  </p>
                  <p className="text-neutral-400 font-semibold">Addis Ababa, Ethiopia</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-sm bg-neutral-800 text-sky-500 flex items-center justify-center shrink-0 border border-neutral-700">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold text-neutral-400 uppercase tracking-wider text-[10px]">Working Hours</span>
                  <p className="text-white font-bold">Mon - Sat: 8:00 AM - 6:00 PM (EAT)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-800 space-y-3">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              DIRECT WHATSAPP SUPPORT
            </span>
            <a
              href={getWhatsAppLink(currentWhatsappText)}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase text-xs tracking-widest rounded-sm flex items-center justify-center gap-2 shadow transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Form Card */}
        <div className="lg:col-span-7 bg-white p-8 rounded-sm border border-neutral-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-900">Send Us A Message</h2>
            <p className="text-xs text-neutral-500">
              Fill in your details and product interest. We will send an official quotation.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-neutral-900 text-white rounded-sm border border-neutral-800 space-y-4">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-black uppercase tracking-tight text-white">Thank You! Message Sent Successfully</h3>
              <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                Our representative at Galaxy Composite Manufacturing will review your specifications and contact you promptly.
              </p>
              <div className="pt-2">
                <a
                  href={getWhatsAppLink(currentWhatsappText)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase rounded-sm shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat with Us on WhatsApp Now</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-sky-500 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="Your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-sky-500 focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-sky-500 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+251 92 010 4692"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-sky-500 focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-1">Product Interest</label>
                <select
                  value={productInterest}
                  onChange={(e) => setProductInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-sky-500 focus:outline-none text-xs"
                >
                  <option value="Flower Pots">Flower Pots & Planters</option>
                  <option value="Playground & Custom">Playground Equipment & Roundabouts</option>
                  <option value="Play Systems">Rainbow Play System</option>
                  <option value="Outdoor Benches">Circular Outdoor Bench with Canopy</option>
                  <option value="Water Tanks">Fiberglass Water Tanks</option>
                  <option value="Decorative Panels">Decorative Panels</option>
                  <option value="Custom Works">Custom Fabrications</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-neutral-800 uppercase tracking-wider text-[10px] mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your requirements, dimensions, or quantity…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-neutral-300 rounded-sm focus:ring-2 focus:ring-sky-500 focus:outline-none text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-black uppercase text-xs tracking-widest rounded-sm shadow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600 block">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-sm border border-neutral-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-black uppercase text-neutral-900 text-xs flex items-center justify-between gap-4 hover:bg-neutral-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-sky-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 text-white rounded-sm p-8 border border-neutral-800 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-sky-500 block">
                FACILITY LOCATION
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white">Addis Ababa Supreme Court Facility</h3>
              <p className="text-neutral-300 text-xs md:text-sm mt-1">
                2P6J+2H Supreme Court, Addis Ababa, Ethiopia
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=2P6J%2B2H+Supreme+Court,+Addis+Ababa"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-sky-600 hover:bg-sky-500 text-white font-extrabold uppercase text-xs tracking-widest rounded-sm flex items-center gap-1.5 shrink-0"
              >
                <Map className="w-4 h-4" />
                <span>View on Google Maps</span>
              </a>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=2P6J%2B2H+Supreme+Court,+Addis+Ababa"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-extrabold uppercase text-xs tracking-widest rounded-sm border border-neutral-700 flex items-center gap-1.5 shrink-0"
              >
                <Navigation className="w-4 h-4 text-sky-500" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          <div className="h-80 rounded-sm overflow-hidden border border-neutral-800 shadow">
            <iframe
              title="Galaxy Composite Manufacturing Supreme Court Location Map"
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
