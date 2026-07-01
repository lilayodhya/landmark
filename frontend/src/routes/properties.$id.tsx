import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Bed, Bath, Maximize2, MapPin, ArrowLeft, Check, Calendar, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import type { Property } from "@/lib/properties";
import { getProperty } from "@/api/propertyApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createScheduledVisit } from "@/api/scheduledVisitApi";
import { createEnquiry } from "@/api/enquiryApi";

export const Route = createFileRoute("/properties/$id")({
  loader: async ({ params }) => {
    const property = await getProperty(params.id);

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
          { property: "og:image", content: loaderData.property.images[0], },
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
            <img src={property.images[active] ?? property.images[0]} alt={property.title} className="h-full w-full object-cover aspect-[4/3] md:aspect-auto" />
          </div>
          {property.images.slice(0, 4).map((g, i) => (
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
                ["City", property.location],
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
            <div className="mt-1 font-display text-4xl text-primary"> {`₹${property.price.toLocaleString("en-IN")}`} </div>            <EnquiryForm property={property.title} />
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    `I'd like to know more about ${property}.`
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createEnquiry({
        name,
        email,
        phone,
        enquiry: message,
      });

      toast.success("Enquiry sent successfully.");

      setName("");
      setEmail("");
      setPhone("");
      setMessage(`I'd like to know more about ${property}.`);

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">

      <Input
        required
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded-none"
      />

      <Input
        required
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-none"
      />

      <Input
        required
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="rounded-none"
      />

      <Textarea
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="rounded-none"
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <Phone className="mr-2 h-4 w-4" />
        {loading ? "Sending..." : "Send Enquiry"}
      </Button>

    </form>
  );
}

function VisitForm({ property }: { property: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createScheduledVisit({
        name,
        phone,
        property_name: property,
        meeting_date: date,
        meeting_time: time,
      });

      toast.success("Site visit scheduled successfully.");

      setName("");
      setPhone("");
      setDate("");
      setTime("");

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">

      <Input
        required
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded-none bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
      />

      <Input
        required
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="rounded-none bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
      />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/70">
            Date
          </Label>

          <Input
            required
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-none mt-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground"
          />
        </div>

        <div>
          <Label className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/70">
            Time
          </Label>

          <Input
            required
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="rounded-none mt-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full rounded-none bg-gold text-primary hover:bg-gold/90"
      >
        <Calendar className="mr-2 h-4 w-4" />
        {loading ? "Scheduling..." : "Schedule Visit"}
      </Button>

    </form>
  );
}
