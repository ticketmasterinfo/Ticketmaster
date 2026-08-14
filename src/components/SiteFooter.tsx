import React from 'react';
import { Ticket, ShieldCheck, Heart } from 'lucide-react';

export const SiteFooter: React.FC = () => {
  return (
    <footer id="site-comprehensive-footer" className="bg-[#121212] text-[#a0a0a0] border-t border-[#262626] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Column Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-[#262626]">
          {/* Column 1: Shop Tickets */}
          <div className="space-y-3">
            <h4 className="type-etna font-bold text-white uppercase tracking-wider">Shop Tickets</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#discovery-section" className="hover:text-white transition-colors">Concerts & Music Festivals</a></li>
              <li><a href="#discovery-section" className="hover:text-white transition-colors">NBA, NFL & MLB Sports</a></li>
              <li><a href="#discovery-section" className="hover:text-white transition-colors">Broadway & West End Theater</a></li>
              <li><a href="#discovery-section" className="hover:text-white transition-colors">Family & Circus Shows</a></li>
              <li><a href="#discovery-section" className="hover:text-white transition-colors">Las Vegas Residencies</a></li>
              <li><a href="#discovery-section" className="hover:text-white transition-colors">VIP Ticket Packages</a></li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div className="space-y-3">
            <h4 className="type-etna font-bold text-white uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white transition-colors cursor-pointer">Help & FAQs Center</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">100% Buyer Guarantee</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Mobile Barcode Entry Guide</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Ticket Transfer & Sharing</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Refund & Event Postponements</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Accessible Seating (ADA)</span></li>
            </ul>
          </div>

          {/* Column 3: Sell & Partner */}
          <div className="space-y-3">
            <h4 className="type-etna font-bold text-white uppercase tracking-wider">Sell & Partner</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-white transition-colors cursor-pointer">Sell Your Tickets</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Promoter & Venue Solutions</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Affiliate & Partner Network</span></li>
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
              <li><span className="hover:text-white transition-colors cursor-pointer">Careers & Media Center</span></li>
            </ul>
          </div>
        </div>

        {/* Brand & Educational Disclaimer Box */}
        <div className="pt-8 space-y-4 text-xs text-[#808080]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#024ddf] text-white flex items-center justify-center font-black text-xs">
                <Ticket className="w-3.5 h-3.5" />
              </div>
              <span className="text-white font-bold tracking-tight">TICKETPASS LIVE</span>
              <span className="text-[#555]">|</span>
              <span>High-Fidelity Educational User Experience Recreation</span>
            </div>

            <div className="flex items-center gap-4 text-[#888]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#00875a]" /> Verified Safe Discovery
              </span>
              <span>© {new Date().getFullYear()} Educational Demo. All rights reserved.</span>
            </div>
          </div>

          <div className="p-3 bg-[#181818] rounded border border-[#262626] text-[11px] leading-relaxed text-[#737373]">
            <strong className="text-[#a0a0a0] block mb-0.5">Educational Recreation Compliance Notice:</strong>
            This web application is a pure front-end design system and interaction architecture recreation built for educational, portfolio, and UX research purposes. It is not affiliated with, endorsed by, or operated by Ticketmaster Entertainment, Inc. or Live Nation. All artist names, venue names, and trademarks belong to their respective copyright holders.
          </div>
        </div>
      </div>
    </footer>
  );
};
