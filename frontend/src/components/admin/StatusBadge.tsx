import { cn } from "@/lib/utils";

const MAP: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Inactive: "bg-muted text-muted-foreground",
  Published: "bg-emerald-100 text-emerald-700",
  Draft: "bg-amber-100 text-amber-700",
  New: "bg-blue-100 text-blue-700",
  Called: "bg-indigo-100 text-indigo-700",
  "Follow Up": "bg-amber-100 text-amber-700",
  "Site Visit Scheduled": "bg-purple-100 text-purple-700",
  Converted: "bg-emerald-100 text-emerald-700",
  Closed: "bg-muted text-muted-foreground",
  Scheduled: "bg-blue-100 text-blue-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-rose-100 text-rose-700",
  Rescheduled: "bg-amber-100 text-amber-700",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        MAP[status] ?? "bg-muted text-muted-foreground",
      )}
    >
      {status}
    </span>
  );
}
