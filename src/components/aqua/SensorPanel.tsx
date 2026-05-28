import { Activity, AlertTriangle, Waves, Gauge } from "lucide-react";

type Status = "ok" | "warn" | "alert";

export interface Sensor {
  id: string;
  name: string;
  value: string;
  status: Status;
  icon: "waste" | "leak" | "level" | "flow";
}

const iconMap = { waste: Activity, leak: AlertTriangle, level: Gauge, flow: Waves };

const statusStyle: Record<Status, { dot: string; ring: string; label: string; text: string }> = {
  ok: { dot: "bg-success", ring: "ring-success/30", label: "Normal", text: "text-success" },
  warn: { dot: "bg-warning", ring: "ring-warning/30", label: "Atenção", text: "text-warning" },
  alert: { dot: "bg-destructive", ring: "ring-destructive/30", label: "Crítico", text: "text-destructive" },
};

export function SensorPanel({ sensors }: { sensors: Sensor[] }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Sensores Inteligentes</h3>
          <p className="text-xs text-muted-foreground">Monitoramento em tempo real</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-medium text-success">
          <span className="h-2 w-2 animate-pulse rounded-full bg-success" /> Ativo
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {sensors.map((s) => {
          const Icon = iconMap[s.icon];
          const st = statusStyle[s.status];
          return (
            <div key={s.id} className="rounded-xl border bg-muted/30 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium">{s.name}</span>
                </div>
                <span className={`h-2.5 w-2.5 rounded-full ring-4 ${st.dot} ${st.ring} ${s.status === "ok" ? "animate-pulse-ring" : ""}`} />
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-lg font-bold">{s.value}</span>
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${st.text}`}>{st.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
