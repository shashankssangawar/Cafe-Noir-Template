import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const CURRENCY = "$";

const MENU = [
  {
    id: "americano", name: "Americano", type: "Hot", price: 3.5, art: "crema", liquid: "#6b3e1e", foam: "#c98a4b",
    desc: "Double espresso lengthened with hot water. Clean, bold, and smooth.",
    notes: ["Double shot", "Hot water", "Dark roast"]
  },
  {
    id: "espresso", name: "Espresso", type: "Hot", price: 2.8, art: "crema", liquid: "#4a2810", foam: "#b9743a",
    desc: "A short, concentrated shot with a thick golden crema.",
    notes: ["Single or double", "Crema on top", "Dark roast"]
  },
  {
    id: "latte", name: "Latte", type: "Hot", price: 4.2, art: "heart", liquid: "#c98a4b", foam: "#fbf3e2",
    desc: "Silky steamed milk poured over espresso, finished with latte art.",
    notes: ["Espresso", "Steamed milk", "Latte art"]
  },
  {
    id: "cappuccino", name: "Cappuccino", type: "Hot", price: 4.0, art: "ring", liquid: "#b87a40", foam: "#f7ecd6",
    desc: "Equal parts espresso, milk, and thick velvety foam.",
    notes: ["Espresso", "Milk", "Thick foam"]
  },
  {
    id: "flat-white", name: "Flat White", type: "Hot", price: 4.4, art: "dot", liquid: "#a9703a", foam: "#f3e4c8",
    desc: "Ristretto shots with thin, glossy microfoam. Stronger than a latte.",
    notes: ["Ristretto", "Microfoam", "Small cup"]
  },
  {
    id: "mocha", name: "Mocha", type: "Hot", price: 4.8, art: "swirl", liquid: "#5a3420", foam: "#e7c9a3",
    desc: "Espresso, dark chocolate, and steamed milk with a cocoa swirl.",
    notes: ["Espresso", "Dark chocolate", "Cocoa dust"]
  },
  {
    id: "cold-brew", name: "Cold Brew", type: "Iced", price: 4.5, art: "ice", liquid: "#3d2412", foam: "#8a5a32",
    desc: "Steeped for 18 hours, served over ice. Low acidity and naturally sweet.",
    notes: ["18 hr steep", "Over ice", "Low acidity"]
  },
  {
    id: "iced-latte", name: "Iced Latte", type: "Iced", price: 4.6, art: "ice", liquid: "#d9a066", foam: "#fbf3e2",
    desc: "Two shots of espresso poured over cold milk and ice.",
    notes: ["Double shot", "Cold milk", "Ice"]
  },
];

const FILTERS = ["All", "Hot", "Iced"];
const SIZES = [{ k: "S", add: 0 }, { k: "M", add: 0.6 }, { k: "L", add: 1.2 }];
const spring = { type: "spring", stiffness: 320, damping: 30 };

const pillBtn =
  "relative rounded-full px-5 py-2 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ebony";
const artBg = "bg-[radial-gradient(circle_at_50%_60%,#efe9c9,transparent_70%)]";

/* ---------- Top-down cup illustration (no image files needed) ---------- */
function Cup({ item, size = 180 }) {
  const { liquid, foam, art } = item;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="92" fill="#fff" opacity=".55" />
      <circle cx="100" cy="100" r="76" fill="#efe9d2" />
      <circle cx="100" cy="100" r="62" fill="#fffdf4" stroke="#d9d2b4" strokeWidth="2" />
      <circle cx="100" cy="100" r="54" fill={liquid} />
      {art === "crema" && (<>
        <circle cx="100" cy="100" r="44" fill={foam} opacity=".55" />
        <circle cx="100" cy="100" r="30" fill={liquid} opacity=".55" />
      </>)}
      {art === "heart" && (<>
        <circle cx="100" cy="100" r="46" fill={foam} opacity=".35" />
        <path d="M100 132 C66 108 70 78 90 78 C97 78 100 84 100 87 C100 84 103 78 110 78 C130 78 134 108 100 132Z" fill={foam} />
      </>)}
      {art === "ring" && (<>
        <circle cx="100" cy="100" r="46" fill={foam} />
        <circle cx="100" cy="100" r="22" fill={liquid} opacity=".35" />
      </>)}
      {art === "dot" && (<>
        <circle cx="100" cy="100" r="46" fill={liquid} />
        <circle cx="100" cy="100" r="28" fill={foam} />
      </>)}
      {art === "swirl" && (<>
        <circle cx="100" cy="100" r="46" fill={foam} opacity=".3" />
        <path d="M100 100 a6 6 0 0 1 12 0 a12 12 0 0 1 -24 0 a18 18 0 0 1 36 0 a24 24 0 0 1 -48 0 a30 30 0 0 1 60 0"
          fill="none" stroke={foam} strokeWidth="5" strokeLinecap="round" />
      </>)}
      {art === "ice" && (<>
        <circle cx="100" cy="100" r="54" fill={liquid} stroke="#fff" strokeOpacity=".6" strokeWidth="3" />
        {[[78, 80], [112, 76], [92, 112], [122, 108]].map(([x, y], i) => (
          <rect key={i} x={x - 13} y={y - 13} width="26" height="26" rx="6" fill="#fff" opacity=".4"
            transform={`rotate(${i * 17} ${x} ${y})`} />
        ))}
      </>)}
      {art !== "ice" && <rect x="160" y="92" width="26" height="16" rx="8" fill="#fffdf4" stroke="#d9d2b4" strokeWidth="2" />}
    </svg>
  );
}

/* ---------- Card ---------- */
function Card({ item, index, onOpen, reduce }) {
  return (
    <motion.article
      layout={!reduce}
      layoutId={`card-${item.id}`}
      style={{ borderRadius: 28 }}
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { ...spring, delay: index * 0.06 } }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.18 } }}
      whileHover={reduce ? undefined : { y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onOpen(item)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(item)}
      tabIndex={0}
      role="button"
      aria-label={`${item.name}, ${CURRENCY}${item.price.toFixed(2)}. Open details`}
      className="cursor-pointer overflow-hidden border border-line bg-card outline-offset-4 hover:shadow-[0_24px_40px_-22px_rgba(78,53,32,.4)] focus-visible:outline-2 focus-visible:outline-ebony"
    >
      <motion.div
        layoutId={`art-${item.id}`}
        whileHover={reduce ? undefined : { rotate: 8, scale: 1.06 }}
        transition={spring}
        className={`grid place-items-center pb-2 pt-7 ${artBg}`}
      >
        <Cup item={item} />
      </motion.div>
      <div className="px-6 pb-6 pt-3">
        <div className="flex items-baseline justify-between gap-3">
          <motion.h3 layoutId={`name-${item.id}`} className="font-display text-[28px]">{item.name}</motion.h3>
          <span className="font-semibold text-ebony">{CURRENCY}{item.price.toFixed(2)}</span>
        </div>
        <p className="mb-4 mt-2.5 text-[15px] leading-relaxed text-coffee">{item.desc}</p>
        <span className="border-b border-current text-sm font-medium text-ebony">View details</span>
      </div>
    </motion.article>
  );
}

/* ---------- Expanded details ---------- */
function Details({ item, onClose }) {
  const [size, setSize] = useState("M");
  const add = SIZES.find((s) => s.k === size).add;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-cafe-noir/55 p-5 backdrop-blur-md"
    >
      <motion.div
        layoutId={`card-${item.id}`}
        style={{ borderRadius: 32 }}
        transition={spring}
        role="dialog" aria-modal="true" aria-label={item.name}
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-[92vh] w-full max-w-[860px] overflow-auto bg-card md:grid-cols-2"
      >
        <button
          onClick={onClose} aria-label="Close"
          className="absolute right-4 top-4 z-10 size-10 rounded-full border border-line bg-old-lace focus-visible:outline-2 focus-visible:outline-ebony"
        >
          ✕
        </button>

        <motion.div layoutId={`art-${item.id}`} className={`grid place-items-center pt-8 md:h-full md:py-10 ${artBg}`}>
          <Cup item={item} size={240} />
        </motion.div>

        <div className="px-6 pb-7 pt-4 md:py-11 md:pl-2 md:pr-10">
          <motion.h3 layoutId={`name-${item.id}`} className="font-display text-[clamp(34px,5vw,46px)]">
            {item.name}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="mb-4 mt-2.5 text-[15px] leading-relaxed text-coffee"
          >
            {item.desc}
          </motion.p>

          <ul className="mb-6 flex flex-wrap gap-2">
            {item.notes.map((n, i) => (
              <motion.li
                key={n}
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.07 }}
                className="rounded-full border border-line px-3.5 py-1.5 text-sm"
              >
                {n}
              </motion.li>
            ))}
          </ul>

          <div role="radiogroup" aria-label="Size" className="inline-flex gap-1 rounded-full border border-line p-1.5">
            {SIZES.map((s) => (
              <button
                key={s.k} role="radio" aria-checked={size === s.k} onClick={() => setSize(s.k)}
                className={`${pillBtn} ${size === s.k ? "text-white" : ""}`}
              >
                {size === s.k && (
                  <motion.span layoutId="size-pill" transition={spring} className="absolute inset-0 rounded-full bg-ebony" />
                )}
                <span className="relative">{s.k}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="relative h-11 min-w-[90px] overflow-hidden font-display text-4xl">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={size}
                  initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {CURRENCY}{(item.price + add).toFixed(2)}
                </motion.span>
              </AnimatePresence>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="rounded-full bg-ebony px-6 py-3.5 font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ebony"
            >
              Add to order
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Catalogue ---------- */
export default function MenuCatalogue() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const reduce = useReducedMotion();
  const items = MENU.filter((m) => filter === "All" || m.type === filter);

  return (
    <section id="menu" className="min-h-screen px-[6vw] py-20">
      <header className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-[clamp(40px,6vw,72px)] leading-none">
          Our <span className="text-ebony">Menu</span>
        </h2>
        <div role="tablist" className="flex gap-1 rounded-full border border-line bg-card p-1.5">
          {FILTERS.map((f) => (
            <button
              key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)}
              className={`${pillBtn} px-[22px] ${filter === f ? "text-white" : ""}`}
            >
              {filter === f && (
                <motion.span layoutId="tab-pill" transition={spring} className="absolute inset-0 rounded-full bg-ebony" />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>
      </header>

      <motion.div layout={!reduce} className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-7">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <Card key={item.id} item={item} index={i} onOpen={setSelected} reduce={reduce} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && <Details item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
