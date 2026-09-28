import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Search, Filter, CheckCircle2, MessageSquare, Trash2, Send, Clock, User, X } from 'lucide-react';

interface Inquiry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  product: string;
  message: string;
  status: 'NEW' | 'READ' | 'REPLIED';
  createdAt: string;
  replies?: Array<{ message: string; date: string }>;
}

export const AdminInquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'NEW' | 'READ' | 'REPLIED'>('ALL');
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/admin/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'NEW' | 'READ' | 'REPLIED') => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
        if (activeInquiry && activeInquiry.id === id) {
          setActiveInquiry((prev) => (prev ? { ...prev, status } : null));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (activeInquiry && activeInquiry.id === id) {
          setActiveInquiry(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeInquiry || !replyMessage.trim()) return;

    setSendingReply(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${activeInquiry.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyMessage })
      });

      if (res.ok) {
        const data = await res.json();
        setReplyMessage('');
        fetchInquiries();
        if (data.inquiry) setActiveInquiry(data.inquiry);
        alert('Reply sent successfully to customer!');
      }
    } catch (err) {
      alert('Failed to send reply.');
    } finally {
      setSendingReply(false);
    }
  };

  const filtered = inquiries.filter((item) => {
    const matchesSearch =
      item.firstName.toLowerCase().includes(search.toLowerCase()) ||
      item.lastName.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search) ||
      item.subject.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === 'ALL' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-neutral-800">
        <h2 className="text-xl font-black uppercase tracking-tight text-white italic">
          Customer <span className="text-sky-500">Inquiry Center</span>
        </h2>
        <p className="text-xs text-neutral-400 mt-1">
          View customer submissions, manage message status, and reply directly via official email.
        </p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-neutral-900 p-4 rounded-sm border border-neutral-800">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries..."
            className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white placeholder-neutral-500"
          />
        </div>

        <div className="flex gap-2">
          {(['ALL', 'NEW', 'READ', 'REPLIED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-2 text-[10px] font-black uppercase tracking-wider rounded-sm transition-all ${
                filterStatus === st
                  ? 'bg-sky-600 text-white shadow'
                  : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-end text-xs text-neutral-400 font-bold uppercase">
          Total Inquiries: {filtered.length}
        </div>
      </div>

      {/* Inquiries Table & Details View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden shadow-xl">
          <div className="divide-y divide-neutral-800">
            {filtered.map((inq) => (
              <div
                key={inq.id}
                onClick={() => {
                  setActiveInquiry(inq);
                  if (inq.status === 'NEW') handleUpdateStatus(inq.id, 'READ');
                }}
                className={`p-4 cursor-pointer hover:bg-neutral-800/80 transition-colors ${
                  activeInquiry?.id === inq.id ? 'bg-neutral-800 border-l-4 border-sky-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">
                      {inq.firstName} {inq.lastName}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-xs text-[9px] font-black uppercase tracking-widest ${
                        inq.status === 'NEW'
                          ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                          : inq.status === 'REPLIED'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-500">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-xs text-neutral-300 font-semibold mb-1">{inq.subject}</div>
                <div className="text-[11px] text-neutral-400 line-clamp-2">{inq.message}</div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="p-8 text-center text-neutral-500 text-xs font-bold uppercase">
                No inquiries found.
              </div>
            )}
          </div>
        </div>

        {/* Selected Inquiry Detail & Reply Box */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-6 shadow-xl space-y-6">
          {activeInquiry ? (
            <>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div>
                  <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest block">
                    INQUIRY DETAILS
                  </span>
                  <h3 className="text-base font-black text-white">{activeInquiry.subject}</h3>
                </div>
                <button onClick={() => handleDelete(activeInquiry.id)} className="p-1.5 text-red-400 hover:bg-red-950 rounded-sm">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-sky-500" />
                  <span>{activeInquiry.firstName} {activeInquiry.lastName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-sky-500" />
                  <a href={`mailto:${activeInquiry.email}`} className="text-sky-400 hover:underline">{activeInquiry.email || 'No Email Provided'}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-sky-500" />
                  <a href={`tel:${activeInquiry.phone}`} className="text-white hover:underline">{activeInquiry.phone}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-500" />
                  <span>{new Date(activeInquiry.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-sm">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-1">
                  Customer Message:
                </span>
                <p className="text-xs text-neutral-200 leading-relaxed whitespace-pre-wrap">
                  {activeInquiry.message}
                </p>
              </div>

              {/* Existing Replies */}
              {activeInquiry.replies && activeInquiry.replies.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                    Sent Replies:
                  </span>
                  {activeInquiry.replies.map((rep, idx) => (
                    <div key={idx} className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-sm text-xs text-emerald-200">
                      <p>{rep.message}</p>
                      <span className="text-[9px] text-emerald-400/70 block mt-1">
                        {new Date(rep.date).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="space-y-3 pt-4 border-t border-neutral-800">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300">
                  Send Customer Email Reply
                </label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={4}
                  required
                  placeholder="Type official reply message to be emailed to customer..."
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white"
                />
                <button
                  type="submit"
                  disabled={sendingReply}
                  className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-black text-xs uppercase tracking-widest rounded-sm shadow flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{sendingReply ? 'Sending Email Reply...' : 'Send Reply Email'}</span>
                </button>
              </form>
            </>
          ) : (
            <div className="p-12 text-center text-neutral-500 text-xs font-bold uppercase">
              Select an inquiry from the list to view details and send email replies.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
