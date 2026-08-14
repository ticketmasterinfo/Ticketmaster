import React, { useState } from 'react';
import { Filter, Calendar, Tag, ShieldCheck, Ticket, Check, RotateCcw, Flame, LayoutGrid, List } from 'lucide-react';
import { EventItem, EventCategory } from '../types';

interface DiscoveryLayoutProps {
  events: EventItem[];
  selectedCategories: EventCategory[];
  onToggleCategory: (cat: EventCategory) => void;
  selectedDateRange: 'all' | 'today' | 'this_weekend' | 'this_week' | 'next_month';
  onSelectDateRange: (range: 'all' | 'today' | 'this_weekend' | 'this_week' | 'next_month') => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  presaleOnly: boolean;
  onTogglePresale: () => void;
  onResetFilters: () => void;
  onSelectEvent: (event: EventItem) => void;
}

export const DiscoveryLayout: React.FC<DiscoveryLayoutProps> = ({
  events,
  selectedCategories,
  onToggleCategory,
  selectedDateRange,
  onSelectDateRange,
  maxPrice,
  onMaxPriceChange,
  presaleOnly,
  onTogglePresale,
  onResetFilters,
  onSelectEvent,
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const allCategories: EventCategory[] = ['Concerts', 'Sports', 'Arts & Theater', 'Family'];

  const dateOptions: { id: 'all' | 'today' | 'this_weekend' | 'this_week' | 'next_month'; label: string }[] = [
    { id: 'all', label: 'All Upcoming Dates' },
    { id: 'today', label: 'Today Only' },
    { id: 'this_weekend', label: 'This Weekend' },
    { id: 'this_week', label: 'Next 7 Days' },
    { id: 'next_month', label: 'Next 30 Days' },
  ];

  return (
    <section id="discovery-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Filter Sidebar */}
        <aside className="w-full lg:w-72 bg-white rounded-lg border border-[#ebebeb] p-5 shadow-tm-level-1 shrink-0">
          <div className="flex items-center justify-between pb-4 border-b border-[#ebebeb]">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#024ddf]" />
              <h3 className="type-blanc text-[#121212] font-bold">Filter Events</h3>
            </div>
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs text-[#024ddf] hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Filter Group: Category Checkboxes */}
          <div className="py-4 border-b border-[#ebebeb]">
            <h4 className="type-etna font-bold text-[#121212] mb-3 uppercase tracking-wider">
              Event Categories
            </h4>
            <div className="space-y-2.5">
              {allCategories.map((cat) => {
                const isChecked = selectedCategories.includes(cat);
                return (
                  <label
                    key={cat}
                    className="flex items-center gap-2.5 text-sm text-[#121212] cursor-pointer select-none hover:text-[#024ddf] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleCategory(cat)}
                      className="w-4 h-4 text-[#024ddf] rounded border-[#bfbfbf] focus:ring-[#024ddf]"
                    />
                    <span className={isChecked ? 'font-semibold text-[#024ddf]' : ''}>{cat}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Filter Group: Date Range Radios */}
          <div className="py-4 border-b border-[#ebebeb]">
            <h4 className="type-etna font-bold text-[#121212] mb-3 uppercase tracking-wider">
              Date Timeline
            </h4>
            <div className="space-y-2.5">
              {dateOptions.map((opt) => {
                const isChecked = selectedDateRange === opt.id;
                return (
                  <label
                    key={opt.id}
                    className="flex items-center gap-2.5 text-sm text-[#121212] cursor-pointer select-none hover:text-[#024ddf] transition-colors"
                  >
                    <input
                      type="radio"
                      name="dateRangeFilter"
                      checked={isChecked}
                      onChange={() => onSelectDateRange(opt.id)}
                      className="w-4 h-4 text-[#024ddf] border-[#bfbfbf] focus:ring-[#024ddf]"
                    />
                    <span className={isChecked ? 'font-semibold text-[#024ddf]' : ''}>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Filter Group: Price Range Slider */}
          <div className="py-4 border-b border-[#ebebeb]">
            <div className="flex items-center justify-between mb-2">
              <h4 className="type-etna font-bold text-[#121212] uppercase tracking-wider">
                Max Price
              </h4>
              <span className="type-snowdon text-[#024ddf] font-bold bg-[#024ddf]/10 px-2 py-0.5 rounded">
                ${maxPrice}
              </span>
            </div>
            <input
              type="range"
              min="40"
              max="300"
              step="10"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(Number(e.target.value))}
              className="w-full h-2 bg-[#ebebeb] rounded-lg appearance-none cursor-pointer accent-[#024ddf]"
            />
            <div className="flex justify-between text-[11px] text-[#949494] mt-1 font-medium">
              <span>$40</span>
              <span>$150</span>
              <span>$300+</span>
            </div>
          </div>

          {/* Filter Group: Verified Presale Toggle */}
          <div className="pt-4">
            <h4 className="type-etna font-bold text-[#121212] mb-3 uppercase tracking-wider">
              Special Access
            </h4>
            <label className="flex items-start gap-2.5 text-sm text-[#121212] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={presaleOnly}
                onChange={onTogglePresale}
                className="w-4 h-4 text-[#024ddf] rounded border-[#bfbfbf] focus:ring-[#024ddf] mt-0.5"
              />
              <div>
                <span className="font-semibold block flex items-center gap-1 text-[#121212]">
                  <ShieldCheck className="w-4 h-4 text-[#00875a]" /> Verified Presale Only
                </span>
                <span className="text-xs text-[#646464] block">
                  Show only events with active presale codes or early access.
                </span>
              </div>
            </label>
          </div>
        </aside>

        {/* Right: Filtered Event List/Grid Stream */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center justify-between bg-white px-5 py-3 rounded-lg border border-[#ebebeb] shadow-tm-level-1">
            <div className="text-sm font-semibold text-[#121212]">
              Showing <span className="text-[#024ddf] font-black">{events.length}</span> live events
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xs text-[#646464] hidden sm:block">
                All prices shown with transparent verified fees
              </div>

              {/* View Switcher: List vs Grid */}
              <div className="flex items-center bg-[#f6f6f6] p-0.5 rounded-md border border-[#ebebeb]">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-all cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-white text-[#024ddf] shadow-xs'
                      : 'text-[#646464] hover:text-[#121212]'
                  }`}
                  title="List View"
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white text-[#024ddf] shadow-xs'
                      : 'text-[#646464] hover:text-[#121212]'
                  }`}
                  title="Grid View"
                  aria-label="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {events.length === 0 ? (
            <div className="bg-white rounded-lg border border-[#ebebeb] p-12 text-center shadow-tm-level-1">
              <Calendar className="w-12 h-12 text-[#949494] mx-auto mb-3" />
              <h3 className="type-blanc text-[#121212] font-bold">No Events Match Your Filters</h3>
              <p className="type-etna text-[#646464] mt-1 max-w-md mx-auto">
                Try clearing your category checkboxes or widening your date timeline to view more live shows.
              </p>
              <button
                type="button"
                onClick={onResetFilters}
                className="mt-4 px-4 py-2 bg-[#024ddf] text-white rounded font-semibold text-sm hover:bg-[#0139a7] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'list' ? (
            <div className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg border border-[#ebebeb] p-4 sm:p-5 shadow-tm-level-1 hover:shadow-tm-level-2 hover:border-[#bfbfbf] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  {/* Left: Date Badge & Event Details */}
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Authentic Dark Date Badge */}
                    <div className="w-16 h-20 bg-[#121212] rounded-md text-white flex flex-col items-center justify-center shrink-0 shadow-sm border border-[#2a2a2a] group-hover:bg-[#024ddf] transition-colors">
                      <span className="type-snowdon text-[#ffb932] group-hover:text-white font-extrabold">
                        {event.dateInfo.month}
                      </span>
                      <span className="text-2xl font-black leading-none my-0.5">
                        {event.dateInfo.day}
                      </span>
                      <span className="type-snowdon text-[#a0a0a0] group-hover:text-[#d1e0ff]">
                        {event.dateInfo.dow}
                      </span>
                    </div>

                    {/* Thumbnail Image */}
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded object-cover shrink-0 border border-[#ebebeb] hidden md:block"
                    />

                    {/* Event Description */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="type-snowdon text-[#024ddf] font-bold">
                          {event.category}
                        </span>
                        <span className="text-[#bfbfbf]">•</span>
                        <span className="text-xs font-semibold text-[#646464]">{event.genre}</span>
                        {event.presaleActive && (
                          <span className="type-snowdon bg-[#00875a]/10 text-[#00875a] border border-[#00875a]/30 px-1.5 py-0.5 rounded flex items-center gap-1 font-bold">
                            <ShieldCheck className="w-3 h-3" /> Verified Presale
                          </span>
                        )}
                        {event.sellingFast && (
                          <span className="type-snowdon bg-[#d91b5c]/10 text-[#d91b5c] border border-[#d91b5c]/30 px-1.5 py-0.5 rounded flex items-center gap-1 font-bold">
                            <Flame className="w-3 h-3" /> Hot
                          </span>
                        )}
                      </div>

                      <h3 className="type-blanc text-[#121212] font-bold group-hover:text-[#024ddf] transition-colors line-clamp-1">
                        {event.title}
                      </h3>

                      <p className="type-etna text-[#646464] font-medium">
                        {event.dateInfo.time} • {event.venue}
                      </p>
                    </div>
                  </div>

                  {/* Right: Price and Action Button */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#ebebeb] shrink-0">
                    <div className="sm:text-right">
                      <span className="text-[11px] text-[#646464] block font-medium">Starting from</span>
                      <span className="text-lg font-black text-[#121212]">${event.priceFrom}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectEvent(event)}
                      className="type-fiji bg-[#024ddf] hover:bg-[#0139a7] active:bg-[#012e85] text-white px-5 py-2.5 rounded font-bold transition-all shadow-xs hover:shadow flex items-center gap-2 cursor-pointer"
                    >
                      <Ticket className="w-4 h-4" />
                      <span>See Tickets</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Grid View Mode */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg border border-[#ebebeb] shadow-tm-level-1 hover:shadow-tm-level-2 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#121212]">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="type-snowdon bg-[#121212]/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-sm">
                        {event.genre}
                      </span>
                      {event.presaleActive && (
                        <span className="type-snowdon bg-[#00875a] text-white px-2 py-0.5 rounded-sm flex items-center gap-1 font-bold">
                          <ShieldCheck className="w-3 h-3" /> Presale
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="type-snowdon text-[#024ddf] font-bold block mb-1">
                        {event.category}
                      </span>
                      <h3 className="type-blanc text-[#121212] line-clamp-2 group-hover:text-[#024ddf] transition-colors">
                        {event.title}
                      </h3>
                      <p className="type-etna text-[#646464] mt-1.5">
                        {event.dateInfo.dow}, {event.dateInfo.month} {event.dateInfo.day} • {event.venue}
                      </p>
                    </div>

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
          )}
        </div>
      </div>
    </section>
  );
};
