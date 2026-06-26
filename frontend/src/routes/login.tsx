import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Lock, Loader2, ArrowLeft, UserPlus } from "lucide-react";
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

// Demo credentials — matches src/lib/admin/auth.tsx
const DEMO_USERS: Record<string, { password: string; name: string; role: "admin" | "agent" }> = {
  "admin@landmark.com": { password: "admin123", name: "Aarav Mehta", role: "admin" },
  "agent@landmark.com": { password: "agent123", name: "Priya Shah", role: "agent" },
};

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to website
        </Link>

        <div className="text-center mb-8 text-primary-foreground">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground mb-4">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="font-display text-3xl">Landmark</h1>
          <p className="text-sm text-white/60 mt-1">
            Access your dashboard or create a new account
          </p>
        </div>

        <div className="bg-card rounded-xl p-6 sm:p-8 shadow-2xl">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
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
      toast.success("Our team will contact you shortly.", {
        description: "You will be redirected to the website.",
      });
      navigate({ to: "/" });
      return;
    }

    // Persist session for the admin auth provider to pick up.
    const user = { email: trimmedEmail, name: rec.name, role: rec.role };
    window.localStorage.setItem("landmark_admin_user", JSON.stringify(user));
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
        />
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 rounded p-2">{error}</p>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
        Sign in
      </Button>

      <div className="pt-4 border-t text-xs text-muted-foreground space-y-2">
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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    toast.success("Account request received", {
      description: "Our team will be in touch shortly to verify your details.",
    });
    setName("");
    setEmail("");
    setPassword("");
    navigate({ to: "/" });
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
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <UserPlus className="h-4 w-4 mr-2" />
        )}
        Create account
      </Button>

      <p className="text-xs text-muted-foreground text-center pt-2">
        Staff access is provisioned by Landmark administrators. Public sign-ups are reviewed before activation.
      </p>
    </form>
  );
}
