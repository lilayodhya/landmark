import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, Compass, ShieldCheck, Users, Sparkles, ChevronDown, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { SiteLayout } from "@/components/site/Layout";
import { PropertyCard } from "@/components/site/PropertyCard";
import { getProperties } from "@/api/propertyApi";
import type { Property } from "@/lib/properties";
import { WelcomeDialog } from "@/components/site/WelcomeDialog";
import heroImg from "@/assets/hero-villa.jpg";
import { LoginPage } from "./login";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Landmark Estate Agents — Find Your Perfect Property" },
      { name: "description", content: "Buy, sell, rent and invest with Landmark Estate Agents — a boutique estate advisory representing exceptional homes across India." },
      { property: "og:title", content: "Landmark Estate Agents — Find Your Perfect Property" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});


const reasons = [
  { icon: Compass, title: "Market Expertise", desc: "Two decades representing landmark addresses with research that shapes the deal." },
  { icon: ShieldCheck, title: "Verified Listings", desc: "Every property is title-checked, RERA-validated and personally walked by our team." },
  { icon: Users, title: "Personalised Service", desc: "One advisor, one point of contact — from first viewing to handover and beyond." },
  { icon: Sparkles, title: "Investment Guidance", desc: "Yield models, micro-market analytics and exit planning for serious investors." },
];

const testimonials = [
  { quote: "Landmark Estate Agents turned a daunting purchase into a calm, considered process. Their attention to detail is unmatched.", name: "Aarav & Meera Shah", role: "Bought in Worli" },
  { quote: "They understood the brief in one conversation and shortlisted three homes — we chose the second. Exceptional taste.", name: "Dr. Rhea Kapoor", role: "Bought in Bandra" },
  { quote: "The team's market read on Bengaluru saved us months. Honest, sharp and quietly persistent.", name: "Karthik Iyer", role: "Investor" },
  { quote: "From staging to marketing to negotiation — a genuinely boutique experience. We've referred them three times.", name: "Sana Mehra", role: "Sold in Juhu" },
];

const faqs = [
  { q: "Which cities do you operate in?", a: "We specialise in Mumbai, Bengaluru, Hyderabad and Gurugram, with a curated reach into Pune, Goa and selected hill stations." },
  { q: "Do you charge consultation fees?", a: "Initial consultations are complimentary. Our advisory engagement and brokerage are transparently outlined before any commitment." },
  { q: "Can you help with NRI purchases?", a: "Yes — we handle remote viewings, due diligence, FEMA compliance and end-to-end paperwork for NRI clients across 14 countries." },
  { q: "Are listings RERA-verified?", a: "Every project we represent is title-checked and, where applicable, RERA-registered. We share documentation on request." },
  { q: "How long does a typical transaction take?", a: "From shortlist to handover, a primary purchase averages 45–90 days. Resale and leasing timelines vary by complexity." },
];

function LandingPage() {
  return <HomePage />;
}

export function HomePage() {
  return (
    <SiteLayout>
      <WelcomeDialog />
      <Hero />
      <Featured />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <CTA />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative -mt-20 min-h-[92vh] flex items-center overflow-hidden">
      <img
        src={heroImg}
        alt="Luxury villa at twilight"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />

      <div className="container-x relative pt-32 pb-20 text-primary-foreground">
        <div className="eyebrow text-gold animate-fade-in">Landmark Estate Agents · Est. 1978</div>
        <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.02] max-w-4xl animate-fade-in">
          Find Your <span className="italic text-gold">Perfect</span> Property
        </h1>
        <p className="mt-7 max-w-xl text-base md:text-lg text-primary-foreground/80 leading-relaxed animate-fade-in">
          A boutique advisory for buying, selling, renting and investing in India's most coveted residences —
          guided by people who know every street.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 animate-fade-in">
          <Button asChild size="lg" className="rounded-none bg-gold text-primary hover:bg-gold/90 px-7 h-12">
            <Link to="/buy">
              Explore Properties <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-none bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary px-7 h-12">
            <Link to="/contact">Book Consultation</Link>
          </Button>
        </div>

        <div className="mt-20 hidden md:grid grid-cols-3 gap-12 max-w-2xl">
          {[
            ["40+", "Years advising"],
            ["₹4,800 Cr", "Closed transactions"],
            ["1,200+", "Families placed"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-3xl text-gold">{n}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-primary-foreground/70">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 inset-x-0 flex justify-center text-primary-foreground/70">
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </div>
    </section>
  );
}

function Featured() {
  const autoplay = useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const data = await getProperties();

        setProperties(data.filter((property: Property) => property.featured));
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 bg-secondary/40 border-y border-border">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <div className="eyebrow">Featured residences</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              A current selection
            </h2>
            <p className="mt-4 text-muted-foreground">
              Hand-picked homes across India's most desirable neighbourhoods.
            </p>
          </div>

          <Button
            asChild
            variant="ghost"
            className="rounded-none border-b border-foreground hover:bg-transparent hover:border-gold hover:text-gold px-0"
          >
            <Link to="/buy">
              View all properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {properties.map((property) => (
              <CarouselItem
                key={property.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <PropertyCard property={property} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-8 flex justify-end gap-2">
            <CarouselPrevious className="static translate-y-0 rounded-none border-border hover:bg-primary hover:text-primary-foreground hover:border-primary" />
            <CarouselNext className="static translate-y-0 rounded-none border-border hover:bg-primary hover:text-primary-foreground hover:border-primary" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="eyebrow">Why Landmark Estate Agents</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl leading-tight">
            Quiet expertise.<br />
            <span className="italic text-gold">Loud results.</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            We are a boutique by design. Fewer clients, deeper relationships, and an obsession with the details
            that make a house feel like home.
          </p>
        </div>
        <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-border">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-background p-8 hover:bg-secondary/50 transition-colors">
              <Icon className="h-8 w-8 text-gold" strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-2xl">{title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const autoplay = useRef(Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true }));
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container-x">
        <div className="max-w-2xl">
          <div className="eyebrow text-gold">In their words</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Clients on working with us</h2>
        </div>
        <Carousel opts={{ align: "start", loop: true }} plugins={[autoplay.current]} className="mt-12">
          <CarouselContent className="-ml-4">
            {testimonials.map((t, i) => (
              <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <figure className="h-full border border-primary-foreground/15 p-8 bg-primary-foreground/[0.03] backdrop-blur">
                  <Quote className="h-7 w-7 text-gold" strokeWidth={1.5} />
                  <blockquote className="mt-5 font-display text-xl leading-snug">"{t.quote}"</blockquote>
                  <figcaption className="mt-6 pt-6 border-t border-primary-foreground/15">
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-primary-foreground/60 mt-1">{t.role}</div>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex gap-2">
            <CarouselPrevious className="static translate-y-0 rounded-none border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-gold hover:border-gold hover:text-primary" />
            <CarouselNext className="static translate-y-0 rounded-none border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-gold hover:border-gold hover:text-primary" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="eyebrow">Frequently asked</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Good to know, before we begin.</h2>
          <p className="mt-6 text-muted-foreground">
            Can't find your answer? <Link to="/contact" className="text-gold underline-offset-4 hover:underline">Speak with an advisor.</Link>
          </p>
        </div>
        <div className="lg:col-span-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`} className="border-border">
                <AccordionTrigger className="text-left font-display text-xl hover:text-gold hover:no-underline py-6">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20 md:py-28 bg-secondary/60">
      <div className="container-x">
        <div className="border border-border bg-background p-10 md:p-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="eyebrow">Private consultation</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl leading-tight">
              Let's find your next address.
            </h2>
            <p className="mt-5 text-muted-foreground">
              A confidential 30-minute conversation with a senior advisor. No obligation, just clarity.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button asChild size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-7">
              <Link to="/contact">Book Consultation <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-none border-foreground hover:bg-foreground hover:text-background h-12 px-7">
              <Link to="/buy">Browse Properties</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
