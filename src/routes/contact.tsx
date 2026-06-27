import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageSquare, Phone, Globe } from "lucide-react";
import { useState } from "react";

import { Section, SectionHeading } from "@/components/section";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Gimble Foundation" },
      {
        name: "description",
        content:
          "Get in touch with Gimble Foundation about partnerships, volunteering, media, or the app waitlist.",
      },
      { property: "og:title", content: "Contact — Gimble Foundation" },
      {
        property: "og:description",
        content:
          "Contact Gimble Foundation for partnerships, volunteering opportunities, media inquiries, or to join our app waitlist.",
      },
      { property: "og:url", content: "https://www.gimblefoundation.org/contact" },
    ],
    links: [{ rel: "canonical", href: "https://www.gimblefoundation.org/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
    <Section className="!pt-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="We'd love to hear from you."
            description="Whether you have a question, want to partner with us, volunteer, or simply learn more about our work, we'd be happy to connect."
          />
          <div className="mt-10 space-y-5">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-primary">Email</p>
                <a
                  href="mailto:hello@gimblefoundation.org"
                  className="text-sm text-foreground/70 hover:text-primary"
                >
                  hello@gimblefoundation.org
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-primary">Phone</p>
                <p className="text-sm text-foreground/70">Available on request via email.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Globe className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-primary">Social Media</p>
                <p className="text-sm text-foreground/70">Instagram, TikTok, X, Facebook, YouTube</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-primary">Based in</p>
                <p className="text-sm text-foreground/70">Across Africa. Serving the continent.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-3xl border border-border bg-card p-6 sm:p-10"
          >
            {sent ? (
              <div className="py-10 text-center">
                <h3 className="font-display text-2xl font-semibold text-primary">
                  Thank you.
                </h3>
                <p className="mt-3 text-foreground/70">
                  Your message is on its way. We'll be in touch soon.
                </p>
              </div>
            ) : (
              <div className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Your name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <Field label="Organization (optional)" name="org" />
                <div>
                  <label className="text-sm font-medium text-primary">Subject</label>
                  <select
                    name="subject"
                    className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
                  >
                    <option>General enquiry</option>
                    <option>Partnership</option>
                    <option>Workplace wellness</option>
                    <option>Campus program</option>
                    <option>Volunteer</option>
                    <option>Press / media</option>
                    <option>App waitlist</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-primary">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
                    placeholder="Tell us a little about what's on your mind…"
                  />
                </div>
                <button
                  type="submit"
                  className="self-start rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Send message
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </Section>

    <Section className="!pt-0">
      <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 text-center sm:p-12">
        <h3 className="font-display text-2xl font-semibold text-primary">Stay Connected</h3>
        <p className="mt-3 text-foreground/70">
          Follow our journey, join our conversations, and become part of a growing movement working to make mental wellness support accessible for Africans.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {["Instagram", "TikTok", "X", "Facebook", "YouTube"].map((name) => (
            <span
              key={name}
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-primary"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </Section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-primary">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
      />
    </div>
  );
}
