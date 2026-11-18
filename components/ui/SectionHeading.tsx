interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const hasMaxWidth = /\bmax-w-/.test(className);

  return (
    <div
      className={[
        align === "center" ? "text-center mx-auto" : "",
        hasMaxWidth ? "" : "max-w-3xl",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs uppercase tracking-brand text-gold">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-mist text-balance leading-tight">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-mist-dim text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
