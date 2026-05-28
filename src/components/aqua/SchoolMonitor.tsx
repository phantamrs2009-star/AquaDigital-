import { MapPin, School, Users, Droplet, Recycle, Activity, Zap } from "lucide-react";

export function SchoolMonitor() {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-card shadow-soft transition-all hover:shadow-glow">
      <div className="relative h-52 bg-gradient-to-br from-primary/25 via-primary-glow/20 to-success/25">
        {/* simulated map */}
        <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 400 200" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="oklch(0.58 0.17 235)" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="400" height="200" fill="url(#grid)" />
          <path d="M0,120 Q100,80 200,100 T400,90" stroke="oklch(0.58 0.17 235)" strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M0,150 Q150,170 250,140 T400,160" stroke="oklch(0.65 0.17 155)" strokeWidth="2" fill="none" opacity="0.5" />
        </svg>
        {/* pin */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
              <School className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 rounded-lg bg-card/90 px-3 py-1.5 text-xs font-medium backdrop-blur">
          <MapPin className="mr-1 inline h-3 w-3 text-primary" />
          Simplício Mendes · PI
        </div>
        <div className="absolute right-3 top-3 rounded-lg bg-card/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
          IoT · 2026
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold leading-tight">CETI José Atanásio de Santana</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Rua Coronel Bertulino, s/n · Centro · Simplício Mendes, Piauí
            </p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            Online
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl border border-border/50 bg-muted/40 p-3 transition-colors hover:border-primary/40">
            <Users className="mx-auto mb-1 h-4 w-4 text-primary" />
            <p className="text-base font-bold">312</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Alunos</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-muted/40 p-3 transition-colors hover:border-primary/40">
            <Droplet className="mx-auto mb-1 h-4 w-4 text-primary-glow" />
            <p className="text-base font-bold">8</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Pontos d'água</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-muted/40 p-3 transition-colors hover:border-success/40">
            <School className="mx-auto mb-1 h-4 w-4 text-success" />
            <p className="text-base font-bold">2</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Reservatórios</p>
          </div>
        </div>

        <div className="mt-4 space-y-2 rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 to-success/5 p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <Recycle className="h-3.5 w-3.5 text-success" />
              Reutilização de água
            </span>
            <span className="rounded-full bg-success/15 px-2 py-0.5 font-semibold text-success">Ativa</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <Activity className="h-3.5 w-3.5 text-primary" />
              Reservatórios inteligentes
            </span>
            <span className="rounded-full bg-primary/15 px-2 py-0.5 font-semibold text-primary">Operando</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <Zap className="h-3.5 w-3.5 text-warning" />
              Energia solar integrada
            </span>
            <span className="rounded-full bg-warning/15 px-2 py-0.5 font-semibold text-warning">87%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
