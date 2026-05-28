import { Sun, Leaf } from "lucide-react";

export function SolarEnergy({ percent }: { percent: number }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-soft">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-warning/30 to-warning/0" />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Energia Sustentável</p>
          <h3 className="text-lg font-semibold">Painel Solar Ativo</h3>
        </div>
        <div className="animate-spin-slow">
          <Sun className="h-8 w-8 text-warning" />
        </div>
      </div>

      <div className="relative mt-5 space-y-3">
        <div className="flex items-end justify-between">
          <span className="text-4xl font-bold text-gradient-primary">{percent.toFixed(0)}%</span>
          <span className="text-xs font-medium text-success">
            <Leaf className="mr-1 inline h-3 w-3" />
            100% limpa
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-gradient-to-r from-warning to-success transition-all duration-1000"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
          <div className="rounded-lg border border-border/50 bg-muted/50 p-2">
            <p className="font-bold">2,4 kWh</p>
            <p className="text-muted-foreground">Hoje</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-muted/50 p-2">
            <p className="font-bold">68 kWh</p>
            <p className="text-muted-foreground">Mês</p>
          </div>
          <div className="rounded-lg border border-success/30 bg-success/5 p-2">
            <p className="font-bold text-success">34 kg</p>
            <p className="text-muted-foreground">CO₂ evitado</p>
          </div>
        </div>
      </div>
    </div>
  );
}
