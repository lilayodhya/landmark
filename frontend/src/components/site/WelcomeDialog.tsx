import { useEffect, useState } from "react";
import { z } from "zod";
import { Search, Key, TrendingUp, Compass, ArrowRight, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createPopupLead } from "@/api/popupApi";

const STORAGE_KEY = "landmark_welcome_seen_session";

const intents = [
  { icon: Search, label: "Buy or Rent", desc: "Curated homes across premium addresses" },
  { icon: Key, label: "Sell Property", desc: "Concierge marketing for your residence" },
  { icon: TrendingUp, label: "Investment", desc: "Yield, growth and portfolio guidance" },
  { icon: Compass, label: "Just Browsing", desc: "Explore the market journal" },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  email: z.string().trim().email("Please enter a valid email").max(255),
});

export function WelcomeDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"intent" | "contact">("intent");
  const [intent, setIntent] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sessionStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const close = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setOpen(false);
  };

  const pickIntent = (label: string) => {
    setIntent(label);
    setStep("contact");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(form);

    if (!result.success) {
        toast.error(result.error.issues[0].message);
        return;
    }

    setSubmitting(true);

    try {
        await createPopupLead({
            name: form.name,
            phone: form.phone,
            email: form.email,
        });

        toast.success(
            "Thank you! One of our advisors will contact you shortly."
        );

        setForm({
            name: "",
            phone: "",
            email: "",
        });

        close();

    } catch (err) {
        console.error(err);

        toast.error(
            "Something went wrong. Please try again."
        );

    } finally {
        setSubmitting(false);
    }
};
  return (
    <Dialog open={open} onOpenChange={(o) => (o ? setOpen(true) : close())}>
      <DialogContent className="max-w-2xl rounded-none border-border p-0 overflow-hidden">
        <div className="p-8 md:p-10">
          {step === "intent" ? (
            <>
              <DialogHeader className="text-left">
                <div className="eyebrow text-gold">Welcome to Landmark</div>
                <DialogTitle className="mt-3 font-display text-3xl md:text-4xl font-normal">
                  What brings you here?
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Tell us a little about what you're looking for and we'll tailor the conversation.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {intents.map(({ icon: Icon, label, desc }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => pickIntent(label)}
                    className="group text-left border border-border p-4 hover:border-gold hover:-translate-y-0.5 transition-all bg-card"
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-gold mt-0.5" strokeWidth={1.5} />
                      <div>
                        <div className="font-display text-lg">{label}</div>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={close}
                className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
              >
                Skip for now
              </button>
            </>
          ) : (
            <>
              <DialogHeader className="text-left">
                <div className="eyebrow text-gold flex items-center gap-2">
                  <Check className="h-3 w-3" /> {intent}
                </div>
                <DialogTitle className="mt-3 font-display text-3xl md:text-4xl font-normal">
                  A few quick details
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Share your contact and a senior advisor will reach out personally.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={submit} className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="w-name" className="text-xs uppercase tracking-[0.2em]">Full name</Label>
                  <Input
                    id="w-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    maxLength={100}
                    className="mt-2 rounded-none h-11"
                    required
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="w-phone" className="text-xs uppercase tracking-[0.2em]">Contact number</Label>
                    <Input
                      id="w-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      maxLength={20}
                      className="mt-2 rounded-none h-11"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="w-email" className="text-xs uppercase tracking-[0.2em]">Email address</Label>
                    <Input
                      id="w-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      maxLength={255}
                      className="mt-2 rounded-none h-11"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep("intent")}
                    className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
                  >
                    ← Back
                  </button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="rounded-none bg-gold text-primary hover:bg-gold/90 h-11 px-6"
                  >
                    {submitting ? "Sending…" : <>Submit <ArrowRight className="ml-2 h-4 w-4" /></>}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
