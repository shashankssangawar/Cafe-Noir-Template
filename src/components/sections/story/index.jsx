import Button from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const FEATURES = [
  { label: ["Premium Beans", "Sourced Globally"], icon: "bean" },
  { label: ["A Warm &", "Welcoming Space"], icon: "heart" },
  { label: ["Fresh Ingredients", "Always"], icon: "leaf" },
];

const ease = [0.22, 1, 0.36, 1];

/* ---------- Line icons that draw themselves ---------- */
function Icon({ name, delay, reduce }) {
  const p = {
    variants: {
      hidden: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
      show: { pathLength: 1, opacity: 1, transition: { duration: 1.1, delay, ease: "easeInOut" } },
    },
    fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round",
  };
  return (
    <svg width="46" height="46" viewBox="0 0 48 48" aria-hidden="true">
      {name === "bean" && (<>
        <motion.ellipse cx="24" cy="24" rx="12" ry="18" transform="rotate(40 24 24)" {...p} />
        <motion.path d="M13 35 C 22 30, 26 18, 35 13" {...p} />
      </>)}
      {name === "heart" && (
        <motion.path d="M24 41 C8 30 6 19 12 14 C17 10 22 13 24 18 C26 13 31 10 36 14 C42 19 40 30 24 41Z" {...p} />
      )}
      {name === "leaf" && (<>
        <motion.path d="M10 36 C8 18 22 8 40 8 C40 26 30 40 10 36Z" {...p} />
        <motion.path d="M10 36 C18 26 26 20 34 14" {...p} />
      </>)}
    </svg>
  );
}

/* ---------- Placeholder interior (pass a real photo via the `image` prop) ---------- */
function Interior() {
  return (
    <svg viewBox="0 0 600 520" preserveAspectRatio="xMidYMid slice" className="block size-full" aria-hidden="true">
      <defs>
        <linearGradient id="os-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d8b18a" /><stop offset="1" stopColor="#c99a6e" />
        </linearGradient>
        <radialGradient id="os-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffe3a8" stopOpacity=".9" /><stop offset="1" stopColor="#ffe3a8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="520" fill="url(#os-wall)" />
      <path d="M170 400 V200 a130 130 0 0 1 260 0 V400Z" fill="#e6c6a0" />
      <path d="M205 400 V215 a95 95 0 0 1 190 0 V400Z" fill="#d3a97c" />
      <rect y="400" width="600" height="120" fill="#b98558" />
      {[[330, 150, 40], [470, 190, 30]].map(([x, y, r], i) => (
        <g key={i}>
          <line x1={x} y1="0" x2={x} y2={y} stroke="#3b2a1c" strokeWidth="2" />
          <circle cx={x} cy={y + 14} r={r * 1.6} fill="url(#os-glow)" />
          <path d={`M${x - r} ${y + 18} Q${x} ${y - 14} ${x + r} ${y + 18}Z`} fill="#2f2117" />
        </g>
      ))}
      <rect x="150" y="320" width="270" height="12" rx="4" fill="#8b5e3a" />
      <rect x="170" y="332" width="8" height="90" fill="#6d4727" />
      <rect x="392" y="332" width="8" height="90" fill="#6d4727" />
      <path d="M44 440 h96 l-10 70 h-76Z" fill="#e8e2d2" />
      <g fill="#4f7a3e">
        {[[92, 360, -50], [92, 360, 0], [92, 360, 50], [92, 400, -80], [92, 400, 75], [92, 330, -25], [92, 330, 30]].map(([x, y, a], i) => (
          <ellipse key={i} cx={x} cy={y - 38} rx="22" ry="48" transform={`rotate(${a} ${x} ${y})`} opacity={0.75 + (i % 3) * 0.08} />
        ))}
      </g>
    </svg>
  );
}

export default function OurStory({ image }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : ["-6%", "6%"]);

  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  };

  return (
    <section ref={ref} id="about" className="overflow-hidden">
      <div className="grid items-center gap-10 px-[6vw] lg:grid-cols-[1.15fr_1fr_.8fr] lg:gap-14 lg:pl-0">
        {/* Photo: opens upward, then drifts slightly while scrolling */}
        <motion.div
          initial={{ clipPath: reduce ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease }}
          className="-mx-[6vw] h-[clamp(320px,38vw,460px)] overflow-hidden rounded-tr-[160px] bg-[#d8b18a] lg:mx-0 lg:rounded-tr-[260px]"
        >
          <motion.div style={{ y: imgY }} className="-mt-[8%] h-[116%]">
            {image ? <img src={image} alt="Inside Café Noir" className="block size-full object-cover" /> : <Interior />}
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ staggerChildren: 0.12, delayChildren: 0.3 }}
        >
          <motion.p variants={rise} className="mb-5 flex items-center gap-3.5 text-[13px] font-medium uppercase tracking-[.18em]">
            Our Story
            <motion.span
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, delay: 0.5, ease } } }}
              className="block h-px w-9 origin-left bg-cafe-noir"
            />
          </motion.p>

          <motion.h1 variants={rise} className="mb-5 text-[clamp(36px,4.2vw,56px)] leading-[1.08]">
            More Than Just<br />a Café
          </motion.h1>

          <motion.p variants={rise} className="mb-8 max-w-[42ch] text-[17px] leading-relaxed text-coffee">
            Café Noir is a cozy space where ideas brew, conversations flow, and every cup tells a story.
          </motion.p>

          <motion.a
            variants={rise}
            href="#story"
          >
            <Button>
              Our Story
              <ArrowRight className="size-4" />
            </Button>
          </motion.a>
        </motion.div>

        {/* Features: divider grows, then each icon draws in */}
        <motion.ul
          initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="relative flex flex-col gap-10 pt-8 lg:py-2 lg:pl-12"
        >
          <motion.span
            variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { duration: 1, delay: 0.4, ease } } }}
            className="absolute left-0 top-0 h-px w-full origin-top-left bg-line lg:-bottom-8 lg:-top-8 lg:h-auto lg:w-px"
          />
          {FEATURES.map((f, i) => (
            <motion.li
              key={f.icon}
              variants={{
                hidden: { opacity: 0, x: reduce ? 0 : 24 },
                show: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.7 + i * 0.2, ease } },
              }}
              whileHover={reduce ? undefined : { x: 6 }}
              className="flex items-center gap-5 text-[15px] leading-normal"
            >
              <span className="grid size-14 flex-none place-items-center rounded-full bg-golden-pastel/30 text-cafe-noir">
                <Icon name={f.icon} delay={0.8 + i * 0.2} reduce={reduce} />
              </span>
              <span>{f.label[0]}<br />{f.label[1]}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
