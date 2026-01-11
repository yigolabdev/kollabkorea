/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

// ==================== LANGUAGE & I18N ====================

export type Language = 'en' | 'ko';

export interface Dictionary {
  [key: string]: string;
}

export interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// ==================== NAVIGATION ====================

export type PageId = 'home' | 'about' | 'platform' | 'brands' | 'contact' | 'faq';

export interface NavigationProps {
  onNavigate: (page: string) => void;
}

export interface PageProps extends NavigationProps {
  onHeaderVisibilityChange?: (isVisible: boolean) => void;
}

// ==================== CHAT ====================

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

// ==================== BRAND & ARTIST ====================

export interface Artist {
  name: string;
  image: string;
  day: string;
  genre: string;
}

export interface BrandPartner {
  logo: string | null;
  name: string;
}

// ==================== ROADMAP ====================

export interface StageData {
  id: number;
  title: string;
  subtitle: string;
  description: string[];
  Icon: LucideIcon;
  color: string;
  position: {
    top: number; // Percentage 0-100 for desktop arc
  };
}

// ==================== UI COMPONENTS ====================

export interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isVisible: boolean;
}

export interface FooterProps {
  onNavigate?: (page: string) => void;
}

export interface BlindLineProps {
  children: ReactNode;
}

// ==================== ANIMATION ====================

export interface AnimationVariants {
  hidden: Record<string, unknown>;
  visible: Record<string, unknown>;
}

// ==================== FORM ====================

export interface BrandApplicationForm {
  brandName: string;
  contactPerson: string;
  phone: string;
  email: string;
  category: string;
  website: string;
  message: string;
}

// ==================== CONTENT ====================

export interface BrandsContent {
  hero: {
    titleLines: string[];
    deck: string;
  };
  laPartnersTitle?: string;
  grid: {
    items: string[];
  };
}

export interface ContentBlock {
  title: string;
  deck?: string;
  lines?: string[];
  [key: string]: unknown;
}
