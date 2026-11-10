import { BASE_URL } from "@/constants/urls";

const siteUrl = BASE_URL;
const siteName = "Café Noir";

const title = "About Us – Our Story, Passion & Coffee Culture";
const description = "Get to know Café Noir, our passion for handcrafted coffee, delicious food, and creating a welcoming space where every cup brings people together.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title,
  description,
  keywords: [
    "About Café Noir",
    "Café Noir story",
    "Cafe Noir",
    "coffee culture",
    "specialty coffee",
    "artisan coffee",
    "handcrafted coffee",
    "premium cafe",
    "coffee shop",
    "cafe and bakery",
    "Café Noir experience",
  ],

  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "food and beverage",

  alternates: {
    canonical: "/about",
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
    url: "/about",
    siteName,
    title: `${title} | ${siteName}`,
    description,
    images: [
      {
        url: "/seo/og-image.png",
        width: 1200,
        height: 630,
        alt: "Discover the story behind Café Noir",
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

export default function AboutLayout({ children }) {
  return <>{children}</>;
}
