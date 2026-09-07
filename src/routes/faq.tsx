import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { Section, SectionHeading } from "@/components/section";
import { CtaBanner } from "@/components/cta-banner";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/motion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Gimble Foundation" },
      {
        name: "description",
        content:
          "Answers to common questions about Gimble Foundation, the Gimble app, programs, community, getting involved, privacy, and support.",
      },
      { property: "og:title", content: "FAQ — Gimble Foundation" },
      {
        property: "og:description",
        content:
          "Answers to common questions about Gimble Foundation, the app, programs, community, and support.",
      },
      { property: "og:url", content: "https://www.gimblefoundation.org/faq" },
    ],
    links: [{ rel: "canonical", href: "https://www.gimblefoundation.org/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is Gimble Foundation?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Gimble Foundation is a nonprofit making mental fitness part of everyday life across Africa. We do this through technology, education, and community: a free mobile app, online and in-person learning, and programs that bring practical tools to campuses, workplaces, and communities.",
              },
            },
            {
              "@type": "Question",
              name: "What do you mean by mental fitness?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Mental fitness is the everyday practice of understanding how your mind works: recognising your patterns, handling pressure, managing your attention, and building the skills to navigate daily life better. Just like physical fitness, you build it through regular practice, not only when something is wrong.",
              },
            },
            {
              "@type": "Question",
              name: "Is Gimble a mental health treatment service?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Gimble is a mental fitness organisation, not a clinical service. We do not diagnose, treat, or provide therapy, and nothing we offer replaces care from a qualified professional.",
              },
            },
            {
              "@type": "Question",
              name: "Is Gimble really free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Every tool and resource we offer, including the app, is free to use. There are no subscriptions, paid tiers, or in-app purchases.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: FaqPage,
});

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

interface FaqSection {
  title: string;
  id?: string;
  items: FaqItem[];
}

const faqSections: FaqSection[] = [
  {
    title: "About Gimble Foundation",
    items: [
      {
        question: "What is Gimble Foundation?",
        answer:
          "Gimble Foundation is a nonprofit making mental fitness part of everyday life across Africa. We do this through technology, education, and community: a free mobile app, online and in-person learning, and programs that bring practical tools to campuses, workplaces, and communities.",
      },
      {
        question: "What do you mean by \"mental fitness\"?",
        answer:
          "Mental fitness is the everyday practice of understanding how your mind works: recognising your patterns, handling pressure, managing your attention, and building the skills to navigate daily life better. Just like physical fitness, you build it through regular practice, not only when something is wrong.",
      },
      {
        question: "Is Gimble a mental health treatment service?",
        answer: (
          <>
            No. Gimble is a mental fitness organisation, not a clinical service. We do not diagnose,
            treat, or provide therapy, and nothing we offer replaces care from a qualified
            professional. If you are struggling, please speak to a doctor, counsellor, or one of the
            support lines listed under{" "}
            <a href="#safety" className="text-primary underline underline-offset-4">
              Safety and support
            </a>{" "}
            below.
          </>
        ),
      },
      {
        question: "Who is Gimble for?",
        answer:
          "Anyone who wants to understand their mind better and build healthier mental habits, whether you are learning about mental fitness for the first time or already practising it. Our tools are designed with everyday African life in mind.",
      },
      {
        question: "Is Gimble really free?",
        answer:
          "Yes. Every tool and resource we offer, including the app, is free to use. There are no subscriptions, paid tiers, or in-app purchases.",
      },
      {
        question: "Where is Gimble Foundation based?",
        answer: (
          <>
            We are headquartered in Lagos, Nigeria, but work and serve the entire continent. You can
            reach us at{" "}
            <a
              href="mailto:hello@gimblefoundation.org"
              className="text-primary underline underline-offset-4"
            >
              hello@gimblefoundation.org
            </a>
            .
          </>
        ),
      },
    ],
  },
  {
    title: "The Gimble app",
    items: [
      {
        question: "What is the Gimble app?",
        answer:
          "The Gimble app is mental fitness in your pocket. It helps you understand your mind, build healthier mental habits, and practise mental fitness in everyday life through guided journeys, daily check-ins, practical tools, self-reflection exercises, and educational content.",
      },
      {
        question: "Where can I download it?",
        answer: (
          <>
            Gimble is available on iOS and Android.
            <br />
            <br />
            <a
              href="https://apps.apple.com/ng/app/gimble/id6759309522"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              App Store
            </a>
            <br />
            <a
              href="https://play.google.com/store/apps/details?id=com.gimble"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              Google Play
            </a>
          </>
        ),
      },
      {
        question: "What devices does it support?",
        answer:
          "iPhone and iPad running iOS 15.6 or later, and Android phones running Android 8.0 or later. There is no web or desktop version yet.",
      },
      {
        question: "How do I create an account?",
        answer:
          "Download the app, tap \"Get Started\", and sign up with your first name, last name, email address, and a password. We will email you a 6-digit code to confirm your address. You do not need an invite or access code.",
      },
      {
        question: "What happens after I sign up?",
        answer: (
          <>
            A short setup walks you through three things:
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>
                <strong>Choose your wellness coach.</strong> Pick the guide whose style suits you.
              </li>
              <li>
                <strong>Tell us what matters to you.</strong> Select the topics you care about so the
                app can personalise what it shows you. You can skip this.
              </li>
              <li>
                <strong>Set your reminders.</strong> Choose how often and at what time you would like
                a gentle nudge. You can change this later.
              </li>
            </ul>
          </>
        ),
      },
      {
        question: "What is a wellness coach?",
        answer:
          "Your wellness coach is a guide persona that shapes the tone of the app: gentle, reflective, practical, or direct. It is an AI fitness coach that helps determine what journeys, videos and tools you use. When you complete a skill-builder exercise, your coach gives you a short reflection on what you wrote. The coach is not a real person and not a chatbot. You cannot message or chat with it, and it is not a therapist.",
      },
      {
        question: "What can I do in the app?",
        answer: (
          <>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Daily check-in.</strong> A two-minute check-in on your mood, sleep, and
                stress, with a note on what contributed. Your check-ins build into charts so you can
                see your trends over time.
              </li>
              <li>
                <strong>Journeys.</strong> Structured multi-day programs with one short session a
                day, such as 30 Days of Mental Fitness, 7 Days to Sharper Focus, 30 Days to Better
                Sleep, and 21 Days to a Calmer Mind.
              </li>
              <li>
                <strong>Discover.</strong> Browse topics like sleep, anxiety, focus, and stress, or
                tell the app how you are feeling right now and get practices that take under five
                minutes.
              </li>
              <li>
                <strong>Guided breathing.</strong> Timed breathing techniques with a visual pacer and
                spoken guidance. Choose from techniques like 4-7-8, box breathing, and resonant
                breathing, for one to ten minutes.
              </li>
              <li>
                <strong>Skill builders.</strong> Structured exercises based on cognitive behavioural
                principles that help you examine your thinking, including the ABC model and
                Challenging Beliefs.
              </li>
              <li>
                <strong>Journals.</strong> A private space to write and reflect. Only you can see your
                journals.
              </li>
              <li>
                <strong>Habits.</strong> Small daily actions you want to keep. Pick from a catalogue
                or create your own, set a schedule, and track your streak.
              </li>
              <li>
                <strong>Library.</strong> Curated videos, audio guides, and reading material on mental
                fitness topics.
              </li>
              <li>
                <strong>Streaks and points.</strong> Complete at least one activity a day to build
                your streak and earn points as you go.
              </li>
            </ul>
          </>
        ),
      },
      {
        question: "Is the app based on any particular approach?",
        answer:
          "The skill-builder exercises follow cognitive behavioural principles, which focus on how thoughts, feelings, and actions influence each other. The app also draws on mindfulness practices, guided breathing, and habit-building techniques. The check-in questionnaires use widely recognised wellbeing measures.",
      },
      {
        question: "Does the app work offline?",
        answer:
          "No. The app needs an internet connection to load your content and save your progress. If your connection drops, the app will ask you to check your network and try again.",
      },
      {
        question: "What languages is the app available in?",
        answer: "English only at the moment.",
      },
      {
        question: "Does the app send notifications?",
        answer:
          "Yes, if you allow it. Reminders help you stay consistent with your check-ins, journeys, breathing practice, and habits. You choose the frequency and time during setup, and you can turn notifications off at any time in your device settings.",
      },
      {
        question: "I forgot my password. What do I do?",
        answer:
          "Tap \"Forgot password?\" on the sign-in screen and enter your email. We will send you a reset link. For your security the link expires after one hour.",
      },
      {
        question: "Can I sign in with fingerprint or Face ID?",
        answer:
          "Yes. After you sign in for the first time, the app offers to set up biometric login. You can still use your password at any time.",
      },
      {
        question: "Can I change the email address on my account?",
        answer: (
          <>
            Not from inside the app. For security, email changes are handled by our team. Send us a
            message from the email address on your account and we will help:{" "}
            <a
              href="mailto:hello@gimblefoundation.org"
              className="text-primary underline underline-offset-4"
            >
              hello@gimblefoundation.org
            </a>
            .
          </>
        ),
      },
      {
        question: "How do I delete my account?",
        answer:
          "Go to Profile, then Account and privacy, then Delete Account. Deletion takes 7 to 14 business days to complete. During that time you can still sign in. Once it is done, your personal data is permanently removed and you will receive a confirmation email. This cannot be undone.",
      },
    ],
  },
  {
    title: "Privacy and your data",
    items: [
      {
        question: "What information does the app collect?",
        answer:
          "Your name, email address, and password when you sign up, plus whatever you choose to add: check-ins, journal entries, habit logs, questionnaire answers, and your topic preferences. We also store a device token so we can send you reminders if you allow notifications.",
      },
      {
        question: "Does the app access my camera, microphone, location, or contacts?",
        answer:
          "No. The app asks for two things only: internet access, and permission to use your fingerprint or Face ID if you choose to enable biometric login. It does not read your health or step data.",
      },
      {
        question: "Who can see my journal and check-ins?",
        answer:
          "Only you. Journals and check-in notes are private to your account and are never shared or published.",
      },
      {
        question: "Do you sell or share my data?",
        answer:
          "No. We do not sell your personal data and we do not share it with advertisers. We use a small number of service providers to run the app, such as email delivery and push notifications, and they only process data on our behalf.",
      },
      {
        question: "Do you have a privacy policy?",
        answer: (
          <>
            Yes. You can read our{" "}
            <Link to="/privacy" className="text-primary underline underline-offset-4">
              privacy policy
            </Link>{" "}
            and our{" "}
            <Link to="/terms" className="text-primary underline underline-offset-4">
              terms of service
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    title: "Programs and community",
    items: [
      {
        question: "What programs does Gimble Foundation run?",
        answer: (
          <>
            Three core programs:
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>
                <strong>Digital Mental Fitness.</strong> The Gimble app: practical tools and guided
                experiences to help people understand their minds and build healthier habits.
              </li>
              <li>
                <strong>Community and Education.</strong> Online community, virtual events, learning
                sessions with psychologists, coaches, and practitioners, educational content, and
                mental fitness challenges.
              </li>
              <li>
                <strong>Outreach and Programs.</strong> Campus mental fitness programs, community
                workshops, mental fitness campaigns, workplace initiatives, and partnerships with
                NGOs and community groups.
              </li>
            </ul>
          </>
        ),
      },
      {
        question: "What is the Gimble Community?",
        answer:
          "A community for people who want to understand their minds. We bring people together to learn, exchange ideas, ask questions, and have honest conversations about mental fitness and everyday life.",
      },
      {
        question: "How do I join the community?",
        answer: (
          <>
            Enter your email on the{" "}
            <Link to="/community" className="text-primary underline underline-offset-4">
              Community page
            </Link>
            . We will send you updates about upcoming events, learning sessions, challenges, and
            other Gimble initiatives.
          </>
        ),
      },
      {
        question: "Do you run in-person events?",
        answer: (
          <>
            Yes. Our outreach program takes mental fitness beyond digital spaces through campus
            programs, community workshops, and campaigns. Subscribe on the{" "}
            <Link to="/community" className="text-primary underline underline-offset-4">
              Community page
            </Link>{" "}
            to hear about upcoming events, or{" "}
            <Link to="/contact" className="text-primary underline underline-offset-4">
              contact us
            </Link>{" "}
            if you would like to host one.
          </>
        ),
      },
      {
        question: "Can you bring a program to my school, workplace, or community?",
        answer: (
          <>
            Yes. We work with schools, workplaces, NGOs, and community groups to deliver mental
            fitness education and practical tools. Use the{" "}
            <Link to="/contact" className="text-primary underline underline-offset-4">
              contact form
            </Link>{" "}
            and choose "Campus program", "Workplace mental fitness", or "Partnership" as the
            subject, and tell us a little about your community.
          </>
        ),
      },
      {
        question: "Do your programs cost anything?",
        answer: "No. All Gimble Foundation programs and resources are free.",
      },
    ],
  },
  {
    title: "Getting involved",
    items: [
      {
        question: "How can I support Gimble Foundation?",
        answer: (
          <>
            There are three main ways:
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>
                <strong>Volunteer.</strong> Support our programs, events, campaigns, and community
                initiatives.
              </li>
              <li>
                <strong>Partner with us.</strong> Help bring mental fitness education to schools,
                workplaces, and communities.
              </li>
              <li>
                <strong>Become an ambassador.</strong> Help spread mental fitness education and
                encourage more people to build healthier mental habits.
              </li>
            </ul>
            Use the{" "}
            <Link to="/contact" className="text-primary underline underline-offset-4">
              contact form
            </Link>{" "}
            to tell us how you would like to help.
          </>
        ),
      },
      {
        question: "How do I become a volunteer?",
        answer: (
          <>
            Send us a message through the{" "}
            <Link to="/contact" className="text-primary underline underline-offset-4">
              contact form
            </Link>{" "}
            with "Volunteer" as the subject. Tell us where you are based, what you are interested in,
            and how much time you can give. We will get back to you with current opportunities.
          </>
        ),
      },
      {
        question: "What does an ambassador do?",
        answer:
          "Ambassadors help make mental fitness normal in their own circles: sharing what they learn, encouraging friends and colleagues, and supporting Gimble campaigns and events in their community.",
      },
      {
        question: "Can I donate?",
        answer: (
          <>
            We are setting up online donations. In the meantime, email{" "}
            <a
              href="mailto:hello@gimblefoundation.org"
              className="text-primary underline underline-offset-4"
            >
              hello@gimblefoundation.org
            </a>{" "}
            and we will share how you can give.
          </>
        ),
      },
      {
        question: "Can my organisation partner with or sponsor Gimble Foundation?",
        answer: (
          <>
            Yes. We welcome partnerships with NGOs, schools, employers, and community groups that
            want to bring mental fitness to more people. Choose "Partnership" on the{" "}
            <Link to="/contact" className="text-primary underline underline-offset-4">
              contact form
            </Link>{" "}
            and tell us what you have in mind.
          </>
        ),
      },
    ],
  },
  {
    title: "Safety and support",
    id: "safety",
    items: [
      {
        question: "What should I do if I am in crisis right now?",
        answer: (
          <>
            If you or someone near you is in immediate danger, call your local emergency number. In
            Nigeria, call <strong>112</strong>.
            <br />
            <br />
            Gimble is not an emergency service and cannot respond to crises. Please reach out to
            one of these free, confidential lines:
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>
                Safe Place Nigeria (She Writes Woman): <strong>0800 800 2000</strong>, 24/7 crisis
                counselling
              </li>
              <li>
                MANI Crisis Line (Mentally Aware Nigeria Initiative):{" "}
                <strong>0809 111 6264</strong> or <strong>0811 168 0686</strong>
              </li>
              <li>
                SURPIN (Suicide Prevention Initiative, LUTH):{" "}
                <strong>0908 021 7555</strong>, <strong>0903 440 0009</strong>,{" "}
                <strong>0811 190 9909</strong>, <strong>0701 381 1143</strong>
              </li>
              <li>
                Lagos Emergency Line: <strong>767</strong>
              </li>
            </ul>
            Help is available 24/7. You are not alone.
          </>
        ),
      },
      {
        question: "Where can I find crisis resources in the app?",
        answer:
          "Go to Profile, then Support options, then Crisis Resources. You will find emergency numbers and support lines for mental health, domestic violence, and child abuse.",
      },
      {
        question: "Can Gimble replace therapy or medication?",
        answer:
          "No. Gimble helps you build everyday mental fitness. It is not a substitute for therapy, counselling, medication, or any care prescribed by a health professional. If you are already receiving care, keep following your professional's advice. If you are unsure whether you need professional support, it is always worth asking.",
      },
      {
        question: "Someone I know is struggling. How can I help?",
        answer:
          "Listen without judgement, take what they say seriously, and encourage them to speak to a professional or contact one of the support lines above. If you believe they are in immediate danger, call 112 or your local emergency number.",
      },
    ],
  },
  {
    title: "Contact",
    items: [
      {
        question: "How do I contact Gimble Foundation?",
        answer: (
          <>
            Email{" "}
            <a
              href="mailto:hello@gimblefoundation.org"
              className="text-primary underline underline-offset-4"
            >
              hello@gimblefoundation.org
            </a>{" "}
            or use the{" "}
            <Link to="/contact" className="text-primary underline underline-offset-4">
              contact form
            </Link>{" "}
            on our website. You can also find us on Instagram (@gimblefoundation), TikTok
            (@gimblefoundation), and X (@gimbleorg).
          </>
        ),
      },
      {
        question: "How quickly will you reply?",
        answer: "We aim to respond within 2 business days.",
      },
      {
        question: "I need help with the app. Who do I contact?",
        answer: (
          <>
            Use the{" "}
            <Link to="/contact" className="text-primary underline underline-offset-4">
              contact form
            </Link>{" "}
            and choose "App support" as the subject, or email{" "}
            <a
              href="mailto:hello@gimblefoundation.org"
              className="text-primary underline underline-offset-4"
            >
              hello@gimblefoundation.org
            </a>{" "}
            with a description of the problem and the type of phone you are using.
          </>
        ),
      },
      {
        question: "I am a journalist. Who do I contact?",
        answer: (
          <>
            Choose "Press / media" on the{" "}
            <Link to="/contact" className="text-primary underline underline-offset-4">
              contact form
            </Link>{" "}
            or email{" "}
            <a
              href="mailto:hello@gimblefoundation.org"
              className="text-primary underline underline-offset-4"
            >
              hello@gimblefoundation.org
            </a>
            .
          </>
        ),
      },
    ],
  },
];

function FaqItem({ question, answer, index }: FaqItem & { index: number }) {
  return (
    <StaggerItem>
      <motion.details
        initial={false}
        className="group rounded-2xl border border-border bg-card px-5 py-5 open:ring-1 open:ring-primary/10"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-display text-lg font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg">
          <span className="pr-2">{question}</span>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground/60 transition group-open:border-primary/20 group-open:text-primary">
            <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" />
          </span>
        </summary>
        <div className="pt-4 text-sm leading-relaxed text-foreground/75 max-w-none [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold [&_strong]:text-foreground">
          {answer}
        </div>
      </motion.details>
    </StaggerItem>
  );
}

function FaqPage() {
  return (
    <>
      <Section className="!pb-12 !pt-20">
        <FadeUp>
          <SectionHeading
            as="h1"
            eyebrow="Help Centre"
            title="Frequently asked questions"
            description="Everything you need to know about Gimble Foundation, the app, our programs, and how to get involved."
            align="center"
          />
        </FadeUp>
      </Section>

      {faqSections.map((section) => (
        <Section key={section.title} id={section.id} className="!py-8">
          <FadeUp>
            <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
              {section.title}
            </h2>
          </FadeUp>
          <StaggerGroup className="mt-8 grid gap-4">
            {section.items.map((item, i) => (
              <FaqItem key={item.question} {...item} index={i} />
            ))}
          </StaggerGroup>
        </Section>
      ))}

      <Section className="!pt-8">
        <div className="mx-auto max-w-3xl rounded-3xl bg-secondary px-6 py-12 text-center sm:px-10">
          <h2 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
            Still have a question?
          </h2>
          <p className="mt-3 text-foreground/75">
            If you cannot find what you are looking for, send us a message and we will get back to
            you within 2 business days.
          </p>
          <motion.div
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 inline-block"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90"
            >
              Contact us
            </Link>
          </motion.div>
        </div>
      </Section>

      <CtaBanner
        title="Join the movement for mental fitness."
        subtitle="Download the app, explore our programs, or get in touch. However you choose to take part, you are helping make mental fitness part of everyday life."
        primary={{ label: "Get the App", to: "/app" }}
        secondary={{ label: "Get Involved", to: "/get-involved" }}
      />
    </>
  );
}
