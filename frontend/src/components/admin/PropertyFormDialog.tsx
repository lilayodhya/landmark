import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus } from "lucide-react";
import type { AdminProperty } from "@/lib/admin/mock-data";

const TYPES = ["Villa", "Penthouse", "Apartment", "Bungalow", "Studio", "Loft", "Townhouse", "Plot"];

const blank = (kind: "Buy" | "Rent"): AdminProperty => ({
  id: `${kind === "Buy" ? "P" : "R"}-${Math.floor(1000 + Math.random() * 9000)}`,
  title: "",
  location: "",
  city: "",
  type: "Apartment",
  listing: kind,
  price: 0,
  priceLabel: "",
  bedrooms: 1,
  bathrooms: 1,
  area: 0,
  status: "Active",
  featured: false,
  views: 0,
  image:
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=70",
  gallery: [],
  description: "",
  features: [],
  highlights: [],
});

export function PropertyFormDialog({
  open,
  onOpenChange,
  initial,
  kind,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial: AdminProperty | null;
  kind: "Buy" | "Rent";
  onSave: (p: AdminProperty) => void;
}) {
  const [form, setForm] = useState<AdminProperty>(blank(kind));
  const [featuresText, setFeaturesText] = useState("");
  const [highlightsText, setHighlightsText] = useState("");
  const [galleryText, setGalleryText] = useState("");

  useEffect(() => {
    const base = initial ?? blank(kind);
    setForm(base);
    setFeaturesText((base.features ?? []).join(", "));
    setHighlightsText((base.highlights ?? []).join(", "));
    setGalleryText((base.gallery ?? []).join("\n"));
  }, [initial, kind, open]);

  const set = <K extends keyof AdminProperty>(k: K, v: AdminProperty[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      features: featuresText.split(",").map((s) => s.trim()).filter(Boolean),
      highlights: highlightsText.split(",").map((s) => s.trim()).filter(Boolean),
      gallery: galleryText.split("\n").map((s) => s.trim()).filter(Boolean),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initial ? "Edit listing" : `Add ${kind === "Buy" ? "property" : "rental"}`}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input required value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Azure Heights Villa" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Location</Label>
              <Input required value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="Juhu, Mumbai" />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input value={form.city ?? ""} onChange={(e) => set("city", e.target.value)} placeholder="Mumbai" />
            </div>
            <div className="space-y-2">
              <Label>Property Type</Label>
              <Select value={form.type} onValueChange={(v) => set("type", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Listing Type</Label>
              <Select value={form.listing} onValueChange={(v) => set("listing", v as "Buy" | "Rent")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Buy">Buy</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Price (₹)</Label>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={form.price === 0 ? "" : form.price}
                onChange={(e) => set("price", Number(e.target.value.replace(/[^0-9]/g, "")) || 0)}
                placeholder="Enter price"
              />
            </div>
            <div className="space-y-2">
              <Label>Price Label</Label>
              <Input value={form.priceLabel ?? ""} onChange={(e) => set("priceLabel", e.target.value)} placeholder="₹12.5 Cr or ₹1.65 L / mo" />
            </div>
            <div className="space-y-2">
              <Label>Bedrooms</Label>
              <Select value={String(form.bedrooms)} onValueChange={(v) => set("bedrooms", Number(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Bathrooms</Label>
              <Select value={String(form.bathrooms)} onValueChange={(v) => set("bathrooms", Number(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Area (sq ft)</Label>
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={form.area === 0 ? "" : form.area}
                onChange={(e) => set("area", Number(e.target.value.replace(/[^0-9]/g, "")) || 0)}
                placeholder="Enter area"
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => set("status", v as "Active" | "Inactive")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description / Overview</Label>
            <Textarea
              rows={4}
              value={form.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
              placeholder="An architectural statement on a private corner of Juhu…"
            />
          </div>

          <div className="space-y-2">
            <Label>Features & amenities (comma separated)</Label>
            <Textarea
              rows={2}
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="Infinity pool, Home theatre, Wine cellar, Smart home"
            />
          </div>

          <div className="space-y-2">
            <Label>Highlights (comma separated)</Label>
            <Input
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
              placeholder="Sea-facing terrace, Designer interiors, EV-ready garage"
            />
          </div>

          <div className="space-y-2">
            <Label>Cover image URL</Label>
            <Input value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://…" />
          </div>

          <div className="space-y-2">
            <Label>Gallery image URLs (one per line)</Label>
            <Textarea
              rows={3}
              value={galleryText}
              onChange={(e) => setGalleryText(e.target.value)}
              placeholder={"https://image-1\nhttps://image-2"}
            />
            <div className="border-2 border-dashed rounded-lg p-4 text-center text-xs text-muted-foreground">
              <ImagePlus className="h-5 w-5 mx-auto mb-1" />
              Drag & drop upload coming with storage integration
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <Label className="text-base">Featured property</Label>
              <p className="text-xs text-muted-foreground">Highlight on the home page</p>
            </div>
            <Switch checked={form.featured} onCheckedChange={(v) => set("featured", v)} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">{initial ? "Save changes" : "Create listing"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
