import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type AdminRole = "admin" | "agent";
export interface AdminUser {
  email: string;
  name: string;
  role: AdminRole;
}

interface AuthCtx {
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "landmark_admin_user";

// Demo credentials (UI-only; replace with Supabase later)
const DEMO_USERS: Record<string, { password: string; user: AdminUser }> = {
  "admin@landmark.com": {
    password: "admin123",
    user: { email: "admin@landmark.com", name: "Aarav Mehta", role: "admin" },
  },
  "agent@landmark.com": {
    password: "agent123",
    user: { email: "agent@landmark.com", name: "Priya Shah", role: "agent" },
  },
};

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        /* ignore */
      }
    }
  }, []);

  const login: AuthCtx["login"] = async (email, password) => {
    const rec = DEMO_USERS[email.trim().toLowerCase()];
    if (!rec || rec.password !== password) {
      return { ok: false, error: "Invalid email or password" };
    }
    setUser(rec.user);
    window.localStorage.setItem(KEY, JSON.stringify(rec.user));
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(KEY);
  };

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
}
