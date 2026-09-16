import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Button } from "./Button";
import { Logo } from "./Logo";

const links = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Services", href: "#services" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    const items = navRef.current.querySelectorAll("[data-nav-item]");
    gsap.fromTo(
      items,
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.1 },
    );
  }, []);

  useEffect(() => {
    if (!mobileRef.current) return;
    if (open) {
      gsap.set(mobileRef.current, { display: "flex", height: "auto" });
      const h = mobileRef.current.offsetHeight;
      gsap.fromTo(
        mobileRef.current,
        { height: 0, opacity: 0 },
        { height: h, opacity: 1, duration: 0.35, ease: "power2.out" },
      );
      gsap.fromTo(
        mobileRef.current.querySelectorAll("[data-mobile-item]"),
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.06, delay: 0.05, ease: "power2.out" },
      );
    } else if (mobileRef.current.style.display === "flex") {
      gsap.to(mobileRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => mobileRef.current && gsap.set(mobileRef.current, { display: "none" }),
      });
    }
  }, [open]);

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(23,20,26,0.25)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1366px] items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" data-nav-item className="flex shrink-0 items-center transition-transform duration-300 hover:scale-105">
          <Logo className="h-10 w-[97px] md:h-11 md:w-[107px]" />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-nav-item
              className="group relative text-[15px] font-medium text-brand-ink/80 transition-colors duration-200 hover:text-brand-ink"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-brand-primary transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex" data-nav-item>
          <Button to="/login" size="md">
            Login
          </Button>
          <Button to="/register" variant="ghost" size="md">
            Register
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          data-nav-item
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full transition-colors hover:bg-brand-ink/5 md:hidden"
        >
          <span
            className={`h-[2px] w-5 rounded-full bg-brand-ink transition-all duration-300 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-5 rounded-full bg-brand-ink transition-all duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-[2px] w-5 rounded-full bg-brand-ink transition-all duration-300 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        ref={mobileRef}
        style={{ display: "none", height: 0, opacity: 0 }}
        className="flex flex-col gap-1 overflow-hidden border-t border-brand-ink/10 bg-white/90 px-6 pb-4 backdrop-blur-xl md:hidden"
      >
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            data-mobile-item
            onClick={() => setOpen(false)}
            className="rounded-lg px-2 py-3 text-[15px] font-medium text-brand-ink/85 transition-colors hover:bg-brand-primary/5 hover:text-brand-primary"
          >
            {l.label}
          </a>
        ))}
        <div data-mobile-item className="mt-2 flex gap-3 pb-1">
          <Button to="/login" size="md" className="flex-1" onClick={() => setOpen(false)}>
            Login
          </Button>
          <Button to="/register" variant="ghost" size="md" className="flex-1" onClick={() => setOpen(false)}>
            Register
          </Button>
        </div>
      </div>
    </header>
  );
}
