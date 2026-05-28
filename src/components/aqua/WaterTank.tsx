import { Droplets } from "lucide-react";

interface Props {
  level: number; // 0-100
  capacity: number;
  current: number;
}

export function WaterTank({ level, capacity, current }: Props) {
  const clamped = Math.max(0, Math.min(100, level));
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 rounded-2xl border bg-card p-6 shadow-soft">
      <div className="flex w-full items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Caixa d'água</p>
          <h3 className="text-lg font-semibold">Reservatório Escolar</h3>
        </div>
        <Droplets className="h-6 w-6 text-primary" />
      </div>

      <div className="relative h-64 w-40 overflow-hidden rounded-b-3xl rounded-t-lg border-4 border-primary/40 bg-gradient-to-b from-sky-50 to-sky-100 shadow-inner">
        {/* water fill */}
        <div
          className="absolute inset-x-0 bottom-0 transition-[height] duration-1000 ease-out"
          style={{ height: `${clamped}%` }}
        >
          <div className="relative h-full w-full bg-gradient-aqua">
            {/* wave */}
            <div className="animate-wave absolute -top-2 left-1/2 h-4 w-[200%]">
              <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="h-full w-full">
                <path
                  d="M0,20 C150,40 350,0 600,20 C850,40 1050,0 1200,20 L1200,40 L0,40 Z"
                  fill="oklch(0.72 0.16 215)"
                  opacity="0.9"
                />
              </svg>
            </div>
            <div className="absolute inset-0 animate-shimmer opacity-50" />
            {/* bubbles */}
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute h-2 w-2 rounded-full bg-white/60"
                style={{
                  left: `${20 + i * 30}%`,
                  bottom: `${10 + i * 15}%`,
                  animation: `drop-fall ${2 + i * 0.5}s ease-in infinite`,
                  animationDelay: `${i * 0.4}s`,
                  transform: "rotate(180deg)",
                }}
              />
            ))}
          </div>
        </div>
        {/* level markings */}
        <div className="pointer-events-none absolute inset-y-0 right-1 flex flex-col justify-between py-2 text-[10px] font-medium text-primary/70">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>
      </div>

      <div className="w-full space-y-1 text-center">
        <p className="text-3xl font-bold text-gradient-primary">{Math.round(current)} L</p>
        <p className="text-xs text-muted-foreground">de {capacity} litros · {clamped.toFixed(0)}% cheio</p>
      </div>
    </div>
  );
}
