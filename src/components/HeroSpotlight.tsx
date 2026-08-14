import React from 'react';
import { Sparkles, Calendar, MapPin, Ticket, ShieldCheck, ChevronRight } from 'lucide-react';
import { EventItem } from '../types';

interface HeroSpotlightProps {
  event: EventItem;
  onSelectEvent: (event: EventItem) => void;
}

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({ event, onSelectEvent }) => {
  return (
    <section id="hero-spotlight-billboard" className="relative bg-[#121212] overflow-hidden">
      {/* Background Banner with 16:9 (mobile) to 21:9 (desktop) aspect ratio and dark gradient overlays */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] min-h-[380px] md:min-h-[440px] max-h-[560px]">
        <img
          src={event.bannerImage || event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover object-center scale-100 filter brightness-90"
        />

        {/* Dual Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent sm:w-3/4" />

        {/* Content Container */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-8 sm:pb-12 z-10">
          <div className="max-w-2xl space-y-3 sm:space-y-4">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="type-snowdon bg-[#024ddf] text-white px-2.5 py-1 rounded-sm shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Featured Spotlight
              </span>

              {event.presaleActive && (
                <span className="type-snowdon bg-[#ffb932] text-[#121212] font-black px-2.5 py-1 rounded-sm shadow-sm flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#121212]" /> Verified Presale Active
                </span>
              )}

              <span className="type-snowdon bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-sm border border-white/20">
                {event.category} • {event.genre}
              </span>
            </div>

            {/* Title (Type Mauna / Everest) */}
            <div>
              <h1 className="type-mauna text-white drop-shadow-md">
                {event.title}
              </h1>
              {event.subTitle && (
                <p className="type-blanc text-[#d1e0ff] mt-1 drop-shadow-sm font-semibold">
                  {event.subTitle}
                </p>
              )}
            </div>

            {/* Event Metadata */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-[#e0e0e0] font-medium pt-1">
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded border border-white/10">
                <Calendar className="w-4 h-4 text-[#ffb932]" />
                <span>{event.dateInfo.fullDate}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded border border-white/10">
                <MapPin className="w-4 h-4 text-[#024ddf]" />
                <span>{event.venue}</span>
              </div>
            </div>

            {/* Call to Action Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                id="hero-find-tickets-cta"
                onClick={() => onSelectEvent(event)}
                className="type-fiji bg-[#024ddf] hover:bg-[#0139a7] active:bg-[#012e85] text-white px-8 py-3.5 rounded font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2.5 group cursor-pointer"
              >
                <Ticket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Find Tickets</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-white/80 text-xs sm:text-sm">
                <span className="block text-[#a0a0a0]">Tickets from</span>
                <span className="text-lg font-black text-white">${event.priceFrom}</span>
                <span className="text-xs text-[#a0a0a0] ml-1">incl. estimated fees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
