import React, { useState } from 'react';
import { X, Tag, Sparkles, HelpCircle, CheckCircle2, DollarSign, Shield, Send } from 'lucide-react';

export const SellTicketsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [eventName, setEventName] = useState('The Eagles - Sphere Las Vegas');
  const [section, setSection] = useState('Sec 101, Row 8, Seat 14-15');
  const [askingPrice, setAskingPrice] = useState('185');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div className="bg-white text-[#121212] w-full max-w-lg rounded-xl shadow-2xl border border-[#bfbfbf] overflow-hidden">
        <div className="bg-[#121212] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#00875a]" />
            <h3 className="font-bold text-sm uppercase tracking-wider">Sell Your Verified Tickets</h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#a0a0a0] hover:text-white rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="bg-[#00875a]/10 border border-[#00875a]/30 p-3 rounded-lg text-xs text-[#00875a] flex items-center gap-2 font-semibold">
              <Shield className="w-4 h-4 shrink-0" />
              <span>0% seller listing fee. Automatic barcode reissuing protects both buyer and seller.</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#646464] mb-1">Event / Concert Name</label>
              <input
                type="text"
                required
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full px-3 py-2 border border-[#bfbfbf] rounded text-sm focus:ring-2 focus:ring-[#00875a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#646464] mb-1">Section / Row / Seat Numbers</label>
              <input
                type="text"
                required
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full px-3 py-2 border border-[#bfbfbf] rounded text-sm focus:ring-2 focus:ring-[#00875a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#646464] mb-1">Asking Price per Ticket ($ USD)</label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-[#646464] absolute left-3 top-2.5" />
                <input
                  type="number"
                  required
                  value={askingPrice}
                  onChange={(e) => setAskingPrice(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-[#bfbfbf] rounded text-sm font-bold focus:ring-2 focus:ring-[#00875a] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#00875a] hover:bg-[#00704a] text-white rounded font-bold text-sm shadow transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Publish Listing to Fan Marketplace</span>
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#00875a] mx-auto" />
            <h4 className="type-blanc text-[#121212] font-bold">Listing Published!</h4>
            <p className="text-xs text-[#646464] max-w-xs mx-auto">
              Your tickets for {eventName} have been verified and listed on the live marketplace. You will receive an instant payout when purchased.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 px-6 py-2 bg-[#121212] text-white rounded text-xs font-bold"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const VipPackagesModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div className="bg-white text-[#121212] w-full max-w-xl rounded-xl shadow-2xl border border-[#bfbfbf] overflow-hidden">
        <div className="bg-[#121212] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#ffb932]" />
            <h3 className="font-bold text-sm uppercase tracking-wider">VIP Experiences & Packages</h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#a0a0a0] hover:text-white rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="p-4 rounded-lg bg-[#fafafa] border border-[#ebebeb] space-y-2">
            <div className="flex items-center justify-between">
              <span className="type-snowdon text-[#d91b5c] font-black">Diamond VIP Tier</span>
              <span className="text-base font-black text-[#121212]">$495 / pass</span>
            </div>
            <h4 className="type-blanc font-bold text-[#121212]">Artist Soundcheck & Meet & Greet</h4>
            <p className="text-xs text-[#646464]">
              Includes early floor entry, private acoustic soundcheck access, commemorative laminate, and dedicated VIP lounge with complimentary hors d&apos;oeuvres.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#fafafa] border border-[#ebebeb] space-y-2">
            <div className="flex items-center justify-between">
              <span className="type-snowdon text-[#024ddf] font-black">Gold Hospitality Tier</span>
              <span className="text-base font-black text-[#121212]">$325 / pass</span>
            </div>
            <h4 className="type-blanc font-bold text-[#121212]">Club Lounge & Premium Concourse</h4>
            <p className="text-xs text-[#646464]">
              Reserved lower bowl seating in club sections, in-seat food service, fast-track security lanes, and exclusive merchandise gift pack.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-[#024ddf] hover:bg-[#0139a7] text-white rounded font-bold text-sm transition-colors"
          >
            Explore VIP on Featured Events
          </button>
        </div>
      </div>
    </div>
  );
};

export const HelpModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div className="bg-white text-[#121212] w-full max-w-xl rounded-xl shadow-2xl border border-[#bfbfbf] overflow-hidden">
        <div className="bg-[#121212] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#024ddf]" />
            <h3 className="font-bold text-sm uppercase tracking-wider">Customer Support & FAQs</h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#a0a0a0] hover:text-white rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#121212]">How do I access my mobile e-tickets?</h4>
            <p className="text-xs text-[#646464]">
              Mobile tickets are delivered immediately after checkout. You can scan the dynamic QR barcode on your phone at stadium gates or add the pass to Apple/Google Wallet.
            </p>
          </div>

          <div className="space-y-1 pt-3 border-t border-[#ebebeb]">
            <h4 className="text-sm font-bold text-[#121212]">What is the 100% Buyer Guarantee?</h4>
            <p className="text-xs text-[#646464]">
              Every ticket purchased is 100% authentic, verified by venue barcode systems, and guaranteed for entry or your money back.
            </p>
          </div>

          <div className="space-y-1 pt-3 border-t border-[#ebebeb]">
            <h4 className="text-sm font-bold text-[#121212]">Can I transfer or resell my tickets?</h4>
            <p className="text-xs text-[#646464]">
              Yes! You can transfer tickets to friends for free via email or list them on the verified Fan Marketplace directly from the header &quot;Sell Tickets&quot; tab.
            </p>
          </div>

          <div className="pt-4 border-t border-[#ebebeb]">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 bg-[#121212] text-white rounded text-xs font-bold"
            >
              Got it, close help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
