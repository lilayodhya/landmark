import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { getPost, posts } from "@/lib/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — Landmark Estate Agents` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
          { property: "og:image", content: loaderData.post.image },
          { property: "og:url", content: `/blog/${loaderData.post.slug}` },
        ]
      : [{ title: "Journal — Landmark Estate Agents" }],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-x py-32 text-center">
        <h1 className="font-display text-4xl">Article not found</h1>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-gold">
          <ArrowLeft className="h-4 w-4" /> Back to the Journal
        </Link>
      </div>
    </SiteLayout>
  ),
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <SiteLayout>
      <article>
        <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/20" />
          <div className="container-x relative h-full flex flex-col justify-end pb-12 text-primary-foreground">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary-foreground/80 hover:text-gold transition-colors">
              <ArrowLeft className="h-3 w-3" /> The Journal
            </Link>
            <div className="mt-5 eyebrow text-gold">{post.category}</div>
            <h1 className="mt-3 font-display text-4xl md:text-6xl leading-tight max-w-4xl">{post.title}</h1>
            <div className="mt-6 flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-primary-foreground/80">
              <span className="inline-flex items-center gap-2"><Calendar className="h-3 w-3 text-gold" /> {post.date}</span>
              <span className="inline-flex items-center gap-2"><Clock className="h-3 w-3 text-gold" /> {post.read}</span>
            </div>
          </div>
        </div>

        <div className="container-x py-16 md:py-24 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 lg:col-start-3">
            <p className="font-display text-2xl md:text-3xl leading-snug text-foreground">{post.excerpt}</p>
            <div className="mt-10 space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground">
              {post.body.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-16 border-t border-border pt-8 flex flex-wrap items-center justify-between gap-4">
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm border-b border-foreground pb-1 hover:border-gold hover:text-gold transition-colors">
                <ArrowLeft className="h-4 w-4" /> Back to all articles
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 text-sm border-b border-foreground pb-1 hover:border-gold hover:text-gold transition-colors">
                Speak with an advisor <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="bg-secondary/40 border-t border-border py-16 md:py-20">
            <div className="container-x">
              <div className="eyebrow">Continue reading</div>
              <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="mt-4">
                      <div className="eyebrow">{p.category}</div>
                      <h3 className="mt-2 font-display text-xl leading-tight group-hover:text-gold transition-colors">{p.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </SiteLayout>
  );
}
