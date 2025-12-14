import { Analytics } from "@/components/Analytics";
import { Container } from "@/components/Container/Container";
import { Footer } from "@/components/Footer/Footer";
import { Main } from "@/components/Main/Main";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://nobuti.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Buti | Product Engineer",
    template: "%s | Buti",
  },
  description:
    "Product engineer building systems that turn complexity into clarity. Focused on thoughtful engineering, clean architectures, and user experiences that drive measurable outcomes.",
  keywords: [
    "product engineer",
    "product engineering",
    "software engineer",
    "react",
    "typescript",
    "web development",
    "system design",
    "user experience",
    "clean architecture",
    "data-driven products",
  ],
  authors: [{ name: "Buti", url: siteUrl }],
  creator: "Buti",
  publisher: "Buti",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Buti",
    title: "Buti | Product Engineer",
    description:
      "Product engineer building systems that turn complexity into clarity. Focused on thoughtful engineering and user experiences that drive measurable outcomes.",
    images: [
      {
        url: `${siteUrl}/avatar.png`,
        width: 1200,
        height: 630,
        alt: "Buti - Product Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buti | Product Engineer",
    description:
      "Product engineer building systems that turn complexity into clarity. Focused on thoughtful engineering and user experiences that drive measurable outcomes.",
    creator: "@nobuti",
    site: "@nobuti",
    images: [`${siteUrl}/avatar.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={robotoMono.variable}>
      <body className={`antialiased`}>
        <Analytics />
        <Container>
          <Main>{children}</Main>
          <Footer />
        </Container>
      </body>
    </html>
  );
}
