import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { mockBlogs, type AdminBlog } from "@/lib/admin/mock-data";

export const Route = createFileRoute("/admin/blogs")({
  component: BlogsPage,
});

const CATEGORIES = ["Neighbourhoods", "Investment", "Design", "Market", "Lifestyle"];

function BlogsPage() {
  const [items, setItems] = useState(mockBlogs);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminBlog | null>(null);

  const filtered = useMemo(
    () => items.filter((b) => b.title.toLowerCase().includes(q.toLowerCase())),
    [items, q],
  );

  const onDelete = (id: string) => {
    if (!confirm("Delete this article?")) return;
    setItems((prev) => prev.filter((b) => b.id !== id));
  };

  const onSave = (b: AdminBlog) => {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === b.id);
      if (idx === -1) return [b, ...prev];
      const next = [...prev];
      next[idx] = b;
      return next;
    });
    setOpen(false);
    setEditing(null);
  };

  return (
    <>
      <PageHeader
        title="Blogs"
        description="Publish and manage editorial articles on the Landmark journal."
        actions={
          <Button onClick={() => { setEditing(null); setOpen(true); }}>
            <Plus className="h-4 w-4" /> New Article
          </Button>
        }
      />

      <Card className="p-4">
        <div className="relative max-w-md mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search articles…" className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden sm:table-cell">Views</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((b) => (
              <TableRow key={b.id}>
                <TableCell>
                  <div className="font-medium">{b.title}</div>
                  <div className="text-xs text-muted-foreground">/{b.slug}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm">{b.category}</TableCell>
                <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{b.views.toLocaleString()}</TableCell>
                <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{b.date}</TableCell>
                <TableCell><StatusBadge status={b.status} /></TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => { setEditing(b); setOpen(true); }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(b.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <BlogDialog open={open} onOpenChange={setOpen} initial={editing} onSave={onSave} />
    </>
  );
}

function BlogDialog({
  open,
  onOpenChange,
  initial,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial: AdminBlog | null;
  onSave: (b: AdminBlog) => void;
}) {
  const [form, setForm] = useState<AdminBlog>(
    initial ?? {
      id: `B-${Math.floor(10 + Math.random() * 90)}`,
      title: "",
      slug: "",
      category: "Neighbourhoods",
      status: "Draft",
      views: 0,
      date: new Date().toISOString().slice(0, 10),
    },
  );

  // reset when opening
  useState(() => undefined);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit article" : "New article"}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => { e.preventDefault(); onSave(form); }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label>Title</Label>
            <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="my-article" />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Excerpt</Label>
            <Textarea rows={2} />
          </div>
          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea rows={6} placeholder="Write the full article…" />
          </div>
          <div className="space-y-2">
            <Label>Cover image URL</Label>
            <Input placeholder="https://…" />
          </div>
          <div className="space-y-2">
            <Label>Publish status</Label>
            <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as AdminBlog["status"] })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">{initial ? "Save changes" : "Create article"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
