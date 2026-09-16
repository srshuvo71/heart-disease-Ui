import { RISK_META, type HistoryEntry } from "../../lib/risk";
import { CalendarIcon } from "../icons";

type HistoryListProps = {
  entries: HistoryEntry[];
};

export function HistoryList({ entries }: HistoryListProps) {
  return (
    <div className="rounded-[28px] border border-white/40 bg-white/25 p-6 shadow-[0_10px_30px_-18px_rgba(23,20,26,0.25)] backdrop-blur-md">
      <h3 className="font-display text-lg font-bold text-brand-ink">Assessment History</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {entries.map((e) => {
          const meta = RISK_META[e.level];
          return (
            <li key={e.date} className="flex items-center justify-between rounded-2xl bg-white/40 px-4 py-3">
              <div className="flex items-center gap-2.5 text-brand-ink/70">
                <CalendarIcon />
                <span className="text-[13px] font-medium text-brand-ink/80">{e.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-brand-ink">{e.score}/100</span>
                <span className={`flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold ${meta.text}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${meta.bg}`} />
                  {meta.label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
