import type { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: ReactNode;
  className?: string;
};

export function FeatureCard({ icon, title, description, className = "" }: FeatureCardProps) {
  return (
    <div
      data-reveal
      className={`group relative flex w-[287px] flex-col items-center gap-3 rounded-[40px] border border-white/40 bg-white/25 px-6 py-8 text-center shadow-[0_10px_30px_-14px_rgba(23,20,26,0.25)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-16px_rgba(185,34,41,0.35)] ${className}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        {icon}
      </div>
      <h3 className="font-display text-xl font-bold text-brand-ink">{title}</h3>
      <p className="text-[15px] leading-relaxed text-brand-ink/75">{description}</p>
    </div>
  );
}
