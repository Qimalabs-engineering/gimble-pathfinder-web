import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
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
          "Our vision, mission, and the tone we bring to mental wellness across Africa.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Section className="!pb-12 !pt-20">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <FadeUp className="lg:col-span-7">
            <SectionHeading
              eyebrow="About Gimble"
              title="A warm, practical place for the everyday weight of life."
              description="Gimble Foundation is a nonprofit mental health organization using technology, education, and community support to help Africans navigate everyday emotional and mental challenges."
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
              To make mental health support accessible, practical, and
              stigma-free for Africans everywhere.
            </h3>
          </StaggerItem>
          <StaggerItem as="article" className="rounded-3xl border border-border bg-primary p-8 text-primary-foreground lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Mission
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold leading-tight">
              To provide Africans with simple and continuous mental health
              support through technology, education, partnerships, and
              community programs.
            </h3>
          </StaggerItem>
        </StaggerGroup>
      </Section>

      {/* We are / are not */}
      <Section className="!pt-0">
        <FadeUp>
          <SectionHeading
            eyebrow="How we show up"
            title="What Gimble is, and what it isn't."
            description="We're clear about our role. We exist for the early moments, the quiet strain, the in-between."
          />
        </FadeUp>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              We are
            </p>
            <ul className="mt-5 space-y-4">
              {[
                "A mental wellness and emotional support organization",
                "Focused on prevention, awareness, and early support",
                "Human, warm, calm, practical, hopeful, non-judgmental",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground/85">
                  <span className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
                    <Check className="h-4 w-4" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-muted p-8">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-foreground/60">
              We are not
            </p>
            <ul className="mt-5 space-y-4">
              {[
                "A therapy company",
                "A clinical psychiatry platform",
                "A replacement for professional mental health care",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground/70">
                  <span className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-foreground/10 text-foreground/60">
                    <X className="h-4 w-4" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Core message */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-4xl bg-secondary px-6 py-16 text-center text-secondary-foreground sm:px-12">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
            Core message
          </p>
          <blockquote className="mt-5 font-display text-3xl font-semibold leading-tight text-primary sm:text-4xl">
            "Mental health support should be accessible before people reach a
            breaking point."
          </blockquote>
        </div>
      </section>

      <CtaBanner
        title="Join us in building a calmer Africa."
        subtitle="Whether you download the app or partner with us, every step makes early support more accessible."
        primary={{ label: "Get the App", to: "/app" }}
        secondary={{ label: "Partner with us", to: "/get-involved" }}
      />
    </>
  );
}
