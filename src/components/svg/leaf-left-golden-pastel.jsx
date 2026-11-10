import { motion } from "motion/react";

export default function LeafLeftOldLace({ className, reduce }) {
  const p = {
    initial: { pathLength: reduce ? 1 : 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true },
    transition: { duration: 1.6, ease: "easeInOut", delay: 0.6 },
    fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round",
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 280" fill="none" className={className}>
      <g transform="translate(160 0) scale(-1 1)" stroke="#F9DC78" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <motion.path d="M18 260 C42 222 45 174 53 119 C57 82 57 48 53 18" {...p} />
        <motion.path d="M53 120 C25 87 29 43 53 16 C78 49 80 87 53 120Z" {...p} />
        <motion.path d="M53 120 C51 76 52 43 53 16" {...p} />
        <motion.path d="M48 192 C63 149 95 119 139 101 C132 145 101 178 48 192Z" {...p} />
        <motion.path d="M48 192 C81 155 111 126 139 101" {...p} />
        <motion.path d="M20 253 C49 219 89 203 143 205 C117 239 76 255 20 253Z" {...p} />
        <motion.path d="M20 253 C64 229 104 213 143 205" {...p} />
      </g>
    </svg>
  )
}
