import Image from "next/image";
import LeafSketch from "./leaf-sketch";
import { Bean, Community, Leaf, Heart } from "./icons";
import { Reveal, ImageReveal, Stagger, StaggerItem, MotionButtonLink } from "./motion";
import LeafRightGrullo from "@/components/svg/leaf-right-grullo";
import { COMMON_IMAGES_LINKS, COMMON_IMAGES_SEO } from "@/constants/seo/image";
import LeafRightOldLace from "@/components/svg/leaf-right-golden-pastel";
import LeafLeftOldLace from "@/components/svg/leaf-left-golden-pastel";
import Caption from "@/components/ui/caption";
import Button from "@/components/ui/button";

const features = [
  { label: "Premium Coffee", Icon: Bean },
  { label: "Welcoming Community", Icon: Community },
  { label: "Sustainable Choices", Icon: Leaf },
  { label: "A Cozy Space", Icon: Heart },
];

export default function OurJourney() {
  return (
    <section className="bg-old-lace py-10 md:py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 md:grid-cols-[1.1fr_1.4fr_0.8fr] md:gap-16">
        {/* Image */}
        <div className="relative">
          <ImageReveal
            from="left"
            className="relative aspect-[4/3] overflow-hidden rounded-tl-[70px] rounded-br-[70px] rounded-tr-xl rounded-bl-xl bg-coffee"
          >
            <Image
              src={COMMON_IMAGES_LINKS.ABOUT.OUR_JOURNEY}
              alt={COMMON_IMAGES_SEO.ABOUT.OUR_JOURNEY}
              title={COMMON_IMAGES_SEO.ABOUT.OUR_JOURNEY}
              fill
              sizes="(min-width: 768px) 30vw, 100vw"
              className="object-cover"
              priority
            />
          </ImageReveal>
          <LeafLeftOldLace className="pointer-events-none absolute bottom-6 -left-12 h-24 text-cafe-noir!" />
          <LeafRightOldLace className="pointer-events-none absolute top-6 -right-12 h-24 text-cafe-noir!" />
        </div>

        {/* Copy */}
        <div className="max-w-md">
          <Reveal delay={0.15}>
            <Caption text={'Our Journey'} />
          </Reveal>
          <Reveal delay={0.25}>
            <h1 className="mt-3 text-4xl md:text-5xl">
              A Café with a Soul
            </h1>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="mt-4 text-base leading-relaxed text-cafe-noir">
              Café Noir was born from a simple idea — to create a space where great
              coffee, delicious food and meaningful conversations come together.
              What started as a dream is now a welcoming community café, loved for
              its warmth, quality and charm.
            </p>
          </Reveal>
          <Reveal delay={0.45} className="mt-6">
            <MotionButtonLink
              href="/menu"
            >
              <Button>
                Our Menu
                <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Button>
            </MotionButtonLink>
          </Reveal>
        </div>

        {/* Features */}
        <Stagger className="grid grid-cols-2 gap-5 md:grid-cols-1 md:border-l md:border-grullo/50 md:pl-8">
          {features.map(({ label, Icon }) => (
            <StaggerItem key={label} className="flex items-center gap-3">
              <span className="grid size-14 flex-none place-items-center rounded-full bg-golden-pastel/30 text-cafe-noir">
                <Icon className="size-8 shrink-0 text-cafe-noir" />
              </span>
              <span className="text-sm text-cafe-noir">{label}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
