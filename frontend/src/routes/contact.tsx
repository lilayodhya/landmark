import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { createContact } from "@/api/contactApi";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Landmark Estate Agents" },
      { name: "description", content: "Speak with a senior advisor at Landmark Estate Agents — Mumbai, Bengaluru, Hyderabad." },
      { property: "og:title", content: "Contact — Landmark Estate Agents" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const contactAddress = "Shop No 7, Sun Swept, Lokhandwala Complex, Four Bugalows, West, Andheri, Andheri West, Mumbai, Maharashtra 400053";
  const mapsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contactAddress)}`;
  const phoneLink = "tel:+919820357137";
  const emailLink = "mailto:landmarkestateagents@gmail.com";

  return (
    <SiteLayout>
      <PageHeader eyebrow="Get in touch" title="Let's start a conversation." description="A senior advisor will respond personally within one business day." />

      <section className="py-16">
        <div className="container-x grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {[
              { icon: MapPin, label: "Mumbai", value: contactAddress, href: mapsLink, targetBlank: true },
              { icon: Phone, label: "Call", value: "+91 9820357137", href: phoneLink },
              { icon: Mail, label: "Email", value: "landmarkestateagents@gmail.com", href: emailLink },
            ].map(({ icon: Icon, label, value, href, targetBlank }) => (
              <div key={label} className="flex items-start gap-4">
                <span className="grid h-11 w-11 place-items-center bg-gold/15 text-gold shrink-0"><Icon className="h-5 w-5" /></span>
                <div>
                  <div className="eyebrow">{label}</div>
                  <div className="mt-1 font-display text-xl break-words">
                    <a
                      href={href}
                      target={targetBlank ? "_blank" : undefined}
                      rel={targetBlank ? "noopener noreferrer" : undefined}
                      className="text-foreground hover:text-gold transition-colors break-words inline-block"
                    >
                      {value}
                    </a>
                  </div>
                </div>
              </div>
            ))}
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
        subject: formData.get("subject"),
        message: formData.get("message"),
    };

    try {
        await createContact(data);

        toast.success("Thanks — we'll be in touch shortly.");

        form.reset();

    } catch (err: any) {
    console.error(err);

    console.log(err.response?.data);

    toast.error(err.response?.data?.error || "Something went wrong.");
}
}}
            className="lg:col-span-3 border border-border bg-card p-6 md:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Name"><Input required name="name" className="rounded-none" /></Field>
              <Field label="Phone"><Input required name="phone" className="rounded-none" /></Field>
            </div>
            <Field label="Email"><Input required type="email" name="email" className="rounded-none" /></Field>
            <Field label="Subject"><Input name="subject" className="rounded-none" /></Field>
            <Field label="Message"><Textarea required name="message" rows={6} className="rounded-none" /></Field>
            <Button type="submit" size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-7">
              Send Message
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
