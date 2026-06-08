import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import logoMark from "@/assets/gimble-logo-mark.png.asset.json";
import { ThemeToggle } from "@/components/theme-toggle";


const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/app", label: "The App" },
  { to: "/community", label: "Community" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { scrollY } = useScroll();
  const headerBgOpacity = useTransform(scrollY, [0, 80], [0.6, 0.92]);
  const headerShadow = useTransform(
    scrollY,
    [0, 80],
    ["0 0 0 rgba(0,0,0,0)", "0 8px 24px -12px rgba(15, 42, 40, 0.15)"],
  );

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      style={{ boxShadow: headerShadow }}
      className="sticky top-0 z-50 border-b border-border/60 backdrop-blur-xl"
    >
      <motion.div
        aria-hidden
        style={{ opacity: headerBgOpacity }}
        className="absolute inset-0 -z-10 bg-background"
      />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.span
            whileHover={{ rotate: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground"
          >
            <span className="text-base font-display font-bold leading-none">G</span>
          </motion.span>
          <span className="font-display text-xl font-bold tracking-tight text-primary">
            Gimble
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative rounded-full px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex">
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/app"
              className="inline-flex items-center justify-center rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground shadow-sm transition hover:brightness-95"
            >
              Get the App
            </Link>
          </motion.div>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="border-t border-border bg-background lg:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/app"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground"
            >
              Get the App
            </Link>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
