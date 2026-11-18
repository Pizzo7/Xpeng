import type { TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, error, id, className = "", ...props }, ref) {
    const areaId = id ?? props.name;
    return (
      <div className="space-y-2">
        <label
          htmlFor={areaId}
          className="block text-sm text-mist-dim tracking-wide"
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={areaId}
          className={[
            "w-full rounded-sm border bg-ink-soft px-4 py-3 text-mist placeholder:text-silver-dark transition-colors min-h-[120px] resize-y",
            error
              ? "border-red-400/70 focus:border-red-400"
              : "border-silver/20 focus:border-gold/60",
            className,
          ].join(" ")}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${areaId}-error` : undefined}
          {...props}
        />
        {error ? (
          <p id={`${areaId}-error`} className="text-sm text-red-500" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
