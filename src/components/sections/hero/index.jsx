"use client";

import LeafLeftGrullo from "@/components/svg/leaf-left-grullo";
import LeafRightGrullo from "@/components/svg/leaf-right-grullo";
import Button from "@/components/ui/button";
import Caption from "@/components/ui/caption";
import Title from "@/components/ui/title";
import { COMMON_IMAGES_LINKS, COMMON_IMAGES_SEO } from "@/constants/seo/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const EASE = [0.22, 1, 0.36, 1];

// Parent: staggers children
const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

// Each text block slides in from the left
const fromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

// Image slides in from the right
const fromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE, delay: 0.1 } },
};

// Leaf reveal (clip-path wipe + subtle scale/fade). `from` decides wipe direction.
const leafReveal = (from) => {
  const hiddenClip = {
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
    bottom: "inset(100% 0 0 0)",
  }[from];

  return {
    hidden: { opacity: 0, clipPath: hiddenClip, scale: 0.9 },
    visible: {
      opacity: 0.8,
      clipPath: "inset(0 0 0 0)",
      scale: 1,
      transition: { duration: 0.9, ease: EASE },
    },
  };
};

export default function HeroSection() {
  const [textDone, setTextDone] = useState(false);
  const [imageDone, setImageDone] = useState(false);

  // Leaves appear only after BOTH the text and the image have finished
  const showLeaves = textDone && imageDone;
  const leafState = showLeaves ? "visible" : "hidden";

  return (
    <section
      id="hero"
      className="relative min-h-screen grid md:grid-cols-2 gap-20 pt-12 md:pt-24 overflow-x-hidden"
    >
      {/* SECTION HEADER + CTA */}
      <motion.div
        className="md:pl-20 pl-6 h-full md:space-y-15 space-y-6 pt-24 relative"
        variants={textContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fromLeft}>
          <Caption text={"Welcome to Café Noir"} />
        </motion.div>

        <motion.div variants={fromLeft} className="mt-4">
          <Title text={"Good Coffee."} />
          <Title text={"Better Mood."} className={"text-ebony"} />
        </motion.div>

        <motion.div variants={fromLeft} className="-mt-2">
          <p className="text-lg">
            A cozy corner for great coffee, <br />
            delicious treats and meaningful conversations.
          </p>
        </motion.div>

        {/* Last item in the stagger -> its completion means the text is done */}
        <motion.div
          variants={fromLeft}
          onAnimationComplete={() => setTextDone(true)}
        >
          <Button>
            Explore More
            <ArrowRight className="size-4" />
          </Button>
        </motion.div>

        {/* Leaf SVGs (note: opacity-80 class removed, motion controls opacity now) */}
        <motion.div
          className="absolute bottom-0 left-0 md:flex hidden"
          variants={leafReveal("bottom")}
          initial="hidden"
          animate={leafState}
        >
          <LeafRightGrullo className={"w-[100px] h-full -ml-2"} />
        </motion.div>

        <motion.div
          className="absolute -right-5 flex md:hidden top-5 -z-10"
          variants={leafReveal("right")}
          initial="hidden"
          animate={leafState}
        >
          <LeafLeftGrullo className={"w-[160px] h-full"} />
        </motion.div>

        <motion.div
          className="absolute -right-25 md:flex hidden bottom-10 -z-10"
          variants={leafReveal("right")}
          initial="hidden"
          animate={leafState}
        >
          <LeafLeftGrullo className={"w-[160px] h-full"} />
        </motion.div>
      </motion.div>

      {/* IMAGE */}
      <motion.div
        className="w-full md:h-full h-80 overflow-hidden md:rounded-tl-[240px] relative"
        variants={fromRight}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => setImageDone(true)}
      >
        <Image
          src={COMMON_IMAGES_LINKS.HOME.HERO.MAIN}
          width={1000}
          height={1000}
          alt="Logo"
          title={COMMON_IMAGES_SEO.HOME.HERO.MAIN}
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
      </motion.div>
    </section>
  );
}
