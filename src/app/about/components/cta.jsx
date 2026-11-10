import LeafRightOldLace from "@/components/svg/leaf-right-golden-pastel";
import { Reveal, MotionButtonLink } from "./motion";
import LeafLeftOldLace from "@/components/svg/leaf-left-golden-pastel";
import Button from "@/components/ui/button";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-old-lace py-10">
      <LeafLeftOldLace className="pointer-events-none absolute left-4 top-1/2 h-24 w-20 -translate-y-1/2 -rotate-12 text-cafe-noir" />
      <LeafRightOldLace className="pointer-events-none absolute right-4 top-1/2 h-24 w-20 -translate-y-1/2 rotate-12 text-cafe-noir" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-4 px-5 text-center md:flex-row md:justify-center md:gap-8 md:text-left">
        <Reveal>
          <h1 className="text-3xl">
            Come, Be a Part of Our Story
          </h1>
          <p className="mt-1 text-base text-coffee">Great coffee. Warm company. Always.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <MotionButtonLink
            href="/visit"
          >
            <Button>
              Visit Us
              <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </MotionButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
