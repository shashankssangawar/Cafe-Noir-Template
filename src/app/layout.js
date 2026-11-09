import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { BASE_URL } from "@/constants/urls";
import Navbar from "@/components/blocks/navbar";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const cormorantGaramond = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

const siteUrl = BASE_URL;
const siteName = "Café Noir";
const title = "Café Noir – Good Coffee. Better Mood.";
const description = "Welcome to Café Noir. Discover handcrafted coffee, delicious desserts, fresh food, and a cozy space to sip, relax, and repeat.";
export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: title,
    template: "%s | Café Noir",
  },
  description,
  keywords: [
    "Café Noir",
    "Cafe Noir",
    "coffee shop",
    "specialty coffee",
    "artisan coffee",
    "freshly brewed coffee",
    "coffee and desserts",
    "cafe and bakery",
    "coffee shop near me",
    "cafe reservations",
    "premium cafe",
    "Hazelnut Mocha",
  ],
  authors: [{ name: "Café Noir" }],
  creator: "Café Noir",
  publisher: "Café Noir",
  category: "food and beverage",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/seo/icon.png", type: "image/png" },
    ],
    apple: [
      {
        url: "/seo/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/seo/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName,
    title,
    description,
    images: [
      {
        url: "/seo/og-image.png",
        width: 1200,
        height: 630,
        alt: "Café Noir – Good Coffee. Better Mood.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/seo/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
