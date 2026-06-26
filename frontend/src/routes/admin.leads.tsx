import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Mail, Phone, Eye, Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { mockLeads, type Lead } from "@/lib/admin/mock-data";

export const Route = createFileRoute("/admin/leads")({
  component: LeadsPage,
});

const STATUSES: Lead["status"][] = ["New", "Called", "Follow Up", "Site Visit Scheduled", "Converted", "Closed"];
const SOURCES = ["all", "Contact Form", "Consultation", "Property Enquiry", "Sell Request", "Rental Enquiry", "Site Visit"] as const;

function LeadsPage() {
  const [items, setItems] = useState(mockLeads);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [source, setSource] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Lead | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const blankLead = (): Lead => ({
    id: `L-${Math.floor(9000 + Math.random() * 999)}`,
    name: "",
    phone: "",
    email: "",
    source: "Contact Form",
    property: "",
    notes: "",
    status: "New",
    date: new Date().toISOString().slice(0, 10),
  });
  const [draft, setDraft] = useState<Lead>(blankLead());

  const addLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim() || !draft.phone.trim() || !draft.email.trim()) {
      toast.error("Name, phone and email are required");
      return;
    }
    setItems((prev) => [draft, ...prev]);
    toast.success("Lead added");
    setAddOpen(false);
    setDraft(blankLead());
  };


  const filtered = useMemo(
    () =>
      items.filter((l) => {
        if (status !== "all" && l.status !== status) return false;
        if (source !== "all" && l.source !== source) return false;
        if (q && !`${l.name} ${l.email} ${l.phone}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [items, q, status, source],
  );

  const updateStatus = (id: string, newStatus: Lead["status"]) => {
    setItems((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
  };

  return (
    <>
      <PageHeader
        title="Leads"
        description="All customer enquiries collected from the website."
        actions={
          <Button onClick={() => { setDraft(blankLead()); setAddOpen(true); }}>
            <Plus className="h-4 w-4" /> Add Lead
          </Button>
        }
      />


      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name, email or phone…" className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <Select value={source} onValueChange={setSource}>
            <SelectTrigger className="w-full lg:w-52"><SelectValue placeholder="Source" /></SelectTrigger>
            <SelectContent>
              {SOURCES.map((s) => <SelectItem key={s} value={s}>{s === "all" ? "All sources" : s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full lg:w-52"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead className="hidden md:table-cell">Source</TableHead>
                <TableHead className="hidden lg:table-cell">Interested in</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((l) => (
                <TableRow key={l.id}>
                  <TableCell>
                    <div className="font-medium">{l.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-3">
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{l.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{l.source}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">{l.property}</TableCell>
                  <TableCell>
                    <Select value={l.status} onValueChange={(v) => updateStatus(l.id, v as Lead["status"])}>
                      <SelectTrigger className="h-8 w-44"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{l.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => { setActive(l); setOpen(true); }}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                    No leads match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{active?.name}</DialogTitle>
          </DialogHeader>
          {active && (
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-4">
                <a href={`tel:${active.phone}`} className="flex items-center gap-2 text-foreground hover:text-accent-foreground"><Phone className="h-4 w-4" />{active.phone}</a>
                <a href={`mailto:${active.email}`} className="flex items-center gap-2 text-foreground hover:text-accent-foreground"><Mail className="h-4 w-4" />{active.email}</a>
              </div>
              <Detail label="Source" value={active.source} />
              <Detail label="Interested in" value={active.property} />
              <Detail label="Status" value={<StatusBadge status={active.status} />} />
              <Detail label="Created" value={active.date} />
              <div>
                <Label className="text-muted-foreground">Notes</Label>
                <p className="mt-1">{active.notes}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add new lead</DialogTitle>
          </DialogHeader>
          <form onSubmit={addLead} className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Full name</Label>
                <Input required value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input required value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} placeholder="+91 …" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input required type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Source</Label>
                <Select value={draft.source} onValueChange={(v) => setDraft({ ...draft, source: v as Lead["source"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SOURCES.filter((s) => s !== "all").map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select value={draft.status} onValueChange={(v) => setDraft({ ...draft, status: v as Lead["status"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Interested in</Label>
              <Input value={draft.property} onChange={(e) => setDraft({ ...draft, property: e.target.value })} placeholder="Property title or area" />
            </div>
            <div className="space-y-1.5">
              <Label>Notes</Label>
              <Textarea rows={3} value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button type="submit">Create lead</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>

  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 border-b pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
