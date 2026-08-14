import React, { useState } from 'react';
import { Filter, Calendar, Tag, ShieldCheck, Ticket, Check, RotateCcw, Flame, LayoutGrid, List, Layers, Eye } from 'lucide-react';
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
  const [selectedSeatType, setSelectedSeatType] = useState<string>('all');
  const [activeWireframeSection, setActiveWireframeSection] = useState<string>('floor');
  const allCategories: EventCategory[] = ['Concerts', 'Sports', 'Arts & Theater', 'Family'];

  const dateOptions: { id: 'all' | 'today' | 'this_weekend' | 'this_week' | 'next_month'; label: string }[] = [
    { id: 'all', label: 'All Upcoming Dates' },
    { id: 'today', label: 'Today Only' },
    { id: 'this_weekend', label: 'This Weekend' },
    { id: 'this_week', label: 'Next 7 Days' },
    { id: 'next_month', label: 'Next 30 Days' },
  ];

  const seatTypes = [
    { id: 'all', label: 'All Seating Types' },
    { id: 'vip', label: 'VIP Pit & Luxury Suites' },
    { id: 'floor', label: 'General Admission Floor' },
    { id: 'lower', label: 'Lower Bowl Reserved' },
    { id: 'club', label: 'Club Level Lounge' },
    { id: 'upper', label: 'Upper Tier Balcony' },
  ];

  const wireframeSections = [
    { id: 'vip', name: 'VIP Pit & Suites', status: 'Reserving', price: '$275+', color: '#F59E0B', statusClass: 'text-amber-400 bg-amber-500/10 border-amber-500/30', angle: 'Front & Center Stage Access' },
    { id: 'floor', name: 'Floor General Admission', status: 'Available', price: '$180+', color: '#026CDF', statusClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30', angle: 'Direct Immersion Level' },
    { id: 'lower', name: 'Lower Tier 100s', status: 'Available', price: '$125+', color: '#10B981', statusClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30', angle: 'Elevated Prime Sightlines' },
    { id: 'club', name: 'Club Lounge 200s', status: 'Reserving', price: '$165+', color: '#8B5CF6', statusClass: 'text-amber-400 bg-amber-500/10 border-amber-500/30', angle: 'Exclusive Bar & Luxury Seating' },
    { id: 'upper', name: 'Upper Tier 300s', status: 'Sold Out', price: '$55+', color: '#64748B', statusClass: 'text-slate-400 bg-slate-500/10 border-slate-500/30', angle: 'Panoramic Arena Vista' },
  ];

  const activeSectionInfo = wireframeSections.find(s => s.id === activeWireframeSection) || wireframeSections[0];

  return (
    <section id="discovery-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Interactive Venue Stage Wireframe Mockup Bar */}
      <div className="mb-8 bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-[#026CDF] font-bold text-xs uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" /> Live Interactive Stage Visualizer Wireframe
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">Interactive Venue Zone Availability</h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Click any colored venue tier below to inspect real-time capacity and view-angle parameters.
            </p>
          </div>

          {/* Availability Legend */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Available
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> Reserving Fast
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-slate-500"></span> Sold Out
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 items-center">
          {/* SVG Venue Stage Wireframe */}
          <div className="lg:col-span-7 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
            <svg viewBox="0 0 500 280" className="w-full max-w-[460px] h-auto select-none">
              <defs>
                <linearGradient id="stageGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#026CDF" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Main Stage Rectangle */}
              <rect x="150" y="15" width="200" height="35" rx="4" fill="url(#stageGlow)" stroke="#38BDF8" strokeWidth="2" />
              <text x="250" y="38" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="2">
                ★ MAIN STAGE ★
              </text>

              {/* VIP Pit Section */}
              <path
                d="M 175 60 L 325 60 L 310 95 L 190 95 Z"
                fill={activeWireframeSection === 'vip' ? '#F59E0B' : '#78350F'}
                fillOpacity={activeWireframeSection === 'vip' ? '0.9' : '0.5'}
                stroke="#F59E0B"
                strokeWidth={activeWireframeSection === 'vip' ? '2.5' : '1.5'}
                className="cursor-pointer transition-all hover:opacity-100"
                onClick={() => setActiveWireframeSection('vip')}
              />
              <text x="250" y="82" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" pointerEvents="none">
                VIP PIT ($275)
              </text>

              {/* Floor General Admission */}
              <path
                d="M 140 105 L 360 105 L 340 155 L 160 155 Z"
                fill={activeWireframeSection === 'floor' ? '#026CDF' : '#1E3A8A'}
                fillOpacity={activeWireframeSection === 'floor' ? '0.9' : '0.5'}
                stroke="#38BDF8"
                strokeWidth={activeWireframeSection === 'floor' ? '2.5' : '1.5'}
                className="cursor-pointer transition-all hover:opacity-100"
                onClick={() => setActiveWireframeSection('floor')}
              />
              <text x="250" y="135" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" pointerEvents="none">
                FLOOR GA ($180)
              </text>

              {/* Lower Tier 100s Bowl */}
              <path
                d="M 100 165 C 180 205, 320 205, 400 165 L 380 205 C 310 235, 190 235, 120 205 Z"
                fill={activeWireframeSection === 'lower' ? '#10B981' : '#064E3B'}
                fillOpacity={activeWireframeSection === 'lower' ? '0.9' : '0.5'}
                stroke="#10B981"
                strokeWidth={activeWireframeSection === 'lower' ? '2.5' : '1.5'}
                className="cursor-pointer transition-all hover:opacity-100"
                onClick={() => setActiveWireframeSection('lower')}
              />
              <text x="250" y="200" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" pointerEvents="none">
                LOWER TIER 100s ($125)
              </text>

              {/* Club Level Left & Right */}
              <path
                d="M 60 80 L 125 100 L 110 150 L 50 120 Z"
                fill={activeWireframeSection === 'club' ? '#8B5CF6' : '#4C1D95'}
                fillOpacity={activeWireframeSection === 'club' ? '0.9' : '0.5'}
                stroke="#8B5CF6"
                strokeWidth={activeWireframeSection === 'club' ? '2.5' : '1.5'}
                className="cursor-pointer transition-all hover:opacity-100"
                onClick={() => setActiveWireframeSection('club')}
              />
              <path
                d="M 440 80 L 375 100 L 390 150 L 450 120 Z"
                fill={activeWireframeSection === 'club' ? '#8B5CF6' : '#4C1D95'}
                fillOpacity={activeWireframeSection === 'club' ? '0.9' : '0.5'}
                stroke="#8B5CF6"
                strokeWidth={activeWireframeSection === 'club' ? '2.5' : '1.5'}
                className="cursor-pointer transition-all hover:opacity-100"
                onClick={() => setActiveWireframeSection('club')}
              />
              <text x="85" y="120" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" pointerEvents="none">
                CLUB
              </text>
              <text x="415" y="120" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" pointerEvents="none">
                CLUB
              </text>

              {/* Upper Tier 300s Perimeter */}
              <path
                d="M 70 215 C 160 270, 340 270, 430 215 L 450 240 C 350 300, 150 300, 50 240 Z"
                fill={activeWireframeSection === 'upper' ? '#64748B' : '#1E293B'}
                fillOpacity={activeWireframeSection === 'upper' ? '0.9' : '0.5'}
                stroke="#64748B"
                strokeWidth={activeWireframeSection === 'upper' ? '2.5' : '1.5'}
                className="cursor-pointer transition-all hover:opacity-100"
                onClick={() => setActiveWireframeSection('upper')}
              />
              <text x="250" y="258" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" pointerEvents="none">
                UPPER BALCONY 300s ($55)
              </text>
            </svg>
          </div>

          {/* Section Insight Card */}
          <div className="lg:col-span-5 bg-slate-800/80 p-5 rounded-lg border border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Selected Section
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${activeSectionInfo.statusClass}`}>
                {activeSectionInfo.status}
              </span>
            </div>

            <div>
              <h4 className="text-xl font-black text-white">{activeSectionInfo.name}</h4>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#026CDF]" /> {activeSectionInfo.angle}
              </p>
            </div>

            <div className="p-3 bg-slate-900 rounded-md border border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Starting From</span>
                <span className="text-xl font-black text-amber-300">{activeSectionInfo.price}</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block font-medium">Delivery</span>
                <span className="text-xs font-bold text-white">Instant Mobile Transfer</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              {wireframeSections.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveWireframeSection(sec.id)}
                  className={`px-2.5 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    activeWireframeSection === sec.id
                      ? 'bg-[#026CDF] text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {sec.id.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

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

          {/* Filter Group: Seat Types */}
          <div className="py-4 border-b border-[#ebebeb]">
            <h4 className="type-etna font-bold text-[#121212] mb-3 uppercase tracking-wider">
              Seat Categories
            </h4>
            <div className="space-y-2">
              {seatTypes.map((type) => {
                const isSelected = selectedSeatType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedSeatType(type.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#026CDF] text-white shadow-xs'
                        : 'text-[#646464] hover:bg-[#f6f6f6] hover:text-[#121212]'
                    }`}
                  >
                    <span>{type.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
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
