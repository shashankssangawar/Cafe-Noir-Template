"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight } from "./icons";
import { EASE } from "./motion";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "Café Noir is my happy place. The coffee is incredible, the ambience is perfect, and the team is outstanding!",
    author: "Emily R.",
    role: "Regular Customer",
  },
  {
    quote: "The warmest welcome in town, and a flat white worth the walk every morning.",
    author: "Arjun M.",
    role: "Regular Customer",
  },
  {
    quote: "Great pastries, thoughtful sourcing and a space that actually feels like a community.",
    author: "Priya S.",
    role: "Local Guest",
  },
];

export default function Testimonials() {
  const [[index, dir], setState] = useState([0, 1]);
  const total = testimonials.length;
  const t = testimonials[index];

  const go = (to, d) => setState([(to + total) % total, d]);

  return (
    <motion.section
      className="bg-ebony py-10 text-old-lace"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 md:flex-row md:gap-8">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
        >
          <Quote className="h-8 w-8 shrink-0 text-old-lace/90" />
        </motion.div>

        {/* min-h avoids layout jump while quotes swap */}
        <div className="min-h-[7.5rem] flex-1 md:min-h-[6rem]" aria-live="polite">
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.figure
              key={index}
              custom={dir}
              className="text-center md:text-left"
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <blockquote className="font-['DM_Serif_Display',serif] text-xl italic leading-snug md:text-2xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-2 text-sm text-old-lace/70">
                — {t.author}, {t.role}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="hidden h-14 w-px bg-old-lace/30 md:block" />

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => go(i, i > index ? 1 : -1)}
                className="h-1.5 rounded-full bg-old-lace"
                animate={{
                  width: i === index ? 20 : 6,
                  opacity: i === index ? 1 : 0.4,
                }}
                transition={{ duration: 0.3, ease: EASE }}
              />
            ))}
          </div>
          <motion.button
            onClick={() => go(index - 1, -1)}
            disabled={index === 0}
            aria-label="Previous testimonial"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full text-ebony focus-visible:outline-2 focus-visible:outline-offset-2",
              index === 0 ? 'bg-grullo focus-visible:outline-grullo' : 'bg-old-lace focus-visible:outline-old-lace'
            )}
          >
            <ArrowLeft className="h-4 w-4" />
          </motion.button>
          <motion.button
            onClick={() => go(index + 1, 1)}
            disabled={index === testimonials.length - 1}
            aria-label="Next testimonial"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full text-ebony focus-visible:outline-2 focus-visible:outline-offset-2",
              index === testimonials.length - 1 ? 'bg-grullo focus-visible:outline-grullo' : 'bg-old-lace focus-visible:outline-old-lace'
            )}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}
