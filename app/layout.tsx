import type { Metadata } from "next";
import { DM_Mono, Inter } from "next/font/google";
import { Suspense } from "react";

import { Toaster } from "./components/atoms";
import Wrapper from "./components/elements/wrapper";
import ReactQueryProvider from "./components/queryClientProvider";

import "aos/dist/aos.css";

import "./globals.css";

const dmMono = DM_Mono({ weight: ["300", "400", "500"], preload: false });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Onchain Wrapped 2024",
  description: "Onchain Wrapped 2024 by Talent Protocol"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmMono.className} ${inter.className} antialiased overflow-x-hidden`}>
        <ReactQueryProvider>
          <Suspense>
            <Toaster />
            <Wrapper>{children}</Wrapper>
          </Suspense>
        </ReactQueryProvider>
        <div className="absolute top-0 left-0 w-screen h-screen bg-hero-pattern bg-center animate-pulse"></div>
      </body>
    </html>
  );
}
