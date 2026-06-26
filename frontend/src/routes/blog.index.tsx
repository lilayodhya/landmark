import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { ArrowRight } from "lucide-react";
import { featuredPost, otherPosts } from "@/lib/posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Journal — Landmark Estate Agents" },
      { name: "description", content: "Insights, market reports and design notes from India's boutique real estate advisory." },
      { property: "og:title", content: "Journal — Landmark Estate Agents" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const categories = ["All", "Market Reports", "Design", "Investment", "City Guides", "Interviews"];

function BlogPage() {
  const featured = featuredPost();
  const list = otherPosts();
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? list : list.filter((p) => p.category === active);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="The Journal"
        title="Notes from the market."
        description="Reports, design conversations and city guides — written by the people who walk the streets we represent."
      />
      <section className="py-16">
        <div className="container-x">
          {/* Featured */}
          <Link to="/blog/$slug" params={{ slug: featured.slug }} className="grid lg:grid-cols-2 gap-8 lg:gap-14 group cursor-pointer">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img src={featured.image} alt={featured.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="self-center">
              <div className="eyebrow">Featured · {featured.category}</div>
              <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight group-hover:text-gold transition-colors">
                {featured.title}
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">{featured.excerpt}</p>
              <div className="mt-6 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span>{featured.date}</span><span>·</span><span>{featured.read}</span>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm group-hover:border-gold group-hover:text-gold transition-colors">
                Read More <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>

          {/* Categories */}
          <div className="mt-20 flex flex-wrap gap-2 border-b border-border pb-4">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${active === c ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Link to="/blog/$slug" params={{ slug: p.slug }} key={p.slug} className="group cursor-pointer block">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="mt-5">
                  <div className="eyebrow">{p.category}</div>
                  <h3 className="mt-3 font-display text-2xl leading-tight group-hover:text-gold transition-colors">{p.title}</h3>
                  <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{p.date} · {p.read}</div>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm border-b border-transparent group-hover:border-gold group-hover:text-gold transition-colors">
                    Read More <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
