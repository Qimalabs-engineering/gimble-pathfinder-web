# Gimble Foundation Website

A warm, human, hopeful multi-page marketing site for Gimble Foundation, built on the brand colors (Gimble Teal `#27615c` and Gimble Green `#9fc031`) with a soft cream/off-white background and deep teal text.

## Brand & Design System

- **Palette**
  - Gimble Teal `#27615c` — primary (deep, trustworthy)
  - Gimble Green `#9fc031` — accent (energy, hope)
  - Soft Teal `#9ec9c4` — supporting (calm surfaces)
  - Cream `#f7f4ec` — background
  - Deep Ink `#0f2a28` — body text
- **Typography**
  - Display: a warm, rounded retro display (Fraunces or similar) for headings — matches the Gimble logo wordmark feel
  - Body: Inter / DM Sans for clean readability
- **Visual motifs**: subtle hexagon/honeycomb pattern (from brand reference) as a quiet background texture; rounded-2xl cards; generous whitespace; soft fades; gentle motion on scroll
- All colors wired as semantic tokens in `src/styles.css` (oklch); components use tokens only

## Pages (separate TanStack routes, each with own SEO `head()`)

1. **Home `/`** — Hero with core message ("Mental health support should be accessible before people reach a breaking point."), intro to Gimble, what we help with (stress, burnout, anxiety, etc.) as a chip cloud, three programs preview, app preview section, CTA to download app + join community
2. **About `/about`** — Who we are, Vision, Mission, what we ARE / are NOT, tone, story
3. **Programs `/programs`** — The three programs (Digital Support, Community & Connection, Outreach & Awareness) with full key initiatives lists
4. **The App `/app`** — Gimble app features (guided journeys, check-ins, coping tools, education, habits), mock phone visuals, download CTA (iOS/Android placeholders)
5. **Community `/community`** — Online community, virtual events, webinars, challenges; signup CTA
6. **Get Involved `/get-involved`** — Partnerships (NGO, workplace, campus), volunteer, donate
7. **Contact `/contact`** — Simple form (name/email/message) + email/social links

## Shared layout

- Sticky translucent header with logo wordmark "Gimble" + nav (Home, About, Programs, App, Community, Get Involved, Contact) + "Download App" button
- Footer: mission tagline, nav links, social, newsletter signup field, copyright

## Components

- `Header`, `Footer`, `HeroSection`, `ProgramCard`, `StatBadge`, `SectionHeading`, `CTABanner`, `HexPattern` (decorative SVG), `PhoneMockup`

## Technical notes

- TanStack Start file-based routes under `src/routes/`
- Tailwind v4 tokens defined in `src/styles.css` (`--primary`, `--accent`, `--background`, `--foreground`, plus brand-specific `--teal`, `--green`, `--cream`, `--ink`)
- Fonts loaded via Google Fonts `<link>` in `__root.tsx` head
- Light theme only (matches warm/calm tone); no auth, no backend yet — contact form and newsletter are non-functional UI placeholders this pass
- All section images generated (calm African community/wellness imagery, abstract hexagon textures, app screen mockups)
- Subtle Framer Motion fade/slide on section reveal

## Out of scope (this pass)

- Functional contact form / newsletter submission (would need Lovable Cloud — can add later)
- Real app store links
- CMS for blog/news
- Donations payment integration

Confirm and I'll build it.