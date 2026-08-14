import React from 'react';
import { Globe, Building2, Tag, Gift, HelpCircle, Sparkles, User, ChevronDown } from 'lucide-react';
import { CountryInfo } from '../types';

interface TopUtilityHeaderProps {
  selectedCountry: CountryInfo;
  onOpenCountryModal: () => void;
  onOpenAuthModal: () => void;
  onOpenSellModal: () => void;
  onOpenVipModal: () => void;
  onOpenHelpModal: () => void;
  user: { name: string; email: string } | null;
  onSignOut: () => void;
}

export const TopUtilityHeader: React.FC<TopUtilityHeaderProps> = ({
  selectedCountry,
  onOpenCountryModal,
  onOpenAuthModal,
  onOpenSellModal,
  onOpenVipModal,
  onOpenHelpModal,
  user,
  onSignOut,
}) => {
  return (
    <header id="top-utility-header" className="bg-[#121212] text-[#e0e0e0] border-b border-[#262626] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
        {/* Left: Region & Country Selector */}
        <div className="flex items-center gap-4">
          <button
            id="country-selector-btn"
            onClick={onOpenCountryModal}
            className="flex items-center gap-1.5 hover:text-white transition-colors py-1 px-1.5 rounded hover:bg-[#222]"
            title="Change Country & Language"
          >
            <span className="text-sm">{selectedCountry.flag}</span>
            <span className="font-medium hidden sm:inline">{selectedCountry.name}</span>
            <span className="text-[#a0a0a0] font-mono">({selectedCountry.currency})</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#a0a0a0]" />
          </button>

          <span className="hidden md:inline-block text-[#383838]">|</span>

          <span className="hidden md:flex items-center gap-1 text-[#a0a0a0]">
            <Globe className="w-3 h-3 text-[#024ddf]" />
            <span>Official Educational Ticketing Discovery Platform</span>
          </span>
        </div>

        {/* Right: Auxiliary Links & Account */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            id="nav-hotels-btn"
            onClick={() => window.open('https://www.google.com/travel/hotels', '_blank')}
            className="hidden lg:flex items-center gap-1 text-[#b3b3b3] hover:text-white transition-colors"
          >
            <Building2 className="w-3 h-3 text-[#ffb932]" />
            <span>Hotels</span>
          </button>

          <button
            id="nav-sell-tickets-btn"
            onClick={onOpenSellModal}
            className="flex items-center gap-1 text-[#b3b3b3] hover:text-white transition-colors"
          >
            <Tag className="w-3 h-3 text-[#00875a]" />
            <span>Sell Tickets</span>
          </button>

          <button
            id="nav-gift-cards-btn"
            onClick={() => alert('Gift Cards: E-Gift cards can be redeemed towards any verified live event tickets during checkout!')}
            className="hidden sm:flex items-center gap-1 text-[#b3b3b3] hover:text-white transition-colors"
          >
            <Gift className="w-3 h-3 text-[#d91b5c]" />
            <span>Gift Cards</span>
          </button>

          <button
            id="nav-vip-btn"
            onClick={onOpenVipModal}
            className="hidden sm:flex items-center gap-1 text-[#ffb932] hover:text-white transition-colors font-medium"
          >
            <Sparkles className="w-3 h-3" />
            <span>VIP Packages</span>
          </button>

          <button
            id="nav-help-btn"
            onClick={onOpenHelpModal}
            className="flex items-center gap-1 text-[#b3b3b3] hover:text-white transition-colors"
          >
            <HelpCircle className="w-3 h-3" />
            <span>Help</span>
          </button>

          <span className="text-[#383838]">|</span>

          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-white font-medium bg-[#1e1e1e] px-2 py-0.5 rounded border border-[#333]">
                <User className="w-3.5 h-3.5 text-[#024ddf]" />
                <span className="truncate max-w-[100px] sm:max-w-[140px]">{user.name}</span>
              </div>
              <button
                onClick={onSignOut}
                className="text-[#a0a0a0] hover:text-red-400 text-[11px] underline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              id="header-sign-in-btn"
              onClick={onOpenAuthModal}
              className="flex items-center gap-1 font-semibold text-white hover:text-[#90b8ff] transition-colors py-1 px-2 rounded hover:bg-[#222]"
            >
              <User className="w-3.5 h-3.5 text-[#024ddf]" />
              <span>Sign In / Register</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
