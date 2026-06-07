"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionProps,
  type Variants,
} from "framer-motion";
import { forwardRef, useRef, type ElementType, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeUpReducedVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

type FadeUpProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
} & Omit<MotionProps, "variants" | "initial" | "whileInView" | "viewport" | "transition">;

export const FadeUp = forwardRef<HTMLElement, FadeUpProps>(function FadeUp(
  { as = "div", children, className, delay = 0, once = true, ...rest },
  ref,
) {
  const reduce = useReducedMotion();
  const Comp = motion(as as any);
  return (
    <Comp
      ref={ref as any}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      variants={reduce ? fadeUpReducedVariants : fadeUpVariants}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
});

export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.05,
  once = true,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  as?: ElementType;
}) {
  const Comp = motion(as as any);
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
  variant = "fadeUp",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  variant?: "fadeUp" | "scaleIn" | "slideRight";
}) {
  const reduce = useReducedMotion();
  const Comp = motion(as as any);
  const variants: Record<string, Variants> = {
    fadeUp: {
      hidden: { opacity: 0, y: 24 },
      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.9 },
      show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
    },
    slideRight: {
      hidden: { opacity: 0, x: -24 },
      show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
    },
  };
  const reducedVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.2 } },
  };
  return (
    <Comp className={className} variants={reduce ? reducedVariants : variants[variant]}>
      {children}
    </Comp>
  );
}

export function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  if (reduce) {
    return <span className={className}>{text}</span>;
  }
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
      }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline pb-1">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
            }}
          >
            {w}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function Parallax({
  children,
  className,
  offset = 60,
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

export function HoverLift({
  children,
  className,
  lift = -6,
}: {
  children: ReactNode;
  className?: string;
  lift?: number;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: lift, transition: { type: "spring", stiffness: 280, damping: 20 } }}
    >
      {children}
    </motion.div>
  );
}
