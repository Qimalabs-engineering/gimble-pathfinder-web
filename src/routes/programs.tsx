import { createFileRoute } from "@tanstack/react-router";
import { HeartPulse, Users, Megaphone } from "lucide-react";

import workshopImg from "@/assets/workshop.jpg";
import { Section, SectionHeading } from "@/components/section";
import { CtaBanner } from "@/components/cta-banner";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — Gimble Foundation" },
      {
        name: "description",
        content:
          "Three programs creating impact across Africa: Digital Support through the Gimble app, Community & Connection, and Outreach & Awareness.",
      },
      { property: "og:title", content: "Programs — Gimble Foundation" },
      {
        property: "og:description",
        content:
          "How Gimble Foundation delivers mental wellness support: app, community, and outreach.",
      },
    ],
  }),
  component: ProgramsPage,
});

const programs = [
  {
    icon: HeartPulse,
    number: "01",
    title: "Digital Support",
    intro:
      "The Gimble app is the foundation of our work, our primary tool for delivering mental wellness support at scale. Individuals can access guided support for everyday challenges like stress, burnout, anxiety, and life pressures.",
    initiatives: [
      "Guided wellness journeys",
      "Daily emotional check-ins",
      "Wellness exercises and coping tools",
      "Mental wellness education and resources",
      "Self-reflection and habit-building activities",
    ],
  },
  {
    icon: Users,
    number: "02",
    title: "Community & Connection",
    intro:
      "Mental wellness shouldn't be a journey people navigate alone. Through our online community and virtual events, we create safe spaces where individuals learn, connect, share, and support one another, reducing stigma along the way.",
    initiatives: [
      "The Gimble online community",
      "Virtual wellness conversations",
      "Expert-led webinars and workshops",
      "Community wellness challenges",
      "Peer learning and support discussions",
    ],
  },
  {
    icon: Megaphone,
    number: "03",
    title: "Outreach & Awareness",
    intro:
      "We take mental wellness education and support directly into communities through physical events, workshops, partnerships, and awareness campaigns, meeting people where they are.",
    initiatives: [
      "Campus wellness programs",
      "Community workshops and wellness events",
      "Mental health awareness campaigns",
      "NGO and community partnerships",
      "Workplace wellness partnerships",
      "Wellness outreach for underserved communities",
    ],
  },
];

function ProgramsPage() {
  return (
    <>
      <Section className="!pb-12 !pt-20">
        <SectionHeading
          eyebrow="Our programs"
          title="A complete ecosystem for mental wellness."
          description="Gimble Foundation delivers its mission through three core programs that make mental wellness support accessible, practical, and community-driven for Africans."
        />
      </Section>

      <Section className="!pt-0">
        <div className="space-y-10">
          {programs.map(({ icon: Icon, number, title, intro, initiatives }, idx) => (
            <article
              key={title}
              className="grid gap-8 rounded-3xl border border-border bg-card p-8 lg:grid-cols-12 lg:gap-12 lg:p-12"
            >
              <div className="lg:col-span-5">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="font-display text-5xl font-semibold text-secondary">
                    {number}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-3xl font-semibold leading-tight text-primary">
                  {title}
                </h3>
                <p className="mt-4 text-foreground/75">{intro}</p>
                {idx === 2 && (
                  <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                    <img
                      src={workshopImg}
                      alt="A wellness workshop in a bright community room"
                      loading="lazy"
                      width={1536}
                      height={1024}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
                  Key initiatives
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {initiatives.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl border border-border bg-background px-4 py-4 text-sm font-medium text-foreground/85"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Partner with a program."
        subtitle="Bring Gimble's programs to your campus, workplace, or community."
        primary={{ label: "Partner with us", to: "/get-involved" }}
        secondary={{ label: "Contact us", to: "/contact" }}
      />
    </>
  );
}
