import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  HeartPulse,
  Users,
  Megaphone,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import heroImg from "@/assets/hero-woman.jpg";
import communityImg from "@/assets/community.jpg";
import calmHands from "@/assets/calm-hands.jpg";
import { Section, SectionEyebrow, SectionHeading } from "@/components/section";
import { CtaBanner } from "@/components/cta-banner";
import { HexPattern } from "@/components/hex-pattern";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gimble Foundation — Mental wellness for Africans, everyday." },
      {
        name: "description",
        content:
          "Practical, stigma-free mental wellness support for Africans — through the Gimble app, community, and outreach. Support before the breaking point.",
      },
      { property: "og:title", content: "Gimble Foundation — Mental wellness for Africans, everyday." },
      {
        property: "og:description",
        content:
          "Practical, stigma-free mental wellness support for Africans — through the Gimble app, community, and outreach.",
      },
    ],
  }),
  component: Home,
});

const helpsWith = [
  "Stress",
  "Burnout",
  "Anxiety",
  "Emotional exhaustion",
  "Work pressure",
  "Life transitions",
  "Loneliness",
  "Motivation struggles",
];

const programs = [
  {
    icon: HeartPulse,
    title: "Digital Support",
    body: "The Gimble app — guided wellness journeys, daily check-ins, coping tools, and habits you can build at your own pace.",
    to: "/app" as const,
  },
  {
    icon: Users,
    title: "Community & Connection",
    body: "Safe online spaces, virtual conversations, and expert-led workshops where you don't have to navigate this alone.",
    to: "/community" as const,
  },
  {
    icon: Megaphone,
    title: "Outreach & Awareness",
    body: "Campus programs, workshops, and partnerships taking mental wellness directly into communities across Africa.",
    to: "/programs" as const,
  },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <HexPattern className="pointer-events-none absolute -right-20 -top-20 h-[560px] w-[560px] text-primary/10" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="lg:col-span-7">
            <SectionEyebrow>Gimble Foundation</SectionEyebrow>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.02] text-primary sm:text-6xl lg:text-7xl">
              Mental wellness,{" "}
              <span className="italic text-secondary">before</span> the
              breaking point.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/75">
              We're a nonprofit mental wellness organization helping Africans
              navigate the everyday weight of stress, burnout, and emotional
              strain — through technology, education, and community.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/app"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Get the Gimble App
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/5"
              >
                Explore our work
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                Mobile-first
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                Stigma-free
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                Built for Africa
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="absolute -left-6 -top-6 hidden h-32 w-32 rounded-full bg-secondary/40 blur-2xl lg:block" />
            <div className="relative overflow-hidden rounded-4xl border border-border bg-card shadow-xl">
              <img
                src={heroImg}
                alt="A young African woman smiling softly in golden sunlight"
                width={1536}
                height={1280}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden max-w-[260px] rounded-2xl border border-border bg-card p-4 shadow-lg sm:block">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary/20 text-secondary-foreground">
                  <Sparkles className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-primary">
                    Today, take a breath.
                  </p>
                  <p className="text-xs text-foreground/60">2-min wellness check-in</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HELPS WITH */}
      <Section className="!py-16">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="What we help with"
              title="The weight of the everyday — held early."
            />
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-foreground/75">
              We're not a therapy company or a clinical platform. We're here for
              the moments before things get worse — the quiet stress, the
              creeping burnout, the loneliness no one talks about.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {helpsWith.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* PROGRAMS */}
      <Section className="!pt-0">
        <SectionHeading
          eyebrow="Our programs"
          title="Three ways we show up."
          description="A complete ecosystem for mental wellness: digital support, ongoing connection, and broader community impact."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {programs.map(({ icon: Icon, title, body, to }, i) => (
            <Link
              key={title}
              to={to}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-secondary group-hover:text-secondary-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-primary">
                {`0${i + 1}. ${title}`}
              </h3>
              <p className="mt-3 flex-1 text-foreground/70">{body}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Learn more
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* CORE MESSAGE */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-secondary px-6 py-20 text-secondary-foreground sm:px-12 lg:py-28">
          <HexPattern className="pointer-events-none absolute -right-10 -top-10 h-[420px] w-[420px] text-primary/20" />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
              Our core message
            </p>
            <blockquote className="mt-6 font-display text-3xl font-semibold leading-[1.15] text-primary sm:text-4xl lg:text-5xl">
              "Mental health support should be accessible{" "}
              <span className="italic">before</span> people reach a breaking
              point."
            </blockquote>
          </div>
        </div>
      </section>

      {/* APP PREVIEW */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <SectionHeading
              eyebrow="The Gimble app"
              title="Practical wellness, in your pocket."
              description="The app is the foundation of our work — guided journeys, daily check-ins, and coping tools designed for everyday challenges. Anyone can download it."
            />
            <ul className="mt-8 space-y-3 text-foreground/80">
              {[
                "Guided wellness journeys",
                "Daily emotional check-ins",
                "Coping tools and exercises",
                "Build healthier mental habits",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/app"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                Explore the app
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-4xl border border-border bg-card shadow-xl">
              <img
                src={calmHands}
                alt="Hands cradling a warm cup of tea in soft window light"
                loading="lazy"
                width={1280}
                height={1280}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* COMMUNITY TEASER */}
      <Section className="!pt-0">
        <div className="overflow-hidden rounded-4xl border border-border bg-card">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[320px] lg:min-h-[480px]">
              <img
                src={communityImg}
                alt="Group of African friends sitting and laughing together outdoors"
                loading="lazy"
                width={1536}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="p-8 sm:p-12 lg:p-16">
              <SectionEyebrow>Community</SectionEyebrow>
              <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-primary sm:text-4xl">
                You don't have to do this alone.
              </h3>
              <p className="mt-4 text-foreground/75">
                Through our online community, virtual conversations, and
                workshops, we're building safe spaces for Africans to learn,
                share, and support one another.
              </p>
              <Link
                to="/community"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                Join the conversation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
