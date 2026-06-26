import { useState, type FormEvent } from "react";
import { useAdminAuth } from "@/lib/admin/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";

export function LoginScreen() {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (!res.ok) setError(res.error ?? "Login failed");
  };

  const fill = (e: string, p: string) => {
    setEmail(e);
    setPassword(p);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 text-primary-foreground">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground mb-4">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="font-display text-3xl">Landmark CRM</h1>
          <p className="text-sm text-white/60 mt-1">
            Sign in to manage properties, leads and listings
          </p>
        </div>
        <form
          onSubmit={onSubmit}
          className="bg-card rounded-xl p-6 sm:p-8 shadow-2xl space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@landmark.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p className="text-sm text-destructive bg-destructive/10 rounded p-2">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Sign in
          </Button>

          <div className="pt-4 border-t text-xs text-muted-foreground space-y-2">
            <p className="font-medium text-foreground">Demo accounts</p>
            <button
              type="button"
              onClick={() => fill("admin@landmark.com", "admin123")}
              className="block w-full text-left hover:bg-muted rounded p-2"
            >
              <span className="font-medium">Admin:</span> admin@landmark.com / admin123
            </button>
            <button
              type="button"
              onClick={() => fill("agent@landmark.com", "agent123")}
              className="block w-full text-left hover:bg-muted rounded p-2"
            >
              <span className="font-medium">Agent:</span> agent@landmark.com / agent123
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
