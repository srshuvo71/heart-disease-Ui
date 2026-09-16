import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";
import { FeatureCard } from "../components/FeatureCard";
import { ActivityIcon, AppleIcon, StethoscopeIcon } from "../components/icons";
import heartImg from "../assets/images/heart-hero.png";
import bgTexture from "../assets/images/bg-texture.png";

const cards = [
  {
    key: "stay-active",
    icon: <ActivityIcon />,
    title: "Stay Active",
    description: (
      <>30 minutes of exercise daily to strengthen your HEART</>
    ),
    desktop: "lg:absolute lg:left-[678px] lg:top-[279px] lg:w-[296px]",
  },
  {
    key: "check-regularly",
    icon: <StethoscopeIcon />,
    title: "Check Regularly",
    description: (
      <>
        Routine checkups prevent <span className="font-medium text-brand-ink">HEART DISEASE</span>
      </>
    ),
    desktop: "lg:absolute lg:left-[1103px] lg:top-[496px] lg:w-[320px]",
  },
  {
    key: "eat-smart",
    icon: <AppleIcon />,
    title: "Eat Smart",
    description: (
      <>
        A balanced <span className="font-medium text-brand-ink">DIET</span> is the key to your HEART health
      </>
    ),
    desktop: "lg:absolute lg:left-[589px] lg:top-[643px] lg:w-[301px]",
  },
];

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const heartWrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-line]",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
      )
        .fromTo(
          "[data-hero-cta]",
          { y: 20, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.7)" },
          "-=0.35",
        )
        .fromTo(
          "[data-hero-heart]",
          { opacity: 0, scale: 0.85, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9 },
          "-=0.55",
        )
        .fromTo(
          "[data-reveal]",
          { opacity: 0, y: 24, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.15 },
          "-=0.5",
        );

      if (!reduce) {
        gsap.to("[data-hero-heart]", {
          y: -16,
          duration: 3.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.4,
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const el = heartWrapRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduce || window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateY: px * 10,
        rotateX: -py * 10,
        duration: 0.6,
        ease: "power2.out",
      });
    };
    const onLeave = () => gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "power3.out" });

    const parent = el.parentElement;
    parent?.addEventListener("mousemove", onMove);
    parent?.addEventListener("mouseleave", onLeave);
    return () => {
      parent?.removeEventListener("mousemove", onMove);
      parent?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={root} className="min-h-screen overflow-x-clip bg-brand-bg">
      <Navbar />

      <main className="relative">
        <img
          src={bgTexture}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] w-full object-cover opacity-25"
        />

        <section className="relative mx-auto max-w-[1440px] px-6 pb-20 pt-10 sm:px-10 lg:h-[980px] lg:px-0 lg:pt-0">
          {/* Heart image + floating cards (desktop) */}
          <div
            data-hero-heart
            className="relative mx-auto mt-4 aspect-square w-full max-w-[420px] sm:max-w-[480px] lg:absolute lg:left-[706px] lg:top-[294px] lg:mt-0 lg:h-[633px] lg:w-[600px] lg:max-w-none"
            style={{ perspective: "1200px" }}
          >
            <div
              aria-hidden
              className="animate-pulse-glow absolute inset-[6%] rounded-full bg-brand-primary/30 blur-3xl"
            />
            <div ref={heartWrapRef} className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
              <img
                src={heartImg}
                alt="Realistic 3D render of a human heart, symbolizing the AI heart-health analysis"
                className="relative z-10 h-full w-full object-contain drop-shadow-[0_30px_40px_rgba(185,34,41,0.25)]"
              />
            </div>
          </div>

          {/* Headline + CTA */}
          <div className="relative mt-10 flex flex-col items-center text-center lg:absolute lg:left-[65px] lg:top-[382px] lg:mt-0 lg:w-[535px] lg:items-start lg:text-left">
            <h1 className="font-display text-[38px] font-bold leading-[1.1] text-brand-ink sm:text-[46px] lg:text-[61px]">
              <span data-hero-line className="block">
                Welcome To Our,
              </span>
              <span data-hero-line className="block">
                AI - Powered
              </span>
              <span data-hero-line className="block">
                <span className="text-brand-accent">Heart Disease</span> Risk
              </span>
              <span data-hero-line className="block">
                Prediction
              </span>
            </h1>
            <div data-hero-cta className="mt-8 lg:mt-10">
              <Button to="/register" size="lg" className="animate-heartbeat">
                Try Our AI
              </Button>
            </div>
          </div>

          {/* Feature cards */}
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-0 lg:contents">
            {cards.map((c) => (
              <FeatureCard
                key={c.key}
                icon={c.icon}
                title={c.title}
                description={c.description}
                className={`mx-auto sm:col-span-1 last:sm:col-span-2 last:sm:mx-auto ${c.desktop} lg:mx-0`}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
