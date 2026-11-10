"use client";

// npm i motion
import { motion, useReducedMotion } from "motion/react";

/**
 * Decorative line-art leaf sprig that draws itself when scrolled into view.
 * Colour comes from the text colour, so size and colour it with className:
 *   <LeafSprig className="absolute right-0 top-0 h-40 text-golden-pastel/50" />
 * Use `flip` to mirror it.
 */
export default function LeafSprig({ className = "", flip = false, delay = 0.3 }) {
  const reduce = useReducedMotion();
  const paths = [
    "M50 200 C56 140 56 80 42 10",
    "M54 150 C88 148 106 118 102 96 C74 100 56 120 54 150Z",
    "M52 108 C20 100 18 68 26 50 C50 58 58 84 52 108Z",
    "M50 70 C78 66 90 44 86 26 C62 30 50 48 50 70Z",
  ];
  return (
    <svg
      viewBox="0 0 120 200"
      aria-hidden="true"
      className={`pointer-events-none ${flip ? "-scale-x-100" : ""} ${className}`}
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          initial={{ pathLength: reduce ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut", delay: delay + i * 0.12 }}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
