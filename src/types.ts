export type EventCategory = 'Concerts' | 'Sports' | 'Arts & Theater' | 'Family';

export interface DateInfo {
  month: string;
  day: number;
  dow: string;
  fullDate: string;
  time: string;
  timestamp: number;
}

export interface SeatTier {
  id: string;
  name: string;
  code: string;
  section: string;
  price: number;
  originalPrice?: number;
  availableCount: number;
  color: string;
  zone: 'stage' | 'floor' | 'lower_bowl' | 'club_level' | 'upper_tier';
  description: string;
  viewAngle: string;
}

export interface EventItem {
  id: string;
  title: string;
  subTitle?: string;
  category: EventCategory;
  genre: string;
  venue: string;
  city: string;
  state: string;
  priceFrom: number;
  daysFromNow: number;
  dateInfo: DateInfo;
  image: string;
  bannerImage?: string;
  featured?: boolean;
  popular?: boolean;
  presaleActive?: boolean;
  sellingFast?: boolean;
  tourName?: string;
  seatTiers: SeatTier[];
}

export interface FilterState {
  categories: EventCategory[];
  dateRange: 'all' | 'today' | 'this_weekend' | 'this_week' | 'next_month';
  searchQuery: string;
  location: string;
  maxPrice: number;
  presaleOnly: boolean;
}

export interface SelectedTicketBooking {
  event: EventItem;
  tier: SeatTier;
  quantity: number;
  subtotal: number;
  serviceFee: number;
  facilityFee: number;
  processingFee: number;
  grandTotal: number;
  deliveryMethod: 'mobile' | 'instant_transfer' | 'vip_will_call';
}

export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
}
