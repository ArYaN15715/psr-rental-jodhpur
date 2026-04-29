export type PropertyType = "home" | "pg" | "office" | "shop";

export interface PropertyCard {
  id: string;
  title: string;
  price: string;
  priceNum: number;
  location: string;
  area: string;
  type: PropertyType;
  badge: string | null;
  badgeType: "new" | "hot" | "available" | null;
  image: string;
  bedrooms?: number;
  floor?: string;
  tags: string[];
}

export interface Category {
  id: PropertyType;
  label: string;
  icon: string;
  description: string;
  count: number;
}

export interface SearchQuery {
  propertyType: PropertyType;
  area: string;
  budget: string;
  bhkType: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  location: string;
  date: string;
  propertyType: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseItem {
  icon: string;
  title: string;
  description: string;
}
