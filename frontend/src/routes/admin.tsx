import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminAuthProvider, useAdminAuth } from "@/lib/admin/auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { LoginScreen } from "@/components/admin/LoginScreen";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · Landmark Estate Agents" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <AdminAuthProvider>
      <Gate />
    </AdminAuthProvider>
  );
}

function Gate() {
  const { user } = useAdminAuth();
  if (!user) return <LoginScreen />;
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}
