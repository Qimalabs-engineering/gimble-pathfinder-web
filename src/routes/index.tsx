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

import heroImg from "@/assets/hero-joy.jpg";
import communityImg from "@/assets/community-circle.jpg";
import calmHands from "@/assets/calm-cup.jpg";
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
      { title: "Gimble Foundation — Mental fitness for everyday life." },
      {
        name: "description",
        content:
          "Gimble Foundation is making mental fitness part of everyday life across Africa through technology, education, and community.",
      },
      { property: "og:title", content: "Gimble Foundation — Mental fitness for everyday life." },
      {
        property: "og:description",
        content:
          "Making mental fitness part of everyday life across Africa through technology, education, and community.",
      },
      { property: "og:url", content: "https://www.gimblefoundation.org/" },
    ],
    links: [
      { rel: "canonical", href: "https://www.gimblefoundation.org/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Gimble Foundation",
          url: "https://www.gimblefoundation.org",
          description:
            "Nonprofit making mental fitness part of everyday life across Africa through technology, education, and community.",
        }),
      },
    ],
  }),
  component: Home,
});

const programs = [
  {
    icon: HeartPulse,
    title: "Digital Tools",
    body: "Our mobile app gives you practical tools and guided experiences to help you understand your mind and build healthier mental habits.",
    cta: "Explore the App",
    to: "/app" as const,
  },
  {
    icon: Users,
    title: "Education & Content",
    body: "We make mental fitness easier to understand through educational content, conversations, events, and resources that connect the science of the mind to everyday life.",
    cta: "Explore Our Content",
    to: "/community" as const,
  },
  {
    icon: Megaphone,
    title: "Community & Programs",
    body: "Through community initiatives, workshops, campus programs, and partnerships, we take mental fitness beyond the screen and into everyday life.",
    cta: "Explore Our Programs",
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
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="lg:col-span-7">
            <FadeUp>
              <SectionEyebrow>Gimble Foundation · Nonprofit</SectionEyebrow>
            </FadeUp>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.02] text-primary sm:text-6xl lg:text-7xl">
              <WordReveal text="Mental fitness for everyday life." />
            </h1>

            <FadeUp delay={0.4} className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/75">
              Your mind is working every day. It handles pressure, makes decisions, manages emotions, solves problems, and keeps up with everything life throws at you.
              <br /><br />
              So why do we only think about our mental health when something goes wrong?
              <br /><br />
              Gimble Foundation is making mental fitness part of everyday life across Africa, through technology, education, and community.
            </FadeUp>

            <FadeUp delay={0.6} className="mt-8 flex flex-wrap items-center gap-3">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/get-involved"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90"
                >
                  Join the Movement
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/programs"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/5"
                >
                  Explore Our Programs
                </Link>
              </motion.div>
              <Link
                to="/app"
                className="inline-flex items-center gap-1.5 px-2 py-3 text-sm font-semibold text-primary/80 underline-offset-4 transition hover:text-primary hover:underline"
              >
                or get the app
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </FadeUp>

            <FadeUp delay={0.8} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-highlight" />
                Built for everyday life
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-highlight" />
                Practical
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
                  alt="A smiling woman with curly hair against a deep green backdrop"
                  width={1280}
                  height={1920}
                  className="aspect-[4/5] w-full object-cover lg:max-h-[520px]"
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
                    Today, check in with your mind.
                  </p>
                  <p className="text-xs text-foreground/60">2-min mental fitness check-in</p>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* IMPACT BAND */}
      <section className="border-y border-border bg-card/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { value: "3", label: "Pillars of impact", note: "Digital tools, education, community" },
            { value: "100%", label: "Free to use", note: "Every tool and resource" },
            { value: "2", label: "App platforms", note: "iOS and Android" },
            { value: "1", label: "Mission", note: "Mental fitness for everyday life" },
          ].map(({ value, label, note }, i) => (
            <FadeUp key={label} delay={i * 0.1}>
              <p className="font-display text-4xl font-semibold text-primary sm:text-5xl">{value}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-foreground/80">{label}</p>
              <p className="mt-1 text-xs text-foreground/60">{note}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* WHY GIMBLE */}
      <Section className="!py-16">
        <FadeUp>
          <SectionHeading
            eyebrow="Why Gimble?"
            title="Your mind is something you can build."
            description="Physical fitness isn't just about what you do when you're out of shape. You build it through regular practice. We believe your mind deserves the same approach. Mental fitness is about understanding how your mind works, recognising your patterns, handling challenges, managing your attention, and developing the skills to navigate everyday life better. You don't have to wait until something is wrong to start."
          />
        </FadeUp>
      </Section>

      {/* HOW WE CREATE IMPACT */}
      <Section className="!pt-0">
        <FadeUp>
          <SectionHeading
            eyebrow="How We Create Impact"
            title="Three ways we build mental fitness."
            description="A growing ecosystem helping people understand, practise, and strengthen their mental fitness."
          />
        </FadeUp>
        <StaggerGroup className="mt-12 grid gap-6 lg:grid-cols-3">
          {programs.map(({ icon: Icon, title, body, cta, to }, i) => (

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
                    {cta}
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
                "Mental fitness isn't something you think about only when things
                go wrong. It's something you{" "}
                <span className="italic">build every day</span>."
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
                eyebrow="The Gimble App"
                title="Your mind, in your pocket."
                description="The Gimble app gives you practical ways to work on your mental fitness wherever you are."
              />
            </FadeUp>
            <StaggerGroup className="mt-8 space-y-3 text-foreground/80" as="ul">
              {[
                "Guided mental fitness experiences",
                "Everyday check-ins",
                "Practical tools and exercises",
                "Resources to help you understand your mind",
                "Habits that support long-term mental fitness",
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
                  Explore the App
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
                alt="Hands wrapped in a cozy blanket holding a warm cup of tea outdoors"
                loading="lazy"
                width={1920}
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
                alt="A diverse group of young adults sitting together in a supportive circle"
                loading="lazy"
                width={1920}
                height={1280}
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
                Mental fitness is better when it's part of everyday life.
              </h3>
              <p className="mt-4 text-foreground/75">
                We're building a community where people can discover ideas, have
                conversations, learn about their minds, and make mental fitness
                part of how they live.
              </p>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Link
                  to="/community"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20"
                >
                  Join the Community
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
              Let's make mental fitness normal.
            </h2>
            <p className="mt-4 text-lg text-white/85">
              Download the app. Follow our content. Join the community. Volunteer. Partner with us.
              <br /><br />
              However you choose to participate, you're helping make mental fitness something people understand, practise, and prioritise, not something we only talk about when there's a crisis.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/get-involved"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[color:var(--teal)] shadow-lg transition hover:brightness-95"
                >
                  Get Involved
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
                  to="/app"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Download the App
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
