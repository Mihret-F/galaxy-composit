import React, { useState } from 'react';
import { Lock, User, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToWebsite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToWebsite }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onLoginSuccess();
      } else {
        setError(data.error || 'Invalid username or password.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center p-4 selection:bg-sky-600 selection:text-white">
      <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-sm p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle orange accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500" />

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-neutral-800 rounded-sm mx-auto mb-4 p-2 flex items-center justify-center border border-neutral-700 shadow-md">
            <img src="/logo.jpg" alt="Galaxy Composite Logo" className="w-full h-full object-contain rounded-xs" />
          </div>
          <h1 className="text-xl font-black uppercase tracking-tight text-white italic">
            GALAXY <span className="text-sky-500">COMPOSITE</span>
          </h1>
          <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mt-1">
            ADMIN CONTROL PORTAL
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/80 border border-red-800/80 rounded-sm text-red-200 text-xs font-semibold text-center animate-fadeIn">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="w-full pl-9 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-white text-xs placeholder-neutral-600 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-9 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-white text-xs placeholder-neutral-600 focus:outline-none focus:border-sky-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs uppercase tracking-widest rounded-sm shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'SIGN IN TO ADMIN PANEL'}</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-800 text-center">
          <button
            onClick={onBackToWebsite}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-sky-500" />
            <span>Back to Main Website</span>
          </button>
        </div>
      </div>
    </div>
  );
};
