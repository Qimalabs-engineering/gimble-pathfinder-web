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
    title: "Coping tools and exercises",
    body: "Breathing, grounding, reframing: practical techniques for the hard moments.",
  },
  {
    icon: BookOpen,
    title: "Wellness education",
    body: "Short, honest reads on mental wellness, written for an African audience.",
  },
  {
    icon: Repeat,
    title: "Habit building",
    body: "Small consistent actions that compound into healthier mental habits.",
  },
  {
    icon: Activity,
    title: "Track your wellbeing",
    body: "See how you're really doing over time. Spot what helps. Adjust what doesn't.",
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
              <WordReveal text="A small, calm space, every day." />
            </h1>
            <FadeUp delay={0.4} className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/75">
              The Gimble app is publicly accessible. Anyone can download it and
              start with one small thing: a check-in, a breath, a journal
              prompt. We're not here to replace therapy; we're here so you can
              manage everyday mental strain earlier and more consistently.
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
            eyebrow="What's inside"
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

      <CtaBanner
        title="Start with one small check-in."
        subtitle="The Gimble app is mobile-first, designed for everyday African life."
        primary={{ label: "Join the waitlist", to: "/contact" }}
        secondary={{ label: "Explore the community", to: "/community" }}
      />
    </>
  );
}
