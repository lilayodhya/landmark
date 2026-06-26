import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="container-x py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div>
            <div className="font-display text-lg">Landmark Estate Agents</div>
          </div>
          <p className="mt-5 text-sm text-primary-foreground/70 leading-relaxed max-w-xs">
            A boutique real estate advisory representing exceptional homes and discerning buyers across India's
            most coveted neighbourhoods.
          </p>
        </div>

        <div>
          <div className="eyebrow text-gold">Explore</div>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              ["/buy", "Buy Property"],
              ["/rentals", "Rent Property"],
              ["/sell", "Sell with us"],
              ["/blog", "Market Journal"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to as string} className="text-primary-foreground/80 hover:text-gold transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="eyebrow text-gold">Company</div>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              ["/about", "About Us"],
              ["/team", "Our Team"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to as string} className="text-primary-foreground/80 hover:text-gold transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="eyebrow text-gold">Contact</div>
          <ul className="mt-5 space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" />
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Shop%20No%207%2C%20Sun%20Swept%2C%20Lokhandwala%20Complex%2C%20Four%20Bugalows%2C%20West%2C%20Andheri%2C%20Andheri%20West%2C%20Mumbai%2C%20Maharashtra%20400053"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-gold transition-colors"
              >
                Shop No 7, Sun Swept, Lokhandwala Complex, Four Bugalows, West, Andheri, Andheri West, Mumbai, Maharashtra 400053
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gold shrink-0" />
              <a href="tel:+919820357137" className="text-primary-foreground/80 hover:text-gold transition-colors">
                +91 9820357137
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gold shrink-0" />
              <a href="mailto:landmarkestateagents@gmail.com" className="text-primary-foreground/80 hover:text-gold transition-colors">
                landmarkestateagents@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Landmark Estate Agents. All rights reserved.</p>
          <p>Crafted with care · RERA Registered</p>
        </div>
      </div>
    </footer>
  );
}
