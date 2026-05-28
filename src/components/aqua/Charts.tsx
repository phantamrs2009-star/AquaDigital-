import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const tooltipStyle = {
  backgroundColor: "oklch(1 0 0)",
  border: "1px solid oklch(0.9 0.02 220)",
  borderRadius: 12,
  fontSize: 12,
};

export function WasteAvoidedChart({ data }: { data: { day: string; liters: number }[] }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-soft">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Desperdício Evitado</h3>
        <p className="text-xs text-muted-foreground">Litros poupados nos últimos 7 dias</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.58 0.17 235)" stopOpacity={0.5} />
              <stop offset="100%" stopColor="oklch(0.58 0.17 235)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 220)" />
          <XAxis dataKey="day" stroke="oklch(0.5 0.03 230)" fontSize={11} />
          <YAxis stroke="oklch(0.5 0.03 230)" fontSize={11} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area type="monotone" dataKey="liters" stroke="oklch(0.58 0.17 235)" strokeWidth={2.5} fill="url(#g1)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function WeeklyReuseChart({ data }: { data: { day: string; reused: number }[] }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-soft">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Reaproveitamento Semanal</h3>
        <p className="text-xs text-muted-foreground">Volume reutilizado por dia</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 220)" />
          <XAxis dataKey="day" stroke="oklch(0.5 0.03 230)" fontSize={11} />
          <YAxis stroke="oklch(0.5 0.03 230)" fontSize={11} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="reused" fill="oklch(0.65 0.17 155)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MonthlyEconomyChart({ data }: { data: { month: string; economy: number }[] }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-soft">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Economia Mensal</h3>
        <p className="text-xs text-muted-foreground">Evolução da economia (litros)</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 220)" />
          <XAxis dataKey="month" stroke="oklch(0.5 0.03 230)" fontSize={11} />
          <YAxis stroke="oklch(0.5 0.03 230)" fontSize={11} />
          <Tooltip contentStyle={tooltipStyle} />
          <Line type="monotone" dataKey="economy" stroke="oklch(0.72 0.16 215)" strokeWidth={3} dot={{ r: 4, fill: "oklch(0.72 0.16 215)" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
