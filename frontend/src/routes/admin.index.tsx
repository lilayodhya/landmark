import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, KeyRound, Users, CalendarCheck, Newspaper, TrendingUp, Eye } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockProperties, mockRentals, mockBlogs, mockLeads, mockVisits } from "@/lib/admin/mock-data";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const recentLeads = mockLeads.slice(0, 5);
  const upcoming = mockVisits.filter((v) => v.status === "Scheduled").slice(0, 4);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="A snapshot of activity across Landmark Estate Agents."
      />

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Total Properties" value={mockProperties.length} icon={Building2} trend="+2 this week" />
        <StatCard label="Total Rentals" value={mockRentals.length} icon={KeyRound} hint="2 vacant" />
        <StatCard label="Total Leads" value={mockLeads.length} icon={Users} trend="+12% MoM" />
        <StatCard label="Site Visits" value={mockVisits.length} icon={CalendarCheck} hint="3 upcoming" />
        <StatCard label="Published Blogs" value={mockBlogs.filter((b) => b.status === "Published").length} icon={Newspaper} />
        <StatCard label="Website Views" value="184k" icon={Eye} trend="+8.4%" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl">Recent leads</h2>
            <Link to="/admin/leads" className="text-sm text-accent-foreground hover:underline">
              View all
            </Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLeads.map((l) => (
                <TableRow key={l.id}>
                  <TableCell>
                    <div className="font-medium">{l.name}</div>
                    <div className="text-xs text-muted-foreground">{l.phone}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{l.source}</TableCell>
                  <TableCell><StatusBadge status={l.status} /></TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{l.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl">Upcoming visits</h2>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <ul className="space-y-4">
            {upcoming.map((v) => (
              <li key={v.id} className="border-l-2 border-accent pl-3">
                <p className="font-medium text-sm">{v.property}</p>
                <p className="text-xs text-muted-foreground">{v.lead} · {v.agent}</p>
                <p className="text-xs mt-1">{v.date} · {v.time}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
