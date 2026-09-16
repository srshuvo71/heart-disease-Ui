import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold " +
  "transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-brand-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-[52px] px-9 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-primary text-white shadow-[0_8px_24px_-8px_rgba(185,34,41,0.65)] " +
    "hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-10px_rgba(185,34,41,0.75)] hover:bg-brand-primary-dark",
  secondary:
    "bg-white text-brand-ink shadow-[0_6px_18px_-8px_rgba(23,20,26,0.35)] " +
    "hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-10px_rgba(23,20,26,0.4)]",
  ghost:
    "border border-brand-primary/30 text-brand-primary bg-transparent " +
    "hover:border-brand-primary hover:bg-brand-primary/10",
};

function Sheen() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
    />
  );
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string; href?: undefined };

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { to?: undefined; href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...rest }, ref) => {
    const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

    if ("to" in rest && rest.to) {
      const { to, ...anchorRest } = rest;
      return (
        <Link ref={ref as never} to={to} className={cls} {...anchorRest}>
          <Sheen />
          <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        </Link>
      );
    }

    if ("href" in rest && rest.href) {
      return (
        <a ref={ref as never} className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          <Sheen />
          <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        </a>
      );
    }

    return (
      <button ref={ref as never} className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
        <Sheen />
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </button>
    );
  },
);

Button.displayName = "Button";
