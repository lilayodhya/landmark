import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { getBlogBySlug, getBlogs, type Blog } from "@/api/blogApi";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    try {
      const [post, blogs] = await Promise.all([
        getBlogBySlug(params.slug),
        getBlogs(),
      ]);

      return { post, blogs };
    } catch {
      throw notFound();
    }
  },

  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `${loaderData.post.header} — Landmark Estate Agents`,
          },
          {
            name: "description",
            content:
              loaderData.post.content.split(/\n\s*\n/)[0] ||
              loaderData.post.content,
          },
          { property: "og:title", content: loaderData.post.header },
          {
            property: "og:description",
            content:
              loaderData.post.content.split(/\n\s*\n/)[0] ||
              loaderData.post.content,
          },
          { property: "og:image", content: loaderData.post.photo },
          { property: "og:url", content: `/blog/${loaderData.post.slug}` },
        ]
      : [{ title: "Journal — Landmark Estate Agents" }],
  }),

  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-x py-32 text-center">
        <h1 className="font-display text-4xl">Article not found</h1>

        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 text-gold"
        >
          <ArrowLeft className="h-4 w-4" /> Back to the Journal
        </Link>
      </div>
    </SiteLayout>
  ),

  component: BlogPost,
});

function getParagraphs(content: string) {
  return content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function BlogPost() {
  const { post, blogs } = Route.useLoaderData();

  const paragraphs = getParagraphs(post.content);
  const excerpt = paragraphs[0] || post.content;

  const related = blogs
    .filter((blog: Blog) => blog.slug !== post.slug)
    .slice(0, 3);

  return (
    <SiteLayout>
      <article>
        <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <img
            src={post.photo}
            alt={post.header}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/20" />

          <div className="container-x relative h-full flex flex-col justify-end pb-12 text-primary-foreground">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary-foreground/80 hover:text-gold transition-colors"
            >
              <ArrowLeft className="h-3 w-3" /> The Journal
            </Link>

            <div className="mt-5 eyebrow text-gold">{post.type}</div>

            <h1 className="mt-3 font-display text-4xl md:text-6xl leading-tight max-w-4xl">
              {post.header}
            </h1>

            <div className="mt-6 flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-primary-foreground/80">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-3 w-3 text-gold" /> {post.date}
              </span>

              <span className="inline-flex items-center gap-2">
                <Clock className="h-3 w-3 text-gold" /> {post.time_to_read}
              </span>
            </div>
          </div>
        </div>

        <div className="container-x py-16 md:py-24 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 lg:col-start-3">
            <p className="font-display text-2xl md:text-3xl leading-snug text-foreground">
              {excerpt}
            </p>

            <div className="mt-10 space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground">
              {paragraphs.slice(1).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-16 border-t border-border pt-8 flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm border-b border-foreground pb-1 hover:border-gold hover:text-gold transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back to all articles
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm border-b border-foreground pb-1 hover:border-gold hover:text-gold transition-colors"
              >
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
                {related.map((blog: Blog) => (
                  <Link
                    key={blog.id}
                    to="/blog/$slug"
                    params={{ slug: blog.slug }}
                    className="group"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={blog.photo}
                        alt={blog.header}
                        loading="lazy"
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div className="mt-4">
                      <div className="eyebrow">{blog.type}</div>

                      <h3 className="mt-2 font-display text-xl leading-tight group-hover:text-gold transition-colors">
                        {blog.header}
                      </h3>
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