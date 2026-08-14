import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Calendar, X, Sparkles, ChevronDown, Check } from 'lucide-react';
import { EventItem } from '../types';
import { POPULAR_CITIES } from '../data/eventsData';

interface OmniboxSearchProps {
  events: EventItem[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  selectedDateRange: string;
  onDateRangeChange: (range: 'all' | 'today' | 'this_weekend' | 'this_week' | 'next_month') => void;
  onSelectEvent: (event: EventItem) => void;
}

export const OmniboxSearch: React.FC<OmniboxSearchProps> = ({
  events,
  searchQuery,
  onSearchChange,
  selectedLocation,
  onLocationChange,
  selectedDateRange,
  onDateRangeChange,
  onSelectEvent,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
        setShowLocationDropdown(false);
        setShowDateDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter events for predictive autocomplete
  const predictiveMatches = events.filter((ev) => {
    if (!searchQuery || searchQuery.trim().length === 0) return false;
    const q = searchQuery.toLowerCase().trim();
    return (
      ev.title.toLowerCase().includes(q) ||
      ev.venue.toLowerCase().includes(q) ||
      ev.city.toLowerCase().includes(q) ||
      ev.genre.toLowerCase().includes(q) ||
      ev.category.toLowerCase().includes(q)
    );
  }).slice(0, 6);

  const dateOptions: { id: 'all' | 'today' | 'this_weekend' | 'this_week' | 'next_month'; label: string }[] = [
    { id: 'all', label: 'All Upcoming Dates' },
    { id: 'today', label: 'Today Only' },
    { id: 'this_weekend', label: 'This Weekend' },
    { id: 'this_week', label: 'Next 7 Days' },
    { id: 'next_month', label: 'Next 30 Days' },
  ];

  const currentDateLabel = dateOptions.find((d) => d.id === selectedDateRange)?.label || 'All Dates';

  return (
    <section className="bg-[#121212] pt-4 pb-6 px-4 sm:px-6 lg:px-8 border-b border-[#222]">
      <div className="max-w-7xl mx-auto">
        <div ref={containerRef} className="relative bg-white rounded-lg shadow-xl border border-[#949494]/40">
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#ebebeb]">
            {/* Part 1: Location Selector */}
            <div className="md:col-span-3 relative">
              <button
                type="button"
                id="omnibox-location-trigger"
                onClick={() => {
                  setShowLocationDropdown(!showLocationDropdown);
                  setShowDateDropdown(false);
                  setIsSearchFocused(false);
                }}
                className="w-full h-14 px-4 flex items-center justify-between text-left hover:bg-[#fafafa] transition-colors rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <MapPin className="w-5 h-5 text-[#024ddf] shrink-0" />
                  <div className="truncate">
                    <span className="block text-[11px] font-bold text-[#646464] uppercase tracking-wider">
                      Location
                    </span>
                    <span className="block text-sm font-semibold text-[#121212] truncate">
                      {selectedLocation}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-[#949494] shrink-0" />
              </button>

              {/* Location Dropdown Modal */}
              {showLocationDropdown && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-lg shadow-2xl border border-[#bfbfbf] p-3 z-50 animate-in fade-in-50 duration-150">
                  <div className="text-xs font-bold text-[#646464] uppercase tracking-wider mb-2 px-1">
                    Select Metropolitan Area
                  </div>
                  <div className="space-y-1 max-h-60 overflow-y-auto custom-scrollbar">
                    {POPULAR_CITIES.map((city) => {
                      const isSelected = selectedLocation === city;
                      return (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            onLocationChange(city);
                            setShowLocationDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm rounded flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-[#024ddf]/10 text-[#024ddf] font-bold'
                              : 'text-[#121212] hover:bg-[#f6f6f6]'
                          }`}
                        >
                          <span className="truncate">{city}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#024ddf]" />}
                        </button>
                      );
                    })}
                  </div>
                  <div className="pt-2 mt-2 border-t border-[#ebebeb]">
                    <button
                      type="button"
                      onClick={() => {
                        onLocationChange('Current Location (GPS)');
                        setShowLocationDropdown(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#024ddf] font-semibold hover:underline flex items-center gap-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      Use My Current Precise GPS Location
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Part 2: Dates Selector */}
            <div className="md:col-span-3 relative">
              <button
                type="button"
                id="omnibox-dates-trigger"
                onClick={() => {
                  setShowDateDropdown(!showDateDropdown);
                  setShowLocationDropdown(false);
                  setIsSearchFocused(false);
                }}
                className="w-full h-14 px-4 flex items-center justify-between text-left hover:bg-[#fafafa] transition-colors"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Calendar className="w-5 h-5 text-[#024ddf] shrink-0" />
                  <div className="truncate">
                    <span className="block text-[11px] font-bold text-[#646464] uppercase tracking-wider">
                      Dates
                    </span>
                    <span className="block text-sm font-semibold text-[#121212] truncate">
                      {currentDateLabel}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-[#949494] shrink-0" />
              </button>

              {/* Date Dropdown Modal */}
              {showDateDropdown && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-2xl border border-[#bfbfbf] p-3 z-50 animate-in fade-in-50 duration-150">
                  <div className="text-xs font-bold text-[#646464] uppercase tracking-wider mb-2 px-1">
                    Event Date Range
                  </div>
                  <div className="space-y-1">
                    {dateOptions.map((opt) => {
                      const isSelected = selectedDateRange === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            onDateRangeChange(opt.id);
                            setShowDateDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm rounded flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-[#024ddf]/10 text-[#024ddf] font-bold'
                              : 'text-[#121212] hover:bg-[#f6f6f6]'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#024ddf]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Part 3: Search Input Field & Predictive Autocomplete */}
            <div className="md:col-span-6 relative flex items-center">
              <div className="relative w-full h-14 flex items-center px-4">
                <Search className="w-5 h-5 text-[#646464] shrink-0 mr-3" />
                <input
                  ref={searchInputRef}
                  id="omnibox-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => {
                    setIsSearchFocused(true);
                    setShowLocationDropdown(false);
                    setShowDateDropdown(false);
                  }}
                  placeholder="Search by Artist, Event, Genre or Venue..."
                  className="w-full h-full text-sm sm:text-base font-medium text-[#121212] placeholder-[#949494] bg-transparent focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      onSearchChange('');
                      searchInputRef.current?.focus();
                    }}
                    className="p-1 text-[#949494] hover:text-[#121212] transition-colors rounded-full"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Live Predictive Autocomplete Dropdown Modal */}
              {isSearchFocused && searchQuery.trim().length >= 1 && (
                <div
                  id="predictive-autocomplete-dropdown"
                  className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-2xl border border-[#bfbfbf] overflow-hidden z-50 animate-in fade-in-50 duration-150"
                >
                  <div className="p-3 bg-[#f6f6f6] border-b border-[#ebebeb] flex items-center justify-between text-xs text-[#646464]">
                    <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#024ddf]" />
                      Top Matching Live Events
                    </span>
                    <span>{predictiveMatches.length} results</span>
                  </div>

                  {predictiveMatches.length > 0 ? (
                    <div className="divide-y divide-[#ebebeb] max-h-96 overflow-y-auto custom-scrollbar">
                      {predictiveMatches.map((match) => (
                        <div
                          key={match.id}
                          onClick={() => {
                            onSelectEvent(match);
                            setIsSearchFocused(false);
                          }}
                          className="p-3 flex items-center justify-between hover:bg-[#f0f5ff] cursor-pointer transition-colors group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={match.image}
                              alt={match.title}
                              className="w-14 h-14 rounded object-cover shrink-0 border border-[#ebebeb] group-hover:scale-105 transition-transform"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="type-snowdon text-[#024ddf] font-bold">
                                  {match.category}
                                </span>
                                <span className="text-[#bfbfbf]">•</span>
                                <span className="text-xs font-semibold text-[#646464]">{match.genre}</span>
                              </div>
                              <h4 className="text-sm font-bold text-[#121212] truncate group-hover:text-[#024ddf] transition-colors">
                                {match.title}
                              </h4>
                              <p className="text-xs text-[#646464] truncate">
                                {match.dateInfo.fullDate} • {match.venue}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0 pl-3">
                            <span className="text-[11px] text-[#646464] block">From</span>
                            <span className="text-sm font-black text-[#121212] group-hover:text-[#024ddf]">
                              ${match.priceFrom}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-[#646464]">
                      <p className="text-sm font-semibold">No live events match &quot;{searchQuery}&quot;</p>
                      <p className="text-xs mt-1 text-[#949494]">
                        Try searching for &quot;Eagles&quot;, &quot;Knicks&quot;, &quot;Hamilton&quot;, or &quot;Concerts&quot;
                      </p>
                    </div>
                  )}

                  <div className="p-2.5 bg-[#f6f6f6] border-t border-[#ebebeb] text-center">
                    <button
                      type="button"
                      onClick={() => setIsSearchFocused(false)}
                      className="text-xs text-[#024ddf] font-bold hover:underline"
                    >
                      View all matching results in discovery list below ↓
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
