import { createFileRoute } from "@tanstack/react-router";

import { Section, SectionHeading } from "@/components/section";
import { FadeUp } from "@/components/motion";

export const Route = createFileRoute("/delete-account")({
  head: () => ({
    meta: [
      { title: "Delete Your Account — Gimble Foundation" },
      {
        name: "description",
        content:
          "How to delete your Gimble account and personal data from the Gimble app, what gets removed, and how long deletion takes.",
      },
      { property: "og:title", content: "Delete Your Account — Gimble Foundation" },
      {
        property: "og:description",
        content:
          "How to delete your Gimble account and personal data from the Gimble app, what gets removed, and how long deletion takes.",
      },
      { property: "og:url", content: "https://www.gimblefoundation.org/delete-account" },
    ],
    links: [{ rel: "canonical", href: "https://www.gimblefoundation.org/delete-account" }],
  }),
  component: DeleteAccountPage,
});

function DeleteAccountPage() {
  return (
    <>
      <Section className="!pb-12 !pt-20">
        <FadeUp>
          <SectionHeading
            as="h1"
            eyebrow="Your data"
            title="Delete your account"
            description="You're in control of your data. This page explains how to permanently delete your Gimble account and what happens to your information when you do."
          />
        </FadeUp>
      </Section>

      <Section className="!pt-0">
        <article className="prose prose-sm max-w-none text-foreground/80">
          <h2 className="font-display text-2xl font-semibold text-primary">1. Delete from the app</h2>
          <p>The fastest way to delete your account is directly in the Gimble app:</p>
          <ol>
            <li>Open the Gimble app and sign in.</li>
            <li>
              Go to <strong>Profile</strong>, then <strong>Account and privacy</strong>.
            </li>
            <li>
              Select <strong>Delete Account</strong>.
            </li>
            <li>Confirm your choice when prompted.</li>
          </ol>

          <h2 className="font-display text-2xl font-semibold text-primary">2. Delete by email</h2>
          <p>
            If you can't access the app, email{" "}
            <a
              href="mailto:hello@gimblefoundation.org?subject=Account%20deletion%20request"
              className="text-primary underline underline-offset-4"
            >
              hello@gimblefoundation.org
            </a>{" "}
            with the subject line <strong>Account deletion request</strong> from the email address
            linked to your account. We'll verify your identity and process the request within 7 to
            14 business days.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">3. What gets deleted</h2>
          <ul>
            <li>Your account profile and sign-in details.</li>
            <li>Your check-ins, journal entries, and activity history.</li>
            <li>Your preferences and app settings.</li>
            <li>Your newsletter subscription, if you have one.</li>
          </ul>

          <h2 className="font-display text-2xl font-semibold text-primary">4. What we may keep</h2>
          <p>
            Some information may be retained where the law requires it or where it has been
            anonymised:
          </p>
          <ul>
            <li>
              Anonymised, aggregated statistics that can no longer identify you, used to measure
              our impact.
            </li>
            <li>Records we must keep for legal, accounting, or safeguarding purposes.</li>
          </ul>

          <h2 className="font-display text-2xl font-semibold text-primary">5. Timing</h2>
          <p>
            Deletion takes 7 to 14 business days to complete. During that time you can still sign
            in. Once it is done, your personal data is permanently removed and you will receive a
            confirmation email. This cannot be undone.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">6. Questions</h2>
          <p>
            For any questions about account deletion or your data, contact us at{" "}
            <a
              href="mailto:hello@gimblefoundation.org"
              className="text-primary underline underline-offset-4"
            >
              hello@gimblefoundation.org
            </a>
            . You can also read our{" "}
            <a href="/privacy" className="text-primary underline underline-offset-4">
              Privacy Policy
            </a>{" "}
            for full details on how we handle personal information.
          </p>

          <p className="text-sm text-foreground/50">
            Last updated: {new Date().toLocaleDateString("en-GB")}
          </p>
        </article>
      </Section>
    </>
  );
}
