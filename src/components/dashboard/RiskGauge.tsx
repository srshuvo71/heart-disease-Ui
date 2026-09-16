import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { RISK_META, type RiskLevel } from "../../lib/risk";

type RiskGaugeProps = {
  score: number;
  level: RiskLevel;
};

export function RiskGauge({ score, level }: RiskGaugeProps) {
  const radius = 74;
  const circumference = 2 * Math.PI * radius;
  const ring = RISK_META[level].ring;
  const proxy = useRef({ value: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(score);
      return;
    }
    const tween = gsap.to(proxy.current, {
      value: score,
      duration: 1.1,
      ease: "power3.out",
      delay: 0.25,
      onUpdate: () => setDisplay(Math.round(proxy.current.value)),
    });
    return () => {
      tween.kill();
    };
  }, [score]);

  const offset = circumference * (1 - Math.min(Math.max(display, 0), 100) / 100);

  return (
    <div className="relative flex h-[190px] w-[190px] shrink-0 items-center justify-center">
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
        <circle cx="90" cy="90" r={radius} fill="none" stroke="currentColor" className="text-brand-ink/10" strokeWidth="14" />
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke={ring}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-4xl font-bold text-brand-ink">{display}</span>
        <span className="text-[11px] font-medium uppercase tracking-wide text-brand-ink/50">/ 100</span>
      </div>
    </div>
  );
}
