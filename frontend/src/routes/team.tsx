import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { Mail, Phone, Linkedin } from "lucide-react";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — Landmark Estate Agents" },
      { name: "description", content: "Meet the advisors behind Landmark Estate Agents — a small, senior team representing exceptional homes across India." },
      { property: "og:title", content: "Our Team — Landmark Estate Agents" },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

const team = [
  { name: "Homesh Patel", role: "Founder & Principal Advisor", email: "homesh@homeshlandmark.com", phone: "+91 9820357137", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" },
  { name: "Anaya Krishnan", role: "Director, Bengaluru", email: "anaya@homeshlandmark.com", phone: "+91 9820357137", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" },
  { name: "Vikram Rao", role: "Head of Investment Advisory", email: "vikram@homeshlandmark.com", phone: "+91 9820357137", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" },
  { name: "Saira Hussain", role: "Senior Advisor, Mumbai", email: "saira@homeshlandmark.com", phone: "+91 9820357137", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80" },
  { name: "Rahul Menon", role: "Director, Hyderabad", email: "rahul@homeshlandmark.com", phone: "+91 9820357137", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80" },
  { name: "Priya Bansal", role: "Head of Lettings", email: "priya@homeshlandmark.com", phone: "+91 9820357137", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80" },
];

function TeamPage() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Our team" title="Senior advisors, every conversation." description="No call centres, no junior handoffs. The advisor you meet is the advisor who closes." />
      <section className="py-16">
        <div className="container-x grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <article key={m.name} className="group">
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <img src={m.img} alt={m.name} className="h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              </div>
              <div className="mt-5">
                <h3 className="font-display text-2xl">{m.name}</h3>
                <div className="text-sm text-gold mt-1">{m.role}</div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-gold" /> {m.email}</li>
                  <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-gold" /> {m.phone}</li>
                  <li className="flex items-center gap-2"><Linkedin className="h-3.5 w-3.5 text-gold" /> /in/{m.name.toLowerCase().replace(" ", "-")}</li>
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
