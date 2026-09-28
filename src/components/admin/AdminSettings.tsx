import React, { useState, useEffect } from 'react';
import { Save, Check, Building, Phone, Mail, MapPin, Globe } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    companyName: 'GALAXY COMPOSITE MANUFACTURING',
    shortName: 'GALAXY COMPOSITE',
    phone: '+251 92 010 4692',
    whatsapp: '+251 92 010 4692',
    email: 'Djgoodluck2015@gmail.com',
    address: '2P6J+2H Supreme Court, Addis Ababa',
    googleMapsLocation: '2P6J+2H Supreme Court, Addis Ababa'
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.companyName) {
          setSettings(data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      alert('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="pb-4 border-b border-neutral-800">
        <h2 className="text-xl font-black uppercase tracking-tight text-white italic">
          Company <span className="text-sky-500">Settings & Contact Parameters</span>
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          Manage official contact numbers, emails, location address, and map pointers.
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-950 border border-emerald-800 rounded-sm text-emerald-200 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Company settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 rounded-sm p-6 space-y-5 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Full Company Name
            </label>
            <input
              type="text"
              value={settings.companyName}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              required
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Short Brand Name
            </label>
            <input
              type="text"
              value={settings.shortName}
              onChange={(e) => setSettings({ ...settings, shortName: e.target.value })}
              required
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              required
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
              WhatsApp Number
            </label>
            <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              required
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Official Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              required
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
            Physical Address
          </label>
          <input
            type="text"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            required
            className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
            Google Maps Location String / Query
          </label>
          <input
            type="text"
            value={settings.googleMapsLocation}
            onChange={(e) => setSettings({ ...settings, googleMapsLocation: e.target.value })}
            required
            className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
          />
        </div>

        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-black text-xs uppercase tracking-widest rounded-sm shadow flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
