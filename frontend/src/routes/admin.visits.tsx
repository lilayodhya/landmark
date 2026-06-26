import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, CalendarPlus } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockVisits } from "@/lib/admin/mock-data";

export const Route = createFileRoute("/admin/visits")({
  component: VisitsPage,
});

function VisitsPage() {
  const [items] = useState(mockVisits);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");

  const filtered = useMemo(
    () =>
      items.filter((v) => {
        if (status !== "all" && v.status !== status) return false;
        if (q && !`${v.lead} ${v.property} ${v.agent}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [items, q, status],
  );

  const upcoming = items.filter((v) => v.status === "Scheduled");

  return (
    <>
      <PageHeader
        title="Site Visits"
        description="Coordinate viewings across the team and track outcomes."
        actions={
          <Button>
            <CalendarPlus className="h-4 w-4" /> Schedule visit
          </Button>
        }
      />

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Scheduled</p>
          <p className="font-display text-2xl">{upcoming.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="font-display text-2xl">{items.filter((v) => v.status === "Completed").length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Cancelled</p>
          <p className="font-display text-2xl">{items.filter((v) => v.status === "Cancelled").length}</p>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by client, property or agent…" className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full lg:w-52"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
              <SelectItem value="Rescheduled">Rescheduled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="hidden sm:table-cell">Time</TableHead>
                <TableHead className="hidden md:table-cell">Agent</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.lead}</TableCell>
                  <TableCell>{v.property}</TableCell>
                  <TableCell>{v.date}</TableCell>
                  <TableCell className="hidden sm:table-cell">{v.time}</TableCell>
                  <TableCell className="hidden md:table-cell">{v.agent}</TableCell>
                  <TableCell><StatusBadge status={v.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}
