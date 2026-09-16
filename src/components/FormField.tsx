import type { InputHTMLAttributes } from "react";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function FormField({ label, id, ...rest }: FormFieldProps) {
  return (
    <label htmlFor={id} className="flex w-full flex-col gap-1.5">
      <span className="text-[13px] font-medium text-brand-ink/85">{label}</span>
      <input
        id={id}
        className="h-11 w-full rounded-[8px] border border-transparent bg-white px-3.5 text-[13px] text-brand-ink placeholder:text-[#bcbec0] outline-none transition-all duration-200 focus:border-brand-primary/40 focus:shadow-[0_0_0_4px_rgba(185,34,41,0.12)]"
        {...rest}
      />
    </label>
  );
}
