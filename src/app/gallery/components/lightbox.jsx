"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { EASE } from "@/app/about/components/motion";

const slide = {
  enter: (dir) => ({ opacity: 0, x: dir * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir * -60 }),
};

function LightboxContent({ items, index, dir, onClose, onPrev, onNext, onSelect }) {
  const closeRef = useRef(null);
  const item = items[index];

  // Lock scroll, trap basic focus, restore focus on close
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  // Keyboard: Esc / ← / →
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  const navBtn =
    "grid h-11 w-11 place-items-center rounded-full bg-old-lace/15 text-old-lace backdrop-blur transition-colors hover:bg-old-lace/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-old-lace";

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-5 py-4 text-old-lace"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-sm tabular-nums text-old-lace/70">
          {index + 1} / {items.length}
        </span>
        <button ref={closeRef} onClick={onClose} aria-label="Close viewer" className={navBtn}>
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Stage */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 md:px-16">
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
          className={`${navBtn} absolute left-3 z-10 md:left-5`}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.figure
            key={item.id}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, { offset }) => {
              if (offset.x < -80) onNext();
              else if (offset.x > 80) onPrev();
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative h-full w-full max-w-5xl cursor-grab active:cursor-grabbing"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="pointer-events-none select-none object-contain"
              priority
              draggable={false}
            />
          </motion.figure>
        </AnimatePresence>

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
          className={`${navBtn} absolute right-3 z-10 md:right-5`}
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      {/* Caption + thumbnails */}
      <div
        className="px-5 pb-5 pt-3 text-center text-old-lace"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-['DM_Serif_Display',serif] text-lg">{item.caption}</p>
        <div className="mx-auto mt-3 flex max-w-full justify-start gap-2 overflow-x-auto pb-1 sm:justify-center">
          {items.map((t, i) => (
            <button
              key={t.id}
              onClick={() => onSelect(i)}
              aria-label={`View ${t.caption}`}
              aria-current={i === index}
              className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-md transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-old-lace ${i === index ? "opacity-100 ring-2 ring-golden-pastel" : "opacity-50 hover:opacity-80"
                }`}
            >
              <Image src={t.src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Lightbox({ open, ...props }) {
  return (
    <AnimatePresence>{open && <LightboxContent {...props} />}</AnimatePresence>
  );
}
