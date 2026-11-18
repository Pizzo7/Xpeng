import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, id, className = "", ...props }, ref) {
    const inputId = id ?? props.name;
    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-sm text-mist-dim tracking-wide"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={[
            "w-full rounded-sm border bg-ink-soft px-4 py-3 text-mist placeholder:text-silver-dark transition-colors",
            error
              ? "border-red-400/70 focus:border-red-400"
              : "border-silver/20 focus:border-gold/60",
            className,
          ].join(" ")}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-sm text-red-500" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
