import LeafRightOldLace from "@/components/svg/leaf-right-golden-pastel";
import Caption from "@/components/ui/caption";
import Title from "@/components/ui/title";
import { COMMON_IMAGES_LINKS, COMMON_IMAGES_SEO } from "@/constants/seo/image";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const EASE = [0.22, 1, 0.36, 1];

const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const fromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

// Image now fades + eases in with a small slide (100px slide made the whole
// photo feel like it was "jumping" and exposed the edges).
const imageIn = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: EASE } },
};

const leafReveal = {
  hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)", scale: 0.9 },
  visible: {
    opacity: 0.7,
    clipPath: "inset(0 0 0 0)",
    scale: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

// Used when the user prefers reduced motion: no movement, just appear.
const instant = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export default function AboutHero() {
  const reduce = useReducedMotion();
  const [textDone, setTextDone] = useState(false);
  const [imageDone, setImageDone] = useState(false);

  const showLeaves = reduce || (textDone && imageDone);

  return (
    <section className="relative mt-20 h-[88dvh] overflow-hidden md:h-[90dvh]">
      {/* BACKGROUND IMAGE */}
      <motion.div
        className="absolute inset-0"
        variants={reduce ? instant : imageIn}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => setImageDone(true)}
      >
        <Image
          src={COMMON_IMAGES_LINKS.ABOUT.MAIN}
          alt={COMMON_IMAGES_SEO.ABOUT.MAIN}
          fill
          priority
          sizes="100vw"
          // keep the latte art in frame, push the muffin toward the text side
          className="object-cover object-[25%_50%] md:object-[35%_50%]"
        />

        {/* Overlay: dark where the text sits (right), clear over the cup (left).
            On mobile the text is centered, so use a full vertical scrim instead. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70 md:bg-gradient-to-l md:from-black/85 md:via-black/55 md:to-black/0"
        />
        {/* Soft vignette so edges feel intentional */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
        />
      </motion.div>

      {/* TEXT BLOCK */}
      <motion.div
        className="relative z-20 mx-auto flex h-full max-w-[1440px] items-center justify-center px-6 md:justify-end md:px-16 lg:px-24"
        variants={reduce ? instant : textContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-xl text-center md:text-left">
          <motion.div variants={reduce ? instant : fromLeft}>
            <Caption
              text="About Us"
              className="text-sm tracking-[0.2em] text-golden-pastel"
              containerClass="justify-center md:justify-start"
              lineColor="bg-golden-pastel"
            />
          </motion.div>

          <motion.div variants={reduce ? instant : fromLeft} className="mt-4">
            <Title
              text="Our Story"
              className="text-old-lace drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
            />
          </motion.div>

          <motion.div
            variants={reduce ? instant : fromLeft}
            onAnimationComplete={() => setTextDone(true)}
            className="mt-6"
          >
            <p className="text-balance text-lg leading-relaxed text-old-lace/90 md:text-xl">
              At Café Noir, we believe coffee is more than a drink &ndash;
              it&apos;s a feeling, a pause, and a connection.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* DECORATIVE LEAF (desktop only, kept clear of the cup) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-20 hidden md:block"
        variants={leafReveal}
        initial="hidden"
        animate={showLeaves ? "visible" : "hidden"}
      >
        <LeafRightOldLace className="-ml-4 h-[420px] w-auto text-golden-pastel" />
      </motion.div>
    </section>
  );
}
