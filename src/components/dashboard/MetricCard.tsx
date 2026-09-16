import type { ReactNode } from "react";
import type { MetricStatus } from "../../lib/risk";

const STATUS_STYLES: Record<MetricStatus, { dot: string; text: string; label: string }> = {
  normal: { dot: "bg-emerald-500", text: "text-emerald-600", label: "Normal" },
  watch: { dot: "bg-amber-500", text: "text-amber-600", label: "Watch" },
  high: { dot: "bg-brand-primary", text: "text-brand-primary", label: "High" },
};

type MetricCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  unit?: string;
  status: MetricStatus;
};

export function MetricCard({ icon, label, value, unit, status }: MetricCardProps) {
  const s = STATUS_STYLES[status];

  return (
    <div className="group flex items-center gap-4 rounded-[22px] border border-white/40 bg-white/25 px-5 py-4 shadow-[0_10px_30px_-18px_rgba(23,20,26,0.25)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_-16px_rgba(23,20,26,0.3)]">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] text-brand-ink/60">{label}</p>
        <p className="font-display text-lg font-bold text-brand-ink">
          {value}
          {unit && <span className="ml-1 text-sm font-medium text-brand-ink/50">{unit}</span>}
        </p>
      </div>
      <span className={`flex shrink-0 items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold ${s.text}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
        {s.label}
      </span>
    </div>
  );
}
