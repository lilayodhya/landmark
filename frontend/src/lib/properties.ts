export interface Property {
  id: string;

  title: string;
  slug: string;

  listing: "sale" | "rent";

  type: "Villa" | "Apartment" | "Penthouse" | "Townhouse" | "Plot";

  location: string;

  bedrooms: number;
  bathrooms: number;
  area: number;

  price: number;

  description: string;

  features: string[];

  images: string[];

  featured: boolean;

  status: string;

  created_at: string;
  updated_at: string;
}