import React, { useState, useMemo } from 'react';
import { Sparkles, Flame, Music, Trophy, Theater, Users } from 'lucide-react';
import { TopUtilityHeader } from './components/TopUtilityHeader';
import { MainNavigation } from './components/MainNavigation';
import { OmniboxSearch } from './components/OmniboxSearch';
import { HeroSpotlight } from './components/HeroSpotlight';
import { CarouselSection } from './components/CarouselSection';
import { DiscoveryLayout } from './components/DiscoveryLayout';
import { VenueSeatMapModal } from './components/VenueSeatMapModal';
import { CheckoutModal } from './components/CheckoutModal';
import { CountryModal } from './components/CountryModal';
import { AuthModal } from './components/AuthModal';
import { SellTicketsModal, VipPackagesModal, HelpModal } from './components/AuxiliaryModals';
import { SiteFooter } from './components/SiteFooter';
import { INITIAL_EVENTS, COUNTRIES_LIST } from './data/eventsData';
import { EventItem, EventCategory, SelectedTicketBooking, CountryInfo } from './types';

export default function App() {
  // Master Event Database
  const [events] = useState<EventItem[]>(INITIAL_EVENTS);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('All Cities');
  const [selectedDateRange, setSelectedDateRange] = useState<'all' | 'today' | 'this_weekend' | 'this_week' | 'next_month'>('all');
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([
    'Concerts',
    'Sports',
    'Arts & Theater',
    'Family',
  ]);
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [presaleOnly, setPresaleOnly] = useState<boolean>(false);

  // Modals & Navigation State
  const [selectedEventForMap, setSelectedEventForMap] = useState<EventItem | null>(null);
  const [activeBooking, setActiveBooking] = useState<SelectedTicketBooking | null>(null);
  const [countryModalOpen, setCountryModalOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo>(COUNTRIES_LIST[0]);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [sellModalOpen, setSellModalOpen] = useState<boolean>(false);
  const [vipModalOpen, setVipModalOpen] = useState<boolean>(false);
  const [helpModalOpen, setHelpModalOpen] = useState<boolean>(false);

  // User Authentication State
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Category Toggle Handler
  const handleToggleCategory = (category: EventCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Main Nav Category Selector
  const handleMainNavSelectCategory = (cat: string) => {
    if (cat === 'All') {
      setSelectedCategories(['Concerts', 'Sports', 'Arts & Theater', 'Family']);
    } else {
      setSelectedCategories([cat as EventCategory]);
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedCategories(['Concerts', 'Sports', 'Arts & Theater', 'Family']);
    setSelectedDateRange('all');
    setSelectedLocation('All Cities');
    setMaxPrice(300);
    setSearchQuery('');
    setPresaleOnly(false);
  };

  // Filtered Events Calculation
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      // Category Match
      if (!selectedCategories.includes(ev.category)) return false;

      // Price Match
      if (ev.priceFrom > maxPrice) return false;

      // Location Match
      if (selectedLocation !== 'All Cities' && !selectedLocation.includes('Current Location')) {
        const cityFilter = selectedLocation.split(',')[0].toLowerCase();
        if (!ev.city.toLowerCase().includes(cityFilter)) return false;
      }

      // Date Range Match
      if (selectedDateRange === 'today' && ev.daysFromNow > 1) return false;
      if (selectedDateRange === 'this_weekend' && (ev.daysFromNow > 4 || ev.daysFromNow < 1)) return false;
      if (selectedDateRange === 'this_week' && ev.daysFromNow > 7) return false;
      if (selectedDateRange === 'next_month' && ev.daysFromNow > 30) return false;

      // Presale Only Match
      if (presaleOnly && !ev.presaleActive) return false;

      // Search Query Match
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = ev.title.toLowerCase().includes(q);
        const matchVenue = ev.venue.toLowerCase().includes(q);
        const matchGenre = ev.genre.toLowerCase().includes(q);
        const matchCity = ev.city.toLowerCase().includes(q);
        if (!matchTitle && !matchVenue && !matchGenre && !matchCity) return false;
      }

      return true;
    });
  }, [events, selectedCategories, selectedLocation, selectedDateRange, maxPrice, presaleOnly, searchQuery]);

  // Featured Spotlight Event (Default: The Eagles / Sphere or first featured)
  const spotlightEvent = events.find((e) => e.featured) || events[0];

  // Carousels Datasets
  const popularEvents = events.filter((e) => e.popular);
  const concertEvents = events.filter((e) => e.category === 'Concerts');
  const sportsEvents = events.filter((e) => e.category === 'Sports');

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f6f6] font-sans antialiased text-[#121212]">
      {/* 1. Top Utility Header Bar (#121212) */}
      <TopUtilityHeader
        selectedCountry={selectedCountry}
        onOpenCountryModal={() => setCountryModalOpen(true)}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onOpenSellModal={() => setSellModalOpen(true)}
        onOpenVipModal={() => setVipModalOpen(true)}
        onOpenHelpModal={() => setHelpModalOpen(true)}
        user={user}
        onSignOut={() => setUser(null)}
      />

      {/* 2. Main Navigation Bar (#026CDF) */}
      <MainNavigation
        selectedCategory={
          selectedCategories.length === 4 ? 'All' : selectedCategories[0] || 'All'
        }
        onSelectCategory={handleMainNavSelectCategory}
        selectedCity={selectedLocation}
        onOpenCitySelector={() => setSelectedLocation('All Cities')}
        onOpenVipModal={() => setVipModalOpen(true)}
        onOpenSellModal={() => setSellModalOpen(true)}
        cartCount={activeBooking ? activeBooking.quantity : 0}
        onOpenCart={() => {
          if (activeBooking) {
            // Reopen checkout modal if booking exists
          } else {
            // Pick spotlight event if nothing in cart yet
            setSelectedEventForMap(spotlightEvent);
          }
        }}
      />

      {/* 3. 3-Part Omnibox Search Bar */}
      <OmniboxSearch
        events={events}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        selectedDateRange={selectedDateRange}
        onDateRangeChange={setSelectedDateRange}
        onSelectEvent={(event) => setSelectedEventForMap(event)}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {/* 4. Hero Spotlight Billboard */}
        <HeroSpotlight
          event={spotlightEvent}
          onSelectEvent={(event) => setSelectedEventForMap(event)}
        />

        {/* 5. Horizontal Snap Carousels */}
        <CarouselSection
          carouselId="popularCarousel"
          title="Popular Near You"
          subTitle="Trending live performances and high-demand events in your area"
          icon={<Flame className="w-5 h-5 text-[#d91b5c]" />}
          events={popularEvents}
          onSelectEvent={(event) => setSelectedEventForMap(event)}
        />

        <CarouselSection
          carouselId="concertsCarousel"
          title="Concert Highlights & World Tours"
          subTitle="Stadium headliners, arena tours, and iconic resident stages"
          icon={<Music className="w-5 h-5 text-[#024ddf]" />}
          events={concertEvents}
          onSelectEvent={(event) => setSelectedEventForMap(event)}
        />

        <CarouselSection
          carouselId="sportsCarousel"
          title="Sports Spotlight & Championship Games"
          subTitle="NBA rivalries, MLB showdowns, and international tournament matches"
          icon={<Trophy className="w-5 h-5 text-[#00875a]" />}
          events={sportsEvents}
          onSelectEvent={(event) => setSelectedEventForMap(event)}
        />

        {/* 6. Discovery Layout with Filter Sidebar & Event Stream */}
        <DiscoveryLayout
          events={filteredEvents}
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
          selectedDateRange={selectedDateRange}
          onSelectDateRange={setSelectedDateRange}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          presaleOnly={presaleOnly}
          onTogglePresale={() => setPresaleOnly(!presaleOnly)}
          onResetFilters={handleResetFilters}
          onSelectEvent={(event) => setSelectedEventForMap(event)}
        />
      </main>

      {/* 7. Interactive SVG Venue Seat Map Modal & Ticket Drawer */}
      {selectedEventForMap && (
        <VenueSeatMapModal
          event={selectedEventForMap}
          onClose={() => setSelectedEventForMap(null)}
          onProceedToCheckout={(booking) => {
            setSelectedEventForMap(null);
            setActiveBooking(booking);
          }}
        />
      )}

      {/* 8. Checkout & Payment Modal */}
      {activeBooking && (
        <CheckoutModal
          booking={activeBooking}
          onClose={() => setActiveBooking(null)}
          onSuccessDone={() => setActiveBooking(null)}
        />
      )}

      {/* Auxiliary Modals */}
      {countryModalOpen && (
        <CountryModal
          currentCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
          onClose={() => setCountryModalOpen(false)}
        />
      )}

      {authModalOpen && (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onLoginSuccess={(userData) => setUser(userData)}
        />
      )}

      {sellModalOpen && <SellTicketsModal onClose={() => setSellModalOpen(false)} />}
      {vipModalOpen && <VipPackagesModal onClose={() => setVipModalOpen(false)} />}
      {helpModalOpen && <HelpModal onClose={() => setHelpModalOpen(false)} />}

      {/* 9. Comprehensive Site Footer (#121212) */}
      <SiteFooter />
    </div>
  );
}
