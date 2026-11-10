'use client';

import { PAGE } from "@/constants/seo/links";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const EASE = [0.22, 1, 0.36, 1];

// Motion-enabled Link (use `motion(Link)` on framer-motion < 11)
const MotionLink = motion.create(Link);

// Header drops down first, then its children stagger in
const header = {
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: EASE, when: "beforeChildren" },
  },
};

const navRow = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

const fromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

const fromTop = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const linkGroup = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// Mobile drawer
const drawer = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.45, ease: EASE, when: "beforeChildren" },
  },
  exit: { x: "100%", transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
};

const drawerList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: PAGE.LINKS.HERO, label: "Home", description: PAGE.SEO.HERO },
    { href: PAGE.LINKS.MENU, label: "Menu", description: PAGE.SEO.MENU },
    { href: PAGE.LINKS.OUR_STORY, label: "About", description: PAGE.SEO.ABOUT },
    { href: PAGE.LINKS.SPECIALS, label: "Specials", description: PAGE.SEO.SPECIALS },
    { href: PAGE.LINKS.CONTACT_US, label: "Contact", description: PAGE.SEO.CONTACT_US },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        id="navbar"
        variants={header}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 border border-cafe-noir/10 ${isScrolled ? "navbar-scrolled" : ""}`}
      >
        <motion.nav
          variants={navRow}
          className="max-w-350 mx-auto flex items-center justify-between px-6 md:px-10 py-5"
        >
          <motion.h1 variants={fromLeft} className="md:text-5xl text-2xl font-black">
            Café Noir
          </motion.h1>

          {/* Desktop Navigation */}
          <motion.div
            variants={linkGroup}
            className="hidden lg:flex items-center gap-10 font-body text-[15px] text-cafe-noir"
          >
            {navLinks.map((item) => (
              <MotionLink
                key={item.href}
                href={item.href}
                variants={fromTop}
                className="hover:text-ebony transition-colors"
                title={item.description}
              >
                {item.label}
              </MotionLink>
            ))}
          </motion.div>

          {/* Desktop CTA */}
          <MotionLink
            href={PAGE.LINKS.RESERVATIONS}
            variants={fromRight}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:inline-flex items-center gap-2 bg-ebony text-old-lace font-body text-sm font-medium px-5 py-2.5 rounded-full hover:bg-coffee transition-colors duration-300"
            title={PAGE.SEO.RESERVATIONS}
          >
            Reserve a Table
            <ArrowRight className="size-4" />
          </MotionLink>

          {/* Mobile Menu Button */}
          <motion.button
            variants={fromRight}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-cafe-noir cursor-pointer"
          >
            <Menu className="size-5" />
          </motion.button>
        </motion.nav>
      </motion.header>

      {/* Overlay + Drawer live OUTSIDE the header so the header's transform/backdrop-filter
          can't become the containing block for these fixed elements */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-55 bg-old-lace lg:hidden"
            />

            <motion.aside
              key="drawer"
              variants={drawer}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-screen w-full bg-ivory shadow-2xl z-60 lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b">
                <motion.h1 variants={fromLeft} className="text-2xl font-black">
                  Café Noir
                </motion.h1>

                <motion.button
                  whileTap={{ scale: 0.9, rotate: 90 }}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 rounded-full flex items-center justify-center border cursor-pointer"
                >
                  <X className="size-5" />
                </motion.button>
              </div>

              <motion.div variants={drawerList} className="flex flex-col p-6">
                {navLinks.map((item) => (
                  <MotionLink
                    key={item.href}
                    href={item.href}
                    title={item.description}
                    variants={fromRight}
                    onClick={() => setIsOpen(false)}
                    className="py-4 border-b text-charcoal hover:text-school-red transition-colors"
                  >
                    {item.label}
                  </MotionLink>
                ))}

                <MotionLink
                  href={PAGE.LINKS.RESERVATIONS}
                  variants={fromRight}
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-8 inline-flex items-center justify-center gap-2 bg-charcoal text-white px-5 py-3 rounded-full hover:bg-school-red transition-colors"
                  title={PAGE.SEO.RESERVATIONS}
                >
                  Reserve a Table
                  <ArrowRight className="size-4" />
                </MotionLink>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
