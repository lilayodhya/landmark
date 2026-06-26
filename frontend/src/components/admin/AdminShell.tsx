import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Building2,
  KeyRound,
  Newspaper,
  Users,
  CalendarCheck,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";
import { useAdminAuth } from "@/lib/admin/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
};
const NAV: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/properties", label: "Properties", icon: Building2 },
  { to: "/admin/rentals", label: "Rentals", icon: KeyRound },
  { to: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { to: "/admin/leads", label: "Leads", icon: Users },
  { to: "/admin/visits", label: "Site Visits", icon: CalendarCheck },
];


export function AdminShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAdminAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <div className="min-h-screen flex bg-muted/40 text-foreground">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-primary text-primary-foreground transform transition-transform lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen flex flex-col shrink-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
          <Link to="/admin" className="font-display text-xl tracking-wide">
            Landmark <span className="text-accent">CRM</span>
          </Link>
          <button
            className="lg:hidden p-1 rounded hover:bg-white/10"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="px-3 py-4 space-y-1 flex-1 overflow-y-auto">
          {NAV.map((item) => {
            const active = isActive(item.to, item.exact);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to as never}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                  active
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-white/80 hover:bg-white/10 hover:text-white",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-medium">
              {user?.name?.[0] ?? "?"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-white/60 capitalize">{user?.role}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded hover:bg-white/10"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card border-b flex items-center px-4 lg:px-6 gap-3 sticky top-0 z-20">
          <button
            className="lg:hidden p-2 rounded hover:bg-muted"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search properties, leads, blogs…" className="pl-9" />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground hidden sm:inline"
            >
              View site →
            </Link>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
