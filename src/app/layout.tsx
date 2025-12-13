import { Analytics } from "@/components/Analytics";
import { Container } from "@/components/Container/Container";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
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

export const metadata: Metadata = {
  title: "Buti | Software Engineer",
  description: "Hello there, this is Buti's personal website.",
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
          <Header />
          <Main>{children}</Main>
          <Footer />
        </Container>
      </body>
    </html>
  );
}
