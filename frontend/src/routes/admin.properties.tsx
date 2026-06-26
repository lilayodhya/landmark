import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, Pencil, Trash2, Star } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { PropertyFormDialog } from "@/components/admin/PropertyFormDialog";
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
import { mockProperties, type AdminProperty } from "@/lib/admin/mock-data";

export const Route = createFileRoute("/admin/properties")({
  component: () => <PropertyManager initial={mockProperties} title="Properties" kind="Buy" />,
});

const PAGE_SIZE = 6;

export function PropertyManager({
  initial,
  title,
  kind,
}: {
  initial: AdminProperty[];
  title: string;
  kind: "Buy" | "Rent";
}) {
  const [items, setItems] = useState(initial);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<AdminProperty | null>(null);
  const [open, setOpen] = useState(false);

  const types = useMemo(
    () => Array.from(new Set(initial.map((i) => i.type))),
    [initial],
  );

  const filtered = useMemo(() => {
    return items.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (typeFilter !== "all" && p.type !== typeFilter) return false;
      if (q && !`${p.title} ${p.location} ${p.id}`.toLowerCase().includes(q.toLowerCase()))
        return false;
      return true;
    });
  }, [items, q, statusFilter, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const onSave = (p: AdminProperty) => {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === p.id);
      if (idx === -1) return [p, ...prev];
      const next = [...prev];
      next[idx] = p;
      return next;
    });
    setOpen(false);
    setEditing(null);
  };

  const onDelete = (id: string) => {
    if (!confirm("Delete this listing?")) return;
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <PageHeader
        title={title}
        description={`Manage all ${kind === "Buy" ? "sale" : "rental"} listings published on the site.`}
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> Add {kind === "Buy" ? "Property" : "Rental"}
          </Button>
        }
      />

      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, location or ID…"
              className="pl-9"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setPage(1); }}>
            <SelectTrigger className="w-full lg:w-44"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {types.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
            <SelectTrigger className="w-full lg:w-44"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Listing</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead className="hidden lg:table-cell">Beds / Baths</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden sm:table-cell">Views</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-12 w-16 rounded object-cover" />
                      <div>
                        <div className="font-medium flex items-center gap-1.5">
                          {p.title}
                          {p.featured && <Star className="h-3.5 w-3.5 fill-accent text-accent" />}
                        </div>
                        <div className="text-xs text-muted-foreground">{p.location} · {p.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{p.type}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">{p.bedrooms} / {p.bathrooms}</TableCell>
                  <TableCell className="font-medium">₹{p.price.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{p.views.toLocaleString()}</TableCell>
                  <TableCell><StatusBadge status={p.status} /></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => { setEditing(p); setOpen(true); }} aria-label="Edit">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => onDelete(p.id)} aria-label="Delete">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {paged.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-10">
                    No listings match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm">
          <p className="text-muted-foreground">
            Showing {paged.length} of {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
            <span className="px-2">Page {page} of {totalPages}</span>
            <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>
        </div>
      </Card>

      <PropertyFormDialog
        open={open}
        onOpenChange={setOpen}
        kind={kind}
        initial={editing}
        onSave={onSave}
      />
    </>
  );
}
