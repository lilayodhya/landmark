import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { ArrowRight } from "lucide-react";
import { getBlogs, type Blog } from "@/api/blogApi";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    return await getBlogs();
  },
  head: () => ({
    meta: [
      { title: "Journal — Landmark Estate Agents" },
      {
        name: "description",
        content:
          "Insights, market reports and design notes from Landmark Estate Agents.",
      },
      { property: "og:title", content: "Journal — Landmark Estate Agents" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function getExcerpt(content: string) {
  return content.split(/\n\s*\n/)[0] || content;
}

function BlogPage() {
  const blogs = Route.useLoaderData();
  const [active, setActive] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(blogs.map((blog) => blog.type).filter(Boolean))),
  ];

  const featured = blogs[0];
  const remainingBlogs = blogs.slice(1);

  const filtered =
    active === "All"
      ? remainingBlogs
      : remainingBlogs.filter((blog) => blog.type === active);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="The Journal"
        title="Notes from the market."
        description="Reports, design conversations and city guides — written by the people who walk the streets we represent."
      />

      <section className="py-16">
        <div className="container-x">
          {featured && (
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-14 group cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={featured.photo}
                  alt={featured.header}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="self-center">
                <div className="eyebrow">Featured · {featured.type}</div>

                <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight group-hover:text-gold transition-colors">
                  {featured.header}
                </h2>

                <p className="mt-5 text-muted-foreground leading-relaxed">
                  {getExcerpt(featured.content)}
                </p>

                <div className="mt-6 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.time_to_read}</span>
                </div>

                <span className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm group-hover:border-gold group-hover:text-gold transition-colors">
                  Read More <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          )}

          <div className="mt-20 flex flex-wrap gap-2 border-b border-border pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
                  active === category
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((blog: Blog) => (
              <Link
                to="/blog/$slug"
                params={{ slug: blog.slug }}
                key={blog.id}
                className="group cursor-pointer block"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={blog.photo}
                    alt={blog.header}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="mt-5">
                  <div className="eyebrow">{blog.type}</div>

                  <h3 className="mt-3 font-display text-2xl leading-tight group-hover:text-gold transition-colors">
                    {blog.header}
                  </h3>

                  <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {blog.date} · {blog.time_to_read}
                  </div>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm border-b border-transparent group-hover:border-gold group-hover:text-gold transition-colors">
                    Read More <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {blogs.length === 0 && (
            <p className="py-16 text-center text-muted-foreground">
              No articles have been published yet.
            </p>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}