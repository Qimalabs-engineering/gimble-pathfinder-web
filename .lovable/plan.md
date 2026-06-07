## Goal
Make the Gimble site feel less AI-generated and more alive.

## 1. Remove the "Coming soon" line
- `src/routes/app.tsx`: delete the `<p>Coming soon. Join the waitlist via contact.</p>` block under the download buttons.

## 2. Strip em-dashes (—) from all copy
The em-dash is the user's main "AI tell." Rewrite affected lines across all route files and shared components, replacing each `—` with a comma, period, colon, or sentence break so the prose still reads naturally. Files to sweep:
- `src/routes/index.tsx` (hero subhead, helps-with intro, program cards, app preview)
- `src/routes/about.tsx`
- `src/routes/programs.tsx`
- `src/routes/app.tsx` (hero copy + feature descriptions)
- `src/routes/community.tsx`
- `src/routes/get-involved.tsx`
- `src/routes/contact.tsx`
- `src/components/cta-banner.tsx`, `src/components/site-footer.tsx`, `src/components/site-header.tsx` (if any)

Each rewrite is tuned per sentence (not a blind find/replace) so meaning and rhythm are preserved.

## 3. Rich, expressive animations (Framer Motion, already installed)

Add a small reusable motion primitives file `src/components/motion.tsx` exporting:
- `FadeUp` — opacity + 24px y translate, spring easing, `whileInView` with `viewport={{ once: true, margin: "-80px" }}`.
- `StaggerGroup` / `StaggerItem` — parent with `staggerChildren: 0.08`, children with FadeUp behavior.
- `Reveal` — clip-path / mask reveal for hero headline words.
- `Parallax` — small `useScroll` + `useTransform` y-shift for hero image and decorative blobs.

Apply across the site:
- **Home hero**: word-by-word reveal on the H1, fade-up on subhead + buttons + trust row (stagger). Parallax drift on hero photo and on the floating "Today, take a breath" card (separate offset so it floats independently). Slow rotating/pulsing HexPattern (CSS keyframes already in stylesheet space).
- **Helps-with chips**: stagger-in with slight scale (0.9 → 1) as they enter the viewport.
- **Program cards**: stagger fade-up; on hover use motion `whileHover` with lift + icon scale + arrow translate (richer than current CSS hover).
- **Core message banner**: blockquote fades up with letter-spacing easing in; HexPattern slow rotate.
- **App preview + community teaser**: image side slides in from x with parallax; text side fades up staggered.
- **App page**: hero same treatment; feature grid stagger on scroll, hover lift on cards with icon spin.
- **Community / Programs / Get Involved / About / Contact**: apply `FadeUp` to section headings and `StaggerGroup` to card grids so every page feels alive.
- **CtaBanner**: scale-in on viewport entry with subtle background gradient shimmer.
- **Site header**: on scroll past 24px, animate background opacity + blur + slight shadow (motion `useScroll`).
- **Page transitions**: light fade on route change via a motion wrapper in `__root.tsx` keyed by `useRouterState().location.pathname`.

Respect `prefers-reduced-motion`: motion primitives check the media query and degrade to instant fade.

## Out of scope
- No copy rewrites beyond what's needed to remove em-dashes.
- No new sections, images, or routes.
- No backend or form wiring.
