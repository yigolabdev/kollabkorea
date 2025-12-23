
import React from 'react';

export const COLORS = {
  RED: '#dc0000',
  BEIGE: '#e4e0db',
  SILVER: '#c0c0c0',
  BLACK: '#000000',
  WHITE: '#ffffff',
};

export const NAVIGATION: { label: string; href: string }[] = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'PLATFORM', href: '#platform' },
  { label: 'BRANDS', href: '#brands' },
  { label: 'CONTACT', href: '#contact' },
  { label: 'FAQ', href: '#faq' },
];

export const SPACE_TIERS = [
  {
    name: 'PREMIUM',
    description: 'High-visibility flagship activation zones.',
    features: ['Prime Location', 'Full Branding Control', 'Dedicated Staff Support', 'PR Integration'],
  },
  {
    name: 'STANDARD',
    description: 'Optimized retail spaces for growing brands.',
    features: ['Modular Display Units', 'Shared Logistics', 'Data Analytics', 'POS Integration'],
  },
  {
    name: 'BASIC',
    description: 'Essential placement for product validation.',
    features: ['Multi-brand Shelf Space', 'Basic Maintenance', 'Sales Reports'],
  },
];
