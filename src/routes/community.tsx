import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Calendar, Mic, Trophy, Users2 } from "lucide-react";

import communityImg from "@/assets/community.jpg";
import { Section, SectionHeading } from "@/components/section";
import { CtaBanner } from "@/components/cta-banner";

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
    ],
  }),
  component: CommunityPage,
});

const initiatives = [
  {
    icon: Users2,
    title: "The Gimble online community",
    body: "A safe, moderated space to share, listen, and learn alongside others walking similar paths.",
  },
  {
    icon: MessageCircle,
    title: "Virtual wellness conversations",
    body: "Real, unscripted conversations on the things we usually keep to ourselves.",
  },
  {
    icon: Mic,
    title: "Expert-led webinars",
    body: "Sessions with psychologists, coaches, and practitioners — practical and relatable.",
  },
  {
    icon: Trophy,
    title: "Community wellness challenges",
    body: "Short, supportive challenges that build healthier habits together.",
  },
  {
    icon: Calendar,
    title: "Peer learning and support",
    body: "Discussion groups where members share what's working and what isn't.",
  },
];

function CommunityPage() {
  return (
    <>
      <Section className="!pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Community & Connection"
              title="You don't have to carry it alone."
              description="Mental wellness shouldn't be a solo journey. Our online community and virtual events create safe spaces where Africans support one another, reduce stigma, and learn together."
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
              <button
                type="submit"
                className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Join the community
              </button>
            </form>
          </div>
          <div className="overflow-hidden rounded-4xl border border-border bg-card shadow-lg">
            <img
              src={communityImg}
              alt="Friends laughing together outdoors"
              loading="lazy"
              width={1536}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeading eyebrow="Key initiatives" title="Ways to connect with Gimble." />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {initiatives.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-3xl border border-border bg-card p-7"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary/30 text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-primary">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Be part of the conversation."
        subtitle="Subscribe to hear about upcoming events, workshops, and community challenges."
        primary={{ label: "Subscribe", to: "/contact" }}
        secondary={{ label: "See our programs", to: "/get-involved" }}
      />
    </>
  );
}
