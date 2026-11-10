import LeafLeftOldLace from "@/components/svg/leaf-left-golden-pastel";
import LeafRightOldLace from "@/components/svg/leaf-right-golden-pastel";
import Caption from "@/components/ui/caption";
import Title from "@/components/ui/title";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1];

/* ---------- Decorative leaf sprig (draws itself) ---------- */
function Sprig({ reduce }) {
  const p = {
    initial: { pathLength: reduce ? 1 : 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true },
    transition: { duration: 1.6, ease: "easeInOut", delay: 0.6 },
    fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round",
  };
  return (
    <svg viewBox="0 0 100 200" className="pointer-events-none " aria-hidden="true">
      <motion.path d="M70 200 C60 140 60 80 78 6" {...p} />
      <motion.path d="M66 150 C30 148 14 118 18 96 C46 100 64 120 66 150Z" {...p} />
      <motion.path d="M64 104 C98 96 100 64 92 46 C68 54 60 80 64 104Z" {...p} />
      <motion.path d="M68 70 C40 66 28 44 32 26 C56 30 68 48 68 70Z" {...p} />
    </svg>
  );
}

export default function TodaySpecial({ image, imageSeo }) {
  const reduce = useReducedMotion();
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  };

  return (
    <section id="specials" className="relative overflow-hidden bg-cafe-noir text-old-lace">
      <LeafLeftOldLace
        reduce={reduce}
        className={'absolute -right-8 top-2 hidden h-[75%] md:block'}
      />

      <div className="md:mx-auto grid min-h-[360px] max-w-[1400px] items-center px-[6vw] md:grid-cols-2">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.12 }}
          className="py-14"
        >
          <motion.div variants={rise}>
            <Caption
              text={'Today’s Special'}
              className={'text-old-lace'}
              lineColor="bg-old-lace"
            />
          </motion.div>

          <motion.div variants={rise} className="mb-4 text-[clamp(40px,5vw,64px)] leading-[1.05]">
            <Title
              text={(
                <>
                  Hazelnut <span className="text-golden-pastel">Mocha</span>
                </>
              )}
              className={'text-old-lace'}
            />
          </motion.div>

          <motion.p variants={rise} className="mb-8 max-w-[34ch] text-[17px] leading-relaxed text-old-lace/90">
            A perfect blend of rich coffee, smooth chocolate and roasted hazelnut.
          </motion.p>

          <motion.a
            variants={rise}
            href="#menu"
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2.5 rounded-full border border-old-lace/60 px-7 py-3.5 font-medium transition-colors hover:bg-old-lace hover:text-cafe-noir focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-golden-pastel"
          >
            Try It Today
            <motion.svg
              variants={{ hover: { x: 4 } }}
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </motion.svg>
          </motion.a>
        </motion.div>

        <div className="relative h-[400px] md:h-[500px] md:self-end">
          {image && (
            <motion.img
              src={image}
              alt={imageSeo}
              title={imageSeo}
              initial={{ opacity: 0, x: reduce ? 0 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease }}
              className="absolute bottom-0 right-0 size-full object-contain object-bottom"
            />
          )}
        </div>
      </div>
    </section>
  );
}
