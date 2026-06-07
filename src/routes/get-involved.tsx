import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, GraduationCap, HandHeart, Heart, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

import workshopImg from "@/assets/workshop.jpg";
import { Section, SectionHeading } from "@/components/section";
import { CtaBanner } from "@/components/cta-banner";
import { FadeUp, StaggerGroup, StaggerItem, Parallax } from "@/components/motion";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Get Involved — Gimble Foundation" },
      {
        name: "description",
        content:
          "Partner with Gimble Foundation. Workplaces, campuses, NGOs, volunteers, and donors all play a part in making mental wellness accessible across Africa.",
      },
      { property: "og:title", content: "Get Involved — Gimble Foundation" },
      {
        property: "og:description",
        content:
          "Partner, volunteer, or donate to bring mental wellness support to more Africans.",
      },
    ],
  }),
  component: GetInvolvedPage,
});

const ways = [
  {
    icon: Briefcase,
    title: "Workplace partnerships",
    body: "Bring Gimble's wellness programs to your team. Reduce burnout, support your people.",
    cta: "Partner with us",
  },
  {
    icon: GraduationCap,
    title: "Campus programs",
    body: "Run wellness programming on your campus and reach students before things escalate.",
    cta: "Start a campus program",
  },
  {
    icon: Building2,
    title: "NGO & community partners",
    body: "Co-design wellness initiatives that meet your community where they are.",
    cta: "Partner with us",
  },
  {
    icon: HandHeart,
    title: "Volunteer",
    body: "Share your skills: writing, design, facilitation, outreach. We need them all.",
    cta: "Volunteer",
  },
  {
    icon: Heart,
    title: "Donate",
    body: "Every contribution helps us reach more people, earlier, with practical support.",
    cta: "Donate",
  },
];

function GetInvolvedPage() {
  return (
    <>
      <Section className="!pt-20">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <FadeUp className="lg:col-span-7">
            <SectionHeading
              eyebrow="Get involved"
              title="Help us reach Africans before the breaking point."
              description="There are many ways to be part of Gimble. Partner with us, volunteer your skills, or contribute to make mental wellness support more accessible."
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
                <h3 className="mt-5 font-display text-xl font-semibold text-primary">
                  {title}
                </h3>
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

      <CtaBanner
        title="Tell us how you'd like to partner."
        subtitle="We're building this with the communities we serve. Send us a note."
        primary={{ label: "Contact us", to: "/contact" }}
        secondary={{ label: "Read our programs", to: "/community" }}
      />
    </>
  );
}
