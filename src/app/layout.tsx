import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BRAND_DATA, LOCATIONS, FAQ_ITEMS } from "@/data/locations";
import { MENU_CATEGORIES } from "@/data/menu";

const SITE_TITLE =
  "Valhalla Grill Burger | Smash burgers en Málaga — Capuchinos, Teatinos y Santa Paula";
const SITE_DESCRIPTION =
  "Smash burgers legendarias de vaca rubia gallega en Málaga. Tres locales: Capuchinos, Teatinos y Santa Paula. Pide online o ven a conquistar tu mesa.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2B0709",
};

export const metadata: Metadata = {
  metadataBase: new URL(BRAND_DATA.siteUrl),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "smash burger Málaga",
    "hamburguesería Teatinos",
    "hamburguesas Capuchinos",
    "dónde cenar en Santa Paula",
    "Valhalla Grill Burger Málaga",
    "smash burgers vaca rubia gallega Málaga",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg" }],
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: BRAND_DATA.siteUrl,
    siteName: BRAND_DATA.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/og-valhalla.jpg",
        width: 1200,
        height: 630,
        alt: "Valhalla Grill Burger — Smash burgers legendarias en Málaga (Capuchinos, Teatinos y Santa Paula)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/og-valhalla.jpg"],
  },
};

const ISO_DAY_SCHEMA_MAP: Record<number, string> = {
  1: "https://schema.org/Monday",
  2: "https://schema.org/Tuesday",
  3: "https://schema.org/Wednesday",
  4: "https://schema.org/Thursday",
  5: "https://schema.org/Friday",
  6: "https://schema.org/Saturday",
  7: "https://schema.org/Sunday",
};

function buildJsonLdGraph() {
  const baseUrl = BRAND_DATA.siteUrl;

  const organizationNode = {
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: BRAND_DATA.name,
    alternateName: BRAND_DATA.shortName,
    url: baseUrl,
    logo: `${baseUrl}/images/valhalla-logo.svg`,
    slogan: BRAND_DATA.claim,
    sameAs: [BRAND_DATA.social.instagramUrl, BRAND_DATA.social.tiktokUrl],
  };

  const restaurantNodes = LOCATIONS.map((loc) => {
    const openingHoursSpecification = loc.schedule.flatMap((day) =>
      day.slots.map((slot) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ISO_DAY_SCHEMA_MAP[day.dayIndex],
        opens: slot.open,
        closes: slot.close === "00:00" ? "23:59" : slot.close,
      }))
    );

    return {
      "@type": "Restaurant",
      "@id": `${baseUrl}/#${loc.id}`,
      name: loc.fullName,
      description: `${loc.seoHeading} — ${loc.hallSubtitle}. Smash burgers de vaca rubia gallega.`,
      url: `${baseUrl}/#${loc.id}`,
      image: `${baseUrl}${loc.heroImage.src}`,
      telephone: loc.contact.phoneHref.replace("tel:", ""),
      priceRange: "€€",
      servesCuisine: ["Hamburguesas", "Smash Burgers", "Americana"],
      acceptsReservations: false,
      hasMenu: `${baseUrl}/#menu`,
      parentOrganization: {
        "@id": `${baseUrl}/#organization`,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: loc.address.streetAddress,
        postalCode: loc.address.postalCode,
        addressLocality: loc.address.addressLocality,
        addressRegion: loc.address.addressRegion,
        addressCountry: loc.address.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: loc.geo.latitude,
        longitude: loc.geo.longitude,
      },
      potentialAction: {
        "@type": "OrderAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: loc.ordering.qamareroUrl,
        },
      },
      openingHoursSpecification,
    };
  });

  const menuNode = {
    "@type": "Menu",
    "@id": `${baseUrl}/#menu`,
    name: "La Carta del Valhalla — El Banquete",
    url: `${baseUrl}/#carta`,
    hasMenuSection: MENU_CATEGORIES.map((category) => ({
      "@type": "MenuSection",
      name: category.officialEpicTitle,
      description: category.subtitle,
      hasMenuItem: category.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        image: `${baseUrl}${item.image}`,
        offers: {
          "@type": "Offer",
          price: item.priceNumeric.toFixed(2),
          priceCurrency: "EUR",
        },
      })),
    })),
  };

  const faqNode = {
    "@type": "FAQPage",
    "@id": `${baseUrl}/#faqpage`,
    mainEntity: FAQ_ITEMS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode, ...restaurantNodes, menuNode, faqNode],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = buildJsonLdGraph();

  return (
    <html lang="es-ES" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Manrope:ital,wght@0,400;0,500;0,600;1,400&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-wine text-ivory antialiased">{children}</body>
    </html>
  );
}
