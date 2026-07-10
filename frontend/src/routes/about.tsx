import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Landmark Estate Agents" },
      { name: "description", content: "Our story, mission, vision and values — a boutique estate advisory built on relationships, research and restraint." },
      { property: "og:title", content: "About — Landmark Estate Agents" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  { t: "Discretion", d: "We treat every conversation as confidential — because the best deals rarely make the news." },
  { t: "Craft", d: "Editorial brochures, considered photography, quiet negotiations — we sweat every detail." },
  { t: "Long view", d: "We'd rather lose a deal than rush a client. Reputations compound." },
  { t: "Honesty", d: "Frank advice, even when it's the harder thing to say. Especially then." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="About us" title="A boutique by design." description="Founded in 1978, Landmark Estate Agents represents a small, considered list of homes for a small, considered list of clients." />

      <section className="py-20">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80" alt="Our office" className="aspect-[4/5] object-cover w-full" />
          <div>
            <div className="eyebrow">Our story</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl leading-tight">Two decades, three cities, one philosophy.</h2>
            <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
              <p>What began as a single-desk advisory in South Mumbai is today a boutique team of fifteen across Mumbai, Bengaluru and Hyderabad. We've stayed deliberately small.</p>
              <p>Our work is built on three habits: walk every property, vet every client, and write everything down. It's slower. It's also why we're still here.</p>
              <p>We don't list everything. We don't claim every city. We do the work we'd be proud to put our family in.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/50 border-y border-border">
        <div className="container-x grid md:grid-cols-2 gap-10">
          {[
            { eyebrow: "Mission", title: "Make the search for a home feel less like a transaction.", body: "We exist to bring craft, calm and clarity to one of life's biggest decisions." },
            { eyebrow: "Vision", title: "India's most trusted boutique residential advisory.", body: "Known not for volume, but for the quality of every match we make." },
          ].map((c) => (
            <div key={c.eyebrow} className="bg-background border border-border p-10">
              <div className="eyebrow">{c.eyebrow}</div>
              <h3 className="mt-3 font-display text-3xl leading-tight">{c.title}</h3>
              <p className="mt-5 text-muted-foreground leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <div className="max-w-xl">
            <div className="eyebrow">Our values</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">What we hold to.</h2>
          </div>
          <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.t} className="bg-background p-8">
                <div className="font-display text-5xl text-gold/30">0{i + 1}</div>
                <h3 className="mt-4 font-display text-2xl">{v.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-x flex flex-wrap items-center justify-between gap-6">
          <h2 className="font-display text-3xl md:text-4xl max-w-xl">Meet the people behind the work.</h2>
          <Button asChild size="lg" className="rounded-none bg-gold text-primary hover:bg-gold/90 h-12 px-7">
            <Link to="/team">Our Team <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
