import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  trend?: string;
  variant?: "primary" | "eco" | "aqua" | "warning";
}

const variants = {
  primary: "bg-gradient-primary",
  eco: "bg-gradient-eco",
  aqua: "bg-gradient-aqua",
  warning: "bg-gradient-to-br from-warning to-warning/70",
};

export function StatCard({ icon: Icon, label, value, hint, trend, variant = "primary" }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow">
      <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 ${variants[variant]}`} />
      <div className="relative flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
          {trend && (
            <span className="mt-2 inline-flex items-center rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
              {trend}
            </span>
          )}
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${variants[variant]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
