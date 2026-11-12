import { Pin, Phone, Mail, Clock, Instagram, Facebook, Pinterest, Youtube } from "@/app/about/components/icons";
import { Reveal, Stagger, StaggerItem } from "@/app/about/components/motion";
import LeafLeftOldLace from "@/components/svg/leaf-left-golden-pastel";

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

const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: "Instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "Facebook" },
  { label: "Pinterest", href: "https://pinterest.com", icon: "Pinterest" },
  { label: "YouTube", href: "https://youtube.com", icon: "Youtube" },
];

const socialIcons = { Instagram, Facebook, Pinterest, Youtube };

const rows = [
  { Icon: Pin, content: cafe.address.map((l) => <span key={l} className="block">{l}</span>) },
  { Icon: Phone, content: <a href={`tel:${cafe.phone.replace(/[^\d+]/g, "")}`} className="hover:underline">{cafe.phone}</a> },
  { Icon: Mail, content: <a href={`mailto:${cafe.email}`} className="hover:underline">{cafe.email}</a> },
  { Icon: Clock, content: cafe.hours },
];

export default function ContactDetails() {
  return (
    <div className="relative">
      <Reveal className="flex items-center gap-4">
        <h1 className="text-3xl">Our Contact Details</h1>
        <span className="hidden h-px flex-1 bg-cafe-noir/60 sm:block" aria-hidden />
      </Reveal>

      <Stagger className="mt-8 space-y-5">
        {rows.map(({ Icon, content }, i) => (
          <StaggerItem key={i} className="flex items-center gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-line text-cafe-noir">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-sm leading-relaxed text-cafe-noir">{content}</span>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.2} className="mt-8">
        <h1 className="text-lg">Follow Us</h1>
        <ul className="mt-3 flex gap-3">
          {socials.map(({ label, href, icon }) => {
            const Icon = socialIcons[icon];
            return (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-cafe-noir text-cafe-noir transition hover:bg-ebony hover:text-old-lace focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ebony"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            );
          })}
        </ul>
      </Reveal>

      <LeafLeftOldLace className="pointer-events-none absolute -bottom-10 -left-25 hidden h-32 w-28 rotate-12 text-coffee/70 lg:block" />
    </div>
  );
}
