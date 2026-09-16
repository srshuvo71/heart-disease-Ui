import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import bgTexture from "../assets/images/bg-texture.png";

type AuthShellProps = {
  title: string;
  children: ReactNode;
};

export function AuthShell({ title, children }: AuthShellProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-bg px-4 py-10 sm:px-6">
      <img
        src={bgTexture}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
      />

      <div className="relative mx-auto flex w-full max-w-[1366px] items-center justify-center rounded-[30px] border border-white/40 bg-white/20 py-16 backdrop-blur-[4.7px] sm:py-20">
        <div
          aria-hidden
          className="absolute inset-x-6 top-6 bottom-6 hidden rounded-[30px] bg-white/25 sm:block md:inset-x-[15%] lg:inset-x-[30%]"
        />

        <div className="relative flex w-full max-w-[410px] flex-col items-center rounded-[24px] bg-white/30 px-8 py-10 shadow-[0_20px_50px_-20px_rgba(23,20,26,0.35)] backdrop-blur-md sm:px-10">
          <Link to="/" className="mb-6 transition-transform duration-300 hover:scale-105">
            <Logo className="h-14 w-[136px]" />
          </Link>
          <h1 className="mb-6 w-full text-2xl font-semibold text-brand-ink">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}
