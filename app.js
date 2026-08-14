/* ==========================================================================
   TICKETMASTER DISCOVERY & TICKETING PLATFORM - CORE JAVASCRIPT ENGINE
   ========================================================================== */

/**
 * 1. FALLBACK DATASET (High-fidelity curated events when no API key or offline)
 */
function getRelativeDate(daysAhead) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day = date.getDate();
  const dow = date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
  const fullFormatted = `${dow}, ${month} ${day} • ${date.getFullYear()}`;
  return { month, day, dow, fullFormatted, timestamp: date.getTime() };
}

const FALLBACK_EVENTS = [
  {
    id: 'tm-fallback-1',
    title: 'The Eagles: Live At Sphere',
    category: 'Concerts',
    genre: 'Classic Rock',
    venue: 'Sphere',
    city: 'Las Vegas',
    state: 'NV',
    price: 185,
    dateInfo: getRelativeDate(3),
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    popular: true,
    presale: true
  },
  {
    id: 'tm-fallback-2',
    title: 'New York Knicks vs. Boston Celtics',
    category: 'Sports',
    genre: 'NBA Basketball',
    venue: 'Madison Square Garden',
    city: 'New York',
    state: 'NY',
    price: 95,
    dateInfo: getRelativeDate(5),
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
    popular: true,
    presale: false
  },
  {
    id: 'tm-fallback-3',
    title: 'Hamilton: An American Musical',
    category: 'Arts & Theater',
    genre: 'Broadway Musical',
    venue: 'Richard Rodgers Theatre',
    city: 'New York',
    state: 'NY',
    price: 125,
    dateInfo: getRelativeDate(7),
    image: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1200&q=80',
    popular: true,
    presale: true
  },
  {
    id: 'tm-fallback-4',
    title: 'Metallica: M72 Stadium World Tour',
    category: 'Concerts',
    genre: 'Heavy Metal',
    venue: 'MetLife Stadium',
    city: 'East Rutherford',
    state: 'NJ',
    price: 140,
    dateInfo: getRelativeDate(11),
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    popular: true,
    presale: false
  },
  {
    id: 'tm-fallback-5',
    title: 'Disney On Ice: Magic In The Stars',
    category: 'Family',
    genre: 'Family Ice Show',
    venue: 'Barclays Center',
    city: 'Brooklyn',
    state: 'NY',
    price: 45,
    dateInfo: getRelativeDate(14),
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    popular: false,
    presale: true
  },
  {
    id: 'tm-fallback-6',
    title: 'Coldplay: Music of the Spheres Tour',
    category: 'Concerts',
    genre: 'Pop / Alternative',
    venue: 'Rose Bowl Stadium',
    city: 'Pasadena',
    state: 'CA',
    price: 110,
    dateInfo: getRelativeDate(19),
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    popular: true,
    presale: true
  },
  {
    id: 'tm-fallback-7',
    title: 'Los Angeles Dodgers vs. San Francisco Giants',
    category: 'Sports',
    genre: 'MLB Baseball',
    venue: 'Dodger Stadium',
    city: 'Los Angeles',
    state: 'CA',
    price: 65,
    dateInfo: getRelativeDate(22),
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    popular: true,
    presale: false
  },
  {
    id: 'tm-fallback-8',
    title: 'Cirque du Soleil: "O" Aquatic Masterpiece',
    category: 'Arts & Theater',
    genre: 'Circus Arts',
    venue: 'Bellagio Hotel & Casino',
    city: 'Las Vegas',
    state: 'NV',
    price: 135,
    dateInfo: getRelativeDate(28),
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    popular: false,
    presale: true
  }
];

/**
 * 2. APPLICATION STATE
 */
const AppState = {
  events: [...FALLBACK_EVENTS],
  apiKey: '',
  selectedCategory: 'All',
  selectedLocation: 'All Cities',
  selectedDateTimeline: 'all',
  maxPrice: 300,
  presaleOnly: false,
  searchQuery: '',
  activeModalEvent: null,
  selectedTier: {
    name: 'Floor General Admission',
    price: 180,
    color: '#024ddf'
  },
  ticketQuantity: 2,
  isLiveApiActive: false
};

/**
 * 3. TICKETMASTER DISCOVERY API V2 INTEGRATION & JSON NORMALIZER
 */

/**
 * Parse and normalize an event object from Ticketmaster API v2
 */
function normalizeTicketmasterEvent(apiItem) {
  // 1. Extract 16:9 retina image
  let chosenImage = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80';
  if (apiItem.images && apiItem.images.length > 0) {
    const retina169 = apiItem.images.find(img => img.ratio === '16_9' && img.width >= 600);
    const any169 = apiItem.images.find(img => img.ratio === '16_9');
    chosenImage = retina169 ? retina169.url : (any169 ? any169.url : apiItem.images[0].url);
  }

  // 2. Extract Venue, City, State from _embedded.venues[0]
  let venueName = 'Venue TBA';
  let cityName = 'City TBA';
  let stateCode = '';
  if (apiItem._embedded && apiItem._embedded.venues && apiItem._embedded.venues[0]) {
    const v = apiItem._embedded.venues[0];
    venueName = v.name || 'Venue TBA';
    cityName = v.city ? v.city.name : 'City TBA';
    stateCode = v.state ? (v.state.stateCode || v.state.name || '') : '';
  }

  // 3. Format Local Date into Month (3-letters uppercase), Day, and DOW
  let dateObj = getRelativeDate(5);
  if (apiItem.dates && apiItem.dates.start && apiItem.dates.start.localDate) {
    const parts = apiItem.dates.start.localDate.split('-');
    if (parts.length === 3) {
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      const day = d.getDate();
      const dow = d.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
      const fullFormatted = `${dow}, ${month} ${day} • ${d.getFullYear()}`;
      dateObj = { month, day, dow, fullFormatted, timestamp: d.getTime() };
    }
  }

  // 4. Extract Minimum Price from priceRanges[0].min
  let minPrice = 65;
  if (apiItem.priceRanges && apiItem.priceRanges[0] && apiItem.priceRanges[0].min) {
    minPrice = Math.round(apiItem.priceRanges[0].min);
  }

  // 5. Categorize based on classifications[0].segment.name
  let category = 'Concerts';
  let genre = 'Live Event';
  if (apiItem.classifications && apiItem.classifications[0]) {
    const segmentName = apiItem.classifications[0].segment ? apiItem.classifications[0].segment.name.toLowerCase() : '';
    const genreName = apiItem.classifications[0].genre ? apiItem.classifications[0].genre.name : '';

    if (segmentName.includes('sport')) category = 'Sports';
    else if (segmentName.includes('art') || segmentName.includes('theatre') || segmentName.includes('theater')) category = 'Arts & Theater';
    else if (segmentName.includes('family') || segmentName.includes('children')) category = 'Family';
    else category = 'Concerts';

    if (genreName && genreName !== 'Undefined') genre = genreName;
  }

  return {
    id: apiItem.id || `tm-${Math.random().toString(36).substring(2, 9)}`,
    title: apiItem.name || 'Untitled Live Event',
    category: category,
    genre: genre,
    venue: venueName,
    city: cityName,
    state: stateCode,
    price: minPrice,
    dateInfo: dateObj,
    image: chosenImage,
    popular: true,
    presale: Boolean(apiItem.promoter || Math.random() > 0.5)
  };
}

/**
 * Fetch live events from Ticketmaster API v2
 */
async function fetchTicketmasterEvents(searchQuery = '', city = '') {
  const apiKey = AppState.apiKey.trim();
  const statusEl = document.getElementById('apiStatusMessage');

  if (!apiKey) {
    if (statusEl) statusEl.textContent = 'Showing offline curated event collection (Live API Ready)';
    AppState.events = [...FALLBACK_EVENTS];
    AppState.isLiveApiActive = false;
    renderAllViews();
    return;
  }

  if (statusEl) statusEl.textContent = 'Connecting to Ticketmaster Discovery API v2...';

  try {
    let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${encodeURIComponent(apiKey)}&size=24&sort=date,asc`;
    if (searchQuery) url += `&keyword=${encodeURIComponent(searchQuery)}`;
    if (city && city !== 'All Cities') url += `&city=${encodeURIComponent(city)}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

    const data = await response.json();
    if (data._embedded && data._embedded.events && data._embedded.events.length > 0) {
      AppState.events = data._embedded.events.map(normalizeTicketmasterEvent);
      AppState.isLiveApiActive = true;
      if (statusEl) statusEl.textContent = `Connected! Showing ${AppState.events.length} live Ticketmaster events`;
    } else {
      if (statusEl) statusEl.textContent = 'No live events found for query. Loaded backup events.';
      AppState.events = [...FALLBACK_EVENTS];
    }
  } catch (error) {
    console.warn('Ticketmaster API request error or invalid key:', error);
    if (statusEl) statusEl.textContent = 'API key invalid or rate-limited. Falling back to cached events.';
    AppState.events = [...FALLBACK_EVENTS];
    AppState.isLiveApiActive = false;
  }

  renderAllViews();
}

/**
 * 4. DOM RENDERING & VIEW UPDATES
 */

function renderAllViews() {
  renderHeroSpotlight();
  renderCarousels();
  renderFilteredEventsStream();
  updateOmniboxDropdown();
}

// 4.1 Render Hero Spotlight
function renderHeroSpotlight() {
  const spotlight = AppState.events[0] || FALLBACK_EVENTS[0];
  const heroSection = document.getElementById('heroSpotlightSection');
  if (!heroSection) return;

  heroSection.style.backgroundImage = `url('${spotlight.image}')`;
  heroSection.innerHTML = `
    <div class="hero-overlay"></div>
    <div class="container">
      <div class="hero-content">
        <div class="hero-badge-row">
          <span class="hero-badge">Featured Spotlight</span>
          <span class="type-snowdon" style="color: #d1e0ff;">${spotlight.category} • ${spotlight.genre}</span>
        </div>
        <h1 class="hero-title">${spotlight.title}</h1>
        <p class="hero-meta">${spotlight.dateInfo.fullFormatted} • ${spotlight.venue}, ${spotlight.city} ${spotlight.state}</p>
        <button class="hero-cta-btn" onclick="openSeatMapModal('${spotlight.id}')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V6a2 2 0 0 1 2-2zm0 2v2.17A4.002 4.002 0 0 1 4 14v4h16v-2.17A4.002 4.002 0 0 1 20 8V6H4zm5 3h6a1 1 0 0 1 0 2H9a1 1 0 1 1 0-2zm0 4h6a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2z"/></svg>
          <span>Find Tickets from $${spotlight.price}</span>
        </button>
      </div>
    </div>
  `;
}

// 4.2 Render Event Card HTML
function createEventCardMarkup(ev) {
  return `
    <article class="event-card" onclick="openSeatMapModal('${ev.id}')">
      <div class="card-image-wrapper">
        <img src="${ev.image}" alt="${ev.title}" class="card-image" loading="lazy" onError="this.src='https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'">
        <span class="card-category-tag">${ev.category}</span>
      </div>
      <div class="card-content">
        <div>
          <span class="card-genre">${ev.genre}</span>
          <h3 class="card-title">${ev.title}</h3>
          <p class="card-date-venue">${ev.dateInfo.fullFormatted}<br>${ev.venue} • ${ev.city}, ${ev.state}</p>
        </div>
        <div class="card-footer">
          <div>
            <div class="card-price-label">Starting From</div>
            <div class="card-price-val">$${ev.price}</div>
          </div>
          <button class="card-btn" onclick="event.stopPropagation(); openSeatMapModal('${ev.id}')">See Tickets</button>
        </div>
      </div>
    </article>
  `;
}

// 4.3 Render Horizontal Snap Carousels
function renderCarousels() {
  const popularTrack = document.getElementById('popularCarouselTrack');
  const concertsTrack = document.getElementById('concertsCarouselTrack');

  if (popularTrack) {
    popularTrack.innerHTML = AppState.events.map(createEventCardMarkup).join('');
  }

  if (concertsTrack) {
    const concerts = AppState.events.filter(e => e.category === 'Concerts');
    const displayList = concerts.length > 0 ? concerts : AppState.events;
    concertsTrack.innerHTML = displayList.map(createEventCardMarkup).join('');
  }
}

// 4.4 Render Filtered Events Stream
function renderFilteredEventsStream() {
  const container = document.getElementById('eventsStreamContainer');
  const countEl = document.getElementById('eventsCountBadge');
  if (!container) return;

  // Apply Sidebar Filters
  const filtered = AppState.events.filter(event => {
    // 1. Category Filter
    if (AppState.selectedCategory !== 'All' && event.category !== AppState.selectedCategory) {
      return false;
    }

    // 2. Price Filter
    if (event.price > AppState.maxPrice) {
      return false;
    }

    // 3. Location Filter
    if (AppState.selectedLocation !== 'All Cities') {
      const targetCity = AppState.selectedLocation.toLowerCase();
      if (!event.city.toLowerCase().includes(targetCity)) return false;
    }

    // 4. Presale Filter
    if (AppState.presaleOnly && !event.presale) {
      return false;
    }

    // 5. Search Query
    if (AppState.searchQuery.trim().length > 0) {
      const q = AppState.searchQuery.toLowerCase().trim();
      const matchTitle = event.title.toLowerCase().includes(q);
      const matchVenue = event.venue.toLowerCase().includes(q);
      const matchCity = event.city.toLowerCase().includes(q);
      const matchGenre = event.genre.toLowerCase().includes(q);
      if (!matchTitle && !matchVenue && !matchCity && !matchGenre) return false;
    }

    return true;
  });

  if (countEl) countEl.textContent = filtered.length;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="background: #ffffff; border: 1px solid var(--tm-border-light); border-radius: 8px; padding: 3rem; text-align: center;">
        <h3 class="type-kilimanjaro" style="color: var(--tm-text-primary); margin-bottom: 0.5rem;">No Events Match Your Search</h3>
        <p class="type-etna" style="color: var(--tm-text-secondary); margin-bottom: 1.25rem;">Try widening your price limit or clearing active category filters.</p>
        <button class="see-tickets-btn" onclick="resetAllFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(ev => `
    <div class="event-row-card">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <div class="event-date-badge">
          <span class="date-month">${ev.dateInfo.month}</span>
          <span class="date-day">${ev.dateInfo.day}</span>
          <span class="date-dow">${ev.dateInfo.dow}</span>
        </div>
        <div class="event-row-details">
          <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.2rem;">
            <span class="type-snowdon" style="color: var(--tm-blue-primary);">${ev.category}</span>
            <span style="color: var(--tm-text-muted);">•</span>
            <span style="font-size: 0.75rem; color: var(--tm-text-secondary);">${ev.genre}</span>
            ${ev.presale ? '<span style="font-size: 0.65rem; font-weight: 800; background: #e3fcef; color: #00875a; padding: 0.1rem 0.4rem; border-radius: 2px;">PRESALE</span>' : ''}
          </div>
          <h3 class="event-row-title">${ev.title}</h3>
          <p class="event-row-venue">${ev.venue} • ${ev.city}, ${ev.state}</p>
        </div>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;">
        <div style="text-align: right;">
          <span style="font-size: 0.75rem; color: var(--tm-text-secondary); display: block;">From</span>
          <span style="font-size: 1.25rem; font-weight: 900; color: var(--tm-text-primary);">$${ev.price}</span>
        </div>
        <button class="see-tickets-btn" onclick="openSeatMapModal('${ev.id}')">See Tickets</button>
      </div>
    </div>
  `).join('');
}

/**
 * 5. OMNIBOX PREDICTIVE AUTOCOMPLETE SEARCH
 */
function setupOmniboxSearch() {
  const input = document.getElementById('omniboxSearchInput');
  const dropdown = document.getElementById('omniboxDropdown');
  const locationSelect = document.getElementById('omniboxLocationSelect');

  if (input && dropdown) {
    input.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value;
      updateOmniboxDropdown();
      renderFilteredEventsStream();
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
  }

  if (locationSelect) {
    locationSelect.addEventListener('change', (e) => {
      AppState.selectedLocation = e.target.value;
      renderFilteredEventsStream();
      if (AppState.apiKey) {
        fetchTicketmasterEvents(AppState.searchQuery, AppState.selectedLocation);
      }
    });
  }
}

function updateOmniboxDropdown() {
  const input = document.getElementById('omniboxSearchInput');
  const dropdown = document.getElementById('omniboxDropdown');
  if (!input || !dropdown) return;

  const query = input.value.trim().toLowerCase();
  if (query.length < 2) {
    dropdown.classList.remove('active');
    return;
  }

  const matches = AppState.events.filter(ev =>
    ev.title.toLowerCase().includes(query) ||
    ev.venue.toLowerCase().includes(query) ||
    ev.city.toLowerCase().includes(query) ||
    ev.genre.toLowerCase().includes(query)
  );

  if (matches.length > 0) {
    dropdown.innerHTML = matches.slice(0, 6).map(m => `
      <div class="dropdown-item" onclick="selectDropdownMatch('${m.id}')">
        <img src="${m.image}" alt="" class="dropdown-item-thumb" onError="this.src='https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'">
        <div class="dropdown-item-info">
          <span class="dropdown-item-title">${m.title}</span>
          <span class="dropdown-item-meta">${m.dateInfo.fullFormatted} • ${m.venue}, ${m.city}</span>
        </div>
      </div>
    `).join('');
    dropdown.classList.add('active');
  } else {
    dropdown.innerHTML = `
      <div class="dropdown-item" style="cursor: default;">
        <span class="dropdown-item-title">No matching events for "${input.value}"</span>
      </div>
    `;
    dropdown.classList.add('active');
  }
}

function selectDropdownMatch(eventId) {
  const dropdown = document.getElementById('omniboxDropdown');
  if (dropdown) dropdown.classList.remove('active');
  openSeatMapModal(eventId);
}

/**
 * 6. INTERACTIVE SVG VENUE SEAT MAP MODAL & FEE CALCULATOR
 */
function openSeatMapModal(eventId) {
  const ev = AppState.events.find(e => e.id === eventId) || AppState.events[0];
  AppState.activeModalEvent = ev;

  const modal = document.getElementById('seatMapModal');
  const modalTitle = document.getElementById('modalEventTitle');
  const modalMeta = document.getElementById('modalEventMeta');

  if (modal && modalTitle && modalMeta) {
    modalTitle.textContent = ev.title;
    modalMeta.textContent = `${ev.dateInfo.fullFormatted} • ${ev.venue} (${ev.city}, ${ev.state})`;
    modal.classList.add('active');
  }

  // Default Tier
  selectVenueTier('VIP Suites Zone', Math.max(ev.price * 1.5, 250), '#F59E0B');
}

function closeSeatMapModal() {
  const modal = document.getElementById('seatMapModal');
  if (modal) modal.classList.remove('active');
}

function selectVenueTier(tierName, price, color) {
  AppState.selectedTier = { name: tierName, price: price, color: color };

  // Highlight corresponding SVG Path
  const allSections = document.querySelectorAll('.map-section');
  allSections.forEach(sec => {
    if (sec.getAttribute('data-tier-name') === tierName) {
      sec.classList.add('selected');
    } else {
      sec.classList.remove('selected');
    }
  });

  // Highlight List Item
  const allTierItems = document.querySelectorAll('.tier-item');
  allTierItems.forEach(item => {
    if (item.getAttribute('data-tier') === tierName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  updateFeeCalculations();
}

function updateTicketQuantity(qty) {
  AppState.ticketQuantity = parseInt(qty, 10);
  updateFeeCalculations();
}

function updateFeeCalculations() {
  const qty = AppState.ticketQuantity;
  const unitPrice = AppState.selectedTier.price;
  const subtotal = unitPrice * qty;
  const serviceFee = 14.75 * qty;
  const facilityFee = 4.50 * qty;
  const orderProcessing = 3.25;
  const grandTotal = subtotal + serviceFee + facilityFee + orderProcessing;

  const subtotalEl = document.getElementById('modalSubtotal');
  const serviceFeeEl = document.getElementById('modalServiceFee');
  const facilityFeeEl = document.getElementById('modalFacilityFee');
  const grandTotalEl = document.getElementById('modalGrandTotal');
  const tierDisplayEl = document.getElementById('selectedTierLabel');

  if (tierDisplayEl) tierDisplayEl.textContent = `${AppState.selectedTier.name} ($${unitPrice.toFixed(2)} ea)`;
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (serviceFeeEl) serviceFeeEl.textContent = `$${serviceFee.toFixed(2)}`;
  if (facilityFeeEl) facilityFeeEl.textContent = `$${facilityFee.toFixed(2)}`;
  if (grandTotalEl) grandTotalEl.textContent = `$${grandTotal.toFixed(2)}`;
}

function proceedToCheckout() {
  const grandTotal = document.getElementById('modalGrandTotal')?.textContent || '$0.00';
  alert(`Ticketmaster Verified Order Confirmed!\n\nEvent: ${AppState.activeModalEvent?.title}\nSection: ${AppState.selectedTier.name}\nQuantity: ${AppState.ticketQuantity} Tickets\nTotal Charged: ${grandTotal}\n\nMobile Barcode entry will be transferred to your account.`);
  closeSeatMapModal();
}

/**
 * 7. CAROUSEL SCROLL NAVIGATION
 */
function scrollCarousel(trackId, distance) {
  const track = document.getElementById(trackId);
  if (track) {
    track.scrollBy({ left: distance, behavior: 'smooth' });
  }
}

/**
 * 8. CATEGORY & FILTER HANDLERS
 */
function setCategoryFilter(category) {
  AppState.selectedCategory = category;

  // Update Nav Tabs
  const navTabs = document.querySelectorAll('.nav-tab-btn');
  navTabs.forEach(tab => {
    if (tab.getAttribute('data-cat') === category) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  renderFilteredEventsStream();
}

function handlePriceSliderChange(value) {
  AppState.maxPrice = Number(value);
  const display = document.getElementById('priceSliderValue');
  if (display) display.textContent = `$${value}`;
  renderFilteredEventsStream();
}

function togglePresaleFilter(checked) {
  AppState.presaleOnly = checked;
  renderFilteredEventsStream();
}

function resetAllFilters() {
  AppState.selectedCategory = 'All';
  AppState.selectedLocation = 'All Cities';
  AppState.maxPrice = 300;
  AppState.presaleOnly = false;
  AppState.searchQuery = '';

  const searchInput = document.getElementById('omniboxSearchInput');
  const priceSlider = document.getElementById('priceSlider');
  const presaleCheck = document.getElementById('presaleCheckbox');
  const locationSelect = document.getElementById('omniboxLocationSelect');

  if (searchInput) searchInput.value = '';
  if (priceSlider) priceSlider.value = 300;
  if (presaleCheck) presaleCheck.checked = false;
  if (locationSelect) locationSelect.value = 'All Cities';

  const priceDisplay = document.getElementById('priceSliderValue');
  if (priceDisplay) priceDisplay.textContent = '$300';

  setCategoryFilter('All');
}

/**
 * 9. API KEY CONFIGURATION PROMPT
 */
function promptApiKey() {
  const key = prompt('Enter your Ticketmaster Discovery API v2 Key:\n(Leave blank to use curated educational fallback dataset)', AppState.apiKey);
  if (key !== null) {
    AppState.apiKey = key.trim();
    fetchTicketmasterEvents();
  }
}

/**
 * 10. INITIALIZATION ON DOM READY
 */
document.addEventListener('DOMContentLoaded', () => {
  setupOmniboxSearch();
  renderAllViews();

  // Setup SVG Click Handlers
  const mapSections = document.querySelectorAll('.map-section');
  mapSections.forEach(sec => {
    sec.addEventListener('click', () => {
      const name = sec.getAttribute('data-tier-name');
      const price = parseFloat(sec.getAttribute('data-price') || '150');
      const color = sec.getAttribute('fill') || '#024ddf';
      selectVenueTier(name, price, color);
    });
  });
});
