import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CtaBanner({
  title = "Mental wellness, before the breaking point.",
  subtitle = "Download the Gimble app and start with one small check-in today.",
  primary = { label: "Get the App", to: "/app" as const },
  secondary = { label: "Join the community", to: "/community" as const },
}: {
  title?: string;
  subtitle?: string;
  primary?: { label: string; to: "/app" | "/community" | "/get-involved" | "/contact" };
  secondary?: { label: string; to: "/app" | "/community" | "/get-involved" | "/contact" };
}) {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-primary px-6 py-16 text-primary-foreground sm:px-12 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-secondary/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
        />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/85">{subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={primary.to}
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition hover:brightness-95"
            >
              {primary.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to={secondary.to}
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
