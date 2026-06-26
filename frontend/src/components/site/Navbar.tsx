import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/buy", label: "Buy" },
  { to: "/rentals", label: "Rent" },
  { to: "/sell", label: "Sell" },
  { to: "/blog", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
  { to: "/login", label: "Sign In" },
] as const;


export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/70 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container-x flex h-18 items-center justify-between py-4">
        <Link to="/" className="group flex items-center" onClick={() => setOpen(false)}>
          <div className="min-w-0 leading-tight">
            <div className="font-display text-lg tracking-wide">Landmark Estate Agents</div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">40+ years of experience</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.filter((l) => l.to !== "/login").map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-sm text-foreground/80 hover:text-foreground transition-colors relative after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full data-[status=active]:text-foreground data-[status=active]:after:w-full"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button asChild size="sm" variant="outline" className="rounded-none px-5 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-5">
            <Link to="/contact">Book Consultation</Link>
          </Button>
        </div>


        <button
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-background/80 backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <Menu className={cn("h-5 w-5 transition-all duration-300", open ? "rotate-90 opacity-0" : "rotate-0 opacity-100")} />
        </button>
      </div>

      {/* Overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 bg-primary/40 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Side panel */}
      <aside
        className={cn(
          "lg:hidden fixed top-0 right-0 z-50 flex h-[100dvh] w-[88%] max-w-sm flex-col bg-background border-l border-border shadow-2xl",
          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!open}
      >
        <div className="flex h-18 items-center justify-between border-b border-border px-6 py-4">
          <div className="font-display text-base tracking-wide">Landmark</div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-border/70 px-6 py-4">
          <Button asChild variant="outline" className="w-full rounded-none h-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/login" onClick={() => setOpen(false)}>
              Log in / Sign up
            </Link>
          </Button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto px-6 py-5">
          {links.filter((l) => l.to !== "/login").map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: l.to === "/" }}
              style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
              className={cn(
                "group flex items-center justify-between border-b border-border/60 py-4 font-display text-2xl",
                "transition-all duration-500",
                "hover:text-gold hover:pl-2",
                "data-[status=active]:text-gold",
                open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
              )}
            >
              <span>{l.label}</span>
              <ArrowUpRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          ))}

          <div
            style={{ transitionDelay: open ? `${120 + (links.length - 1) * 50}ms` : "0ms" }}
            className={cn(
              "mt-8 transition-all duration-500",
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <Button asChild className="w-full rounded-none h-12 bg-gold text-primary hover:bg-gold/90">
              <Link to="/contact" onClick={() => setOpen(false)}>
                Book Consultation
              </Link>
            </Button>

            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <a href="tel:+919820357137" className="flex items-center gap-3 hover:text-gold transition-colors">
                <Phone className="h-4 w-4 text-gold" /> +91 9820357137
              </a>
              <a href="mailto:landmarkestateagents@gmail.com" className="flex items-center gap-3 hover:text-gold transition-colors">
                <Mail className="h-4 w-4 text-gold" /> landmarkestateagents@gmail.com
              </a>
            </div>

            <div className="mt-8 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Landmark Estate Agents · Est. 2004
            </div>
          </div>
        </nav>
      </aside>
    </header>
  );
}
