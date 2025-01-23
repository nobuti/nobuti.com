import { Container } from "@/components/Container/Container";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Main } from "@/components/Main/Main";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

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
    <html lang="en">
      <body className={`antialiased`}>
        <Container>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </Container>

        <Script
          data-goatcounter="https://nobuti.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        />
      </body>
    </html>
  );
}
