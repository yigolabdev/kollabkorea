
export interface NavItem {
  label: string;
  href: string;
}

export interface SpaceTier {
  name: string;
  description: string;
  features: string[];
}

export interface BrandPartner {
  name: string;
  imageUrl: string;
  status?: string;
}
