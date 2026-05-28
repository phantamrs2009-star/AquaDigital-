import { Droplets, TrendingDown, PiggyBank, School } from "lucide-react";

interface Props {
  saved: number;
  reduction: number;
  monthlySavings: number;
}

const items = [
  {
    icon: Droplets,
    label: "Litros economizados",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: TrendingDown,
    label: "Redução do desperdício",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: PiggyBank,
    label: "Economia mensal",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    icon: School,
    label: "Escolas beneficiadas",
    color: "text-primary-glow",
    bg: "bg-accent",
  },
];

export function EnvironmentalImpact({ saved, reduction, monthlySavings }: Props) {
  const values = [
    `${saved.toLocaleString("pt-BR")} L`,
    `${reduction.toFixed(0)}%`,
    `R$ ${monthlySavings.toLocaleString("pt-BR")}`,
    "12+",
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 text-white shadow-glow">
      <div className="absolute inset-0 opacity-20">
        <svg className="h-full w-full" viewBox="0 0 800 400" preserveAspectRatio="none">
          <path d="M0,200 C200,150 400,250 600,180 S800,200 800,200 L800,400 L0,400 Z" fill="white" opacity="0.15" />
          <path d="M0,250 C200,200 400,300 600,230 S800,250 800,250 L800,400 L0,400 Z" fill="white" opacity="0.1" />
        </svg>
      </div>

      <div className="relative">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
              Impacto Ambiental
            </span>
            <h2 className="mt-3 text-3xl font-bold">Transformando escolas públicas do Piauí</h2>
            <p className="mt-1 max-w-xl text-sm text-white/80">
              Cada gota reutilizada é um passo para uma educação mais sustentável e consciente.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((it, i) => (
            <div
              key={it.label}
              className="animate-fade-up rounded-2xl bg-white/10 p-5 backdrop-blur-md ring-1 ring-white/20"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20`}>
                <it.icon className="h-5 w-5 text-white" />
              </div>
              <p className="text-2xl font-bold tracking-tight">{values[i]}</p>
              <p className="mt-1 text-xs text-white/80">{it.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
