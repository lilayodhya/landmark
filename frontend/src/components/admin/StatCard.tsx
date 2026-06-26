import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  hint,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  hint?: string;
}) {
  return (
    <Card className="p-5 flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-display text-3xl mt-2 text-foreground">{value}</p>
        {trend && <p className="text-xs text-emerald-600 mt-1">{trend}</p>}
        {hint && !trend && (
          <p className="text-xs text-muted-foreground mt-1">{hint}</p>
        )}
      </div>
      <div className="h-10 w-10 rounded-lg bg-accent/15 text-accent-foreground flex items-center justify-center">
        <Icon className="h-5 w-5" />
      </div>
    </Card>
  );
}
