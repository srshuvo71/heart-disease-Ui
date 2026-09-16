import { Link } from "react-router-dom";
import { AuthShell } from "../components/AuthShell";
import { FormField } from "../components/FormField";
import { Button } from "../components/Button";
import googleIcon from "../assets/icons/social-google.svg";
import facebookIcon from "../assets/icons/social-facebook.svg";
import twitterIcon from "../assets/icons/social-twitter.svg";

const socials = [
  { name: "Google", icon: googleIcon },
  { name: "Facebook", icon: facebookIcon },
  { name: "Twitter", icon: twitterIcon },
];

export default function Login() {
  return (
    <AuthShell title="Login">
      <form className="flex w-full flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <FormField id="email" label="Email" type="email" placeholder="username@gmail.com" autoComplete="email" />
        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="enter your password"
          autoComplete="current-password"
        />

        <Link
          to="/login"
          className="-mt-1 self-start text-[13px] font-medium text-brand-ink/70 transition-colors hover:text-brand-primary"
        >
          Forget Password?
        </Link>

        <Button type="submit" size="md" className="mt-1 w-full">
          Sign In
        </Button>

        <div className="mt-2 flex items-center gap-3 text-[13px] text-brand-ink/60">
          <span className="h-px flex-1 bg-brand-ink/15" />
          Or continue with
          <span className="h-px flex-1 bg-brand-ink/15" />
        </div>

        <div className="flex items-center justify-center gap-4">
          {socials.map((s) => (
            <button
              key={s.name}
              type="button"
              aria-label={`Continue with ${s.name}`}
              className="flex h-[44px] w-[58px] items-center justify-center rounded-[7px] bg-white shadow-[0_4px_12px_-4px_rgba(23,20,26,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_18px_-8px_rgba(23,20,26,0.3)]"
            >
              <img src={s.icon} alt="" className="h-5 w-5" />
            </button>
          ))}
        </div>

        <p className="mt-2 text-center text-[13px] font-light text-brand-ink/80">
          Didn&rsquo;t have any account?{" "}
          <Link to="/register" className="font-medium text-brand-primary hover:underline">
            Register
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
