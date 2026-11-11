import { BASE_URL } from "@/constants/urls";

const siteUrl = BASE_URL;
const siteName = "Café Noir";

const title = "Our Menu – Coffee, Food & Signature Delights";
const description = "Explore the Café Noir menu featuring handcrafted coffee, signature beverages, delicious food, freshly prepared bites, and delightful treats. Discover your next favourite.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title,
  description,
  keywords: [
    "Café Noir menu",
    "Cafe Noir food menu",
    "coffee menu",
    "specialty coffee",
    "handcrafted coffee",
    "signature beverages",
    "espresso drinks",
    "premium coffee",
    "cafe food menu",
    "cafe snacks",
    "freshly prepared food",
    "coffee and desserts",
    "Café Noir beverages",
  ],

  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "food and beverage",

  alternates: {
    canonical: "/menu",
  },

  icons: {
    icon: [{ url: "/seo/icon.png", type: "image/png" }],
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
    url: "/menu",
    siteName,
    title: `${title} | ${siteName}`,
    description,
    images: [
      {
        url: "/seo/og-image.png",
        width: 1200,
        height: 630,
        alt: "Explore the food and beverage menu at Café Noir",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteName}`,
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

export default function MenuLayout({ children }) {
  return <>{children}</>;
}
