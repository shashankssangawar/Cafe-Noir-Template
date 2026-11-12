import { motion, useReducedMotion } from "motion/react";
import Button from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import LeafLeftGrullo from "@/components/svg/leaf-left-grullo";

const ease = [0.22, 1, 0.36, 1];

const VALUES = ["Quality in every cup", "Warmth in every interaction", "A sustainable tomorrow"];

export default function OurValues({ image, imageSeo }) {
  const reduce = useReducedMotion();
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  };

  return (
    <section id="values" className="relative overflow-hidden px-[6vw]">
      <LeafLeftGrullo
        reduce={reduce}
        className="absolute -right-3 top-8 hidden h-[260px] lg:block"
      />

      <div className="mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-[1fr_1.25fr] md:gap-14">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.h1 variants={rise} className="mb-4 font-display text-[clamp(36px,4.2vw,52px)] leading-tight">
            Our Values
          </motion.h1>
          <motion.p variants={rise} className="mb-2 max-w-[36ch] text-[17px] leading-relaxed text-coffee">
            At Café Noir, we believe in more than just coffee. We believe in:
          </motion.p>

          <ul className="mb-8 space-y-2.5">
            {VALUES.map((v) => (
              <motion.li
                key={v} variants={rise}
                whileHover={reduce ? undefined : { x: 6 }}
                className="flex items-center gap-3 text-[17px] text-coffee"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="flex-none text-ebony" aria-hidden="true">
                  <path d="M5 19C4 10 10 4 20 4c0 10-6 16-15 15z" /><path d="M5 19c4-5 8-8 11-11" />
                </svg>
                {v}
              </motion.li>
            ))}
          </ul>

          <motion.a
            variants={rise}
            href="#gallery"
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
          >
            <Button>
              Visit Our Gallery
              <ArrowRight className="size-4" />
            </Button>
          </motion.a>
        </motion.div>

        {/* Photo wipes in from the left while the image settles from a slight zoom */}
        <motion.div
          initial={{ clipPath: reduce ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease }}
          className="h-[300px] overflow-hidden rounded-3xl rounded-tr-[80px] bg-cafe-noir md:h-[340px]"
        >
          <motion.div
            initial={{ scale: reduce ? 1 : 1.18 }} whileInView={{ scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 1.6, ease }}
            className="size-full"
          >
            {image && (
              <img
                src={image}
                alt={imageSeo}
                title={imageSeo}
                className="block size-full object-cover"
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
