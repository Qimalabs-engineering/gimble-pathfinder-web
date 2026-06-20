import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  HeartPulse,
  Users,
  Megaphone,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

import heroImg from "@/assets/hero-woman.jpg";
import communityImg from "@/assets/community.jpg";
import calmHands from "@/assets/calm-hands.jpg";
const oceanicBg = "/brand/oceanic-bg.jpg";
import { Section, SectionEyebrow, SectionHeading } from "@/components/section";
import { CtaBanner } from "@/components/cta-banner";
import { HexPattern } from "@/components/hex-pattern";
import {
  FadeUp,
  StaggerGroup,
  StaggerItem,
  WordReveal,
  Parallax,
} from "@/components/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gimble Foundation — Mental wellness for Africans, everyday." },
      {
        name: "description",
        content:
          "Practical, stigma-free mental wellness support for Africans through the Gimble app, community, and outreach. Support before the breaking point.",
      },
      { property: "og:title", content: "Gimble Foundation — Mental wellness for Africans, everyday." },
      {
        property: "og:description",
        content:
          "Practical, stigma-free mental wellness support for Africans through the Gimble app, community, and outreach.",
      },
      { property: "og:url", content: "https://gimble-pathfinder-web.lovable.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://gimble-pathfinder-web.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Gimble Foundation",
          url: "https://gimble-pathfinder-web.lovable.app",
          description:
            "Nonprofit mental wellness support for Africans through the Gimble app, community, and outreach.",
        }),
      },
    ],
  }),
  component: Home,
});

const programs = [
  {
    icon: HeartPulse,
    title: "Digital Support",
    body: "Our mobile app provides guided support, wellness tools, and educational resources that help people build healthier mental habits every day.",
    to: "/app" as const,
  },
  {
    icon: Users,
    title: "Community & Connection",
    body: "We bring people together through our online community and virtual events, creating safe spaces for learning, encouragement, and meaningful conversations about mental wellbeing.",
    to: "/community" as const,
  },
  {
    icon: Megaphone,
    title: "Outreach & Awareness",
    body: "Through workshops, campus initiatives, and community programs, we take mental wellness education directly to the people and communities that need it most.",
    to: "/programs" as const,
  },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Oceanic backdrop image, stronger in the hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-60 dark:opacity-55"
          style={{ backgroundImage: `url(${oceanicBg})` }}
        />
        {/* Soft gradient wash so text stays readable */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/55 via-background/40 to-background"
        />
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -right-20 -top-20"
        >
          <HexPattern className="h-[560px] w-[560px] text-primary/10" />
        </motion.div>
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="lg:col-span-7">
            <FadeUp>
              <SectionEyebrow>Gimble Foundation</SectionEyebrow>
            </FadeUp>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.02] text-primary sm:text-6xl lg:text-7xl">
              <WordReveal text="Mental wellness support for everyday life." />
            </h1>

            <FadeUp delay={0.4} className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/75">
              Life can be overwhelming. Stress, burnout, anxiety, and emotional pressure affect millions of Africans every day, yet many people never receive support until they reach a breaking point.
              <br /><br />
              Gimble Foundation exists to change that. Through our mobile app, community, and outreach programs, we're making mental wellness support more accessible, practical, and stigma-free across Africa.
            </FadeUp>
            <FadeUp delay={0.6} className="mt-8 flex flex-wrap gap-3">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/app"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90"
                >
                  Download the App
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/community"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/5"
                >
                  Join Our Community
                </Link>
              </motion.div>
            </FadeUp>

            <FadeUp delay={0.8} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-highlight" />
                Mobile-first
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-highlight" />
                Stigma-free
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-highlight" />
                Built for Africa
              </div>
            </FadeUp>
          </div>

          <div className="relative lg:col-span-5">
            <motion.div
              aria-hidden
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 -top-6 hidden h-32 w-32 rounded-full bg-secondary/40 blur-2xl lg:block"
            />
            <Parallax offset={50}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-4xl border border-border bg-card shadow-2xl shadow-glow"
              >
                <img
                  src={heroImg}
                  alt="A young African woman smiling softly in golden sunlight"
                  width={1536}
                  height={1280}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </Parallax>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -right-4 hidden max-w-[260px] rounded-2xl border border-border bg-card p-4 shadow-lg sm:block"
            >
              <div className="flex items-center gap-3">
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="grid h-10 w-10 place-items-center rounded-full bg-highlight/20 text-highlight"
                >
                  <Sparkles className="h-5 w-5" />
                </motion.span>

                <div>
                  <p className="font-display text-sm font-semibold text-primary">
                    Today, take a breath.
                  </p>
                  <p className="text-xs text-foreground/60">2-min wellness check-in</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY GIMBLE */}
      <Section className="!py-16">
        <FadeUp>
          <SectionHeading
            eyebrow="Why Gimble?"
            title="Mental wellbeing shouldn't only matter during a crisis."
            description="We believe everyone deserves access to support that helps them navigate everyday challenges before they become overwhelming. Whether you're feeling stressed, emotionally exhausted, burned out, or simply trying to build healthier habits, Gimble is here to support you."
          />
        </FadeUp>
      </Section>

      {/* HOW WE CREATE IMPACT */}
      <Section className="!pt-0">
        <FadeUp>
          <SectionHeading
            eyebrow="How We Create Impact"
            title="Three ways we show up."
            description="A complete ecosystem for mental wellness: digital support, ongoing connection, and broader community impact."
          />
        </FadeUp>
        <StaggerGroup className="mt-12 grid gap-6 lg:grid-cols-3">
          {programs.map(({ icon: Icon, title, body, to }, i) => (
            <StaggerItem key={title}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
                className="h-full"
              >
                <Link
                  to={to}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-8 transition hover:border-primary/30 hover:shadow-xl"
                >
                  <motion.span
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-secondary group-hover:text-secondary-foreground"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-primary">
                    {`0${i + 1}. ${title}`}
                  </h3>
                  <p className="mt-3 flex-1 text-foreground/70">{body}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
                  </span>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* CORE MESSAGE */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-secondary px-6 py-20 text-secondary-foreground sm:px-12 lg:py-28">
          <motion.div
            aria-hidden
            animate={{ rotate: -360 }}
            transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute -right-10 -top-10"
          >
            <HexPattern className="h-[420px] w-[420px] text-primary/20" />
          </motion.div>
          <div className="relative mx-auto max-w-3xl text-center">
            <FadeUp>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                Our core message
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <blockquote className="mt-6 font-display text-3xl font-semibold leading-[1.15] text-primary sm:text-4xl lg:text-5xl">
                "Mental wellness support should be accessible{" "}
                <span className="italic">before</span> people reach a breaking
                point."
              </blockquote>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* APP PREVIEW */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <FadeUp>
              <SectionHeading
                eyebrow="The Gimble app"
                title="Practical wellness, in your pocket."
                description="The app is the foundation of our work: guided journeys, daily check-ins, and coping tools designed for everyday challenges. Anyone can download it."
              />
            </FadeUp>
            <StaggerGroup className="mt-8 space-y-3 text-foreground/80" as="ul">
              {[
                "Guided wellness journeys",
                "Daily emotional check-ins",
                "Coping tools and exercises",
                "Build healthier mental habits",
              ].map((f) => (
                <StaggerItem key={f} as="li" className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-highlight" />
                  <span>{f}</span>
                </StaggerItem>
              ))}
            </StaggerGroup>
            <FadeUp delay={0.3} className="mt-10 flex flex-wrap gap-3">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/app"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20"
                >
                  Explore the app
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </FadeUp>
          </div>
          <Parallax offset={40} className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-4xl border border-border bg-card shadow-xl"
            >
              <img
                src={calmHands}
                alt="Hands cradling a warm cup of tea in soft window light"
                loading="lazy"
                width={1280}
                height={1280}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </Parallax>
        </div>
      </Section>

      {/* COMMUNITY TEASER */}
      <Section className="!pt-0">
        <FadeUp className="overflow-hidden rounded-4xl border border-border bg-card">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[320px] overflow-hidden lg:min-h-[480px]">
              <motion.img
                src={communityImg}
                alt="Group of African friends sitting and laughing together outdoors"
                loading="lazy"
                width={1536}
                height={1024}
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="p-8 sm:p-12 lg:p-16">
              <SectionEyebrow>Community</SectionEyebrow>
              <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-primary sm:text-4xl">
                You don't have to do it alone.
              </h3>
              <p className="mt-4 text-foreground/75">
                Through our online community, virtual conversations, and
                workshops, we're building safe spaces for Africans to learn,
                share, and support one another.
              </p>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Link
                  to="/community"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20"
                >
                  Join the conversation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </FadeUp>
      </Section>

      {/* JOIN THE MOVEMENT */}
      <Section className="!pt-0">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundColor: "var(--teal)" }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl px-6 py-16 text-white sm:px-12 sm:py-20"
        >
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-secondary/30 blur-3xl"
          />
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Join the Movement
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
              Mental wellness is everyone's responsibility.
            </h2>
            <p className="mt-4 text-lg text-white/85">
              Whether you download the app, join our community, volunteer your time, or partner with us, you're helping create a future where no one has to struggle alone.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/app"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[color:var(--teal)] shadow-lg transition hover:brightness-95"
                >
                  Download the App
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/community"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Join the Community
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/get-involved"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Volunteer With Us
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
