import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Twitter } from "lucide-react";
const wordmarkLight = "/brand/gimble-wordmark-light.png";


export function SiteFooter() {
  return (
    <footer
      className="relative mt-24 overflow-hidden border-t border-border text-white"
      style={{ backgroundColor: "var(--teal)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center" aria-label="Gimble home">
            <img src={wordmarkLight} alt="Gimble" className="h-10 w-auto sm:h-11" />
          </Link>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
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
              className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/60 focus:border-[color:var(--green)] focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-[color:var(--green)] px-5 py-2.5 text-sm font-semibold text-[color:var(--ink)] transition hover:brightness-95"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link to="/about" className="hover:text-[color:var(--green)]">About</Link></li>
            <li><Link to="/programs" className="hover:text-[color:var(--green)]">Programs</Link></li>
            <li><Link to="/app" className="hover:text-[color:var(--green)]">The App</Link></li>
            <li><Link to="/community" className="hover:text-[color:var(--green)]">Community</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold">Get involved</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link to="/get-involved" className="hover:text-[color:var(--green)]">Partner with us</Link></li>
            <li><Link to="/get-involved" className="hover:text-[color:var(--green)]">Volunteer</Link></li>
            <li><Link to="/get-involved" className="hover:text-[color:var(--green)]">Donate</Link></li>
            <li><Link to="/contact" className="hover:text-[color:var(--green)]">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-white/70 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Gimble Foundation. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Twitter" className="rounded-full p-2 hover:bg-white/10">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="rounded-full p-2 hover:bg-white/10">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="rounded-full p-2 hover:bg-white/10">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
