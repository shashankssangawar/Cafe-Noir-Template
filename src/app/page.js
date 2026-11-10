'use client';

import Contact from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";
import MenuSection from "@/components/sections/menu";
import Newsletter from "@/components/sections/newsletter";
import TodaySpecial from "@/components/sections/specials";
import OurStory from "@/components/sections/story";
import Team from "@/components/sections/team";
import OurValues from "@/components/sections/values";
import { COMMON_IMAGES_LINKS, COMMON_IMAGES_SEO } from "@/constants/seo/image";

export default function Home() {
  return (
    <main className="relative overflow-hidden grid space-y-20">
      <HeroSection />
      <MenuSection />
      <OurStory />
      <Team />
      <OurValues
        image={COMMON_IMAGES_LINKS.HOME.VALUE}
        imageSeo={COMMON_IMAGES_SEO.HOME.VALUE}
      />
      <TodaySpecial
        image={COMMON_IMAGES_LINKS.HOME.SPECIAL}
        imageSeo={COMMON_IMAGES_SEO.HOME.SPECIAL}
      />
      <Newsletter />
      <Contact />
    </main>
  );
}
