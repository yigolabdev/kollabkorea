// ============================================
// NAVIGATION
// ============================================
export interface NavigationLink {
  name: string;
  href: string;
}

// ============================================
// BENEFITS
// ============================================
export interface Benefit {
  title: string;
  items: string[];
}

// ============================================
// ZONES
// ============================================
export interface ZoneInfo {
  name: string;
  count: number;
  features: string[];
  color: string;
}

// ============================================
// CONTACT
// ============================================
export interface ContactInfo {
  email: string;
  instagram: string;
  instagramUrl: string;
  businessHours: string;
}

// ============================================
// FORM
// ============================================
export type BrandCategory = 'Beauty' | 'Fashion' | 'Food' | 'Lifestyle' | 'Other' | '';

export interface BrandApplication {
  brandName: string;
  category: BrandCategory;
  contactPerson: string;
  email: string;
  phone: string;
  instagram: string;
  message: string;
}

export interface FormError {
  field: keyof BrandApplication;
  message: string;
}

// ============================================
// UTILITY TYPES
// ============================================
export type MousePosition = {
  x: number;
  y: number;
};

export type ScrollPosition = {
  x: number;
  y: number;
};