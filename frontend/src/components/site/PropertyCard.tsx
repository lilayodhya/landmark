import { Link } from "@tanstack/react-router";
import { Bed, Bath, Maximize2, MapPin } from "lucide-react";
import type { Property } from "@/lib/properties";

function formatPrice(price: number) {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }

  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  }

  return `₹${price.toLocaleString("en-IN")}`;
}

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      to="/properties/$id"
      params={{ id: property.id }}
      className="group block bg-card border border-border hover:border-gold/60 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={property.images?.[0] || "/placeholder-property.jpg"}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-background/90 backdrop-blur px-3 py-1 text-[10px] tracking-[0.2em] uppercase">
            {property.type}
          </span>

          <span className="bg-gold text-primary px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-medium">
            {property.listing === "sale" ? "For Sale" : "For Rent"}
          </span>
        </div>

        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end justify-between">
          <div className="text-white font-display text-2xl">
            {formatPrice(property.price)}
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl leading-tight group-hover:text-gold transition-colors">
          {property.title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          <span>{property.location}</span>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Bed className="h-3.5 w-3.5" />
            {property.bedrooms} Beds
          </span>

          <span className="flex items-center gap-1.5">
            <Bath className="h-3.5 w-3.5" />
            {property.bathrooms} Baths
          </span>

          <span className="flex items-center gap-1.5">
            <Maximize2 className="h-3.5 w-3.5" />
            {property.area.toLocaleString()} sqft
          </span>
        </div>
      </div>
    </Link>
  );
}