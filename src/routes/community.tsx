import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Calendar, Mic, Trophy, Users2 } from "lucide-react";
import { motion } from "framer-motion";

import communityImg from "@/assets/community.jpg";
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
          "Join the Gimble online community: virtual conversations, expert-led workshops, wellness challenges, and peer support.",
      },
      { property: "og:title", content: "Community — Gimble Foundation" },
      {
        property: "og:description",
        content:
          "Safe spaces and virtual events where Africans connect around mental wellness.",
      },
      { property: "og:url", content: "https://gimble-pathfinder-web.lovable.app/community" },
    ],
    links: [{ rel: "canonical", href: "https://gimble-pathfinder-web.lovable.app/community" }],
  }),
  component: CommunityPage,
});

const initiatives = [
  {
    icon: MessageCircle,
    title: "Wellness conversations",
    body: "Real, unscripted conversations on the things we usually keep to ourselves.",
  },
  {
    icon: Calendar,
    title: "Virtual events",
    body: "Expert-led webinars and workshops on practical mental wellness topics.",
  },
  {
    icon: Mic,
    title: "Learning sessions",
    body: "Sessions with psychologists, coaches, and practitioners: practical and relatable.",
  },
  {
    icon: Trophy,
    title: "Community challenges",
    body: "Short, supportive challenges that build healthier habits together.",
  },
  {
    icon: Users2,
    title: "Shared experiences",
    body: "A safe, moderated space to share, listen, and learn alongside others walking similar paths.",
  },
  {
    icon: MessageCircle,
    title: "Encouragement and accountability",
    body: "Peer support that helps you stay consistent and motivated on your wellness journey.",
  },
];

function CommunityPage() {
  return (
    <>
      <Section className="!pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeUp>
            <SectionHeading
              eyebrow="Community & Connection"
              title="You don't have to do it alone."
              description="The Gimble Community is a supportive space where people come together to learn, grow, and have honest conversations about mental wellbeing. We believe that connection is an important part of emotional wellness."
            />
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="flex-1 rounded-full border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
              />
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20"
              >
                Join the community
              </motion.button>
            </form>
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
