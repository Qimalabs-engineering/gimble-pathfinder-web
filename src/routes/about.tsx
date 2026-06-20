import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import heroImg from "@/assets/hero-woman.jpg";
import { Section, SectionHeading } from "@/components/section";
import { CtaBanner } from "@/components/cta-banner";
import { FadeUp, StaggerGroup, StaggerItem, Parallax } from "@/components/motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Gimble Foundation" },
      {
        name: "description",
        content:
          "Gimble Foundation is a mental wellness nonprofit making support accessible, practical, and stigma-free for Africans everywhere.",
      },
      { property: "og:title", content: "About — Gimble Foundation" },
      {
        property: "og:description",
        content:
          "Our vision, mission, and the values that guide our work in mental wellness across Africa.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    title: "Accessibility",
    body: "Support should be available to everyone, regardless of background or location.",
  },
  {
    title: "Prevention",
    body: "Early support changes lives.",
  },
  {
    title: "Community",
    body: "Healing and growth happen better together.",
  },
  {
    title: "Compassion",
    body: "We meet people with empathy, respect, and understanding.",
  },
];

function AboutPage() {
  return (
    <>
      <Section className="!pb-12 !pt-20">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <FadeUp className="lg:col-span-7">
            <SectionHeading
              eyebrow="Who We Are"
              title="Gimble Foundation is a nonprofit organization committed to making mental wellness support accessible to Africans."
              description="We believe that mental wellbeing should not be a privilege or something people only seek when they reach a crisis. Everyone deserves practical, everyday support that helps them manage life's pressures and build emotional resilience. By combining technology, community, and outreach, we're creating a future where mental wellness is understood, prioritized, and accessible to all."
            />
          </FadeUp>
          <Parallax offset={30} className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-4xl border border-border bg-card shadow-lg"
            >
              <img
                src={heroImg}
                alt="Portrait of a calm young African woman in golden light"
                loading="lazy"
                width={1536}
                height={1280}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </Parallax>
        </div>
      </Section>

      <Section className="!pt-0">
        <StaggerGroup className="grid gap-6 lg:grid-cols-2">
          <StaggerItem as="article" className="rounded-3xl border border-border bg-card p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-foreground">
              Vision
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-primary">
              To make mental wellness support accessible, practical, and
              stigma-free for Africans everywhere.
            </h3>
          </StaggerItem>
          <StaggerItem as="article" className="rounded-3xl border border-border bg-primary p-8 text-primary-foreground lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-highlight">
              Mission
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold leading-tight">
              To empower Africans with accessible mental wellness support through technology, education, and community-driven initiatives.
            </h3>
          </StaggerItem>
        </StaggerGroup>
      </Section>

      {/* Values */}
      <Section className="!pt-0">
        <FadeUp>
          <SectionHeading
            eyebrow="Our Values"
            title="The principles that guide our work."
          />
        </FadeUp>
        <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2">
          {values.map(({ title, body }) => (
            <StaggerItem key={title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="h-full rounded-3xl border border-border bg-card p-7 hover:shadow-xl"
              >
                <h3 className="font-display text-xl font-semibold text-primary">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{body}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* Core message */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-4xl bg-secondary px-6 py-16 text-center text-secondary-foreground sm:px-12">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
            Core message
          </p>
          <blockquote className="mt-5 font-display text-3xl font-semibold leading-tight text-primary sm:text-4xl">
            "Mental wellness support should be accessible before people reach a
            breaking point."
          </blockquote>
        </div>
      </section>

      <CtaBanner
        title="Join us in building a healthier Africa."
        subtitle="Whether you download the app or partner with us, every step makes early support more accessible."
        primary={{ label: "Get the App", to: "/app" }}
        secondary={{ label: "Partner with us", to: "/get-involved" }}
      />
    </>
  );
}
