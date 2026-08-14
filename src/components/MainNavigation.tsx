import React, { useState } from 'react';
import { Menu, X, Music, Trophy, Theater, Users, MapPin, Sparkles, Ticket } from 'lucide-react';
import { EventCategory } from '../types';

interface MainNavigationProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedCity: string;
  onOpenCitySelector: () => void;
  onOpenVipModal: () => void;
  onOpenSellModal: () => void;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedCity,
  onOpenCitySelector,
  onOpenVipModal,
  onOpenSellModal,
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
    <nav id="main-navigation-bar" className="sticky top-0 z-40 bg-[#024ddf] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <button
              id="brand-logo-btn"
              onClick={() => onSelectCategory('All')}
              className="flex items-center gap-2 group text-left"
            >
              {/* Stylized Ticket SVG Logo */}
              <div className="w-9 h-9 rounded bg-white text-[#024ddf] flex items-center justify-center font-black shadow-sm group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M4 4h16a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V6a2 2 0 0 1 2-2zm0 2v2.17A4.002 4.002 0 0 1 4 14v4h16v-2.17A4.002 4.002 0 0 1 20 8V6H4zm5 3h6a1 1 0 0 1 0 2H9a1 1 0 1 1 0-2zm0 4h6a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tighter leading-none italic uppercase font-mono">
                  TICKET<span className="text-[#ffb932]">PASS</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#d1e0ff] font-medium">
                  Official Live Discovery
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
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md font-semibold text-sm transition-all ${
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

          {/* Right Actions: City Pill & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {/* Quick Location Badge */}
            <button
              id="nav-quick-location-btn"
              onClick={onOpenCitySelector}
              className="flex items-center gap-1.5 bg-[#0139a7] hover:bg-[#012e85] text-white px-3 py-1.5 rounded-full text-xs font-semibold border border-white/20 shadow-sm transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-[#ffb932]" />
              <span className="max-w-[130px] truncate">{selectedCity}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-white hover:bg-[#0139a7] focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (<900px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0139a7] border-t border-[#024ddf]/40 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive ? 'bg-white text-[#024ddf] shadow' : 'bg-white/10 text-white hover:bg-white/20'
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
              className="flex items-center justify-between p-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium"
            >
              <span>Sell Your Tickets</span>
              <span className="text-xs bg-[#00875a] text-white px-2 py-0.5 rounded font-bold">Free Listing</span>
            </button>

            <button
              onClick={() => {
                onOpenVipModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-[#ffb932] font-semibold"
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
