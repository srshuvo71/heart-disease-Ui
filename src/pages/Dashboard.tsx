import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { RiskGauge } from "../components/dashboard/RiskGauge";
import { HeartConditionCard } from "../components/dashboard/HeartConditionCard";
import { MetricCard } from "../components/dashboard/MetricCard";
import { HistoryList } from "../components/dashboard/HistoryList";
import { Button } from "../components/Button";
import { RISK_META, MOCK_ASSESSMENT } from "../lib/risk";
import { CheckCircleIcon, DropletIcon, PulseIcon, ScaleIcon, SugarIcon } from "../components/icons";
import bgTexture from "../assets/images/bg-texture.png";

const METRIC_ICONS: Record<string, ReactNode> = {
  bp: <DropletIcon />,
  chol: <DropletIcon />,
  hr: <PulseIcon />,
  bmi: <ScaleIcon />,
  sugar: <SugarIcon />,
  maxhr: <PulseIcon />,
};

export default function Dashboard() {
  const root = useRef<HTMLDivElement>(null);
  const { userName, date, score, level, metrics, history, recommendations } = MOCK_ASSESSMENT;
  const meta = RISK_META[level];

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power3.out", delay: 0.1 },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-screen overflow-x-clip bg-brand-bg">
      <DashboardHeader userName={userName} />

      <main className="relative">
        <img
          src={bgTexture}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] w-full object-cover opacity-25"
        />

        <div className="mx-auto max-w-[1200px] px-6 py-10 sm:px-8">
          <div data-reveal className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-brand-ink sm:text-3xl">Welcome back, {userName}</h1>
              <p className="mt-1 text-[15px] text-brand-ink/65">Here&rsquo;s the latest overview of your heart health.</p>
            </div>
            <Button to="/" size="md" className="mt-4 sm:mt-0">
              New Assessment
            </Button>
          </div>

          <div data-reveal className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1fr]">
            <div className="flex flex-col items-center gap-5 rounded-[28px] border border-white/40 bg-white/25 p-7 text-center shadow-[0_10px_30px_-18px_rgba(23,20,26,0.25)] backdrop-blur-md sm:flex-row sm:text-left">
              <RiskGauge score={score} level={level} />
              <div>
                <span className={`inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-[12px] font-semibold ${meta.text}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${meta.bg}`} />
                  {meta.label}
                </span>
                <p className="mt-2 font-display text-lg font-bold text-brand-ink">Overall Heart Risk Score</p>
                <p className="mt-1 text-[14px] leading-relaxed text-brand-ink/65">{meta.message}</p>
                <p className="mt-3 text-[12px] text-brand-ink/45">Last assessed on {date}</p>
              </div>
            </div>

            <HeartConditionCard level={level} />
          </div>

          <div data-reveal className="mt-10">
            <h2 className="font-display text-xl font-bold text-brand-ink">Your Health Metrics</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {metrics.map((m) => (
                <MetricCard key={m.key} icon={METRIC_ICONS[m.key]} label={m.label} value={m.value} unit={m.unit} status={m.status} />
              ))}
            </div>
          </div>

          <div data-reveal className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1fr]">
            <div className="rounded-[28px] border border-white/40 bg-white/25 p-6 shadow-[0_10px_30px_-18px_rgba(23,20,26,0.25)] backdrop-blur-md">
              <h3 className="font-display text-lg font-bold text-brand-ink">Recommendations For You</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {recommendations.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-[14px] text-brand-ink/75">
                    <span className="mt-0.5 shrink-0 text-emerald-500">
                      <CheckCircleIcon />
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <HistoryList entries={history} />
          </div>
        </div>
      </main>
    </div>
  );
}
