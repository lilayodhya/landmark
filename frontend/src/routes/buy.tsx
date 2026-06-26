import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { PropertyCard } from "@/components/site/PropertyCard";
import { saleProperties } from "@/lib/properties";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: "Buy Property — Landmark Estate Agents" },
      { name: "description", content: "Browse a curated collection of homes for sale across India's premier neighbourhoods." },
      { property: "og:title", content: "Buy Property — Landmark Estate Agents" },
      { property: "og:url", content: "/buy" },
    ],
    links: [{ rel: "canonical", href: "/buy" }],
  }),
  component: BuyPage,
});

function BuyPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="For Sale"
        title="Homes ready to be loved."
        description="A live selection of residences across Mumbai, Bengaluru, Hyderabad and Gurugram — quietly listed, personally vetted."
      />
      <Listings listings={saleProperties()} />
    </SiteLayout>
  );
}

export function Listings({ listings }: { listings: ReturnType<typeof saleProperties> }) {
  const [city, setCity] = useState("all");
  const [type, setType] = useState("all");
  const [beds, setBeds] = useState("all");
  const [budget, setBudget] = useState("all");
  const [q, setQ] = useState("");

  const cities = Array.from(new Set(listings.map((p) => p.city)));
  const types = Array.from(new Set(listings.map((p) => p.type)));

  const filtered = useMemo(() => {
    return listings.filter((p) => {
      if (city !== "all" && p.city !== city) return false;
      if (type !== "all" && p.type !== type) return false;
      if (beds !== "all" && p.bedrooms < Number(beds)) return false;
      if (budget !== "all") {
        const max = Number(budget);
        if (p.price > max) return false;
      }
      if (q && !`${p.title} ${p.location}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [listings, city, type, beds, budget, q]);

  return (
    <section className="py-12 md:py-16">
      <div className="container-x">
        <div className="bg-card border border-border p-5 md:p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Field label="Search">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Title or location" className="rounded-none" />
          </Field>
          <Field label="Location">
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="rounded-none"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All cities</SelectItem>
                {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Type">
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="rounded-none"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                {types.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Bedrooms">
            <Select value={beds} onValueChange={setBeds}>
              <SelectTrigger className="rounded-none"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Budget">
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger className="rounded-none"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="50000000">Up to ₹5 Cr</SelectItem>
                <SelectItem value="100000000">Up to ₹10 Cr</SelectItem>
                <SelectItem value="200000000">Up to ₹20 Cr</SelectItem>
                <SelectItem value="500000000">Up to ₹50 Cr</SelectItem>
                <SelectItem value="500000">Up to ₹5 L (Rent)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="text-foreground font-medium">{filtered.length}</span> of {listings.length} properties
          </p>
          <Button
            variant="ghost"
            className="text-sm rounded-none hover:bg-transparent hover:text-gold"
            onClick={() => { setCity("all"); setType("all"); setBeds("all"); setBudget("all"); setQ(""); }}
          >
            Reset filters
          </Button>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
        {filtered.length === 0 && (
          <div className="mt-16 text-center text-muted-foreground">No properties match your filters.</div>
        )}
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="eyebrow mb-2 block">{label}</Label>
      {children}
    </div>
  );
}
