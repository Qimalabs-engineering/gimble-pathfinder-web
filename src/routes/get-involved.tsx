import { createFileRoute, Link } from "@tanstack/react-router";
import { HandHeart, Building2, Award } from "lucide-react";
import { motion } from "framer-motion";

import workshopImg from "@/assets/workshop.jpg";
import { Section, SectionHeading } from "@/components/section";
import { CtaBanner } from "@/components/cta-banner";
import { FadeUp, StaggerGroup, StaggerItem, Parallax } from "@/components/motion";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Join Us — Gimble Foundation" },
      {
        name: "description",
        content:
          "Volunteer, partner, or become an ambassador to help build a mentally healthier Africa with Gimble Foundation.",
      },
      { property: "og:title", content: "Join Us — Gimble Foundation" },
      {
        property: "og:description",
        content:
          "Be part of making mental wellness support more accessible across Africa.",
      },
      { property: "og:url", content: "https://www.gimblefoundation.org/get-involved" },
    ],
    links: [{ rel: "canonical", href: "https://www.gimblefoundation.org/get-involved" }],
  }),
  component: GetInvolvedPage,
});

const ways = [
  {
    icon: HandHeart,
    title: "Volunteer",
    body: "Support outreach programs, events, and community initiatives.",
    cta: "Become a Volunteer",
  },
  {
    icon: Building2,
    title: "Partner With Us",
    body: "Collaborate with us to bring mental wellness support to schools, organizations, and communities.",
    cta: "Partner With Us",
  },
  {
    icon: Award,
    title: "Become an Ambassador",
    body: "Help spread awareness and inspire more people to prioritize their mental wellbeing.",
    cta: "Become an Ambassador",
  },
];

function GetInvolvedPage() {
  return (
    <>
      <Section className="!pt-20">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <FadeUp className="lg:col-span-7">
            <SectionHeading
              as="h1"
              eyebrow="Join Us"
              title="Help us build a mentally healthier Africa."
              description="Creating a culture where mental wellbeing is valued requires all of us. Whether you volunteer your time, partner with us, or advocate for mental wellness in your community, you can make a meaningful difference."
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
                src={workshopImg}
                alt="A community wellness workshop"
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
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ways.map(({ icon: Icon, title, body, cta }) => (
            <StaggerItem key={title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 hover:shadow-xl"
              >
                <motion.span
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary"
                >
                  <Icon className="h-6 w-6" />
                </motion.span>
                <h2 className="mt-5 font-display text-xl font-semibold text-primary">
                  {title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70">
                  {body}
                </p>
                <Link
                  to="/contact"
                  className="group mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                >
                  {cta}
                  <span className="transition-transform group-hover:translate-x-1.5">→</span>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section className="!pt-0">
        <FadeUp>
          <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 text-center sm:p-12">
            <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
              Together, we can make mental wellness support more accessible across Africa.
            </h2>
            <p className="mt-4 text-foreground/70">
              Every contribution, partnership, and conversation brings us closer to a continent where no one has to struggle alone.
            </p>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} className="mt-8 inline-block">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20"
              >
                Become a Volunteer
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </Section>

      <CtaBanner
        title="Ready to make a difference?"
        subtitle="Reach out and let us know how you'd like to get involved."
        primary={{ label: "Contact us", to: "/contact" }}
        secondary={{ label: "Explore our programs", to: "/programs" }}
      />
    </>
  );
}
