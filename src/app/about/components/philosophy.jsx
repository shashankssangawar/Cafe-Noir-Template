import Image from "next/image";
import { Reveal, ImageReveal } from "./motion";
import Link from "next/link";
import { COMMON_IMAGES_LINKS, COMMON_IMAGES_SEO } from "@/constants/seo/image";
import LeafLeftOldLace from "@/components/svg/leaf-left-golden-pastel";
import Caption from "@/components/ui/caption";

export default function Philosophy() {
  return (
    <section className="bg-[#ebe6c8] py-12 md:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:grid-cols-[1fr_1.2fr]">
        <div className="relative max-w-md">
          <Reveal direction="left">
            <Caption text={'Our Philosophy'} />
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <h1 className="mt-3 text-4xl md:text-5xl">
              More Than Just Coffee
            </h1>
          </Reveal>
          <Reveal direction="left" delay={0.2}>
            <p className="mt-4 text-base leading-relaxed text-cafe-noir">
              We’re here to create moments — of comfort, inspiration and
              togetherness. From ethically sourced beans to a thoughtfully curated
              menu, every detail reflects our commitment to quality and community.
            </p>
          </Reveal>
          <Reveal direction="left" delay={0.3} className="mt-5">
            <Link
              href="/about#values"
              className="group inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ebony"
            >
              Our Values
              <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>

        <div className="relative">
          <LeafLeftOldLace className="pointer-events-none absolute md:-bottom-2 -bottom-6 md:-left-30 -left-4 h-30 md:h-[250px] text-coffee z-20" />
          <ImageReveal
            from="right"
            className="relative aspect-[16/9] overflow-hidden rounded-tl-xl rounded-tr-[70px] rounded-bl-[70px] rounded-br-xl"
          >
            <Image
              src={COMMON_IMAGES_LINKS.ABOUT.PHILOSOPHY}
              alt={COMMON_IMAGES_SEO.ABOUT.PHILOSOPHY}
              title={COMMON_IMAGES_SEO.ABOUT.PHILOSOPHY}
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover"
            />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
