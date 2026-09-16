import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../Logo";
import { LogoutIcon } from "../icons";

type DashboardHeaderProps = {
  userName: string;
};

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 sm:px-8">
        <Link to="/" className="flex shrink-0 items-center transition-transform duration-300 hover:scale-105">
          <Logo className="h-9 w-[88px]" />
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary/15 font-display text-sm font-bold text-brand-primary">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="hidden text-sm font-medium text-brand-ink/80 sm:block">{userName}</span>
          </div>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 rounded-full border border-brand-ink/15 px-3.5 py-2 text-[13px] font-medium text-brand-ink/70 transition-colors duration-200 hover:border-brand-primary/40 hover:text-brand-primary"
          >
            <LogoutIcon />
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
