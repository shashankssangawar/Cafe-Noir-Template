"use client";

import Team from "@/components/sections/team";
import AboutHero from "./components/hero";
import OurJourney from "./components/our-journey";
import Philosophy from "./components/philosophy";
import Testimonials from "./components/testimonials";
import CtaBanner from "./components/cta";

export default function AboutUsPage() {
  return (
    <main className="relative overflow-hidden grid">
      <AboutHero />
      <OurJourney />
      <Testimonials />
      <Team />
      <Philosophy />
      <CtaBanner />
    </main>
  )
}
