import React, { useState, useEffect } from 'react';
import { GalleryItem, Product } from '../../types';
import { AdminProducts } from './AdminProducts';
import { AdminAddProduct } from './AdminAddProduct';
import { AdminInquiries } from './AdminInquiries';
import { AdminGallery } from './AdminGallery';
import { AdminSettings } from './AdminSettings';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Layers,
  FileText,
  Video
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  galleryItems: GalleryItem[];
  onUpdateGallery: (items: GalleryItem[]) => void;
  onLogout: () => void;
  onViewWebsite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onUpdateProducts,
  galleryItems,
  onUpdateGallery,
  onLogout,
  onViewWebsite
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'addProduct' | 'gallery' | 'inquiries' | 'settings'>('dashboard');
  const [inquiryStats, setInquiryStats] = useState({ total: 0, unread: 0 });

  useEffect(() => {
    fetch('/api/admin/inquiries')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.inquiries)) {
          const total = data.inquiries.length;
          const unread = data.inquiries.filter((i: any) => i.status === 'NEW').length;
          setInquiryStats({ total, unread });
        }
      })
      .catch((err) => console.error(err));
  }, [activeTab]);

  const handleAddProduct = (newProd: Product) => {
    onUpdateProducts([newProd, ...products]);
    setActiveTab('products');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col md:flex-row font-sans selection:bg-sky-600 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col shrink-0">
        {/* Sidebar Header / Brand */}
        <div className="p-6 border-b border-neutral-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-neutral-800 rounded-sm p-1.5 flex items-center justify-center border border-neutral-700">
            <img src="/logo.jpg" alt="Galaxy Logo" className="w-full h-full object-contain rounded-xs" />
          </div>
          <div>
            <h1 className="font-black text-sm uppercase italic tracking-tighter text-white leading-none">
              GALAXY <span className="text-sky-500">COMPOSITE</span>
            </h1>
            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block mt-1">
              ADMIN CONTROL PANEL
            </span>
          </div>
        </div>

        {/* Sidebar Navigation Items */}
        <nav className="p-4 space-y-1.5 flex-1 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-sm transition-all ${
              activeTab === 'dashboard'
                ? 'bg-sky-600 text-white font-black shadow'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-sm transition-all ${
              activeTab === 'products'
                ? 'bg-sky-600 text-white font-black shadow'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products</span>
          </button>

          <button
            onClick={() => setActiveTab('addProduct')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-sm transition-all ${
              activeTab === 'addProduct'
                ? 'bg-sky-600 text-white font-black shadow'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Product</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-sm transition-all ${
              activeTab === 'gallery'
                ? 'bg-sky-600 text-white font-black shadow'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gallery & Media</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm transition-all ${
              activeTab === 'inquiries'
                ? 'bg-sky-600 text-white font-black shadow'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4" />
              <span>Inquiries</span>
            </div>
            {inquiryStats.unread > 0 && (
              <span className="px-1.5 py-0.5 bg-sky-500 text-white text-[9px] font-black rounded-xs">
                {inquiryStats.unread}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-sm transition-all ${
              activeTab === 'settings'
                ? 'bg-sky-600 text-white font-black shadow'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-neutral-800 space-y-2">
          <button
            onClick={onViewWebsite}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-sm border border-neutral-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-sky-500" />
            <span>View Website</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-950/80 rounded-sm border border-red-900/50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>

      {/* Main Admin View Container */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="pb-4 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-sky-500 block">
                  SYSTEM OVERVIEW
                </span>
                <h2 className="text-2xl font-black uppercase tracking-tight text-white italic">
                  ADMIN <span className="text-sky-500">DASHBOARD</span>
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-sm font-bold uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Session Secure</span>
              </div>
            </div>

            {/* Stats Overview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-sm shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Total Products</span>
                  <Package className="w-5 h-5 text-sky-500" />
                </div>
                <div className="text-3xl font-black text-white">{products.length}</div>
                <p className="text-[10px] text-neutral-500 mt-1 uppercase font-bold">In Active Catalog</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-sm shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Published Products</span>
                  <Layers className="w-5 h-5 text-sky-500" />
                </div>
                <div className="text-3xl font-black text-white">{products.length}</div>
                <p className="text-[10px] text-neutral-500 mt-1 uppercase font-bold">100% Live on Site</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-sm shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Total Inquiries</span>
                  <MessageSquare className="w-5 h-5 text-sky-500" />
                </div>
                <div className="text-3xl font-black text-white">{inquiryStats.total}</div>
                <p className="text-[10px] text-neutral-500 mt-1 uppercase font-bold">Customer Submissions</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-sm shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Unread Inquiries</span>
                  <FileText className="w-5 h-5 text-amber-500" />
                </div>
                <div className="text-3xl font-black text-amber-400">{inquiryStats.unread}</div>
                <p className="text-[10px] text-amber-500/80 mt-1 uppercase font-bold">Action Required</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-sm shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Total Images</span>
                  <ImageIcon className="w-5 h-5 text-sky-500" />
                </div>
                <div className="text-3xl font-black text-white">0</div>
                <p className="text-[10px] text-neutral-500 mt-1 uppercase font-bold">Gallery Assets</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-sm shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Total Videos</span>
                  <Video className="w-5 h-5 text-sky-500" />
                </div>
                <div className="text-3xl font-black text-white">0</div>
                <p className="text-[10px] text-neutral-500 mt-1 uppercase font-bold">Media Showreels</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-white">Quick Control Shortcuts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('addProduct')}
                  className="p-4 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-sm text-left group transition-all"
                >
                  <PlusCircle className="w-5 h-5 text-sky-500 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-xs text-white uppercase block">Add Product</span>
                  <span className="text-[10px] text-neutral-400">List new item in catalog</span>
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="p-4 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-sm text-left group transition-all"
                >
                  <MessageSquare className="w-5 h-5 text-sky-500 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-xs text-white uppercase block">Customer Messages</span>
                  <span className="text-[10px] text-neutral-400">Review & reply to inquiries</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className="p-4 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-sm text-left group transition-all"
                >
                  <Settings className="w-5 h-5 text-sky-500 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-xs text-white uppercase block">Update Settings</span>
                  <span className="text-[10px] text-neutral-400">Manage phones & addresses</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <AdminProducts
            products={products}
            onUpdateProducts={onUpdateProducts}
            onNavigateToAddProduct={() => setActiveTab('addProduct')}
          />
        )}

        {activeTab === 'addProduct' && (
          <AdminAddProduct
            onAddProduct={handleAddProduct}
            onCancel={() => setActiveTab('products')}
          />
        )}

        {activeTab === 'gallery' && (
          <AdminGallery items={galleryItems} onUpdate={onUpdateGallery} />
        )}

        {activeTab === 'inquiries' && <AdminInquiries />}

        {activeTab === 'settings' && <AdminSettings />}
      </main>
    </div>
  );
};
