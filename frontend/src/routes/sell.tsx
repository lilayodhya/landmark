import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { createSellRequest } from "@/api/sellApi";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell or Rent Your Property — Landmark Estate Agents" },
      { name: "description", content: "List your home with India's premier boutique estate advisory. Concierge marketing, qualified buyers, transparent process." },
      { property: "og:title", content: "Sell or Rent Your Property — Landmark Estate Agents" },
      { property: "og:url", content: "/sell" },
    ],
    links: [{ rel: "canonical", href: "/sell" }],
  }),
  component: SellPage,
});

function SellPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="List with us"
        title="Sell or rent your home, beautifully."
        description="Share a few details below. A senior advisor will respond within one business day with an indicative valuation and next steps."
      />
      <section className="py-16">
        <div className="container-x grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="eyebrow">What you can expect</div>
              <h2 className="mt-3 font-display text-3xl">A concierge experience.</h2>
            </div>
            <ul className="space-y-4">
              {[
                "Indicative valuation within one business day",
                "Professional photography and editorial-style brochure",
                "Discreet placement to a qualified buyer pool",
                "Negotiation and closing managed end-to-end",
                "Transparent, milestone-based pricing",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm">
                  <span className="grid h-6 w-6 place-items-center bg-gold/15 text-gold shrink-0 mt-0.5"><Check className="h-3.5 w-3.5" /></span>
                  <span className="text-muted-foreground leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <form
            onSubmit={async (e) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    property_type: formData.get("type"),
    area_location: formData.get("location"),
    expected_selling_price: formData.get("price"),
    preferred_date: formData.get("date"),
    preferred_time: formData.get("time"),
    message: formData.get("notes"),
};

    try {
        await createSellRequest(data);

        toast.success(
            "Thank you! One of our advisors will contact you shortly."
        );

        form.reset();

    } catch (err) {
        console.error(err);

        toast.error(
            "Something went wrong. Please try again."
        );
    }
}}
            className="lg:col-span-3 border border-border bg-card p-6 md:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full name"><Input required name="name" className="rounded-none" /></Field>
              <Field label="Phone"><Input required name="phone" type="tel" className="rounded-none" /></Field>
            </div>
            <Field label="Email"><Input required type="email" name="email" className="rounded-none" /></Field>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Property type">
                <Select name="type">
                  <SelectTrigger className="rounded-none"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {["Apartment","Villa","Penthouse","Townhouse","Plot","Commercial"].map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Location"><Input required name="location" placeholder="Area, City" className="rounded-none" /></Field>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              <Field label="Expected price"><Input name="price" placeholder="e.g. ₹5.5 Cr" className="rounded-none" /></Field>
              <Field label="Preferred date"><Input name="date" type="date" className="rounded-none" /></Field>
              <Field label="Preferred time"><Input name="time" type="time" className="rounded-none" /></Field>
            </div>
            <Field label="Anything we should know?">
              <Textarea name="notes" rows={4} className="rounded-none" />
            </Field>
            <Button type="submit" size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-7">
              Submit Property Details
            </Button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="eyebrow mb-2 block">{label}</Label>
      {children}
    </div>
  );
}
