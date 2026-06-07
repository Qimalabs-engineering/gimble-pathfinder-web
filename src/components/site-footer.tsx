import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-secondary-foreground">
              <span className="font-display text-lg font-bold leading-none">G</span>
            </span>
            <span className="font-display text-2xl font-bold tracking-tight">Gimble</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/80">
            Mental health support should be accessible before people reach a breaking point.
            Practical, stigma-free wellness for Africans, everyday.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex max-w-sm flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Your email"
              className="flex-1 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/60 focus:border-secondary focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition hover:brightness-95"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/about" className="hover:text-secondary">About</Link></li>
            <li><Link to="/programs" className="hover:text-secondary">Programs</Link></li>
            <li><Link to="/app" className="hover:text-secondary">The App</Link></li>
            <li><Link to="/community" className="hover:text-secondary">Community</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold">Get involved</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/get-involved" className="hover:text-secondary">Partner with us</Link></li>
            <li><Link to="/get-involved" className="hover:text-secondary">Volunteer</Link></li>
            <li><Link to="/get-involved" className="hover:text-secondary">Donate</Link></li>
            <li><Link to="/contact" className="hover:text-secondary">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-primary-foreground/70 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Gimble Foundation. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Twitter" className="rounded-full p-2 hover:bg-primary-foreground/10">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="rounded-full p-2 hover:bg-primary-foreground/10">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="rounded-full p-2 hover:bg-primary-foreground/10">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
