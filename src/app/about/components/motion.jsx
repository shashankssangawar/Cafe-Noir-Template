"use client";

import Link from "next/link";
import {
  motion,
  MotionConfig,
  useReducedMotion
} from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "-80px" };

/** Wrap the app once (layout.js) so transform animations respect "reduce motion". */
export function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fade + slide in when scrolled into view. direction: up | left | right */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 24,
  className,
  as = "div",
}) {
  const Tag = motion[as];
  const offset = {
    up: { y: distance },
    left: { x: -distance },
    right: { x: distance },
  }[direction];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/**
 * Image frame: the shape wipes open while the photo settles from a slight zoom.
 * Pass the rounded/overflow classes in `className`; children = <Image fill />.
 */
export function ImageReveal({ children, className, from = "left", delay = 0 }) {
  const reduce = useReducedMotion();
  const hidden = from === "left" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: hidden }}
      whileInView={{ clipPath: "inset(0 0% 0 0%)" }}
      viewport={VIEWPORT}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.4, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ---------- Stagger groups ---------- */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

export function Stagger({ children, className, as = "ul" }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ children, className, as = "li", lift = false }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={item}
      whileHover={lift ? { y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </Tag>
  );
}

/* ---------- Button / link with press feedback ---------- */
const MotionLink = motion.create(Link);

export function MotionButtonLink({ children, className, ...props }) {
  return (
    <MotionLink
      className={`group ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      {...props}
    >
      {children}
    </MotionLink>
  );
}
