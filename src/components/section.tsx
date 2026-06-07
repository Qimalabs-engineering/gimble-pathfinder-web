import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-24 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
      <h2 className="mt-4 text-4xl font-display font-semibold leading-[1.05] text-primary sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-foreground/75">{description}</p>
      )}
    </div>
  );
}
