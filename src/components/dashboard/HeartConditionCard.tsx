import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { RISK_META, type RiskLevel } from "../../lib/risk";
import goodHeartImg from "../../assets/images/dashboard/good-heart-condition.png";
import badHeartImg from "../../assets/images/dashboard/bad-heart-condition.png";

type HeartConditionCardProps = {
  level: RiskLevel;
};

export function HeartConditionCard({ level }: HeartConditionCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const meta = RISK_META[level];
  const isGood = level === "low";
  const image = isGood ? goodHeartImg : badHeartImg;
  const caption =
    level === "high"
      ? "Signs of elevated risk detected"
      : level === "moderate"
        ? "Some areas to monitor"
        : "Your heart looks healthy";

  // Tilt + entrance live on the frame (GSAP-driven transform); the condition
  // beat/glow lives on the <img> inside it (CSS animation) so the two never
  // fight over the same element's transform.
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const frame = frameRef.current;
    if (!wrap || !frame) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame,
        { opacity: 0, scale: 0.82, rotateY: -24, rotateX: 8 },
        { opacity: 1, scale: 1, rotateY: 0, rotateX: 0, duration: 1, ease: "power3.out", delay: 0.2 },
      );
    });

    if (reduce || coarse) return () => ctx.revert();

    const setRotateX = gsap.quickTo(frame, "rotateX", { duration: 0.5, ease: "power3.out" });
    const setRotateY = gsap.quickTo(frame, "rotateY", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setRotateY(px * 18);
      setRotateX(-py * 18);
    };
    const onLeave = () => {
      setRotateX(0);
      setRotateY(0);
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      ctx.revert();
    };
  }, [level]);

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[28px] border border-white/40 bg-white/25 p-7 text-center shadow-[0_10px_30px_-18px_rgba(23,20,26,0.25)] backdrop-blur-md">
      <div aria-hidden className={`animate-pulse-glow absolute inset-[10%] rounded-full blur-3xl ${meta.glow}`} />

      <div ref={wrapRef} className="animate-float-y relative" style={{ perspective: "900px" }}>
        <div ref={frameRef} className="relative h-[190px] w-[190px]" style={{ transformStyle: "preserve-3d" }}>
          <img
            src={image}
            alt={isGood ? "Illustration of a healthy heart in bloom" : "Illustration of a heart showing signs of decline"}
            className={`h-full w-full object-contain drop-shadow-[0_18px_26px_rgba(23,20,26,0.28)] ${
              isGood ? "animate-heartbeat-strong animate-bloom-glow" : "animate-heartbeat-weak animate-wither-glow"
            }`}
          />
        </div>
      </div>

      <p className="relative z-10 mt-5 font-display text-base font-bold text-brand-ink">{caption}</p>
      <p className="relative z-10 text-[13px] text-brand-ink/60">Based on your latest assessment</p>
    </div>
  );
}
