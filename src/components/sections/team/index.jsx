// npm i motion
import { motion, useReducedMotion } from "motion/react";
import LeafSprig from "../values/LeafSprig";
import LeafRightGrullo from "@/components/svg/leaf-right-grullo";
import LeafLeftGrullo from "@/components/svg/leaf-left-grullo";
import { COMMON_IMAGES_LINKS, COMMON_IMAGES_SEO } from "@/constants/seo/image";

const ease = [0.22, 1, 0.36, 1];

// Add a `photo: "/team/ananya.jpg"` to any member to use a real portrait.
const TEAM = [
  {
    name: "Ananya Sharma",
    role: COMMON_IMAGES_SEO.HOME.TEAM.ANANYA_SHARMA,
    photo: COMMON_IMAGES_LINKS.HOME.TEAM.ANANYA_SHARMA,
  },
  {
    name: "Rohan Mehta",
    role: COMMON_IMAGES_SEO.HOME.TEAM.ROHAN_MEHTA,
    photo: COMMON_IMAGES_LINKS.HOME.TEAM.ROHAN_MEHTA,
  },
  {
    name: "Priya Nair",
    role: COMMON_IMAGES_SEO.HOME.TEAM.PRIYA_NAIR,
    photo: COMMON_IMAGES_LINKS.HOME.TEAM.PRIYA_NAIR,
  },
  {
    name: "Arjun Kapoor",
    role: COMMON_IMAGES_SEO.HOME.TEAM.ARJUN_KAPOOR,
    photo: COMMON_IMAGES_LINKS.HOME.TEAM.ARJUN_KAPOOR,
  },
];

/* ---------- Placeholder portrait ---------- */
function Avatar({ m }) {
  return (
    <svg viewBox="0 0 120 120" className="block size-full" role="img" aria-label={`Portrait of ${m.name}`}>
      <rect width="120" height="120" fill="#e9dcc0" />
      <path d="M14 120 C16 88 38 80 60 80 C82 80 104 88 106 120Z" fill={m.shirt} />
      <rect x="52" y="68" width="16" height="16" rx="6" fill={m.skin} />
      <ellipse cx="60" cy="52" rx="19" ry="23" fill={m.skin} />
      <path d="M40 50 C38 28 56 22 68 26 C82 30 84 44 80 52 C76 40 66 36 56 38 C48 40 42 44 40 50Z" fill={m.hair} />
    </svg>
  );
}

export default function Team() {
  const reduce = useReducedMotion();
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  };

  return (
    <section id="team" className="relative overflow-hidden px-[6vw] py-16">
      <LeafRightGrullo className="absolute left-0 top-6 hidden h-[200px] md:block" />
      <LeafLeftGrullo flip className="absolute right-0 top-6 hidden h-[200px] md:block" />

      <motion.div
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}
        transition={{ staggerChildren: 0.1 }}
        className="relative mx-auto max-w-[1100px]"
      >
        <div className="mb-12 text-center">
          <motion.p variants={rise} className="mb-3 text-[12px] font-medium uppercase tracking-[.22em] text-coffee">
            Our Team
            <span className={"w-8 h-px bg-cafe-noir"} />
          </motion.p>
          <motion.h1 variants={rise} className="mb-3 font-display text-[clamp(32px,4vw,46px)] leading-tight">
            The People Behind Café Noir
          </motion.h1>
          <motion.p variants={rise} className="mx-auto max-w-[56ch] text-[16px] text-coffee">
            A passionate team dedicated to bringing you the best coffee experience.
          </motion.p>
        </div>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {TEAM.map((m) => (
            <motion.li key={m.name} variants={rise} whileHover="hover" className="text-center">
              <motion.div
                variants={{ hover: reduce ? {} : { y: -6 } }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="mx-auto mb-4 size-[150px] overflow-hidden rounded-full border-2 border-line p-1 transition-colors duration-300 hover:border-ebony md:size-[170px]"
              >
                <motion.div
                  variants={{ hover: reduce ? {} : { scale: 1.08 } }}
                  transition={{ duration: 0.5, ease }}
                  className="size-full overflow-hidden rounded-full"
                >
                  {m.photo ? <img src={m.photo} alt={m.name} className="block size-full object-cover" /> : <Avatar m={m} />}
                </motion.div>
              </motion.div>
              <p className="font-semibold">{m.name}</p>
              <p className="mt-0.5 text-[14px] text-coffee">{m.role}</p>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
