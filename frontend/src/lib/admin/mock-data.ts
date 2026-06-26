export interface AdminProperty {
  id: string;
  title: string;
  location: string;
  city?: string;
  type: string;
  listing: "Buy" | "Rent";
  price: number;
  priceLabel?: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  status: "Active" | "Inactive";
  featured: boolean;
  views: number;
  image: string;
  gallery?: string[];
  description?: string;
  features?: string[];
  highlights?: string[];
}



export interface AdminBlog {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: "Published" | "Draft";
  views: number;
  date: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source:
    | "Contact Form"
    | "Consultation"
    | "Property Enquiry"
    | "Sell Request"
    | "Rental Enquiry"
    | "Site Visit";
  property: string;
  notes: string;
  status: "New" | "Called" | "Follow Up" | "Site Visit Scheduled" | "Converted" | "Closed";
  date: string;
}

export interface SiteVisit {
  id: string;
  lead: string;
  property: string;
  date: string;
  time: string;
  agent: string;
  status: "Scheduled" | "Completed" | "Cancelled" | "Rescheduled";
}

const img = (s: string) =>
  `https://images.unsplash.com/${s}?auto=format&fit=crop&w=400&q=70`;

export const mockProperties: AdminProperty[] = [
  { id: "P-1001", title: "Sea-View Villa, Bandra", location: "Bandra West, Mumbai", type: "Villa", listing: "Buy", price: 125000000, bedrooms: 5, bathrooms: 6, area: 6200, status: "Active", featured: true, views: 2840, image: img("photo-1613977257363-707ba9348227") },
  { id: "P-1002", title: "Sky Penthouse, Worli", location: "Worli, Mumbai", type: "Penthouse", listing: "Buy", price: 280000000, bedrooms: 4, bathrooms: 5, area: 4800, status: "Active", featured: true, views: 1920, image: img("photo-1600585154340-be6161a56a0c") },
  { id: "P-1003", title: "Heritage Bungalow, Alibaug", location: "Alibaug", type: "Bungalow", listing: "Buy", price: 95000000, bedrooms: 4, bathrooms: 4, area: 5200, status: "Active", featured: false, views: 1340, image: img("photo-1600596542815-ffad4c1539a9") },
  { id: "P-1004", title: "Garden Apartment, Pali Hill", location: "Pali Hill, Mumbai", type: "Apartment", listing: "Buy", price: 68000000, bedrooms: 3, bathrooms: 3, area: 2400, status: "Inactive", featured: false, views: 612, image: img("photo-1502672260266-1c1ef2d93688") },
  { id: "P-1005", title: "Riverside Estate, Lonavala", location: "Lonavala", type: "Villa", listing: "Buy", price: 145000000, bedrooms: 6, bathrooms: 7, area: 7800, status: "Active", featured: true, views: 2210, image: img("photo-1600047509807-ba8f99d2cdde") },
];

export const mockRentals: AdminProperty[] = [
  { id: "R-2001", title: "Furnished 3BHK, Lower Parel", location: "Lower Parel, Mumbai", type: "Apartment", listing: "Rent", price: 320000, bedrooms: 3, bathrooms: 3, area: 1800, status: "Active", featured: true, views: 1450, image: img("photo-1493809842364-78817add7ffb") },
  { id: "R-2002", title: "Designer Loft, Bandra", location: "Bandra West, Mumbai", type: "Loft", listing: "Rent", price: 250000, bedrooms: 2, bathrooms: 2, area: 1400, status: "Active", featured: false, views: 980, image: img("photo-1505691938895-1758d7feb511") },
  { id: "R-2003", title: "Sea-Facing 4BHK, Worli", location: "Worli, Mumbai", type: "Apartment", listing: "Rent", price: 550000, bedrooms: 4, bathrooms: 4, area: 2900, status: "Active", featured: true, views: 1820, image: img("photo-1560448204-e02f11c3d0e2") },
  { id: "R-2004", title: "Studio, BKC", location: "BKC, Mumbai", type: "Studio", listing: "Rent", price: 95000, bedrooms: 1, bathrooms: 1, area: 650, status: "Inactive", featured: false, views: 420, image: img("photo-1522708323590-d24dbb6b0267") },
];

export const mockBlogs: AdminBlog[] = [
  { id: "B-01", title: "Why Bandra Remains Mumbai's Most Coveted Address", slug: "bandra-mumbai-most-coveted", category: "Neighbourhoods", status: "Published", views: 4820, date: "2026-05-12" },
  { id: "B-02", title: "Investing in Luxury Holiday Homes: Alibaug Guide", slug: "alibaug-luxury-holiday-homes", category: "Investment", status: "Published", views: 3210, date: "2026-04-28" },
  { id: "B-03", title: "Designing Timeless Interiors in Heritage Bungalows", slug: "heritage-bungalow-interiors", category: "Design", status: "Draft", views: 0, date: "2026-06-08" },
  { id: "B-04", title: "Rental Yields Across Mumbai's Premium Pockets", slug: "mumbai-rental-yields-2026", category: "Market", status: "Published", views: 2640, date: "2026-03-14" },
];

export const mockLeads: Lead[] = [
  { id: "L-9001", name: "Rohan Kapoor", phone: "+91 98201 11234", email: "rohan.k@example.com", source: "Property Enquiry", property: "Sea-View Villa, Bandra", notes: "Wants weekend viewing", status: "New", date: "2026-06-18" },
  { id: "L-9002", name: "Ananya Iyer", phone: "+91 98765 43210", email: "ananya.i@example.com", source: "Contact Form", property: "—", notes: "Looking for 3BHK rental in BKC", status: "Called", date: "2026-06-17" },
  { id: "L-9003", name: "Vikram Shah", phone: "+91 99876 54321", email: "vikram.s@example.com", source: "Sell Request", property: "Own villa in Juhu", notes: "Wants valuation", status: "Follow Up", date: "2026-06-16" },
  { id: "L-9004", name: "Meera Joshi", phone: "+91 98111 22334", email: "meera.j@example.com", source: "Site Visit", property: "Sky Penthouse, Worli", notes: "Scheduled Saturday 11am", status: "Site Visit Scheduled", date: "2026-06-15" },
  { id: "L-9005", name: "Arjun Verma", phone: "+91 97000 11122", email: "arjun.v@example.com", source: "Consultation", property: "Investment advisory", notes: "NRI client", status: "Converted", date: "2026-06-10" },
  { id: "L-9006", name: "Tara Nair", phone: "+91 99000 22233", email: "tara.n@example.com", source: "Rental Enquiry", property: "Designer Loft, Bandra", notes: "Move-in July", status: "New", date: "2026-06-19" },
];

export const mockVisits: SiteVisit[] = [
  { id: "V-501", lead: "Meera Joshi", property: "Sky Penthouse, Worli", date: "2026-06-22", time: "11:00 AM", agent: "Priya Shah", status: "Scheduled" },
  { id: "V-502", lead: "Rohan Kapoor", property: "Sea-View Villa, Bandra", date: "2026-06-23", time: "04:30 PM", agent: "Aarav Mehta", status: "Scheduled" },
  { id: "V-503", lead: "Tara Nair", property: "Designer Loft, Bandra", date: "2026-06-24", time: "12:00 PM", agent: "Priya Shah", status: "Scheduled" },
  { id: "V-504", lead: "Vikram Shah", property: "Heritage Bungalow, Alibaug", date: "2026-06-20", time: "10:00 AM", agent: "Aarav Mehta", status: "Completed" },
  { id: "V-505", lead: "Ananya Iyer", property: "Garden Apartment, Pali Hill", date: "2026-06-19", time: "03:00 PM", agent: "Priya Shah", status: "Cancelled" },
];

export const analytics = {
  websiteViews: 184620,
  propertyViews: 92840,
  blogViews: 31420,
  leadsBySource: [
    { source: "Property Enquiry", value: 42 },
    { source: "Contact Form", value: 28 },
    { source: "Rental Enquiry", value: 19 },
    { source: "Site Visit", value: 14 },
    { source: "Sell Request", value: 11 },
    { source: "Consultation", value: 8 },
  ],
  regionInterest: [
    { region: "Mumbai", value: 58 },
    { region: "Alibaug", value: 18 },
    { region: "Lonavala", value: 12 },
    { region: "Pune", value: 8 },
    { region: "Goa", value: 4 },
  ],
  mostViewed: [
    { title: "Sky Penthouse, Worli", views: 1920 },
    { title: "Sea-View Villa, Bandra", views: 2840 },
    { title: "Riverside Estate, Lonavala", views: 2210 },
    { title: "Sea-Facing 4BHK, Worli", views: 1820 },
    { title: "Furnished 3BHK, Lower Parel", views: 1450 },
  ],
};
