export type Property = {
  id: string;
  title: string;
  location: string;
  city: string;
  price: number;
  priceLabel: string;
  type: "Villa" | "Apartment" | "Penthouse" | "Townhouse" | "Plot";
  listing: "sale" | "rent";
  bedrooms: number;
  bathrooms: number;
  area: number; // sqft
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  highlights: string[];
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

export const properties: Property[] = [
  {
    id: "azure-heights-villa",
    title: "Azure Heights Villa",
    location: "Juhu, Mumbai",
    city: "Mumbai",
    price: 125000000,
    priceLabel: "₹12.5 Cr",
    type: "Villa",
    listing: "sale",
    bedrooms: 5,
    bathrooms: 6,
    area: 6200,
    image: img("photo-1613490493576-7fde63acd811"),
    gallery: [
      img("photo-1613490493576-7fde63acd811"),
      img("photo-1600585154340-be6161a56a0c"),
      img("photo-1600566753190-17f0baa2a6c3"),
      img("photo-1600210492486-724fe5c67fb0"),
    ],
    description:
      "An architectural statement on a private corner of Juhu. Floor-to-ceiling glass opens onto an infinity pool and lush gardens, while imported Italian marble flows through the entertaining wing.",
    features: ["Infinity pool", "Home theatre", "Wine cellar", "Smart home", "Private gym", "Staff quarters"],
    highlights: ["Sea-facing terrace", "Designer interiors", "EV-ready garage"],
  },
  {
    id: "skyline-penthouse",
    title: "The Skyline Penthouse",
    location: "Worli, Mumbai",
    city: "Mumbai",
    price: 285000000,
    priceLabel: "₹28.5 Cr",
    type: "Penthouse",
    listing: "sale",
    bedrooms: 4,
    bathrooms: 5,
    area: 5800,
    image: img("photo-1502672260266-1c1ef2d93688"),
    gallery: [
      img("photo-1502672260266-1c1ef2d93688"),
      img("photo-1560448204-e02f11c3d0e2"),
      img("photo-1493809842364-78817add7ffb"),
    ],
    description:
      "A duplex penthouse with 270° harbour views, double-height living room and a private rooftop pool overlooking the Bandra-Worli Sealink.",
    features: ["Private rooftop pool", "Triple-height ceilings", "Concierge", "Helipad access", "Wellness suite"],
    highlights: ["Panoramic sea views", "Private elevator", "Corner residence"],
  },
  {
    id: "garden-court-apartment",
    title: "Garden Court Residence",
    location: "Indiranagar, Bengaluru",
    city: "Bengaluru",
    price: 32500000,
    priceLabel: "₹3.25 Cr",
    type: "Apartment",
    listing: "sale",
    bedrooms: 3,
    bathrooms: 3,
    area: 2150,
    image: img("photo-1493809842364-78817add7ffb"),
    gallery: [
      img("photo-1493809842364-78817add7ffb"),
      img("photo-1600585154526-990dced4db0d"),
      img("photo-1505691938895-1758d7feb511"),
    ],
    description:
      "A serene three-bedroom home wrapped around a private garden courtyard, with bespoke teak joinery and a sun-soaked reading lounge.",
    features: ["Private garden", "Bespoke kitchen", "Walk-in wardrobes", "Reserved parking"],
    highlights: ["Quiet tree-lined lane", "Walk to cafes", "Premium club access"],
  },
  {
    id: "olive-grove-townhouse",
    title: "Olive Grove Townhouse",
    location: "Banjara Hills, Hyderabad",
    city: "Hyderabad",
    price: 48000000,
    priceLabel: "₹4.8 Cr",
    type: "Townhouse",
    listing: "sale",
    bedrooms: 4,
    bathrooms: 4,
    area: 3400,
    image: img("photo-1568605114967-8130f3a36994"),
    gallery: [
      img("photo-1568605114967-8130f3a36994"),
      img("photo-1600596542815-ffad4c1539a9"),
      img("photo-1600607687939-ce8a6c25118c"),
    ],
    description:
      "A four-storey contemporary townhouse with a landscaped terrace, private elevator and double-volume living spaces.",
    features: ["Private elevator", "Rooftop terrace", "Home office", "Designer lighting"],
    highlights: ["Gated community", "Concierge", "Two covered parkings"],
  },
  {
    id: "marina-loft",
    title: "Marina Loft",
    location: "DLF Phase 5, Gurugram",
    city: "Gurugram",
    price: 165000,
    priceLabel: "₹1.65 L / mo",
    type: "Apartment",
    listing: "rent",
    bedrooms: 3,
    bathrooms: 3,
    area: 2400,
    image: img("photo-1600566753190-17f0baa2a6c3"),
    gallery: [
      img("photo-1600566753190-17f0baa2a6c3"),
      img("photo-1600210492486-724fe5c67fb0"),
    ],
    description:
      "A fully-furnished open-plan loft with skyline views, smart climate control and access to a private wellness floor.",
    features: ["Fully furnished", "Smart home", "Wellness floor", "Co-working lounge"],
    highlights: ["Skyline views", "Walk to Cyber Hub", "24/7 concierge"],
  },
  {
    id: "heritage-house",
    title: "Heritage House on Carter Road",
    location: "Bandra West, Mumbai",
    city: "Mumbai",
    price: 425000,
    priceLabel: "₹4.25 L / mo",
    type: "Villa",
    listing: "rent",
    bedrooms: 4,
    bathrooms: 5,
    area: 4500,
    image: img("photo-1600585154340-be6161a56a0c"),
    gallery: [
      img("photo-1600585154340-be6161a56a0c"),
      img("photo-1613490493576-7fde63acd811"),
    ],
    description:
      "A restored colonial-era bungalow blending arched verandahs and modern interiors, with a private courtyard pool.",
    features: ["Courtyard pool", "Period restoration", "Garden", "Staff quarters"],
    highlights: ["Sea-facing", "Fully furnished", "Pet friendly"],
  },
  {
    id: "lake-view-apartment",
    title: "Lake View Residence",
    location: "Powai, Mumbai",
    city: "Mumbai",
    price: 95000,
    priceLabel: "₹95k / mo",
    type: "Apartment",
    listing: "rent",
    bedrooms: 2,
    bathrooms: 2,
    area: 1450,
    image: img("photo-1560448204-e02f11c3d0e2"),
    gallery: [img("photo-1560448204-e02f11c3d0e2")],
    description: "Light-filled two-bedroom with sweeping lake views, oak flooring and a designer kitchen.",
    features: ["Lake view", "Designer kitchen", "Club access", "Covered parking"],
    highlights: ["Quiet floor", "Recently refurbished"],
  },
  {
    id: "the-orchard-estate",
    title: "The Orchard Estate",
    location: "Sadashivanagar, Bengaluru",
    city: "Bengaluru",
    price: 215000000,
    priceLabel: "₹21.5 Cr",
    type: "Villa",
    listing: "sale",
    bedrooms: 6,
    bathrooms: 7,
    area: 8200,
    image: img("photo-1600607687939-ce8a6c25118c"),
    gallery: [
      img("photo-1600607687939-ce8a6c25118c"),
      img("photo-1600596542815-ffad4c1539a9"),
    ],
    description:
      "A landmark estate on half an acre, with formal gardens, a 25m lap pool and a freestanding pavilion for entertaining.",
    features: ["Half-acre plot", "25m lap pool", "Garden pavilion", "Cinema", "8-car garage"],
    highlights: ["Trophy address", "Mature trees", "Generational home"],
  },
];

export const getProperty = (id: string) => properties.find((p) => p.id === id);
export const saleProperties = () => properties.filter((p) => p.listing === "sale");
export const rentProperties = () => properties.filter((p) => p.listing === "rent");
export const featuredProperties = () => properties.slice(0, 6);
