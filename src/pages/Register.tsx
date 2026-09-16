import { Link } from "react-router-dom";
import { AuthShell } from "../components/AuthShell";
import { FormField } from "../components/FormField";
import { Button } from "../components/Button";

export default function Register() {
  return (
    <AuthShell title="Create an account">
      <form className="flex w-full flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <FormField id="username" label="username" type="text" placeholder="enter your username" autoComplete="username" />
        <FormField id="email" label="Email" type="email" placeholder="username@gmail.com" autoComplete="email" />
        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="enter your password"
          autoComplete="new-password"
        />
        <FormField
          id="confirm-password"
          label="Confirm Password"
          type="password"
          placeholder="Re-enter Your Password"
          autoComplete="new-password"
        />

        <Button type="submit" size="md" className="mt-2 w-full">
          Sign Up
        </Button>

        <p className="mt-1 text-center text-[13px] font-light text-brand-ink/80">
          Already have account?{" "}
          <Link to="/login" className="font-medium text-brand-primary hover:underline">
            Login
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
