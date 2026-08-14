import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Ticket, Flame, ShieldCheck } from 'lucide-react';
import { EventItem } from '../types';

interface CarouselSectionProps {
  title: string;
  subTitle?: string;
  icon?: React.ReactNode;
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  carouselId: string;
}

export const CarouselSection: React.FC<CarouselSectionProps> = ({
  title,
  subTitle,
  icon,
  events,
  onSelectEvent,
  carouselId,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340 * (direction === 'left' ? -1 : 1);
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (events.length === 0) return null;

  return (
    <section className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with Title and Scroll Controls */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            {icon}
            <h2 className="type-kilimanjaro text-[#121212]">{title}</h2>
          </div>
          {subTitle && <p className="type-etna text-[#646464] mt-0.5">{subTitle}</p>}
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            id={`${carouselId}-prev-btn`}
            onClick={() => handleScroll('left')}
            className="w-9 h-9 rounded-full border border-[#bfbfbf] bg-white text-[#121212] hover:bg-[#f6f6f6] hover:border-[#949494] flex items-center justify-center transition-colors shadow-xs"
            aria-label="Scroll carousel left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            id={`${carouselId}-next-btn`}
            onClick={() => handleScroll('right')}
            className="w-9 h-9 rounded-full border border-[#bfbfbf] bg-white text-[#121212] hover:bg-[#f6f6f6] hover:border-[#949494] flex items-center justify-center transition-colors shadow-xs"
            aria-label="Scroll carousel right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Snap Carousel Container (CSS scroll-snap-type: x mandatory) */}
      <div
        ref={scrollRef}
        id={carouselId}
        className="snap-carousel-container flex gap-4 pb-2 pt-1"
      >
        {events.map((event) => (
          <div
            key={event.id}
            className="event-card snap-carousel-item w-[260px] sm:w-[280px] md:w-[300px] bg-white rounded-lg border border-[#ebebeb] shadow-tm-level-1 hover:shadow-tm-level-2 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
          >
            {/* 16:9 Image Wrapper with 1.05x Hover Zoom */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#121212]">
              <img
                src={event.image}
                alt={event.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Genre / Category Tag - Top Left */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <span className="type-snowdon bg-[#121212]/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-sm">
                  {event.genre}
                </span>
                {event.sellingFast && (
                  <span className="type-snowdon bg-[#d91b5c] text-white px-2 py-0.5 rounded-sm flex items-center gap-1">
                    <Flame className="w-3 h-3" /> Fast
                  </span>
                )}
              </div>

              {event.presaleActive && (
                <div className="absolute bottom-2.5 left-2.5">
                  <span className="type-snowdon bg-[#ffb932] text-[#121212] font-black px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-3 h-3" /> Presale
                  </span>
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="type-snowdon text-[#024ddf] font-bold block mb-1">
                  {event.category}
                </span>

                <h3 className="type-blanc text-[#121212] line-clamp-2 group-hover:text-[#024ddf] transition-colors">
                  {event.title}
                </h3>

                <p className="type-etna text-[#646464] mt-1.5 font-medium">
                  {event.dateInfo.fullDate}
                </p>

                <p className="type-etna text-[#949494] line-clamp-1">
                  {event.venue}
                </p>
              </div>

              {/* Footer with Price and Button */}
              <div className="mt-4 pt-3 border-t border-[#ebebeb] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#646464] block font-medium">From</span>
                  <span className="text-base font-black text-[#121212]">${event.priceFrom}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectEvent(event)}
                  className="type-etna font-bold text-[#024ddf] border border-[#024ddf] hover:bg-[#024ddf] hover:text-white px-3.5 py-1.5 rounded transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>See Tickets</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
