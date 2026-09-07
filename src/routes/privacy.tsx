import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, SectionHeading } from "@/components/section";
import { FadeUp } from "@/components/motion";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Gimble Foundation" },
      {
        name: "description",
        content:
          "Privacy policy for the Gimble Foundation website and mobile app. Learn what data we collect, how we use it, and your rights.",
      },
      { property: "og:title", content: "Privacy Policy — Gimble Foundation" },
      {
        property: "og:description",
        content:
          "Privacy policy for the Gimble Foundation website and mobile app. Learn what data we collect, how we use it, and your rights.",
      },
      { property: "og:url", content: "https://www.gimblefoundation.org/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://www.gimblefoundation.org/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <Section className="!pb-12 !pt-20">
        <FadeUp>
          <SectionHeading
            as="h1"
            eyebrow="Legal"
            title="Privacy Policy"
            description="This policy explains how Gimble Foundation collects, uses, stores, and protects your personal information when you use our website or mobile app."
          />
        </FadeUp>
      </Section>

      <Section className="!pt-0">
        <article className="prose prose-sm max-w-none text-foreground/80">
          <h2 className="font-display text-2xl font-semibold text-primary">1. Who we are</h2>
          <p>
            Gimble Foundation is a nonprofit organisation headquartered in Lagos, Nigeria, working to
            make mental fitness part of everyday life across Africa. We operate the website at{" "}
            <a
              href="https://www.gimblefoundation.org"
              className="text-primary underline underline-offset-4"
            >
              www.gimblefoundation.org
            </a>{" "}
            and the Gimble mobile app.
          </p>
          <p>
            For privacy questions, contact us at{" "}
            <a
              href="mailto:hello@gimblefoundation.org"
              className="text-primary underline underline-offset-4"
            >
              hello@gimblefoundation.org
            </a>
            .
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">2. Information we collect</h2>
          <p>We collect only the information we need to provide and improve our services.</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Account information.</strong> When you create an account in the app, we
              collect your first name, last name, email address, and password.
            </li>
            <li>
              <strong>Content you create.</strong> Check-ins, journal entries, habit logs,
              questionnaire answers, topic preferences, and skill-builder reflections. This content
              is private to your account.
            </li>
            <li>
              <strong>Device and technical information.</strong> Device type, operating system,
              app version, and a push-notification device token if you choose to enable reminders.
            </li>
            <li>
              <strong>Website form submissions.</strong> When you use our contact form, subscribe to
              updates, or join the community list, we collect the email address and any details you
              provide.
            </li>
            <li>
              <strong>Usage data.</strong> Aggregated information about how the app and website are
              used, such as feature usage and crash reports, to help us improve stability and
              experience.
            </li>
          </ul>

          <h2 className="font-display text-2xl font-semibold text-primary">3. How we use your information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Provide, personalise, and maintain the Gimble app and website.</li>
            <li>Send you the reminders, updates, and communications you have opted into.</li>
            <li>Respond to your questions, feedback, and support requests.</li>
            <li>Improve our tools, content, and programs.</li>
            <li>Keep the app secure and troubleshoot issues.</li>
            <li>Comply with legal obligations and protect our rights.</li>
          </ul>

          <h2 className="font-display text-2xl font-semibold text-primary">4. Legal basis for processing</h2>
          <p>
            We process your personal data based on one or more of the following grounds: your
            consent, the need to perform a contract with you (such as providing the app), our
            legitimate interest in operating and improving our nonprofit services, or compliance
            with applicable law.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">5. Who can see your data</h2>
          <p>
            Your journal entries, check-in notes, and other personal content are visible only to
            you. They are not shared, published, or reviewed by our team unless you explicitly
            request support and provide permission.
          </p>
          <p>
            We use a small number of trusted service providers to run our services, such as cloud
            hosting, email delivery, and push notifications. These providers only process data on
            our behalf and under strict confidentiality and security obligations.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">6. Data sharing and selling</h2>
          <p>
            We do not sell your personal data. We do not share your personal data with advertisers.
            We only share information when required by law, to protect our rights and safety, or with
            service providers who help us deliver the app and website.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">7. Data retention</h2>
          <p>
            We keep your personal data for as long as your account is active or as needed to provide
            you with our services. If you delete your account, we remove your personal data within 7
            to 14 business days, except where we are required to keep it for legal, security, or
            operational reasons.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">8. Your rights</h2>
          <p>Depending on where you live, you may have the right to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Access the personal data we hold about you.</li>
            <li>Correct inaccurate or incomplete information.</li>
            <li>Delete your account and personal data.</li>
            <li>Object to or restrict certain processing.</li>
            <li>Withdraw consent at any time.</li>
          </ul>
          <p>
            To exercise any of these rights, email us at{" "}
            <a
              href="mailto:hello@gimblefoundation.org"
              className="text-primary underline underline-offset-4"
            >
              hello@gimblefoundation.org
            </a>
            .
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">9. Security</h2>
          <p>
            We take reasonable technical and organisational measures to protect your information,
            including encryption in transit, access controls, and secure infrastructure. However, no
            online service can guarantee complete security. Please keep your account credentials safe
            and contact us if you suspect unauthorised access.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">10. Children's privacy</h2>
          <p>
            The Gimble app and website are intended for users aged 13 and older. If you are under
            18, please use our services with the involvement of a parent or guardian. We do not
            knowingly collect personal data from children under 13. If we learn that we have
            collected data from a child under 13, we will delete it promptly.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">11. International data transfers</h2>
          <p>
            Gimble Foundation is based in Nigeria and uses service providers that may process data in
            other countries. By using our services, you understand that your information may be
            transferred to and processed in jurisdictions with different data-protection laws. We
            take steps to ensure appropriate safeguards are in place.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">12. Cookies and similar technologies</h2>
          <p>
            Our website does not use tracking cookies for advertising. We may use essential cookies
            or local storage to remember your preferences, such as dark mode, and to keep the site
            functioning properly.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">13. Third-party links</h2>
          <p>
            Our website and app may contain links to third-party websites or services, such as app
            stores or partner organisations. This privacy policy does not apply to those services.
            Please review their privacy policies before sharing your information.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">14. Changes to this policy</h2>
          <p>
            We may update this privacy policy from time to time. If we make material changes, we will
            post the updated policy on this page with a revised effective date. Continued use of our
            services after changes means you accept the updated policy.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">15. Contact us</h2>
          <p>
            If you have any questions about this privacy policy or how we handle your data, please
            contact us at{" "}
            <a
              href="mailto:hello@gimblefoundation.org"
              className="text-primary underline underline-offset-4"
            >
              hello@gimblefoundation.org
            </a>{" "}
            or through our{" "}
            <Link to="/contact" className="text-primary underline underline-offset-4">
              contact form
            </Link>
            .
          </p>

          <p className="mt-8 text-sm text-foreground/60">
            Last updated: {new Date().toLocaleDateString("en-GB")}
          </p>
        </article>
      </Section>
    </>
  );
}
