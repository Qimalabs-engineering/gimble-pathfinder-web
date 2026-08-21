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
          "Three programs making mental fitness part of everyday life: Digital Mental Fitness, Community & Education, and Outreach & Programs.",
      },
      { property: "og:title", content: "Programs — Gimble Foundation" },
      {
        property: "og:description",
        content:
          "How Gimble Foundation helps people understand, practise, and build mental fitness across Africa.",
      },
      { property: "og:url", content: "https://www.gimblefoundation.org/programs" },
    ],
    links: [{ rel: "canonical", href: "https://www.gimblefoundation.org/programs" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: "Digital Mental Fitness",
              serviceType: "Mental fitness mobile application",
              provider: { "@type": "Organization", name: "Gimble Foundation" },
              areaServed: "Africa",
              description:
                "Mobile app with practical tools and guided experiences that help people understand their minds and build healthier mental habits.",
            },
            {
              "@type": "Service",
              name: "Community & Education",
              serviceType: "Mental fitness education and community",
              provider: { "@type": "Organization", name: "Gimble Foundation" },
              areaServed: "Africa",
              description:
                "Online community, virtual events, educational content, and expert-led conversations about mental fitness.",
            },
            {
              "@type": "Service",
              name: "Outreach & Programs",
              serviceType: "Mental fitness outreach and partnerships",
              provider: { "@type": "Organization", name: "Gimble Foundation" },
              areaServed: "Africa",
              description:
                "Campus programs, community workshops, campaigns, and partnerships that bring mental fitness education to more people.",
            },
          ],
        }),
      },
    ],
  }),
  component: ProgramsPage,
});

const programs = [
  {
    icon: HeartPulse,
    number: "01",
    title: "Digital Mental Fitness",
    intro:
      "Our mobile app gives people practical tools and guided experiences to help them understand their minds, build healthier habits, and practise mental fitness in everyday life.",
    initiatives: [
      "Guided mental fitness experiences",
      "Daily mental fitness check-ins",
      "Practical exercises and tools",
      "Educational resources",
      "Habit-building activities",
    ],
  },
  {
    icon: Users,
    number: "02",
    title: "Community & Education",
    intro:
      "We create opportunities for people to learn about mental fitness, exchange ideas, and have meaningful conversations about how we think, feel, and navigate everyday life.",
    initiatives: [
      "Online community",
      "Virtual events and conversations",
      "Educational content",
      "Mental fitness challenges",
      "Expert-led conversations",
    ],
  },
  {
    icon: Megaphone,
    number: "03",
    title: "Outreach & Programs",
    intro:
      "We take mental fitness beyond digital spaces through physical programs, partnerships, and initiatives that bring education and practical tools to more people and communities.",
    initiatives: [
      "Campus mental fitness programs",
      "Community workshops",
      "Mental fitness campaigns",
      "NGO and community partnerships",
      "Workplace mental fitness initiatives",
    ],
  },
];

function ProgramsPage() {
  return (
    <>
      <Section className="!pb-12 !pt-20">
        <FadeUp>
          <SectionHeading
            as="h1"
            eyebrow="Our Programs"
            title="Three ways we make mental fitness part of everyday life."
            description="Gimble Foundation delivers its mission through three core programs that help people understand, practise, and build mental fitness through technology, education, and community."
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
                <h2 className="mt-6 font-display text-3xl font-semibold leading-tight text-primary">
                  {title}
                </h2>
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
        title="Help us make mental fitness part of everyday life."
        subtitle="Bring Gimble's mental fitness programs to your campus, workplace, organisation, or community."
        primary={{ label: "Partner With Us", to: "/get-involved" }}
        secondary={{ label: "Contact Us", to: "/contact" }}

      />
    </>
  );
}
