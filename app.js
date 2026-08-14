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
    id: 'VV1aZ9v1001TM',
    title: 'Eagles: The Long Farewell Tour',
    category: 'Concerts',
    genre: 'Classic Rock',
    venue: 'TD Garden',
    city: 'Boston',
    state: 'MA',
    price: 150,
    maxPrice: 750,
    dateInfo: { month: 'AUG', day: 17, dow: 'MON', fullFormatted: 'Mon, Aug 17 • 2026', timestamp: new Date('2026-08-17T20:55:04').getTime() },
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    popular: true,
    presale: true,
    lineup: ['Eagles', 'Steely Dan'],
    venueAddress: '100 Legends Way, Boston, MA 02114',
    fullDescription: 'Experience Eagles: The Long Farewell Tour live at TD Garden in Boston, MA. Features world-class production, state-of-the-art audio, and an unforgettable live experience.',
    entryRequirements: 'Clear bag policy strictly enforced. Professional cameras, recording devices, and outside food/beverage are prohibited.'
  },
  {
    id: 'VV1aZ9v1002TM',
    title: 'Metallica: M72 World Tour',
    category: 'Concerts',
    genre: 'Heavy Metal',
    venue: 'Madison Square Garden',
    city: 'New York',
    state: 'NY',
    price: 95,
    maxPrice: 450,
    dateInfo: { month: 'AUG', day: 20, dow: 'THU', fullFormatted: 'Thu, Aug 20 • 2026', timestamp: new Date('2026-08-20T20:55:04').getTime() },
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    popular: true,
    presale: false,
    lineup: ['Metallica', 'Pantera', 'Mammoth WVH'],
    venueAddress: '4 Pennsylvania Plaza, New York, NY 10001',
    fullDescription: 'Experience Metallica: M72 World Tour live at Madison Square Garden in New York, NY. Features the iconic in-the-round stage setup and unmatched metal power.',
    entryRequirements: 'Clear bag policy strictly enforced. Re-entry is prohibited once validated.'
  },
  {
    id: 'VV1aZ9v1003TM',
    title: 'Taylor Swift: The Eras Tour',
    category: 'Concerts',
    genre: 'Pop',
    venue: 'Crypto.com Arena',
    city: 'Los Angeles',
    state: 'CA',
    price: 199,
    maxPrice: 899,
    dateInfo: { month: 'AUG', day: 24, dow: 'MON', fullFormatted: 'Mon, Aug 24 • 2026', timestamp: new Date('2026-08-24T20:55:04').getTime() },
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    popular: true,
    presale: true,
    lineup: ['Taylor Swift', 'Gracie Abrams'],
    venueAddress: '1111 S Figueroa St, Los Angeles, CA 90015',
    fullDescription: 'Experience Taylor Swift: The Eras Tour live at Crypto.com Arena in Los Angeles, CA. Journey through all musical eras with breathtaking stadium visuals.',
    entryRequirements: 'Clear bag policy strictly enforced. Valid digital mobile ticket required.'
  },
  {
    id: 'VV1aZ9v1004TM',
    title: 'Coldplay: Music of the Spheres World Tour',
    category: 'Concerts',
    genre: 'Alternative Rock',
    venue: 'Sphere',
    city: 'Las Vegas',
    state: 'NV',
    price: 85,
    maxPrice: 380,
    dateInfo: { month: 'AUG', day: 28, dow: 'FRI', fullFormatted: 'Fri, Aug 28 • 2026', timestamp: new Date('2026-08-28T20:55:04').getTime() },
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    popular: true,
    presale: true,
    lineup: ['Coldplay', 'H.E.R.'],
    venueAddress: '255 Sands Ave, Las Vegas, NV 89109',
    fullDescription: 'Experience Coldplay: Music of the Spheres World Tour live inside the ground-breaking immersive Sphere in Las Vegas with kinetic LED wristbands.',
    entryRequirements: 'Mobile ticketing only. Strict bag sizing restrictions apply.'
  },
  {
    id: 'VV1aZ9v1005TM',
    title: "Drake & PartyNextDoor: It's All A Blur",
    category: 'Concerts',
    genre: 'Hip-Hop/Rap',
    venue: 'United Center',
    city: 'Chicago',
    state: 'IL',
    price: 120,
    maxPrice: 600,
    dateInfo: { month: 'SEP', day: 1, dow: 'TUE', fullFormatted: 'Tue, Sep 01 • 2026', timestamp: new Date('2026-09-01T20:55:04').getTime() },
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    popular: true,
    presale: false,
    lineup: ['Drake', 'PartyNextDoor'],
    venueAddress: '1901 W Madison St, Chicago, IL 60612',
    fullDescription: "Experience Drake & PartyNextDoor: It's All A Blur live at United Center in Chicago, IL. A massive arena showcase featuring chart-topping anthems.",
    entryRequirements: 'Mobile ticketing enforced. Outside food and beverages prohibited.'
  },
  {
    id: 'VV1aZ9v1006TM',
    title: 'Billie Eilish: Hit Me Hard and Soft Tour',
    category: 'Concerts',
    genre: 'Pop / Alternative',
    venue: 'Kaseya Center',
    city: 'Miami',
    state: 'FL',
    price: 75,
    maxPrice: 320,
    dateInfo: { month: 'SEP', day: 5, dow: 'SAT', fullFormatted: 'Sat, Sep 05 • 2026', timestamp: new Date('2026-09-05T20:55:04').getTime() },
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    popular: true,
    presale: true,
    lineup: ['Billie Eilish'],
    venueAddress: '601 Biscayne Blvd, Miami, FL 33132',
    fullDescription: 'Experience Billie Eilish: Hit Me Hard and Soft Tour live at Kaseya Center in Miami, FL with dynamic 360-degree stage visuals.',
    entryRequirements: 'Digital entry only. Eco-friendly sustainability guidelines encouraged.'
  },
  {
    id: 'VV1aZ9v1007TM',
    title: 'New York Knicks vs. Boston Celtics',
    category: 'Sports',
    genre: 'NBA Basketball',
    venue: 'TD Garden',
    city: 'Boston',
    state: 'MA',
    price: 90,
    maxPrice: 550,
    dateInfo: { month: 'AUG', day: 18, dow: 'TUE', fullFormatted: 'Tue, Aug 18 • 2026', timestamp: new Date('2026-08-18T20:55:04').getTime() },
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
    popular: true,
    presale: false,
    lineup: ['New York Knicks', 'Boston Celtics'],
    venueAddress: '100 Legends Way, Boston, MA 02114',
    fullDescription: 'Experience the historic Eastern Conference rivalry as the New York Knicks take on the Boston Celtics at TD Garden in Boston.',
    entryRequirements: 'Arena security protocol. Standard NBA clear bag policy in effect.'
  },
  {
    id: 'VV1aZ9v1008TM',
    title: 'Los Angeles Lakers vs. Golden State Warriors',
    category: 'Sports',
    genre: 'NBA Basketball',
    venue: 'Madison Square Garden',
    city: 'New York',
    state: 'NY',
    price: 110,
    maxPrice: 650,
    dateInfo: { month: 'AUG', day: 21, dow: 'FRI', fullFormatted: 'Fri, Aug 21 • 2026', timestamp: new Date('2026-08-21T20:55:04').getTime() },
    image: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80',
    popular: true,
    presale: true,
    lineup: ['Los Angeles Lakers', 'Golden State Warriors'],
    venueAddress: '4 Pennsylvania Plaza, New York, NY 10001',
    fullDescription: 'Marquee blockbuster showdown between the Los Angeles Lakers and Golden State Warriors at the World’s Most Famous Arena.',
    entryRequirements: 'Mobile ticketing mandatory. Re-entry is not permitted.'
  },
  {
    id: 'VV1aZ9v1009TM',
    title: 'New York Rangers vs. New Jersey Devils',
    category: 'Sports',
    genre: 'NHL Hockey',
    venue: 'Crypto.com Arena',
    city: 'Los Angeles',
    state: 'CA',
    price: 65,
    maxPrice: 320,
    dateInfo: { month: 'AUG', day: 25, dow: 'TUE', fullFormatted: 'Tue, Aug 25 • 2026', timestamp: new Date('2026-08-25T20:55:04').getTime() },
    image: 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&w=1200&q=80',
    popular: true,
    presale: false,
    lineup: ['New York Rangers', 'New Jersey Devils'],
    venueAddress: '1111 S Figueroa St, Los Angeles, CA 90015',
    fullDescription: 'High-intensity NHL showdown featuring hard hits, rapid breakaways, and world-class goaltending at Crypto.com Arena.',
    entryRequirements: 'Clear bag policy. Doors open 60 minutes prior to puck drop.'
  },
  {
    id: 'VV1aZ9v1010TM',
    title: 'WWE Monday Night RAW Live',
    category: 'Sports',
    genre: 'Professional Wrestling',
    venue: 'Sphere',
    city: 'Las Vegas',
    state: 'NV',
    price: 40,
    maxPrice: 250,
    dateInfo: { month: 'AUG', day: 29, dow: 'SAT', fullFormatted: 'Sat, Aug 29 • 2026', timestamp: new Date('2026-08-29T20:55:04').getTime() },
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
    popular: false,
    presale: true,
    lineup: ['WWE Superstars', 'Cody Rhodes', 'Rhea Ripley'],
    venueAddress: '255 Sands Ave, Las Vegas, NV 89109',
    fullDescription: 'Experience WWE Monday Night RAW Live broadcast live from Sphere in Las Vegas with immersive titantron pyrotechnics.',
    entryRequirements: 'All ages welcome. Strict arena screening upon entry.'
  },
  {
    id: 'VV1aZ9v1011TM',
    title: 'Hamilton: An American Musical',
    category: 'Arts & Theater',
    genre: 'Broadway Musical',
    venue: 'United Center',
    city: 'Chicago',
    state: 'IL',
    price: 125,
    maxPrice: 450,
    dateInfo: { month: 'AUG', day: 19, dow: 'WED', fullFormatted: 'Wed, Aug 19 • 2026', timestamp: new Date('2026-08-19T20:55:04').getTime() },
    image: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1200&q=80',
    popular: true,
    presale: true,
    lineup: ['Broadway Original Cast Ensemble'],
    venueAddress: '1901 W Madison St, Chicago, IL 60612',
    fullDescription: 'Lin-Manuel Miranda’s Pulitzer Prize-winning cultural phenomenon blending hip-hop, jazz, and R&B storytelling.',
    entryRequirements: 'Late arrivals will be seated at appropriate pauses in the performance.'
  },
  {
    id: 'VV1aZ9v1012TM',
    title: 'Wicked: The Untold Story of the Witches of Oz',
    category: 'Arts & Theater',
    genre: 'Broadway Musical',
    venue: 'Kaseya Center',
    city: 'Miami',
    state: 'FL',
    price: 99,
    maxPrice: 380,
    dateInfo: { month: 'AUG', day: 23, dow: 'SUN', fullFormatted: 'Sun, Aug 23 • 2026', timestamp: new Date('2026-08-23T20:55:04').getTime() },
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
    popular: true,
    presale: false,
    lineup: ['Gershwin Theatre Cast'],
    venueAddress: '601 Biscayne Blvd, Miami, FL 33132',
    fullDescription: 'The blockbuster musical looking at what happened in the Land of Oz from a different angle with breathtaking musical scores.',
    entryRequirements: 'Recommended for ages 8 and up. Mobile entry only.'
  },
  {
    id: 'VV1aZ9v1013TM',
    title: 'Bill Burr: Live Stand-up Comedy',
    category: 'Arts & Theater',
    genre: 'Comedy',
    venue: 'TD Garden',
    city: 'Boston',
    state: 'MA',
    price: 65,
    maxPrice: 220,
    dateInfo: { month: 'AUG', day: 26, dow: 'WED', fullFormatted: 'Wed, Aug 26 • 2026', timestamp: new Date('2026-08-26T20:55:04').getTime() },
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=1200&q=80',
    popular: false,
    presale: true,
    lineup: ['Bill Burr'],
    venueAddress: '100 Legends Way, Boston, MA 02114',
    fullDescription: 'Grammy-nominated comedian Bill Burr delivers his signature unfiltered, fast-paced comedy live at TD Garden.',
    entryRequirements: 'Phone-free event: devices locked in secure pouches during show.'
  },
  {
    id: 'VV1aZ9v1014TM',
    title: 'The Lion King Broadway Production',
    category: 'Arts & Theater',
    genre: 'Broadway Musical',
    venue: 'Madison Square Garden',
    city: 'New York',
    state: 'NY',
    price: 105,
    maxPrice: 410,
    dateInfo: { month: 'AUG', day: 30, dow: 'SUN', fullFormatted: 'Sun, Aug 30 • 2026', timestamp: new Date('2026-08-30T20:55:04').getTime() },
    image: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1200&q=80',
    popular: true,
    presale: false,
    lineup: ['Minskoff Theatre Cast'],
    venueAddress: '4 Pennsylvania Plaza, New York, NY 10001',
    fullDescription: 'Marvel at the stunning visual artistry, unforgettable music, and extraordinary theatrical puppetry of Disney’s The Lion King.',
    entryRequirements: 'All attendees must hold a ticket regardless of age.'
  },
  {
    id: 'VV1aZ9v1015TM',
    title: 'Disney On Ice: Magic In The Stars',
    category: 'Family',
    genre: 'Children & Family',
    venue: 'Crypto.com Arena',
    city: 'Los Angeles',
    state: 'CA',
    price: 35,
    maxPrice: 140,
    dateInfo: { month: 'AUG', day: 22, dow: 'SAT', fullFormatted: 'Sat, Aug 22 • 2026', timestamp: new Date('2026-08-22T20:55:04').getTime() },
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    popular: true,
    presale: true,
    lineup: ['Disney On Ice Performers'],
    venueAddress: '1111 S Figueroa St, Los Angeles, CA 90015',
    fullDescription: 'Chart a course through the night sky with Mickey, Minnie, Elsa, Mirabel, and Disney stars in an enchanting ice extravaganza.',
    entryRequirements: 'Costumes permitted for guests under 14. Children under 2 free on parent lap.'
  },
  {
    id: 'VV1aZ9v1016TM',
    title: 'Monster Jam World Finals',
    category: 'Family',
    genre: 'Motorsports / Family',
    venue: 'Sphere',
    city: 'Las Vegas',
    state: 'NV',
    price: 30,
    maxPrice: 120,
    dateInfo: { month: 'SEP', day: 3, dow: 'THU', fullFormatted: 'Thu, Sep 03 • 2026', timestamp: new Date('2026-09-03T20:55:04').getTime() },
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    popular: false,
    presale: false,
    lineup: ['Grave Digger', 'Max-D', 'El Toro Loco'],
    venueAddress: '255 Sands Ave, Las Vegas, NV 89109',
    fullDescription: 'The most unexpected, unscripted, and unforgettable motorsports experience with world championship gravity-defying stunts.',
    entryRequirements: 'Ear protection recommended for young children. Pit Party passes available.'
  },
  {
    id: 'VV1aZ9v1017TM',
    title: 'PAW Patrol Live!: Heroes Unite',
    category: 'Family',
    genre: "Children's Theater",
    venue: 'United Center',
    city: 'Chicago',
    state: 'IL',
    price: 25,
    maxPrice: 95,
    dateInfo: { month: 'SEP', day: 7, dow: 'MON', fullFormatted: 'Mon, Sep 07 • 2026', timestamp: new Date('2026-09-07T20:55:04').getTime() },
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
    popular: false,
    presale: true,
    lineup: ['PAW Patrol Live Performers'],
    venueAddress: '1901 W Madison St, Chicago, IL 60612',
    fullDescription: 'Calling all heroes! Ryder and the PAW Patrol pups embark on their biggest stage mission yet with interactive audience participation.',
    entryRequirements: 'Family-friendly entry with booster seats and stroller check available.'
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

  const basePrice = ev.price || 85;
  const maxPrice = ev.maxPrice || Math.round(basePrice * 2.8);

  const vipPrice = maxPrice;
  const clubPrice = Math.round(basePrice * 1.6);
  const floorPrice = Math.round(basePrice * 1.3);
  const lowerPrice = basePrice;
  const upperPrice = Math.round(Math.max(basePrice * 0.6, 25));

  // Update Tier labels in modal DOM
  const tierMap = {
    'VIP Suites Zone': vipPrice,
    'Club Lounge 200s': clubPrice,
    'Floor General Admission': floorPrice,
    'Lower Bowl 100s': lowerPrice,
    'Upper Balcony 300s': upperPrice
  };

  document.querySelectorAll('.tier-item').forEach(item => {
    const tier = item.getAttribute('data-tier');
    if (tier && tierMap[tier] !== undefined) {
      const priceSpan = item.querySelector('span:last-child');
      if (priceSpan) priceSpan.textContent = `$${tierMap[tier]}.00`;
      item.setAttribute('onclick', `selectVenueTier('${tier}', ${tierMap[tier]}, '${tier === 'VIP Suites Zone' ? '#F59E0B' : tier === 'Floor General Admission' ? '#024ddf' : tier === 'Club Lounge 200s' ? '#8B5CF6' : tier === 'Lower Bowl 100s' ? '#10B981' : '#64748B'}')`);
    }
  });

  // Update SVG Section Data Attributes
  document.querySelectorAll('.map-section').forEach(sec => {
    const tier = sec.getAttribute('data-tier-name');
    if (tier && tierMap[tier] !== undefined) {
      sec.setAttribute('data-price', tierMap[tier]);
    }
  });

  if (modal && modalTitle && modalMeta) {
    modalTitle.textContent = ev.title;
    const lineupText = ev.lineup && ev.lineup.length > 0 ? `Lineup: ${ev.lineup.join(', ')} • ` : '';
    modalMeta.textContent = `${lineupText}${ev.dateInfo.fullFormatted} • ${ev.venue} (${ev.city}, ${ev.state})`;
    modal.classList.add('active');
  }

  // Select Floor or VIP tier by default
  selectVenueTier('Floor General Admission', floorPrice, '#024ddf');
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

  // Update Desktop Nav Tabs
  const navTabs = document.querySelectorAll('.nav-tab-btn');
  navTabs.forEach(tab => {
    if (tab.getAttribute('data-cat') === category) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Update Mobile Cat Pills
  const mobilePills = document.querySelectorAll('.mobile-cat-pill');
  mobilePills.forEach(pill => {
    if (pill.getAttribute('data-cat') === category) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  renderFilteredEventsStream();
}

function toggleMobileFilterDrawer() {
  const sidebar = document.getElementById('filterSidebar');
  const btnText = document.getElementById('mobileFilterButtonText');
  if (sidebar) {
    sidebar.classList.toggle('open');
    const isOpen = sidebar.classList.contains('open');
    if (btnText) {
      btnText.textContent = isOpen ? 'Hide Filters ▲' : 'Filters & Refinements ▼';
    }
  }
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
      const name = sec.getAttribute('data-tier-name') || sec.getAttribute('data-section');
      const price = parseFloat(sec.getAttribute('data-price') || '150');
      const color = sec.getAttribute('fill') || '#024ddf';
      selectVenueTier(name, price, color);
    });
  });
});

// Interoperability Aliases
window.fetchLiveTicketmasterEvents = fetchTicketmasterEvents;
window.fetchTicketmasterEvents = fetchTicketmasterEvents;
window.selectTier = selectVenueTier;
window.selectVenueTier = selectVenueTier;
window.filterEvents = renderFilteredEventsStream;
window.renderFilteredEvents = renderFilteredEventsStream;
window.selectSearchMatch = selectDropdownMatch;
window.openSeatMapModal = openSeatMapModal;
window.closeSeatMapModal = closeSeatMapModal;
window.setCategoryFilter = setCategoryFilter;
window.handlePriceSliderChange = handlePriceSliderChange;
window.togglePresaleFilter = togglePresaleFilter;
window.resetAllFilters = resetAllFilters;
window.promptApiKey = promptApiKey;
window.proceedToCheckout = proceedToCheckout;
window.updateTicketQuantity = updateTicketQuantity;
window.scrollCarousel = scrollCarousel;
window.toggleMobileFilterDrawer = toggleMobileFilterDrawer;
