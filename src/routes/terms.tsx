import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, SectionHeading } from "@/components/section";
import { FadeUp } from "@/components/motion";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Gimble Foundation" },
      {
        name: "description",
        content:
          "Terms of service for using the Gimble Foundation website and mobile app.",
      },
      { property: "og:title", content: "Terms of Service — Gimble Foundation" },
      {
        property: "og:description",
        content:
          "Terms of service for using the Gimble Foundation website and mobile app.",
      },
      { property: "og:url", content: "https://www.gimblefoundation.org/terms" },
    ],
    links: [{ rel: "canonical", href: "https://www.gimblefoundation.org/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <Section className="!pb-12 !pt-20">
        <FadeUp>
          <SectionHeading
            as="h1"
            eyebrow="Legal"
            title="Terms of Service"
            description="These terms govern your use of the Gimble Foundation website and mobile app. Please read them carefully."
          />
        </FadeUp>
      </Section>

      <Section className="!pt-0">
        <article className="prose prose-sm max-w-none text-foreground/80">
          <h2 className="font-display text-2xl font-semibold text-primary">1. About Gimble Foundation</h2>
          <p>
            Gimble Foundation is a nonprofit organisation making mental fitness part of everyday life
            across Africa. Our website and mobile app provide educational content, practical tools,
            and community resources to support everyday mental fitness.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">2. Not medical or clinical advice</h2>
          <p>
            Gimble is a mental fitness organisation, not a healthcare provider. Nothing on our
            website or app is medical, psychological, or psychiatric advice, diagnosis, or
            treatment. If you are experiencing a mental health crisis or need professional support,
            please contact a qualified professional or emergency service immediately.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">3. Using our services</h2>
          <p>
            You must be at least 13 years old to use our services. If you are under 18, you should
            use our services with the involvement of a parent or guardian. You agree to use the
            website and app only for lawful purposes and in a way that does not infringe the rights
            of others or restrict anyone else's use of the services.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">4. Your account</h2>
          <p>
            When you create an account in the Gimble app, you are responsible for keeping your login
            details secure. Please do not share your password with others. You agree to provide
            accurate information and to update it if anything changes.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">5. Content and intellectual property</h2>
          <p>
            All content on the Gimble Foundation website and app, including text, graphics, logos,
            images, audio, and software, belongs to Gimble Foundation or its licensors and is
            protected by copyright and other intellectual property laws. You may use the content for
            personal, non-commercial purposes only. You may not copy, modify, distribute, or
            reproduce our content without written permission.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">6. User-generated content</h2>
          <p>
            Any content you create in the app, such as journal entries, check-in notes, or habit
            logs, is private to your account. You retain ownership of your own content. By using our
            services, you give us the limited permission we need to store, process, and display your
            content so the app can function.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">7. Prohibited conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Use our services to harass, abuse, or harm others.</li>
            <li>Attempt to gain unauthorised access to our systems or another user's account.</li>
            <li>Interfere with the proper working of the website or app.</li>
            <li>Use our services to distribute spam, malware, or illegal content.</li>
            <li>Impersonate another person or organisation.</li>
          </ul>

          <h2 className="font-display text-2xl font-semibold text-primary">8. Termination</h2>
          <p>
            We may suspend or terminate your access to our services if you violate these terms or if
            your use of the services creates risk or legal exposure for Gimble Foundation. You may
            delete your account at any time through the app.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">9. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Gimble Foundation and its team members will not
            be liable for any indirect, incidental, special, or consequential damages arising from
            your use of our services. Our total liability to you for any claim arising from these
            terms or your use of the services will not exceed the amount you have paid us for the
            services in the past 12 months. Because our services are free, this amount is zero.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">10. Changes to these terms</h2>
          <p>
            We may update these terms from time to time. If we make material changes, we will
            notify you by posting the updated terms on this page with a revised effective date.
            Continued use of our services after changes means you accept the updated terms.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">11. Governing law</h2>
          <p>
            These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes
            arising from these terms or your use of our services will be resolved in the courts of
            Lagos, Nigeria.
          </p>

          <h2 className="font-display text-2xl font-semibold text-primary">12. Contact us</h2>
          <p>
            If you have any questions about these terms, please contact us at{" "}
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

          <p className="mt-8 text-sm text-foreground/60">Last updated: {new Date().toLocaleDateString("en-GB")}</p>
        </article>
      </Section>
    </>
  );
}
