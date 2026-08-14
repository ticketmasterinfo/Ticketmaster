import React, { useState } from 'react';
import { Menu, X, Music, Trophy, Theater, Users, MapPin, Sparkles, Ticket, ShoppingBag } from 'lucide-react';
import { EventCategory } from '../types';

interface MainNavigationProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedCity: string;
  onOpenCitySelector: () => void;
  onOpenVipModal: () => void;
  onOpenSellModal: () => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedCity,
  onOpenCitySelector,
  onOpenVipModal,
  onOpenSellModal,
  cartCount = 0,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'All', label: 'All Events', icon: <Ticket className="w-4 h-4" /> },
    { id: 'Concerts', label: 'Concerts', icon: <Music className="w-4 h-4" /> },
    { id: 'Sports', label: 'Sports', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Arts & Theater', label: 'Arts & Theater', icon: <Theater className="w-4 h-4" /> },
    { id: 'Family', label: 'Family', icon: <Users className="w-4 h-4" /> },
  ];

  const handleCategoryClick = (catId: string) => {
    onSelectCategory(catId);
    setMobileMenuOpen(false);
    // Smooth scroll down to discovery section
    const discoverySection = document.getElementById('discovery-section');
    if (discoverySection) {
      discoverySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav id="main-navigation-bar" className="sticky top-0 z-40 bg-[#026CDF] text-white shadow-lg border-b border-blue-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo Placeholder */}
          <div className="flex items-center gap-8">
            <button
              id="brand-logo-btn"
              onClick={() => onSelectCategory('All')}
              className="flex items-center gap-2.5 group text-left cursor-pointer"
            >
              {/* Stylized Ticket Logo */}
              <div className="w-9 h-9 rounded-md bg-white text-[#026CDF] flex items-center justify-center font-black shadow-sm group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M4 4h16a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V6a2 2 0 0 1 2-2zm0 2v2.17A4.002 4.002 0 0 1 4 14v4h16v-2.17A4.002 4.002 0 0 1 20 8V6H4zm5 3h6a1 1 0 0 1 0 2H9a1 1 0 1 1 0-2zm0 4h6a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white uppercase font-sans">
                  LIVE<span className="text-amber-300">PASS</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-blue-100 font-semibold">
                  Live Event Platform
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    id={`nav-cat-${cat.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md font-semibold text-sm transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/20 text-white shadow-inner font-bold'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat.icon}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Actions: City Pill, Cart & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {/* Quick Location Badge */}
            <button
              id="nav-quick-location-btn"
              onClick={onOpenCitySelector}
              className="flex items-center gap-1.5 bg-[#0256b3] hover:bg-[#014187] text-white px-3 py-1.5 rounded-full text-xs font-semibold border border-white/20 shadow-sm transition-all cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span className="max-w-[130px] truncate">{selectedCity}</span>
            </button>

            {/* Cart Icon with Counter */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative p-2 text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
              title="View Cart / Saved Tickets"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-white hover:bg-[#0256b3] focus:outline-none transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (<900px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0256b3] border-t border-blue-400/30 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    isActive ? 'bg-white text-[#026CDF] shadow' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2 text-sm">
            <button
              onClick={() => {
                onOpenSellModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium cursor-pointer"
            >
              <span>Sell Your Tickets</span>
              <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">Free Listing</span>
            </button>

            <button
              onClick={() => {
                onOpenVipModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-amber-300 font-semibold cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> VIP Experiences & Hospitality
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
