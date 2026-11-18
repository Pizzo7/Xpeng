export interface Socials {
  instagram: string;
  facebook: string;
  youtube: string;
  x: string;
}

export interface Showroom {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  mapUrl: string;
}

export interface ContactLocation {
  name: string;
  address: string;
  city: string;
  hours: string;
  lat: number;
  lng: number;
  mapEmbedUrl: string;
  mapUrl: string;
}

export interface SiteData {
  companyName: string;
  distributorWording: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  siteUrl: string;
  socials: Socials;
  cities: string[];
  contactLocation: ContactLocation;
  showrooms: Showroom[];
  ghanaNotes: {
    roads: string;
    charging: string;
  };
  about: {
    headline: string;
    body: string;
  };
  privacy: {
    headline: string;
    body: string;
  };
  terms: {
    headline: string;
    body: string;
  };
}

export interface SpecRows {
  label: string;
  value: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  image: string;
}

export interface MediaOption {
  id: string;
  name: string;
  image: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
}

export interface LifestyleItem {
  id: string;
  title: string;
  description: string;
  poster: string;
  video: string;
}

export interface AssemblyStep {
  id: string;
  title: string;
  description: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

/** Full detail page content for any XPENG model in Ghana */
export interface ModelDetail {
  id: string;
  name: string;
  headline: string;
  subheadline: string;
  priceGhs: number;
  priceNote: string;
  availableInGhana: boolean;
  specs: {
    range: string;
    acceleration: string;
    battery: string;
    charging: string;
    dimensions: string;
  };
  specRows: SpecRows[];
  features: Feature[];
  colors: ColorOption[];
  wheels: MediaOption[];
  interiors: MediaOption[];
  gallery: GalleryItem[];
  lifestyle: LifestyleItem[];
  assemblyStory: AssemblyStep[];
  ownership: {
    charging: string;
    warranty: string;
    service: string;
    faq: FaqItem[];
  };
}

/** @deprecated Use ModelDetail — kept briefly for safer migrations */
export type G9LData = ModelDetail;

export interface TestDrivePayload {
  name: string;
  phone: string;
  email: string;
  city: string;
  showroomId: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

export interface ModelHighlight {
  label: string;
  value: string;
}

export interface ModelItem {
  id: string;
  name: string;
  fullName: string;
  category: string;
  tagline: string;
  description: string;
  status: "available" | "coming" | "inquiry";
  statusLabel: string;
  href: string;
  image: string;
  poster: string;
  highlights: ModelHighlight[];
  featured: boolean;
}

export interface ModelsData {
  headline: string;
  subheadline: string;
  categories: { id: string; label: string }[];
  models: ModelItem[];
}

export interface ChargingPoint {
  id: string;
  name: string;
  city: string;
  address: string;
  type: string;
  access: string;
  hours: string;
  note: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface DiscoverData {
  chargingPoints: {
    headline: string;
    subheadline: string;
    intro: string;
    points: ChargingPoint[];
  };
  news: {
    headline: string;
    subheadline: string;
    articles: NewsArticle[];
  };
  services: {
    headline: string;
    subheadline: string;
    intro: string;
    items: ServiceItem[];
  };
}
