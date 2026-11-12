import Image from "next/image";
import { Reveal, ImageReveal, MotionButtonLink } from "@/app/about/components/motion";
import { COMMON_IMAGES_LINKS, COMMON_IMAGES_SEO } from "@/constants/seo/image";

const cafe = {
  name: "Café Noir",
  address: ["123 Coffee Lane,", "New York, NY 10001"],
  phone: "+1 (555) 123-4567",
  email: "hello@cafenoir.com",
  hours: "Mon – Sun: 7 AM – 10 PM",
  // Used for the map embed (OpenStreetMap, no API key) and directions link
  lat: 40.7506,
  lng: -73.9972,
};
const d = 0.006;
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${cafe.lng - d * 2},${cafe.lat - d},${cafe.lng + d * 2},${cafe.lat + d}&layer=mapnik&marker=${cafe.lat},${cafe.lng}`;
const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(cafe.address.join(" "))}`;

export default function VisitSection() {
  return (
    <section className="bg-old-lace">
      <div className="grid lg:grid-cols-[1.5fr_1fr_1fr]">
        <ImageReveal from="left" className="relative min-h-64 lg:min-h-80">
          <Image
            src={COMMON_IMAGES_LINKS.CONTACT.MAIN}
            alt={COMMON_IMAGES_SEO.CONTACT.MAIN}
            title={COMMON_IMAGES_SEO.CONTACT.MAIN}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </ImageReveal>

        <div className="flex flex-col justify-center bg-line/60 px-6 py-10 md:px-10">
          <Reveal>
            <h1 className="text-3xl">Visit Our Café</h1>
            <p className="mt-4 text-sm leading-relaxed text-cafe-noir">
              We’d also love to welcome you in person. Come experience our coffee,
              food and warm ambiance.
            </p>
            <MotionButtonLink
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-md border border-cafe-noir px-4 py-2 text-sm text-cafe-noir transition-colors hover:bg-cafe-noir hover:text-old-lace focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ebony"
            >
              Get Directions
              <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </MotionButtonLink>
          </Reveal>
        </div>

        <div className="relative min-h-64 lg:min-h-80">
          <iframe
            title={`Map showing ${cafe.name} at ${cafe.address.join(" ")}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full border-0 [filter:sepia(.35)_saturate(.7)_contrast(.95)]"
          />
        </div>
      </div>
    </section>
  );
}
