import { Filter, Power, Cpu, Zap } from "lucide-react";

interface Props {
  filtration: boolean;
  pump: boolean;
  autoMode: boolean;
  onToggleFiltration: () => void;
  onTogglePump: () => void;
  onToggleAuto: () => void;
}

function ToggleButton({
  active,
  onClick,
  icon: Icon,
  label,
  description,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Filter;
  label: string;
  description: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 ${
        active
          ? "border-primary/50 bg-gradient-primary text-primary-foreground shadow-glow"
          : "bg-card hover:border-primary/30"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${active ? "bg-white/20" : "bg-primary/10 text-primary"}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">{label}</p>
            <p className={`text-xs ${active ? "text-white/80" : "text-muted-foreground"}`}>{description}</p>
          </div>
        </div>
        <div
          className={`relative h-6 w-11 rounded-full transition-colors ${
            active ? "bg-white/30" : "bg-muted"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
              active ? "left-[22px]" : "left-0.5"
            }`}
          />
        </div>
      </div>
    </button>
  );
}

export function ControlPanel({ filtration, pump, autoMode, onToggleFiltration, onTogglePump, onToggleAuto }: Props) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Controle Inteligente</h3>
          <p className="text-xs text-muted-foreground">Acione os sistemas manualmente ou em modo auto</p>
        </div>
        <Zap className="h-5 w-5 text-warning" />
      </div>
      <div className="space-y-3">
        <ToggleButton
          active={filtration}
          onClick={onToggleFiltration}
          icon={Filter}
          label="Filtração"
          description={filtration ? "Filtrando água em tempo real" : "Desligada"}
        />
        <ToggleButton
          active={pump}
          onClick={onTogglePump}
          icon={Power}
          label="Bomba d'água"
          description={pump ? "Bombeando para reservatório" : "Em standby"}
        />
        <ToggleButton
          active={autoMode}
          onClick={onToggleAuto}
          icon={Cpu}
          label="Modo Automático IA"
          description={autoMode ? "Sistema decidindo sozinho" : "Controle manual"}
        />
      </div>
    </div>
  );
}
