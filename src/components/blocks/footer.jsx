'use client';

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import LeafRightOldLace from "../svg/leaf-right-golden-pastel";
import { PAGE } from "@/constants/seo/links";

const ease = [0.22, 1, 0.36, 1];

const LINKS = [
  { label: "Home", href: PAGE.LINKS.HERO },
  { label: "Menu", href: PAGE.LINKS.MENU },
  { label: "About", href: PAGE.LINKS.ABOUT },
  { label: "Specials", href: PAGE.LINKS.SPECIALS },
  { label: "Contact", href: PAGE.LINKS.CONTACT_US },
];

export default function Footer() {
  const reduce = useReducedMotion();
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  };
  const [date, setDate] = useState(null);

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <footer id="contact" className="relative overflow-hidden bg-cafe-noir text-old-lace">
      {/* leaf sprig, draws itself once */}
      <LeafRightOldLace className={'absolute -left-2 top-2 hidden h-[75%] md:block'} reduce={reduce} />

      {/* Desktop View */}
      <motion.div
        variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        className="relative md:block hidden mx-auto max-w-[1400px] px-[6vw] pb-6 pt-12"
      >
        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-12 md:pl-[4vw]">
          <motion.div variants={item}>
            <h1 className="text-3xl leading-none">Café Noir</h1>
            <p className="mt-2 text-[15px] text-golden-pastel">Sip. Relax. Repeat.</p>
          </motion.div>

          <motion.nav variants={item} aria-label="Footer">
            <ul className="flex flex-wrap gap-x-9 gap-y-3 text-[15px]">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group relative inline-block py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-golden-pastel"
                  >
                    {l.label}
                    <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-golden-pastel transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.address variants={item} className="flex items-start gap-3 text-[15px] not-italic leading-relaxed md:justify-self-end">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-none text-golden-pastel" aria-hidden="true">
              <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" />
            </svg>
            <span>123 Brew Street,<br />New Delhi, India</span>
          </motion.address>
        </div>

        {/* divider grows across, then legal row fades in */}
        <motion.div
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, ease } } }}
          className="mb-5 mt-10 h-px origin-left bg-old-lace/20"
        />
        <motion.div variants={item} className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-old-lace/80">
          <p>© {date?.getFullYear() || '2026'} Café Noir. All rights reserved.</p>
          <p className="flex items-center gap-3">
            <a href="#privacy" className="hover:text-golden-pastel focus-visible:outline-2 focus-visible:outline-golden-pastel">Privacy Policy</a>
            <span aria-hidden="true" className="h-3 w-px bg-old-lace/40" />
            <a href="#terms" className="hover:text-golden-pastel focus-visible:outline-2 focus-visible:outline-golden-pastel">Terms of Service</a>
          </p>
        </motion.div>
      </motion.div>

      {/* Mobile View */}
      <motion.div
        variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        className="relative block md:hidden mx-auto max-w-[1400px] px-[6vw] pb-6 pt-12"
      >
        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-12 md:pl-[4vw]">
          <motion.div variants={item} className="flex items-center gap-6 justify-between">
            <div>
              <h1 className="text-3xl leading-none">Café Noir</h1>
              <p className="mt-2 text-[15px] text-golden-pastel">Sip. Relax. Repeat.</p>
            </div>

            <motion.address variants={item} className="flex items-start gap-3 text-[15px] not-italic leading-relaxed md:justify-self-end">
              <span>123 Brew Street,<br />New Delhi, India</span>
            </motion.address>
          </motion.div>

          <motion.nav variants={item} aria-label="Footer">
            <ul className="flex flex-wrap gap-x-9 gap-y-3 text-[15px]">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group relative inline-block py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-golden-pastel"
                  >
                    {l.label}
                    <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-golden-pastel transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>

        {/* divider grows across, then legal row fades in */}
        <motion.div
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, ease } } }}
          className="mb-5 mt-10 h-px origin-left bg-old-lace/20"
        />
        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3 text-[13px] text-old-lace/80">
          <p>© {date?.getFullYear() || '2026'} Café Noir. All rights reserved.</p>
          <p className="flex items-center gap-3">
            <a href="#privacy" className="hover:text-golden-pastel focus-visible:outline-2 focus-visible:outline-golden-pastel">Privacy Policy</a>
            <span aria-hidden="true" className="h-3 w-px bg-old-lace/40" />
            <a href="#terms" className="hover:text-golden-pastel focus-visible:outline-2 focus-visible:outline-golden-pastel">Terms of Service</a>
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
