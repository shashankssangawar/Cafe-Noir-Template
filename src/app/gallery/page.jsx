'use client';

import Gallery from "./components/gallery";
import GalleryHero from "./components/hero";

export default function MenuPage() {
  return (
    <main>
      <GalleryHero />
      <Gallery />
    </main>
  );
}
