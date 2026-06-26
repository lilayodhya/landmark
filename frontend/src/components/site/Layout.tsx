import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="container-x py-16 md:py-24 max-w-4xl">
        {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
        <h1 className="font-display text-4xl md:text-6xl leading-[1.05]">{title}</h1>
        {description && (
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
