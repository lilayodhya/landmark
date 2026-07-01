import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Loader2, UserPlus, Sparkles, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in · Landmark Estate Agents" },
      { name: "description", content: "Sign in or create an account with Landmark Estate Agents." },
    ],
  }),
  component: LoginPage,
});

const ENTRY_MODE_KEY = "landmark_entry_mode";
const luxuryPropertyImage =
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80";

// Demo credentials — matches src/lib/admin/auth.tsx
const DEMO_USERS: Record<string, { password: string; name: string; role: "admin" | "agent" }> = {
  "admin@landmark.com": { password: "admin123", name: "Aarav Mehta", role: "admin" },
  "agent@landmark.com": { password: "agent123", name: "Priya Shah", role: "agent" },
};

export function LoginPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),_transparent_30%),linear-gradient(135deg,_#0f172a_0%,_#1e293b_55%,_#334155_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col overflow-hidden rounded-[32px] border border-white/10 bg-white/10 shadow-[0_30px_90px_rgba(15,23,42,0.35)] backdrop-blur-xl lg:flex-row">
        <div className="flex flex-1 flex-col justify-between bg-[linear-gradient(145deg,_rgba(15,23,42,0.95),_rgba(30,41,59,0.9))] p-8 text-primary-foreground sm:p-10 lg:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold/90">Landmark Estate Agents</p>
            <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              Find your next address with confidence.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
              From luxury residences to private advisory, every experience is designed around clarity, trust, and exceptional standards.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
                <p className="text-2xl font-semibold text-gold">40+</p>
                <p className="text-sm text-white/70">Years in business</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
                <p className="text-2xl font-semibold text-gold">1200+</p>
                <p className="text-sm text-white/70">Families placed</p>
              </div>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[24px] border border-white/15 bg-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur">
            <img
              src={luxuryPropertyImage}
              alt="Luxury modern residence"
              className="h-48 w-full object-cover"
            />
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-gold">
                <Sparkles className="h-4 w-4" />
                Curated property experiences
              </div>
              <p className="mt-2 text-sm text-white/70">
                Thoughtfully selected homes, refined service, and a calm path to your next move.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-background/95 p-6 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-md">
            <div className="mb-6 text-center">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-gold">Welcome back</p>
              <h2 className="mt-2 font-display text-3xl text-foreground">Choose your access</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in, create an account, or continue as a guest.
              </p>
            </div>

            <div className="rounded-3xl border border-border/70 bg-card/80 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-6">
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="mb-6 grid w-full grid-cols-2 rounded-full bg-muted p-1">
                  <TabsTrigger value="signin" className="rounded-full">Sign in</TabsTrigger>
                  <TabsTrigger value="signup" className="rounded-full">Sign up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <SignInForm />
                </TabsContent>

                <TabsContent value="signup">
                  <SignUpForm />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignInForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const trimmedEmail = email.trim().toLowerCase();
    const rec = DEMO_USERS[trimmedEmail];
    await new Promise((r) => setTimeout(r, 400));

    if (!rec || rec.password !== password) {
      setLoading(false);
      window.localStorage.setItem(ENTRY_MODE_KEY, "guest");
      toast.success("Welcome to Landmark Estate Agents", {
        description: "You will be redirected to the website.",
      });
      navigate({ to: "/home" });
      return;
    }

    if (rec.role !== "admin") {
      setLoading(false);
      window.localStorage.setItem(ENTRY_MODE_KEY, "guest");
      toast.success("Welcome to Landmark Estate Agents");
      navigate({ to: "/home" });
      return;
    }

    // Persist session for the admin auth provider to pick up.
    const user = { email: trimmedEmail, name: rec.name, role: rec.role };
    window.localStorage.setItem("landmark_admin_user", JSON.stringify(user));
    window.localStorage.setItem(ENTRY_MODE_KEY, "guest");
    toast.success(`Welcome back, ${rec.name.split(" ")[0]}`);
    navigate({ to: "/admin" });
  };

  const fill = (e: string, p: string) => {
    setEmail(e);
    setPassword(p);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signin-email">Email</Label>
        <Input
          id="signin-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@landmark.com"
          className="h-11 rounded-xl border-border/70 bg-background/70"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signin-password">Password</Label>
        <Input
          id="signin-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="h-11 rounded-xl border-border/70 bg-background/70"
        />
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 rounded p-2">{error}</p>
      )}

      <Button type="submit" className="h-11 w-full rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign in
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      <div className="space-y-2 rounded-2xl border border-border/60 bg-muted/40 p-3 text-xs text-muted-foreground">
        <p className="font-medium text-foreground">Demo accounts</p>
        <button
          type="button"
          onClick={() => fill("admin@landmark.com", "admin123")}
          className="block w-full text-left hover:bg-muted rounded p-2 transition-colors"
        >
          <span className="font-medium">Admin:</span> admin@landmark.com / admin123
        </button>
        <button
          type="button"
          onClick={() => fill("agent@landmark.com", "agent123")}
          className="block w-full text-left hover:bg-muted rounded p-2 transition-colors"
        >
          <span className="font-medium">Agent:</span> agent@landmark.com / agent123
        </button>
      </div>
    </form>
  );
}

function SignUpForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGuestAccess = () => {
    window.localStorage.setItem(ENTRY_MODE_KEY, "guest");
    toast.success("Continuing as a guest");
    navigate({ to: "/home" });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    window.localStorage.setItem(ENTRY_MODE_KEY, "guest");
    toast.success("Account request received", {
      description: "Our team will be in touch shortly to verify your details.",
    });
    setName("");
    setEmail("");
    setPassword("");
    navigate({ to: "/home" });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-name">Full name</Label>
        <Input
          id="signup-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          className="h-11 rounded-xl border-border/70 bg-background/70"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="h-11 rounded-xl border-border/70 bg-background/70"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          className="h-11 rounded-xl border-border/70 bg-background/70"
        />
      </div>

      <Button type="submit" className="h-11 w-full rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90" disabled={loading}>
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <UserPlus className="mr-2 h-4 w-4" />
        )}
        Create account
      </Button>

      <p className="text-xs text-muted-foreground text-center pt-2">
        Staff access is provisioned by Landmark administrators. Public sign-ups are reviewed before activation.
      </p>

      <div className="mt-2 rounded-2xl border border-dashed border-border/70 bg-muted/30 p-3">
        <button
          type="button"
          onClick={handleGuestAccess}
          className="flex w-full items-center justify-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Continue as guest
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
