# Master System Prompt: Ticketmaster Live Event Discovery & Ticketing Architecture

Use this comprehensive prompt in **Google AI Studio**, **Gemini 1.5 Pro**, **Gemini 2.0 Flash**, or any advanced AI Coding Agent to generate or recreate this live event discovery, interactive venue mapping, and ticketing web application.

---

```markdown
You are an expert Frontend Architect and Design System Engineer. Build a high-performance, pixel-precise, production-ready Live Event Discovery & Venue Ticketing Web Application modeled after the Ticketmaster design system and user experience.

## 1. Design System Tokens & Typography Scale

Implement the exact Averta typographic scale and CSS variable design tokens:

### 1.1 Typography Tokens
- `--mauna`: 900 Black (Mobile: 44px/44px, Desktop: 54px/44px) - Hero headlines and major announcements.
- `--everest`: 800 ExtraBold (Mobile: 32px/32px, Desktop: 44px/44px) - Section headlines and performer titles.
- `--kilimanjaro`: 700 Bold (Mobile: 24px/26px, Desktop: 32px/34px) - Modal titles and calendar date badges.
- `--matterhorn`: 700 Bold (Mobile: 24px/30px, Desktop: 28px/34px) - Subsection headers.
- `--vinson`: 700 Bold (Mobile: 22px/24px, Desktop: 24px/28px) - Section category headers.
- `--blanc`: 600 Semibold (Mobile: 18px/22px, Desktop: 20px/24px) - Event card titles and drawer titles.
- `--fiji`: 600 Semibold (18px/26px) - Primary navigation links and action buttons.
- `--rainier`: 400 Regular / 600 (Mobile: 16px/22px, Desktop: 16px/24px) - Default body text and form inputs.
- `--etna`: 400 Regular (Mobile: 14px/18px, Desktop: 14px/20px) - Subtitles and secondary metadata labels.
- `--snowdon`: 700 Bold UPPERCASE (12px/20px, tracking: 0.05em) - Microcopy, tags, and status badges.

### 1.2 Color & Elevation Tokens
- `--tm-blue-primary`: `#024ddf` (Primary CTA buttons, Sticky Nav Bar, Active Tabs)
- `--tm-blue-hover`: `#0139a7`
- `--tm-blue-active`: `#012e85`
- `--tm-dark-bg`: `#121212` (Global top bar, date badges, dark modals, footer)
- `--tm-dark-surface`: `#1f1f1f`
- `--tm-bg-main`: `#f6f6f6`
- `--tm-surface-white`: `#ffffff`
- `--tm-border-light`: `#bfbfbf`
- `--tm-border-subtle`: `#ebebeb`
- `--tm-accent-gold`: `#ffb932` (VIP highlights, premium tier indicators)
- `--tm-accent-green`: `#00875a` (Verified Presale badge)
- `--tm-resale-pink`: `#d91b5c` (Selling Fast / In-Demand badge)
- **Elevation Level 1 (Card Default)**: `box-shadow: 0px 1px 4px 0px rgba(18, 18, 18, 0.15);`
- **Elevation Level 2 (Hover State)**: `box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.35);`
- **Elevation Level 3 (Modal Overlay)**: `box-shadow: 0px 3px 12px 0px rgba(18, 18, 18, 0.18);`

---

## 2. Core Functional Modules

### 2.1 Global Navigation & Header System
1. **Top Utility Bar (`#121212`)**:
   - Country / Currency modal trigger (US, CA, UK, AU, DE, FR, JP, etc.).
   - Auxiliary services: Hotels, Sell Tickets, Gift Cards, VIP Packages, Help Center.
   - Account Authentication state (Sign In / Register modal, user profile greeting, sign out).
2. **Main Sticky Navigation Bar (`#024ddf`)**:
   - Ticketmaster SVG ticket logomark.
   - Primary category tabs: All, Concerts, Sports, Arts & Theater, Family.
   - City indicator with quick selector.
3. **3-Part Omnibox Search Widget**:
   - [Location Pin]: City/Zip selector with GPS geolocation detection.
   - [Calendar Date]: Timeline dropdown selector (All, Today, Weekend, This Week, Next Month).
   - [Magnifier Search]: Instant autocomplete prediction dropdown (`z-index: 500`) filtering events with live thumbnails, dates, venues, and starting prices.

### 2.2 Billboard Spotlight & Snap Carousels
1. **Hero Spotlight Billboard**:
   - 16:9 (mobile) to 21:9 (desktop) aspect ratio.
   - Dual gradient overlays for text contrast, verified presale badges, venue tags, and "See Tickets" action button.
2. **Horizontal Snap Carousels (`scroll-snap-type: x mandatory`)**:
   - Carousels for:
     * *Popular Near You*
     * *Concert Highlights & World Tours*
     * *Sports Spotlight & Championship Games*
   - Cards (`.event-card`) with 16:9 image ratios, 1.05x hover zoom, genre tags, and smooth left/right arrow controllers.

### 2.3 Event Discovery Grid & Filter Sidebar
- Multi-criteria filter sidebar:
  * Category checkboxes (Concerts, Sports, Arts & Theater, Family).
  * Date range selector.
  * Price range slider ($40 to $300+).
  * Verified Presale toggle.
- Event stream with View Mode Switcher (**List View** vs **Grid View**).
- Authentic dark calendar date badges with 3-tier layout (Month, Day Number, Day-of-Week).

### 2.4 Interactive SVG Venue Seat Map & Checkout Flow
1. **Vector Seat Map Modal**:
   - Fullscreen on mobile, `1100px × 900px` on desktop.
   - Color-coded interactive SVG sectors:
     * Floor Pit VIP (`#ffb932` gold)
     * Floor Reserved A (`#024ddf` blue)
     * Lower Bowl 101/102 (`#00875a` green)
     * Club Loge 201 (`#8a2be2` purple)
     * Upper Tier 301/302 (`#00a3e0` cyan)
   - Interactive zoom controls (+ / - / Reset) and section selection highlights.
2. **Side Ticket Selection Drawer**:
   - Transparent price itemization: Base Price + Service Fee ($14.50) + Facility Fee ($4.25).
   - Dynamic quantity selector (1 to 8 tickets).
   - Instant transfer delivery options.
3. **Checkout & Mobile Ticket Pass**:
   - 10-minute reservation countdown timer.
   - Payment method choices (Credit Card, Apple Pay, PayPal).
   - Post-purchase animated digital mobile pass with barcode, seat tier details, and calendar export.

---

## 3. Technical & Accessibility Requirements
- **Framework**: React 18+ with TypeScript & Tailwind CSS.
- **Icons**: Lucide React.
- **Accessibility**:
  * High-contrast focus rings (`outline: 2px solid #024ddf; outline-offset: 2px;`).
  * `.visually-hidden` classes for screen-reader text.
  * Keyboard navigation with <kbd>Esc</kbd> modal dismissal and tab focus trap.
- **Zero Mock Failures**: Ensure full interactive state management across every button, filter, and modal.
```
