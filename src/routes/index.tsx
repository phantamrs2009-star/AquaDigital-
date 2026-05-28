import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Droplets,
  Gauge,
  Recycle,
  ShieldCheck,
  Wifi,
  Bell,
  Sparkles,
  Sprout,
  ArrowUpCircle,
  CheckCircle2,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { WaterTank } from "@/components/aqua/WaterTank";
import { StatCard } from "@/components/aqua/StatCard";
import { SensorPanel, type Sensor } from "@/components/aqua/SensorPanel";
import { ControlPanel } from "@/components/aqua/ControlPanel";
import { WasteAvoidedChart, WeeklyReuseChart, MonthlyEconomyChart } from "@/components/aqua/Charts";
import { SolarEnergy } from "@/components/aqua/SolarEnergy";
import { SchoolMonitor } from "@/components/aqua/SchoolMonitor";
import { EnvironmentalImpact } from "@/components/aqua/EnvironmentalImpact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aqua Digital — Reutilização inteligente de água em escolas do Piauí" },
      {
        name: "description",
        content:
          "Plataforma IoT que monitora, filtra e reutiliza água de torneiras, bebedouros, chuveiros e ar-condicionados em escolas públicas do Piauí.",
      },
      { property: "og:title", content: "Aqua Digital — Água inteligente nas escolas" },
      { property: "og:description", content: "Dashboard inteligente de reutilização de água em escolas públicas do Piauí." },
    ],
  }),
  component: Index,
});

const CAPACITY = 800; // litros

function Index() {
  const [current, setCurrent] = useState(420);
  const [filtration, setFiltration] = useState(true);
  const [pump, setPump] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [saved, setSaved] = useState(14820);
  const [inflow, setInflow] = useState(2.4); // L/min
  const fullToastRef = useRef(false);
  const readyToastRef = useRef(false);

  const FULL_THRESHOLD = 95; // % considerado cheio
  const MIN_IRRIGATION = 25; // % mínimo para irrigar

  const levelPct = (current / CAPACITY) * 100;
  // Irrigação só acontece se a bomba está ligada E há água suficiente
  const irrigating = pump && levelPct > MIN_IRRIGATION;
  const filling = filtration && levelPct < 100;
  const isFull = levelPct >= FULL_THRESHOLD;

  // Simulação em tempo real
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => {
        const pct = (prev / CAPACITY) * 100;
        // Entrada: somente quando a filtração está ativa (água tratada → reservatório)
        const inRate = filtration ? inflow * 0.6 : 0;
        // Saída: somente quando a bomba está ligada E há água suficiente
        const irrigatingNow = pump && pct > MIN_IRRIGATION;
        const outRate = irrigatingNow ? 1.2 + Math.random() * 0.8 : 0;
        let next = prev + inRate - outRate;
        next = Math.max(0, Math.min(CAPACITY, next));
        return next;
      });
      setSaved((s) => s + (filtration ? Math.random() * 0.8 : 0) + (pump ? Math.random() * 0.4 : 0));
      setInflow(1.8 + Math.random() * 1.4);
    }, 1200);
    return () => clearInterval(id);
  }, [filtration, pump, inflow]);

  // Modo automático: gerencia filtração e bomba conforme nível
  useEffect(() => {
    const pct = (current / CAPACITY) * 100;
    if (autoMode) {
      // Nível baixo → ativa filtração (sem ligar bomba ainda)
      if (pct < 30 && !filtration) {
        setFiltration(true);
        toast.success("Modo Auto: filtração ativada — enchendo reservatório", {
          icon: <Sparkles className="h-4 w-4" />,
        });
      }
      // Reservatório cheio → ativa bomba para irrigação
      if (pct >= FULL_THRESHOLD && !pump) {
        setPump(true);
        toast.success("Modo Auto: reservatório cheio — irrigação iniciada", {
          icon: <Sprout className="h-4 w-4" />,
        });
      }
      // Nível baixo demais → desliga bomba para preservar água
      if (pct <= MIN_IRRIGATION && pump) {
        setPump(false);
        toast.warning("Modo Auto: bomba pausada — água insuficiente para irrigar");
      }
    }
    if (pct >= 99 && !fullToastRef.current) {
      fullToastRef.current = true;
      toast("Reservatório cheio — pronto para irrigação!", { icon: <Bell className="h-4 w-4" /> });
    } else if (pct < 90) {
      fullToastRef.current = false;
    }
    if (pct >= FULL_THRESHOLD && !readyToastRef.current) {
      readyToastRef.current = true;
    } else if (pct < FULL_THRESHOLD - 10) {
      readyToastRef.current = false;
    }
  }, [current, autoMode, filtration, pump]);

  const level = levelPct;

  const sensors: Sensor[] = useMemo(() => {
    const wasteStatus = inflow > 2.6 ? "warn" : "ok";
    const leak = Math.random() > 0.92 ? "warn" : "ok";
    const lvlStatus = level < 20 ? "alert" : level > 95 ? "warn" : "ok";
    return [
      { id: "w", name: "Desperdício", value: `${inflow.toFixed(1)} L/min`, status: wasteStatus, icon: "waste" },
      { id: "l", name: "Vazamento", value: leak === "ok" ? "Nenhum" : "Detectado", status: leak as "ok" | "warn", icon: "leak" },
      { id: "n", name: "Nível", value: `${level.toFixed(0)}%`, status: lvlStatus, icon: "level" },
      { id: "f", name: "Fluxo entrada", value: `${(inflow * 0.6).toFixed(1)} L/min`, status: filtration ? "ok" : "warn", icon: "flow" },
    ];
  }, [inflow, level, filtration]);

  const wasteData = useMemo(
    () => [
      { day: "Seg", liters: 180 }, { day: "Ter", liters: 220 }, { day: "Qua", liters: 260 },
      { day: "Qui", liters: 240 }, { day: "Sex", liters: 310 }, { day: "Sáb", liters: 150 }, { day: "Dom", liters: 90 },
    ],
    [],
  );
  const reuseData = useMemo(
    () => [
      { day: "Seg", reused: 120 }, { day: "Ter", reused: 165 }, { day: "Qua", reused: 200 },
      { day: "Qui", reused: 185 }, { day: "Sex", reused: 240 }, { day: "Sáb", reused: 95 }, { day: "Dom", reused: 60 },
    ],
    [],
  );
  const monthData = useMemo(
    () => [
      { month: "Jan", economy: 2400 }, { month: "Fev", economy: 2800 }, { month: "Mar", economy: 3300 },
      { month: "Abr", economy: 3100 }, { month: "Mai", economy: 3800 }, { month: "Jun", economy: 4200 },
    ],
    [],
  );

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" richColors closeButton />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <Droplets className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Aqua Digital</h1>
              <p className="text-[11px] text-muted-foreground">Reutilização inteligente · Piauí</p>
            </div>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
              <Wifi className="h-3 w-3" /> Sistema online
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Hero stats */}
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-1 w-8 rounded-full bg-gradient-primary" />
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Dashboard em tempo real</p>
          </div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Cada gota conta para a <span className="text-gradient-primary">próxima geração</span>
          </h2>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Droplets}
            label="Água armazenada"
            value={`${Math.round(current)} L`}
            hint={`de ${CAPACITY} L de capacidade`}
            trend="Em tempo real"
            variant="aqua"
          />
          <StatCard
            icon={Recycle}
            label="Litros economizados"
            value={`${Math.round(saved).toLocaleString("pt-BR")}`}
            hint="Acumulado total"
            trend="+12% vs. mês anterior"
            variant="eco"
          />
          <StatCard
            icon={Gauge}
            label="Nível da caixa"
            value={`${level.toFixed(0)}%`}
            hint={level < 30 ? "Baixo — auto reabastecendo" : level > 95 ? "Cheia" : "Operação normal"}
            variant={level < 30 ? "warning" : "primary"}
          />
          <StatCard
            icon={ShieldCheck}
            label="Status do sistema"
            value={filtration && pump ? "Ativo" : "Parcial"}
            hint={autoMode ? "Modo automático IA" : "Modo manual"}
            trend="Tudo operacional"
            variant="primary"
          />
        </section>

        {/* Tank + Controls + Sensors */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <WaterTank level={level} capacity={CAPACITY} current={current} />
          </div>
          <div className="lg:col-span-4">
            <ControlPanel
              filtration={filtration}
              pump={pump}
              autoMode={autoMode}
              onToggleFiltration={() => {
                setFiltration((v) => !v);
                toast(filtration ? "Filtração desligada" : "Filtração ligada");
              }}
              onTogglePump={() => {
                setPump((v) => !v);
                toast(pump ? "Bomba desligada" : "Bomba ativada");
              }}
              onToggleAuto={() => {
                setAutoMode((v) => !v);
                toast(autoMode ? "Modo automático desativado" : "Modo automático ativado");
              }}
            />
          </div>
          <div className="lg:col-span-4">
            <SensorPanel sensors={sensors} />
          </div>
        </section>

        {/* Simulação visual */}
        <section className="rounded-2xl border bg-card p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Simulação em tempo real</h3>
              <p className="text-xs text-muted-foreground">
                Captação → Filtração → Reservatório → Irrigação
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              Live
            </span>
          </div>

          {/* Indicadores de status */}
          <div className="mb-5 flex flex-wrap gap-2">
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                filling
                  ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <ArrowUpCircle className={`h-3.5 w-3.5 ${filling ? "animate-bounce" : ""}`} />
              Reservatório enchendo
            </span>
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                isFull
                  ? "bg-success/15 text-success ring-1 ring-success/30"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Reservatório cheio
            </span>
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                irrigating
                  ? "bg-success/15 text-success ring-1 ring-success/30"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <Sprout className={`h-3.5 w-3.5 ${irrigating ? "animate-pulse" : ""}`} />
              Irrigação ativa
            </span>
            <span className="ml-auto flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-semibold ring-1 ring-border">
              <Gauge className="h-3.5 w-3.5 text-primary" />
              Nível: <span className="text-gradient-primary">{level.toFixed(0)}%</span>
            </span>
          </div>

          <div className="grid grid-cols-2 items-center gap-4 md:grid-cols-4">
            {/* Entrada */}
            <div className="relative flex flex-col items-center rounded-xl bg-muted/30 p-5">
              <span className="text-xs font-semibold uppercase text-muted-foreground">Captação</span>
              <div className="relative my-3 h-20 w-12">
                <div className="absolute inset-x-0 top-0 mx-auto h-6 w-6 rounded-md bg-gradient-aqua" />
                {filtration && [0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="absolute left-1/2 top-6 h-2 w-1.5 -translate-x-1/2 animate-drop rounded-full bg-primary/70"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  />
                ))}
              </div>
              <p className="text-sm font-bold">{inflow.toFixed(1)} L/min</p>
            </div>

            {/* Filtro */}
            <div className="relative flex flex-col items-center rounded-xl bg-muted/30 p-5">
              <span className="text-xs font-semibold uppercase text-muted-foreground">Filtração</span>
              <div className={`my-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary ${filtration ? "shadow-glow" : "opacity-40"}`}>
                <Recycle className={`h-7 w-7 text-white ${filtration ? "animate-spin-slow" : ""}`} />
              </div>
              <p className="text-sm font-bold">{filtration ? "Filtrando" : "Pausada"}</p>
            </div>

            {/* Saída p/ caixa */}
            <div className="relative flex flex-col items-center rounded-xl bg-muted/30 p-5">
              <span className="text-xs font-semibold uppercase text-muted-foreground">Reservatório</span>
              <div className="relative my-3 h-20 w-14 overflow-hidden rounded-b-xl rounded-t-md border-2 border-primary/40 bg-sky-50">
                <div
                  className="absolute inset-x-0 bottom-0 bg-gradient-aqua transition-[height] duration-1000"
                  style={{ height: `${level}%` }}
                />
                {isFull && (
                  <span className="absolute inset-x-0 top-1 mx-auto h-1.5 w-1.5 animate-pulse rounded-full bg-success ring-2 ring-success/40" />
                )}
              </div>
              <p className="text-sm font-bold">{Math.round(current)} L</p>
              <p className={`text-[10px] font-semibold uppercase ${isFull ? "text-success" : "text-muted-foreground"}`}>
                {isFull ? "Cheio" : filling ? "Enchendo" : "Estável"}
              </p>
            </div>

            {/* Irrigação / Hortas */}
            <div className="relative flex flex-col items-center rounded-xl bg-muted/30 p-5">
              <span className="text-xs font-semibold uppercase text-muted-foreground">Irrigação</span>
              <div className={`my-3 flex h-16 w-16 items-center justify-center rounded-full transition-all ${
                irrigating ? "bg-gradient-to-br from-success to-success/70 shadow-glow" : "bg-muted opacity-50"
              }`}>
                <Sprout className={`h-7 w-7 ${irrigating ? "text-white animate-pulse" : "text-muted-foreground"}`} />
              </div>
              <p className="text-sm font-bold">
                {irrigating ? "Hortas regando" : pump ? "Aguardando água" : "Parada"}
              </p>
            </div>
          </div>

          {!isFull && pump && levelPct <= MIN_IRRIGATION && (
            <p className="mt-4 rounded-lg bg-warning/10 px-3 py-2 text-xs font-medium text-warning">
              Aguardando reservatório atingir nível mínimo para iniciar irrigação das hortas.
            </p>
          )}
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <WasteAvoidedChart data={wasteData} />
          <WeeklyReuseChart data={reuseData} />
          <MonthlyEconomyChart data={monthData} />
        </section>

        {/* Solar + School */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SolarEnergy percent={87} />
          <SchoolMonitor />
        </section>

        {/* Impact */}
        <EnvironmentalImpact saved={Math.round(saved)} reduction={68} monthlySavings={1840} />

        <footer className="pb-4 pt-2 text-center text-xs text-muted-foreground">
          Aqua Digital · Feira de Inovação · Piauí 2026
        </footer>
      </main>
    </div>
  );
}
