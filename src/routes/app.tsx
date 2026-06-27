import { createFileRoute } from "@tanstack/react-router";
import {
  Apple,
  PlayCircle,
  Compass,
  Heart,
  Sparkles,
  BookOpen,
  Repeat,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

import appUserImg from "@/assets/app-user.jpg";
import { Section, SectionEyebrow, SectionHeading } from "@/components/section";
import { CtaBanner } from "@/components/cta-banner";
import {
  FadeUp,
  StaggerGroup,
  StaggerItem,
  WordReveal,
  Parallax,
} from "@/components/motion";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "The Gimble App — Wellness in your pocket" },
      {
        name: "description",
        content:
          "Download the Gimble app: guided wellness journeys, daily check-ins, coping tools, and habit-building for everyday mental wellness.",
      },
      { property: "og:title", content: "The Gimble App — Wellness in your pocket" },
      {
        property: "og:description",
        content:
          "Mobile-first mental wellness support: guided journeys, check-ins, coping tools, habits.",
      },
      { property: "og:url", content: "https://gimble-pathfinder-web.lovable.app/app" },
    ],
    links: [{ rel: "canonical", href: "https://gimble-pathfinder-web.lovable.app/app" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Gimble",
          applicationCategory: "HealthApplication",
          operatingSystem: "iOS, Android",
          description:
            "Gimble is a mental wellness app for everyday emotional support: guided wellness journeys, daily check-ins, coping tools, and habit-building.",
          publisher: { "@type": "Organization", name: "Gimble Foundation" },
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      },
    ],
  }),
  component: AppPage,
});

const features = [
  {
    icon: Compass,
    title: "Guided wellness journeys",
    body: "Step-by-step paths for stress, burnout, anxiety, and life transitions, at your own pace.",
  },
  {
    icon: Heart,
    title: "Daily emotional check-ins",
    body: "A two-minute moment with yourself, every day. Notice patterns, name what you feel.",
  },
  {
    icon: Sparkles,
    title: "Stress and burnout support",
    body: "Practical tools and exercises designed to help you manage everyday emotional challenges.",
  },
  {
    icon: BookOpen,
    title: "Educational content",
    body: "Short, honest reads on mental wellness, written for an African audience.",
  },
  {
    icon: Repeat,
    title: "Practical coping tools",
    body: "Breathing, grounding, reframing: practical techniques for the hard moments.",
  },
  {
    icon: Activity,
    title: "Self-reflection exercises",
    body: "Small consistent actions that compound into healthier mental habits.",
  },
];

function AppPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-20 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <FadeUp>
              <SectionEyebrow>The Gimble App</SectionEyebrow>
            </FadeUp>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] text-primary sm:text-6xl">
              <WordReveal text="Mental wellness support in your pocket." />
            </h1>
            <FadeUp delay={0.4} className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/75">
              The Gimble app is designed to help you navigate everyday emotional challenges through guided support, practical tools, and healthy habits. Whether you're dealing with stress, burnout, anxiety, or emotional exhaustion, Gimble provides a safe and supportive space to take care of your mental wellbeing.
            </FadeUp>
            <FadeUp delay={0.55} className="mt-8 flex flex-wrap gap-3">
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition"
              >
                <Apple className="h-5 w-5" />
                <span>
                  <span className="block text-[10px] font-medium uppercase opacity-80">
                    Download on the
                  </span>
                  <span className="block text-base font-semibold leading-none">App Store</span>
                </span>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground shadow-lg shadow-secondary/30 transition"
              >
                <PlayCircle className="h-5 w-5" />
                <span>
                  <span className="block text-[10px] font-medium uppercase opacity-80">
                    Get it on
                  </span>
                  <span className="block text-base font-semibold leading-none">Google Play</span>
                </span>
              </motion.a>
            </FadeUp>
          </div>

          <div className="relative lg:col-span-5">
            <motion.div
              aria-hidden
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 -top-6 hidden h-32 w-32 rounded-full bg-secondary/40 blur-2xl lg:block"
            />
            <Parallax offset={40}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-4xl border border-border bg-card shadow-xl"
              >
                <img
                  src={appUserImg}
                  alt="A man using the Gimble app on a park bench in soft morning light"
                  loading="lazy"
                  width={1280}
                  height={1536}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </Parallax>
          </div>
        </div>
      </section>

      <Section>
        <FadeUp>
          <SectionHeading
            eyebrow="What You'll Find"
            title="Tools that meet you where you are."
          />
        </FadeUp>
        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <StaggerItem key={title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="h-full rounded-3xl border border-border bg-card p-7 transition hover:border-primary/30 hover:shadow-xl"
              >
                <motion.span
                  whileHover={{ rotate: 6, scale: 1.08 }}
                  className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary"
                >
                  <Icon className="h-6 w-6" />
                </motion.span>
                <h3 className="mt-5 font-display text-xl font-semibold text-primary">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{body}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section className="!pt-0">
        <FadeUp>
          <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 text-center sm:p-12">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
              A daily practice
            </p>
            <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-primary sm:text-4xl">
              "Mental wellness isn't a one-time event. It's a daily practice."
            </h3>
            <motion.a
              href="#"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition"
            >
              <Apple className="h-5 w-5" />
              Download the App
            </motion.a>
          </div>
        </FadeUp>
      </Section>

      <CtaBanner
        title="Start with one small check-in."
        subtitle="The Gimble app is mobile-first, designed for everyday African life."
        primary={{ label: "Join the waitlist", to: "/contact" }}
        secondary={{ label: "Explore the community", to: "/community" }}
      />
    </>
  );
}
