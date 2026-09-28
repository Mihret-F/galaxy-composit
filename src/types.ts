export type PageType = 'home' | 'about' | 'products' | 'services' | 'gallery' | 'projects' | 'contact';

export interface Product {
  id: string;
  name: string;
  category: 'Flower Pots' | 'Playground & Custom' | 'Decorative Panels' | 'Outdoor Furniture' | 'Play Systems';
  tag?: 'Popular' | 'New' | 'Custom Fabrication' | 'Best Seller';
  description: string;
  price: string; // e.g. "From Br 450"
  numericPrice?: number;
  image: string;
  videoUrl?: string;
  features: string[];
  dimensions?: string;
  leadTime?: string;
  material?: string;
  isUserAdded?: boolean;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  highlights: string[];
  ctaText: string;
  ctaAction: string;
  iconName: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'General' | 'Pots' | 'Projects';
  filename: string;
  image: string;
  caption?: string;
}

export interface CorePrinciple {
  number: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}
