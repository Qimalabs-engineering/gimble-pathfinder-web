import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Calendar, Mic, Trophy, Users2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";

import communityImg from "@/assets/community.jpg";
import { subscribeEmail } from "@/lib/api/forms.functions";
import { Section, SectionHeading } from "@/components/section";
import { CtaBanner } from "@/components/cta-banner";
import { FadeUp, StaggerGroup, StaggerItem, Parallax } from "@/components/motion";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Gimble Foundation" },
      {
        name: "description",
        content:
          "Join the Gimble Community: mental fitness conversations, virtual events, learning sessions, and challenges for people curious about their minds.",
      },
      { property: "og:title", content: "Community — Gimble Foundation" },
      {
        property: "og:description",
        content:
          "A community for people who want to understand their minds and build mental fitness into everyday life.",
      },
      { property: "og:url", content: "https://www.gimblefoundation.org/community" },
    ],
    links: [{ rel: "canonical", href: "https://www.gimblefoundation.org/community" }],
  }),
  component: CommunityPage,
});

const initiatives = [
  {
    icon: MessageCircle,
    title: "Mental Fitness Conversations",
    body: "Honest conversations about how we think, feel, behave, and navigate everyday life.",
  },
  {
    icon: Calendar,
    title: "Virtual Events",
    body: "Live conversations, workshops, and sessions exploring practical mental fitness topics.",
  },
  {
    icon: Mic,
    title: "Learning Sessions",
    body: "Sessions with psychologists, coaches, practitioners, and other experts who can help us better understand the mind.",
  },
  {
    icon: Trophy,
    title: "Community Challenges",
    body: "Short, practical challenges that encourage people to put mental fitness into practice.",
  },
  {
    icon: Users2,
    title: "Shared Experiences",
    body: "A space to share perspectives, experiences, and lessons with other people interested in building their mental fitness.",
  },
  {
    icon: MessageCircle,
    title: "Community Activities",
    body: "Opportunities to learn, participate, and connect with others through Gimble's initiatives and programs.",
  },
];


function CommunityPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const subscribe = useServerFn(subscribeEmail);

  async function handleJoin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");
    setStatus("sending");
    try {
      await subscribe({ data: { email, source: "community" } });
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Section className="!pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeUp>
            <SectionHeading
              as="h1"
              eyebrow="Community & Connection"
              title="A community for people who want to understand their minds."
              description="The Gimble Community brings people together to learn, exchange ideas, ask questions, and have honest conversations about mental fitness and everyday life. We're creating a space where being curious about your mind is normal, whether you're learning about mental fitness for the first time or already building it into your everyday life."
            />

            <form
              onSubmit={handleJoin}
              className="mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
            >
              <label htmlFor="community-join-email" className="sr-only">
                Email address to join the community
              </label>
              <input
                id="community-join-email"
                name="email"
                type="email"
                required
                placeholder="you@email.com"
                className="flex-1 rounded-full border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
              />

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 disabled:opacity-60"
              >
                {status === "sending" ? "Joining…" : "Join the community"}
              </motion.button>
            </form>
            {status === "done" && (
              <p className="mt-3 text-sm font-medium text-primary">
                You're in. Look out for our next community update.
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="mt-3 text-sm text-destructive">
                Something went wrong. Please try again.
              </p>
            )}
          </FadeUp>
          <Parallax offset={30}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-4xl border border-border bg-card shadow-lg"
            >
              <img
                src={communityImg}
                alt="Friends laughing together outdoors"
                loading="lazy"
                width={1536}
                height={1024}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </Parallax>
        </div>
      </Section>

      <Section className="!pt-0">
        <FadeUp>
          <SectionHeading eyebrow="Inside the Community" title="Ways to connect with Gimble." />
        </FadeUp>
        <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {initiatives.map(({ icon: Icon, title, body }) => (
            <StaggerItem key={title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="h-full rounded-3xl border border-border bg-card p-7 hover:shadow-xl"
              >
                <motion.span
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary/30 text-primary"
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
            <h3 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
              Whether you're beginning your wellness journey or simply looking for a supportive community, there's a place for you here.
            </h3>
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20"
            >
              Join the Community
            </motion.button>
          </div>
        </FadeUp>
      </Section>

      <CtaBanner
        title="Be part of the conversation."
        subtitle="Subscribe to hear about upcoming events, workshops, and community challenges."
        primary={{ label: "Subscribe", to: "/contact" }}
        secondary={{ label: "See our programs", to: "/programs" }}
      />
    </>
  );
}
