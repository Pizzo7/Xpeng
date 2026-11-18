import type { SelectHTMLAttributes } from "react";
import { forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { label, error, id, options, placeholder, className = "", ...props },
    ref,
  ) {
    const selectId = id ?? props.name;
    return (
      <div className="space-y-2">
        <label
          htmlFor={selectId}
          className="block text-sm text-mist-dim tracking-wide"
        >
          {label}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={[
            "w-full rounded-sm border bg-ink-soft px-4 py-3 text-mist transition-colors appearance-none",
            error
              ? "border-red-400/70 focus:border-red-400"
              : "border-silver/20 focus:border-gold/60",
            className,
          ].join(" ")}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error ? (
          <p
            id={`${selectId}-error`}
            className="text-sm text-red-500"
            role="alert"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
