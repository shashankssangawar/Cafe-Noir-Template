"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "./lightbox";
import { Expand } from "lucide-react";
import { EASE } from "@/app/about/components/motion";

const categories = ["All", "Coffee", "Food", "Interiors", "Events"];


// Put images in /public/images/gallery/
const photos = [
  { id: 1, src: "/gallery/cappuccino.jpg", caption: "Signature cappuccino", alt: "Cappuccino with latte art on a saucer", categories: ["Coffee"] },
  { id: 2, src: "/gallery/chocolate-cake.jpg", caption: "Chocolate hazelnut cake", alt: "Slice of chocolate cake topped with hazelnuts", categories: ["Food"] },
  { id: 3, src: "/gallery/interior-window.jpg", caption: "Morning light at the window", alt: "Café interior with arched windows and plants", categories: ["Interiors"] },
  { id: 4, src: "/gallery/croissants.jpg", caption: "Fresh-baked croissants", alt: "Golden croissants on a wooden board", categories: ["Food"] },
  { id: 5, src: "/gallery/interior-chair.jpg", caption: "The green sofa chair", alt: "Cosy corner with a green sofa and framed art", categories: ["Interiors"] },
  { id: 6, src: "/gallery/iced-coffee.jpg", caption: "Iced coffee with cream", alt: "Tall glass of iced coffee with cream swirl", categories: ["Coffee"] },
  { id: 7, src: "/gallery/barista.jpg", caption: "Barista workshop", alt: "Barista pouring milk at the bar", categories: ["Coffee", "Events"] },
  { id: 8, src: "/gallery/latte-beans.jpg", caption: "Latte & roasted beans", alt: "Latte surrounded by coffee beans, seen from above", categories: ["Coffee"] },
  { id: 9, src: "/gallery/berry-tart.jpg", caption: "Seasonal berry tart", alt: "Berry tart on a patterned plate", categories: ["Food"] },
];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState({ index: null, dir: 1 });

  const visible = useMemo(
    () => (filter === "All" ? photos : photos.filter((p) => p.categories.includes(filter))),
    [filter]
  );
  const n = visible.length;
  const open = view.index !== null;

  const close = useCallback(() => setView((v) => ({ ...v, index: null })), []);
  const prev = useCallback(
    () => setView((v) => ({ index: (v.index - 1 + n) % n, dir: -1 })),
    [n]
  );
  const next = useCallback(
    () => setView((v) => ({ index: (v.index + 1) % n, dir: 1 })),
    [n]
  );
  const select = useCallback(
    (i) => setView((v) => ({ index: i, dir: i > v.index ? 1 : -1 })),
    []
  );

  return (
    <section className="bg-old-lace py-24">
      <div className="mx-auto max-w-6xl px-5">
        {/* Filters */}
        <div role="tablist" aria-label="Filter gallery" className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => {
            const active = c === filter;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(c)}
                className={`relative rounded-full border px-5 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ebony ${active
                  ? "border-ebony text-old-lace"
                  : "border-line bg-card text-cafe-noir hover:border-grullo"
                  }`}
              >
                {active && (
                  <motion.span
                    layoutId="gallery-pill"
                    className="absolute inset-0 rounded-full bg-ebony"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{c}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.ul layout className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45, ease: EASE, delay: i * 0.04 }}
              >
                <button
                  onClick={() => setView({ index: i, dir: 1 })}
                  aria-label={`Open ${p.caption}`}
                  className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ebony"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-cafe-noir/70 to-transparent px-3 pb-2.5 pt-8 text-left text-sm text-old-lace opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {p.caption}
                    <Expand className="h-4 w-4" />
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {n === 0 && (
          <p className="mt-10 text-center text-coffee">Nothing here yet — check back soon.</p>
        )}
      </div>

      <Lightbox
        open={open}
        items={visible}
        index={view.index ?? 0}
        dir={view.dir}
        onClose={close}
        onPrev={prev}
        onNext={next}
        onSelect={select}
      />
    </section>
  );
}
