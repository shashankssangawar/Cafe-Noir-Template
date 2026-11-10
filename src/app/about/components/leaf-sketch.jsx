"use client";

import { motion } from "framer-motion";

const paths = [
  "M40 98C40 70 42 40 52 6", // stem
  "M41 80c-12-2-20-10-22-22 12 2 20 10 22 22z",
  "M42 62c12-3 18-12 18-24-12 3-18 12-18 24z",
  "M44 44c-12-3-18-12-18-24 12 3 18 12 18 24z",
  "M48 28c9-3 13-10 13-19-9 3-13 10-13 19z",
];

const svg = {
  hidden: {},
  show: { transition: { staggerChildren: 0.25 } },
};
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: "easeInOut" },
  },
};

// Decorative line-art sprig that draws itself once when scrolled into view.
export default function LeafSketch({ className = "" }) {
  return (
    <motion.svg
      viewBox="0 0 80 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
      variants={svg}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {paths.map((d) => (
        <motion.path key={d} d={d} variants={draw} />
      ))}
    </motion.svg>
  );
}
