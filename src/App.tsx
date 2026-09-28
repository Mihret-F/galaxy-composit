import React, { useState, useEffect } from 'react';
import { GalleryItem, PageType, Product } from './types';
import { GALLERY_ITEMS, INITIAL_PRODUCTS } from './data/initialData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { About } from './components/About';
import { Products } from './components/Products';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuickQuoteModal } from './components/QuickQuoteModal';
import { CursorPromptModal } from './components/CursorPromptModal';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { WhatsAppButton } from './components/WhatsAppButton';

export default function App() {
  const [activePage, setActivePage] = useState<PageType | 'admin'>('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(false);

  // Load products with localStorage fallback & sync
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(GALLERY_ITEMS);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.products)) setProducts(data.products);
        if (Array.isArray(data.gallery)) setGalleryItems(data.gallery);
      })
      .catch((err) => console.warn('Could not load saved content:', err));
  }, []);

  const updateProducts = async (nextProducts: Product[]) => {
    setProducts(nextProducts);
    const response = await fetch('/api/admin/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products: nextProducts })
    });
    if (!response.ok) throw new Error('Failed to save products.');
  };

  const updateGallery = async (nextGallery: GalleryItem[]) => {
    setGalleryItems(nextGallery);
    const response = await fetch('/api/admin/gallery', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gallery: nextGallery })
    });
    if (!response.ok) throw new Error('Failed to save gallery.');
  };

  // Check URL pathname or session for admin view
  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) {
      setActivePage('admin');
      checkAdminSession();
    }
  }, []);

  const checkAdminSession = async () => {
    setCheckingAuth(true);
    try {
      const res = await fetch('/api/admin/me');
      const data = await res.json();
      if (res.ok && data.authenticated) {
        setIsAdminAuthenticated(true);
      } else {
        setIsAdminAuthenticated(false);
      }
    } catch (err) {
      setIsAdminAuthenticated(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleAdminLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (err) {
      console.error(err);
    }
    setIsAdminAuthenticated(false);
    setActivePage('home');
    window.history.pushState({}, '', '/');
  };

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickQuoteOpen, setIsQuickQuoteOpen] = useState<boolean>(false);
  const [quoteProductPreset, setQuoteProductPreset] = useState<string>('');
  const [isCursorPromptOpen, setIsCursorPromptOpen] = useState<boolean>(false);

  // Handlers
  const handleOpenQuickQuoteWithProduct = (productName: string) => {
    setQuoteProductPreset(productName);
    setIsQuickQuoteOpen(true);
  };

  // Render Admin View
  if (activePage === 'admin') {
    if (checkingAuth) {
      return (
        <div className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center text-white">
          <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Verifying Admin Credentials...</p>
        </div>
      );
    }

    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={() => setIsAdminAuthenticated(true)}
          onBackToWebsite={() => {
            setActivePage('home');
            window.history.pushState({}, '', '/');
          }}
        />
      );
    }

    return (
      <AdminDashboard
        products={products}
        onUpdateProducts={updateProducts}
        galleryItems={galleryItems}
        onUpdateGallery={updateGallery}
        onLogout={handleAdminLogout}
        onViewWebsite={() => {
          setActivePage('home');
          window.history.pushState({}, '', '/');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-neutral-900 selection:bg-sky-600 selection:text-white relative">
      {/* Navigation Header */}
      <Header
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          if (page === 'admin') {
            window.history.pushState({}, '', '/admin');
            checkAdminSession();
          } else {
            window.history.pushState({}, '', '/');
          }
        }}
        onOpenQuickQuote={() => {
          setQuoteProductPreset('');
          setIsQuickQuoteOpen(true);
        }}
        onOpenCursorPrompt={() => setIsCursorPromptOpen(true)}
      />

      {/* Main Page Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activePage === 'home' && (
          <Home
            products={products}
            setActivePage={setActivePage}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenQuickQuote={() => {
              setQuoteProductPreset('');
              setIsQuickQuoteOpen(true);
            }}
          />
        )}

        {activePage === 'about' && (
          <About
            setActivePage={setActivePage}
            onOpenQuickQuote={() => {
              setQuoteProductPreset('');
              setIsQuickQuoteOpen(true);
            }}
          />
        )}

        {activePage === 'products' && (
          <Products
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenQuickQuoteWithProduct={handleOpenQuickQuoteWithProduct}
          />
        )}

        {activePage === 'services' && (
          <Services
            setActivePage={setActivePage}
            onOpenQuickQuote={() => {
              setQuoteProductPreset('');
              setIsQuickQuoteOpen(true);
            }}
          />
        )}

        {activePage === 'gallery' && <Gallery items={galleryItems} />}

        {activePage === 'projects' && (
          <Projects
            setActivePage={setActivePage}
            onOpenQuickQuoteWithProduct={handleOpenQuickQuoteWithProduct}
          />
        )}

        {activePage === 'contact' && <Contact />}
      </main>

      {/* Floating WhatsApp Action Widget */}
      <WhatsAppButton />

      {/* Footer */}
      <Footer
        setActivePage={(page) => {
          setActivePage(page);
          if (page === 'admin') {
            window.history.pushState({}, '', '/admin');
            checkAdminSession();
          } else {
            window.history.pushState({}, '', '/');
          }
        }}
        onOpenQuickQuote={() => {
          setQuoteProductPreset('');
          setIsQuickQuoteOpen(true);
        }}
        onOpenCursorPrompt={() => setIsCursorPromptOpen(true)}
      />

      {/* Interactive Modals */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onInquire={(p) => handleOpenQuickQuoteWithProduct(p.name)}
      />

      <QuickQuoteModal
        isOpen={isQuickQuoteOpen}
        onClose={() => setIsQuickQuoteOpen(false)}
        preselectedProduct={quoteProductPreset}
      />

      <CursorPromptModal
        isOpen={isCursorPromptOpen}
        onClose={() => setIsCursorPromptOpen(false)}
      />
    </div>
  );
}
