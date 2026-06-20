import { createFileRoute } from "@tanstack/react-router";
import { HeartPulse, Users, Megaphone } from "lucide-react";
import { motion } from "framer-motion";

import workshopImg from "@/assets/workshop.jpg";
import { Section, SectionHeading } from "@/components/section";
import { CtaBanner } from "@/components/cta-banner";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/motion";

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
      "Our mobile app provides guided support for everyday emotional challenges, helping people build healthier habits and improve their wellbeing through accessible, practical tools.",
    initiatives: [
      "Guided wellness journeys",
      "Daily emotional check-ins",
      "Wellness exercises",
      "Educational resources",
      "Habit-building activities",
    ],
  },
  {
    icon: Users,
    number: "02",
    title: "Community & Connection",
    intro:
      "We create safe online spaces where people can learn, connect, share experiences, and participate in conversations that reduce stigma and promote emotional wellbeing.",
    initiatives: [
      "Online community",
      "Virtual wellness events",
      "Expert conversations",
      "Community challenges",
      "Peer support discussions",
    ],
  },
  {
    icon: Megaphone,
    number: "03",
    title: "Outreach & Awareness",
    intro:
      "We take mental wellness beyond digital spaces through physical events and partnerships that increase awareness and access across communities.",
    initiatives: [
      "Campus wellness programs",
      "Community workshops",
      "Awareness campaigns",
      "NGO partnerships",
      "Workplace wellness initiatives",
    ],
  },
];

function ProgramsPage() {
  return (
    <>
      <Section className="!pb-12 !pt-20">
        <FadeUp>
          <SectionHeading
            eyebrow="Our programs"
            title="A complete ecosystem for mental wellness."
            description="Gimble Foundation delivers its mission through three core programs that make mental wellness support accessible, practical, and community-driven for Africans."
          />
        </FadeUp>
      </Section>

      <Section className="!pt-0">
        <div className="space-y-10">
          {programs.map(({ icon: Icon, number, title, intro, initiatives }, idx) => (
            <FadeUp
              key={title}
              as="article"
              className="grid gap-8 rounded-3xl border border-border bg-card p-8 lg:grid-cols-12 lg:gap-12 lg:p-12"
            >
              <div className="lg:col-span-5">
                <div className="flex items-center gap-4">
                  <motion.span
                    whileHover={{ rotate: 8, scale: 1.08 }}
                    className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary"
                  >
                    <Icon className="h-7 w-7" />
                  </motion.span>
                  <span className="font-display text-5xl font-semibold text-highlight">
                    {number}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-3xl font-semibold leading-tight text-primary">
                  {title}
                </h3>
                <p className="mt-4 text-foreground/75">{intro}</p>
                {idx === 2 && (
                  <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                    <motion.img
                      src={workshopImg}
                      alt="A wellness workshop in a bright community room"
                      loading="lazy"
                      width={1536}
                      height={1024}
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
                  Key initiatives
                </p>
                <StaggerGroup stagger={0.05} className="mt-4 grid gap-3 sm:grid-cols-2" as="ul">
                  {initiatives.map((item) => (
                    <StaggerItem
                      key={item}
                      as="li"
                      className="rounded-2xl border border-border bg-background px-4 py-4 text-sm font-medium text-foreground/85"
                    >
                      {item}
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            </FadeUp>
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
