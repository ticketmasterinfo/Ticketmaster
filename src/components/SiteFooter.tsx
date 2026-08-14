import React, { useState } from 'react';
import { Ticket, ShieldCheck, Mail, CheckCircle, ArrowRight } from 'lucide-react';

export const SiteFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer id="site-comprehensive-footer" className="bg-[#0F172A] text-[#94A3B8] border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Signup Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-[#026CDF] font-bold text-xs uppercase tracking-wider mb-1">
              <Mail className="w-4 h-4" /> Live Event Alerts & Presale Codes
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">Never Miss Your Favorite Artist On Tour</h3>
            <p className="text-sm text-slate-300 mt-1">
              Subscribe to get exclusive presale drops, early access passes, and weekly personalized event alerts.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-1 max-w-md">
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-lg text-emerald-400 font-medium text-sm">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>You're on the VIP presale list! Check your inbox soon.</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#026CDF] flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#026CDF] hover:bg-[#0256b3] active:bg-[#014187] text-white font-bold text-sm rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* 4 Column Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Column 1: Shop Tickets */}
          <div className="space-y-3">
            <h4 className="type-etna font-bold text-white uppercase tracking-wider">Shop Events</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#discovery-section" className="hover:text-white transition-colors">Concerts & World Tours</a></li>
              <li><a href="#discovery-section" className="hover:text-white transition-colors">NBA & NFL Sports</a></li>
              <li><a href="#discovery-section" className="hover:text-white transition-colors">Broadway & Musicals</a></li>
              <li><a href="#discovery-section" className="hover:text-white transition-colors">Family & Circus Shows</a></li>
              <li><a href="#discovery-section" className="hover:text-white transition-colors">Las Vegas Residencies</a></li>
              <li><a href="#discovery-section" className="hover:text-white transition-colors">VIP Ticket Packages</a></li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div className="space-y-3">
            <h4 className="type-etna font-bold text-white uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white transition-colors cursor-pointer">Help & FAQs Center</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">100% Buyer Guarantee</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Mobile Barcode Entry</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Ticket Transfer & Sharing</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Refund & Postponements</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Accessible Seating (ADA)</span></li>
            </ul>
          </div>

          {/* Column 3: Sell & Partner */}
          <div className="space-y-3">
            <h4 className="type-etna font-bold text-white uppercase tracking-wider">Sell & Partner</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white transition-colors cursor-pointer">Sell Your Tickets</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Promoter & Venue Solutions</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Affiliate Partner Network</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Verified Resale Marketplace</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Developer Ticketing APIs</span></li>
            </ul>
          </div>

          {/* Column 4: About & Legal */}
          <div className="space-y-3">
            <h4 className="type-etna font-bold text-white uppercase tracking-wider">About & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white transition-colors cursor-pointer">About Our Discovery Engine</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Purchase Terms & Conditions</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Security & Fraud Prevention</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Cookie Preferences</span></li>
            </ul>
          </div>
        </div>

        {/* Brand & Educational Disclaimer Box */}
        <div className="pt-8 space-y-4 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#026CDF] text-white flex items-center justify-center font-black text-xs shadow-sm">
                <Ticket className="w-3.5 h-3.5" />
              </div>
              <span className="text-white font-bold tracking-tight">LIVEPASS PLATFORM</span>
              <span className="text-slate-600">|</span>
              <span>Modern Live Event Ticketing Architecture</span>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Verified Tickets
              </span>
              <span>© {new Date().getFullYear()} LivePass Systems. All rights reserved.</span>
            </div>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-[11px] leading-relaxed text-slate-400">
            <strong className="text-slate-300 block mb-0.5">Educational Design & Architecture System:</strong>
            This web application is a pure front-end design system, responsive UI wireframe, and interaction architecture generated for live-event educational analysis and design research. All logos and marks are clean generic placeholders.
          </div>
        </div>
      </div>
    </footer>
  );
};
