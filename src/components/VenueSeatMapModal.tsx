import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ShieldCheck, Ticket, Info, Check, Sparkles, ChevronRight, AlertCircle } from 'lucide-react';
import { EventItem, SeatTier, SelectedTicketBooking } from '../types';

interface VenueSeatMapModalProps {
  event: EventItem;
  onClose: () => void;
  onProceedToCheckout: (booking: SelectedTicketBooking) => void;
}

export const VenueSeatMapModal: React.FC<VenueSeatMapModalProps> = ({
  event,
  onClose,
  onProceedToCheckout,
}) => {
  const [selectedTier, setSelectedTier] = useState<SeatTier>(event.seatTiers[0]);
  const [hoveredTier, setHoveredTier] = useState<SeatTier | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState<number>(2);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [deliveryMethod, setDeliveryMethod] = useState<'mobile' | 'instant_transfer' | 'vip_will_call'>('mobile');

  // Pricing calculations
  const serviceFeePerTicket = 14.50;
  const facilityFeePerTicket = 4.25;
  const orderProcessingFee = 2.95;

  const subtotal = selectedTier.price * ticketQuantity;
  const totalServiceFee = serviceFeePerTicket * ticketQuantity;
  const totalFacilityFee = facilityFeePerTicket * ticketQuantity;
  const grandTotal = subtotal + totalServiceFee + totalFacilityFee + orderProcessingFee;

  const handleSelectSection = (tier: SeatTier) => {
    setSelectedTier(tier);
  };

  const handleCheckoutClick = () => {
    const booking: SelectedTicketBooking = {
      event,
      tier: selectedTier,
      quantity: ticketQuantity,
      subtotal,
      serviceFee: totalServiceFee,
      facilityFee: totalFacilityFee,
      processingFee: orderProcessingFee,
      grandTotal,
      deliveryMethod,
    };
    onProceedToCheckout(booking);
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, 0.8), 1.8));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <div
      id="seatMapModal"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex items-center justify-center p-0 md:p-4 animate-in fade-in duration-200"
    >
      <div className="bg-[#121212] text-white w-full h-full md:max-w-6xl md:h-[92vh] md:rounded-xl shadow-2xl border border-[#333] flex flex-col overflow-hidden">
        {/* Top Modal Header */}
        <div className="bg-[#1a1a1a] border-b border-[#2d2d2d] px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#024ddf] text-white flex items-center justify-center font-bold shrink-0">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="type-snowdon bg-[#ffb932] text-[#121212] font-black px-1.5 py-0.5 rounded">
                  Interactive Seat Map
                </span>
                <span className="text-xs text-[#a0a0a0] hidden sm:inline">{event.category}</span>
              </div>
              <h2 id="modalEventTitle" className="type-blanc text-white font-bold truncate max-w-[280px] sm:max-w-md md:max-w-xl">
                {event.title}
              </h2>
              <p className="text-xs text-[#a0a0a0] truncate">
                {event.dateInfo.fullDate} • {event.venue}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#a0a0a0] hover:text-white hover:bg-[#262626] rounded-full transition-colors"
            title="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Main Body: SVG Venue Map (Left) + Ticket Drawer (Right) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Column: Interactive Vector SVG Seat Map Viewport */}
          <div className="flex-1 bg-[#0d0d0d] relative overflow-hidden flex flex-col items-center justify-center p-4">
            {/* Map Action Toolbar */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-[#1a1a1a]/90 backdrop-blur-md p-1.5 rounded-lg border border-[#333] shadow-md">
              <button
                type="button"
                onClick={() => handleZoom(0.2)}
                className="p-1.5 text-[#e0e0e0] hover:text-white hover:bg-[#262626] rounded"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleZoom(-0.2)}
                className="p-1.5 text-[#e0e0e0] hover:text-white hover:bg-[#262626] rounded"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="p-1.5 text-[#e0e0e0] hover:text-white hover:bg-[#262626] rounded text-xs flex items-center gap-1"
                title="Reset View"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

            {/* Live Hover Info Pill */}
            <div className="absolute top-4 right-4 z-20 bg-[#1a1a1a]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#333] shadow-md text-xs">
              {hoveredTier ? (
                <span className="text-white flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: hoveredTier.color }}
                  />
                  <strong className="text-white">{hoveredTier.name}</strong> • ${hoveredTier.price} ea
                </span>
              ) : (
                <span className="text-[#a0a0a0] flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-[#024ddf]" /> Click any colored section to select seats
                </span>
              )}
            </div>

            {/* SVG Venue Map Canvas */}
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-200 select-none"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <svg
                viewBox="0 0 800 650"
                className="w-full max-w-[620px] max-h-[500px] drop-shadow-2xl"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Stage Lighting Gradient */}
                  <linearGradient id="stageGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#024ddf" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#121212" stopOpacity="0.9" />
                  </linearGradient>

                  {/* VIP Glow Filter */}
                  <filter id="vipGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Stadium Outer Arena Boundary Wall */}
                <ellipse
                  cx="400"
                  cy="340"
                  rx="360"
                  ry="270"
                  fill="#151515"
                  stroke="#2a2a2a"
                  strokeWidth="4"
                />

                {/* Inner Concourse Walkway */}
                <ellipse
                  cx="400"
                  cy="340"
                  rx="320"
                  ry="240"
                  fill="#181818"
                  stroke="#333"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />

                {/* 1. UPPER TIER SECTIONS (High Balcony) */}
                {/* Upper 301 Center */}
                <path
                  id="sec-upper-301"
                  d="M 200 120 C 300 70, 500 70, 600 120 L 560 170 C 480 135, 320 135, 240 170 Z"
                  fill="#525252"
                  stroke={selectedTier.id === 'tier-upper-301' ? '#ffffff' : '#3d3d3d'}
                  strokeWidth={selectedTier.id === 'tier-upper-301' ? '3' : '1.5'}
                  className={`venue-map-section ${
                    selectedTier.id === 'tier-upper-301' ? 'active-selected' : ''
                  }`}
                  onMouseEnter={() => setHoveredTier(event.seatTiers[5])}
                  onMouseLeave={() => setHoveredTier(null)}
                  onClick={() => handleSelectSection(event.seatTiers[5])}
                />
                <text x="400" y="115" fill="#e0e0e0" fontSize="12" fontWeight="bold" textAnchor="middle">
                  UPPER 301 • $89
                </text>

                {/* Upper 302 Left/Right Corners */}
                <path
                  id="sec-upper-302-left"
                  d="M 90 260 C 90 180, 140 140, 200 120 L 240 170 C 190 190, 160 220, 160 270 Z"
                  fill="#404040"
                  stroke={selectedTier.id === 'tier-upper-302' ? '#ffffff' : '#2b2b2b'}
                  strokeWidth={selectedTier.id === 'tier-upper-302' ? '3' : '1.5'}
                  className={`venue-map-section ${
                    selectedTier.id === 'tier-upper-302' ? 'active-selected' : ''
                  }`}
                  onMouseEnter={() => setHoveredTier(event.seatTiers[6])}
                  onMouseLeave={() => setHoveredTier(null)}
                  onClick={() => handleSelectSection(event.seatTiers[6])}
                />
                <path
                  id="sec-upper-302-right"
                  d="M 710 260 C 710 180, 660 140, 600 120 L 560 170 C 610 190, 640 220, 640 270 Z"
                  fill="#404040"
                  stroke={selectedTier.id === 'tier-upper-302' ? '#ffffff' : '#2b2b2b'}
                  strokeWidth={selectedTier.id === 'tier-upper-302' ? '3' : '1.5'}
                  className={`venue-map-section ${
                    selectedTier.id === 'tier-upper-302' ? 'active-selected' : ''
                  }`}
                  onMouseEnter={() => setHoveredTier(event.seatTiers[6])}
                  onMouseLeave={() => setHoveredTier(null)}
                  onClick={() => handleSelectSection(event.seatTiers[6])}
                />
                <text x="160" y="210" fill="#bbb" fontSize="10" fontWeight="bold" textAnchor="middle">
                  302 (L)
                </text>
                <text x="640" y="210" fill="#bbb" fontSize="10" fontWeight="bold" textAnchor="middle">
                  302 (R) • $59
                </text>

                {/* 2. CLUB LEVEL LOGE SUITES */}
                <path
                  id="sec-club-201"
                  d="M 230 520 C 320 575, 480 575, 570 520 L 535 470 C 465 510, 335 510, 265 470 Z"
                  fill="#d91b5c"
                  stroke={selectedTier.id === 'tier-club-201' ? '#ffffff' : '#a31043'}
                  strokeWidth={selectedTier.id === 'tier-club-201' ? '3' : '1.5'}
                  className={`venue-map-section ${
                    selectedTier.id === 'tier-club-201' ? 'active-selected' : ''
                  }`}
                  onMouseEnter={() => setHoveredTier(event.seatTiers[4])}
                  onMouseLeave={() => setHoveredTier(null)}
                  onClick={() => handleSelectSection(event.seatTiers[4])}
                />
                <text x="400" y="535" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  CLUB LOGE 201 • $140
                </text>

                {/* 3. LOWER BOWL 101 & 102 */}
                {/* Lower Bowl 101 (Center Rear) */}
                <path
                  id="sec-lower-101"
                  d="M 260 460 C 330 500, 470 500, 540 460 L 510 400 C 450 430, 350 430, 290 400 Z"
                  fill="#00875a"
                  stroke={selectedTier.id === 'tier-lower-101' ? '#ffffff' : '#005a3c'}
                  strokeWidth={selectedTier.id === 'tier-lower-101' ? '3' : '1.5'}
                  className={`venue-map-section ${
                    selectedTier.id === 'tier-lower-101' ? 'active-selected' : ''
                  }`}
                  onMouseEnter={() => setHoveredTier(event.seatTiers[2])}
                  onMouseLeave={() => setHoveredTier(null)}
                  onClick={() => handleSelectSection(event.seatTiers[2])}
                />
                <text x="400" y="445" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  LOWER 101 • $185
                </text>

                {/* Lower Bowl 102 Left Side */}
                <path
                  id="sec-lower-102-left"
                  d="M 170 300 C 170 250, 210 200, 260 180 L 290 230 C 260 245, 230 270, 230 300 Z"
                  fill="#00875a"
                  stroke={selectedTier.id === 'tier-lower-102' ? '#ffffff' : '#005a3c'}
                  strokeWidth={selectedTier.id === 'tier-lower-102' ? '3' : '1.5'}
                  className={`venue-map-section ${
                    selectedTier.id === 'tier-lower-102' ? 'active-selected' : ''
                  }`}
                  onMouseEnter={() => setHoveredTier(event.seatTiers[3])}
                  onMouseLeave={() => setHoveredTier(null)}
                  onClick={() => handleSelectSection(event.seatTiers[3])}
                />
                {/* Lower Bowl 102 Right Side */}
                <path
                  id="sec-lower-102-right"
                  d="M 630 300 C 630 250, 590 200, 540 180 L 510 230 C 540 245, 570 270, 570 300 Z"
                  fill="#00875a"
                  stroke={selectedTier.id === 'tier-lower-102' ? '#ffffff' : '#005a3c'}
                  strokeWidth={selectedTier.id === 'tier-lower-102' ? '3' : '1.5'}
                  className={`venue-map-section ${
                    selectedTier.id === 'tier-lower-102' ? 'active-selected' : ''
                  }`}
                  onMouseEnter={() => setHoveredTier(event.seatTiers[3])}
                  onMouseLeave={() => setHoveredTier(null)}
                  onClick={() => handleSelectSection(event.seatTiers[3])}
                />
                <text x="220" y="245" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  102 (L)
                </text>
                <text x="580" y="245" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  102 (R) • $165
                </text>

                {/* 4. FLOOR RESERVED SECTION A */}
                <rect
                  id="sec-floor-a"
                  x="300"
                  y="295"
                  width="200"
                  height="90"
                  rx="6"
                  fill="#024ddf"
                  stroke={selectedTier.id === 'tier-floor-a' ? '#ffffff' : '#013294'}
                  strokeWidth={selectedTier.id === 'tier-floor-a' ? '3' : '1.5'}
                  className={`venue-map-section ${
                    selectedTier.id === 'tier-floor-a' ? 'active-selected' : ''
                  }`}
                  onMouseEnter={() => setHoveredTier(event.seatTiers[1])}
                  onMouseLeave={() => setHoveredTier(null)}
                  onClick={() => handleSelectSection(event.seatTiers[1])}
                />
                <text x="400" y="340" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                  FLOOR SEC A • $220
                </text>
                <text x="400" y="358" fill="#d1e0ff" fontSize="9" textAnchor="middle">
                  Reserved Seating Row 1-12
                </text>

                {/* 5. FLOOR PIT VIP / GA FRONT */}
                <path
                  id="sec-floor-vip"
                  d="M 310 220 L 490 220 L 480 280 L 320 280 Z"
                  fill="#ffb932"
                  stroke={selectedTier.id === 'tier-floor-vip' ? '#ffffff' : '#c98a12'}
                  strokeWidth={selectedTier.id === 'tier-floor-vip' ? '3' : '1.5'}
                  className={`venue-map-section ${
                    selectedTier.id === 'tier-floor-vip' ? 'active-selected' : ''
                  }`}
                  onMouseEnter={() => setHoveredTier(event.seatTiers[0])}
                  onMouseLeave={() => setHoveredTier(null)}
                  onClick={() => handleSelectSection(event.seatTiers[0])}
                />
                <text x="400" y="250" fill="#121212" fontSize="11" fontWeight="900" textAnchor="middle">
                  ★ FLOOR VIP PIT • $275 ★
                </text>
                <text x="400" y="266" fill="#423000" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Direct Stage Access
                </text>

                {/* 6. MAIN STAGE */}
                <path
                  d="M 280 150 L 520 150 L 500 200 L 300 200 Z"
                  fill="#222"
                  stroke="#555"
                  strokeWidth="2"
                />
                {/* Stage Runway Extension */}
                <rect x="385" y="195" width="30" height="20" fill="#333" stroke="#555" strokeWidth="1" />
                <text x="400" y="180" fill="#ffffff" fontSize="14" fontWeight="900" textAnchor="middle" letterSpacing="3">
                  STAGE
                </text>

                {/* Stage Spotlight Cones */}
                <polygon points="300,150 240,240 360,240" fill="url(#stageGlow)" opacity="0.3" />
                <polygon points="500,150 440,240 560,240" fill="url(#stageGlow)" opacity="0.3" />

                {/* Sound Mixing Console Tower */}
                <rect x="380" y="395" width="40" height="20" rx="3" fill="#262626" stroke="#444" strokeWidth="1" />
                <text x="400" y="408" fill="#888" fontSize="6" textAnchor="middle">
                  SOUND / LIGHTS
                </text>
              </svg>
            </div>

            {/* Bottom Color Swatches Legend */}
            <div className="w-full bg-[#161616] p-2.5 rounded-lg border border-[#2b2b2b] flex flex-wrap items-center justify-center gap-3 text-xs mt-2 shrink-0">
              <span className="text-[#a0a0a0] font-semibold text-[11px] uppercase mr-1">Zone Legend:</span>
              {event.seatTiers.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => handleSelectSection(tier)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded transition-all ${
                    selectedTier.id === tier.id
                      ? 'bg-white/20 text-white font-bold ring-1 ring-white'
                      : 'text-[#bbb] hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: tier.color }}
                  />
                  <span>{tier.name}</span>
                  <span className="text-[#ffb932] font-semibold">${tier.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Ticket Selection & Itemized Fee Drawer */}
          <div className="w-full lg:w-[380px] bg-[#171717] border-t lg:border-t-0 lg:border-l border-[#2e2e2e] p-5 flex flex-col justify-between overflow-y-auto custom-scrollbar shrink-0">
            <div className="space-y-4">
              {/* Selected Tier Banner */}
              <div className="bg-[#202020] rounded-lg p-4 border border-[#333]">
                <div className="flex items-center justify-between">
                  <span className="type-snowdon text-[#024ddf] bg-[#024ddf]/20 px-2 py-0.5 rounded font-bold">
                    {selectedTier.code}
                  </span>
                  <span className="text-xs text-[#00875a] font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Verified Available ({selectedTier.availableCount} left)
                  </span>
                </div>

                <h3 id="tierNameDisplay" className="type-kilimanjaro text-white font-bold mt-2">
                  {selectedTier.name}
                </h3>
                <p className="text-xs text-[#a0a0a0] mt-1">{selectedTier.description}</p>

                <div className="mt-3 p-2 bg-[#121212] rounded border border-[#262626] text-xs text-[#d1e0ff]">
                  <strong className="text-white block font-semibold">Sightline Perspective:</strong>
                  {selectedTier.viewAngle}
                </div>

                <div className="mt-3 flex items-baseline justify-between pt-2 border-t border-[#2e2e2e]">
                  <span className="text-xs text-[#a0a0a0]">Face Value</span>
                  <span id="tierPriceDisplay" className="text-xl font-black text-white">
                    ${selectedTier.price.toFixed(2)} <span className="text-xs font-normal text-[#a0a0a0]">/ each</span>
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="bg-[#202020] rounded-lg p-4 border border-[#333]">
                <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-wider mb-2">
                  Number of Tickets
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">Select Quantity:</span>
                  <select
                    id="ticketQtySelect"
                    value={ticketQuantity}
                    onChange={(e) => setTicketQuantity(parseInt(e.target.value, 10))}
                    className="bg-[#121212] text-white border border-[#444] rounded px-3 py-1.5 text-sm font-bold focus:ring-[#024ddf] focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 8].map((qty) => (
                      <option key={qty} value={qty}>
                        {qty} Ticket{qty > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="bg-[#202020] rounded-lg p-4 border border-[#333]">
                <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-wider mb-2">
                  Delivery Option
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-xs text-white p-2 rounded bg-[#121212] border border-[#2e2e2e] cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={deliveryMethod === 'mobile'}
                        onChange={() => setDeliveryMethod('mobile')}
                        className="text-[#024ddf] focus:ring-[#024ddf]"
                      />
                      <div>
                        <span className="font-semibold block">Mobile e-Ticket (Instant Barcode)</span>
                        <span className="text-[#a0a0a0] text-[11px]">Free delivery directly to mobile wallet</span>
                      </div>
                    </div>
                    <span className="text-[#00875a] font-bold">FREE</span>
                  </label>
                </div>
              </div>

              {/* Itemized Price Breakdown */}
              <div className="bg-[#202020] rounded-lg p-4 border border-[#333] space-y-2 text-xs">
                <div className="flex justify-between text-[#ccc]">
                  <span>Tickets ({ticketQuantity} × ${selectedTier.price})</span>
                  <span id="subtotalDisplay" className="font-semibold text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#a0a0a0]">
                  <span>Standard Service Fee ({ticketQuantity} × ${serviceFeePerTicket.toFixed(2)})</span>
                  <span>${totalServiceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#a0a0a0]">
                  <span>Facility Fee ({ticketQuantity} × ${facilityFeePerTicket.toFixed(2)})</span>
                  <span>${totalFacilityFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#a0a0a0]">
                  <span>Order Processing</span>
                  <span>${orderProcessingFee.toFixed(2)}</span>
                </div>

                <div className="pt-2 border-t border-[#333] flex justify-between items-baseline text-sm">
                  <span className="font-bold text-white">Grand Total:</span>
                  <span id="totalPriceDisplay" className="text-xl font-black text-[#ffb932]">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Checkout CTA */}
            <div className="pt-4 border-t border-[#2e2e2e] space-y-3 mt-4">
              <button
                type="button"
                id="checkout-now-btn"
                onClick={handleCheckoutClick}
                className="w-full type-fiji bg-[#024ddf] hover:bg-[#0139a7] active:bg-[#012e85] text-white py-3.5 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Checkout Now • ${grandTotal.toFixed(2)}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#a0a0a0]">
                <ShieldCheck className="w-4 h-4 text-[#00875a]" />
                <span>100% Buyer Guarantee • Verified Authentic Tickets</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
