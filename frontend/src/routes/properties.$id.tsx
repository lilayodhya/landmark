import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Bed, Bath, Maximize2, MapPin, ArrowLeft, Check, Calendar, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import type { Property } from "@/lib/properties";
import { getProperty } from "@/lib/properties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/properties/$id")({
  loader: ({ params }) => {
    const property = getProperty(params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.property.title} — Landmark Estate Agents` },
          { name: "description", content: loaderData.property.description.slice(0, 160) },
          { property: "og:title", content: loaderData.property.title },
          { property: "og:description", content: loaderData.property.description.slice(0, 160) },
          { property: "og:image", content: loaderData.property.image },
          { property: "og:type", content: "article" },
        ]
      : [],
    links: loaderData ? [{ rel: "canonical", href: `/properties/${loaderData.property.id}` }] : [],
  }),
  component: PropertyPage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-x py-32 text-center">
        <h1 className="font-display text-4xl">Property not found</h1>
        <Link to="/buy" className="mt-6 inline-block text-gold underline-offset-4 hover:underline">Browse properties</Link>
      </div>
    </SiteLayout>
  ),
});

function PropertyPage() {
  const { property } = Route.useLoaderData() as { property: Property };
  const [active, setActive] = useState(0);

  return (
    <SiteLayout>
      <div className="container-x pt-6">
        <Link to="/buy" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold">
          <ArrowLeft className="h-4 w-4" /> Back to properties
        </Link>
      </div>

      {/* Gallery */}
      <section className="container-x mt-6">
        <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2 md:h-[520px]">
          <div className="md:col-span-3 md:row-span-2 overflow-hidden bg-muted">
            <img src={property.gallery[active] ?? property.image} alt={property.title} className="h-full w-full object-cover aspect-[4/3] md:aspect-auto" />
          </div>
          {property.gallery.slice(0, 4).map((g, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`overflow-hidden bg-muted aspect-[4/3] md:aspect-auto ${active === i ? "ring-2 ring-gold" : ""}`}
            >
              <img src={g} alt="" className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" />
            </button>
          ))}
        </div>
      </section>

      {/* Header */}
      <section className="container-x mt-12 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="eyebrow">{property.type} · {property.listing === "rent" ? "For Rent" : "For Sale"}</div>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">{property.title}</h1>
          <div className="mt-3 flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-gold" />
            <span>{property.location}</span>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-y border-border py-6">
            <Stat icon={Bed} label="Bedrooms" value={property.bedrooms} />
            <Stat icon={Bath} label="Bathrooms" value={property.bathrooms} />
            <Stat icon={Maximize2} label="Area (sqft)" value={property.area.toLocaleString()} />
          </div>

          <div className="mt-10">
            <h2 className="font-display text-2xl">Overview</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{property.description}</p>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-2xl">Features & amenities</h2>
            <ul className="mt-5 grid sm:grid-cols-2 gap-3">
              {property.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <span className="grid h-6 w-6 place-items-center bg-gold/15 text-gold"><Check className="h-3.5 w-3.5" /></span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-2xl">Specifications</h2>
            <dl className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {[
                ["Type", property.type],
                ["Listing", property.listing === "rent" ? "Rental" : "For sale"],
                ["Bedrooms", String(property.bedrooms)],
                ["Bathrooms", String(property.bathrooms)],
                ["Built-up area", `${property.area.toLocaleString()} sqft`],
                ["City", property.city],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border py-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-2xl">Location</h2>
            <div className="mt-5 aspect-[16/8] bg-secondary border border-border grid place-items-center text-muted-foreground">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-gold mx-auto" />
                <p className="mt-3 text-sm">{property.location}</p>
                <p className="text-xs mt-1">Interactive map available on request</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky enquiry */}
        <aside className="lg:sticky lg:top-28 self-start space-y-6">
          <div className="border border-border bg-card p-6">
            <div className="eyebrow">Asking price</div>
            <div className="mt-1 font-display text-4xl text-primary">{property.priceLabel}</div>
            <EnquiryForm property={property.title} />
          </div>
          <div className="border border-border bg-primary text-primary-foreground p-6">
            <div className="eyebrow text-gold">Schedule a visit</div>
            <VisitForm property={property.title} />
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) {
  return (
    <div className="text-center">
      <Icon className="h-5 w-5 mx-auto text-gold" />
      <div className="mt-2 font-display text-xl">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function EnquiryForm({ property }: { property: string }) {
  return (
    <form
      className="mt-6 space-y-3"
      onSubmit={(e) => { e.preventDefault(); toast.success("Enquiry sent. An advisor will be in touch shortly."); }}
    >
      <Input required placeholder="Full name" className="rounded-none" />
      <Input required type="email" placeholder="Email" className="rounded-none" />
      <Input required placeholder="Phone" className="rounded-none" />
      <Textarea placeholder={`I'd like to know more about ${property}…`} rows={3} className="rounded-none" />
      <Button type="submit" className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
        <Phone className="mr-2 h-4 w-4" /> Send Enquiry
      </Button>
    </form>
  );
}

function VisitForm({ property }: { property: string }) {
  return (
    <form
      className="mt-6 space-y-3"
      onSubmit={(e) => { e.preventDefault(); toast.success(`Site visit requested for ${property}.`); }}
    >
      <Input required placeholder="Full name" className="rounded-none bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
      <Input required placeholder="Phone" className="rounded-none bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/70">Date</Label>
          <Input required type="date" className="rounded-none mt-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground" />
        </div>
        <div>
          <Label className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/70">Time</Label>
          <Input required type="time" className="rounded-none mt-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground" />
        </div>
      </div>
      <Button type="submit" className="w-full rounded-none bg-gold text-primary hover:bg-gold/90">
        <Calendar className="mr-2 h-4 w-4" /> Schedule Visit
      </Button>
    </form>
  );
}
