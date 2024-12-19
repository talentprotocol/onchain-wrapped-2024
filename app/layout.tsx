import type { Metadata } from "next";
import { DM_Mono, Inter } from "next/font/google";
import Image from "next/image";

import Back from "@/app/assets/icons/back.svg";
import TalentLogo from "@/app/assets/images/logo.svg";
import { Button } from "@/app/components/atoms";

import { Suspense } from "react";
import ReactQueryProvider from "./components/queryClientProvider";
import "./globals.css";

const dmMono = DM_Mono({ weight: ["500"], preload: false });
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
      <body className={`${dmMono.className} ${inter.className} antialiased flex flex-col items-center h-svh pt-2`}>
        <ReactQueryProvider>
          <Suspense>
            <header>
              <nav className="grid grid-cols-3 items-center px-4">
                <Button variant="ghost" className="w-fit">
                  <Image src={Back} alt="Back button" />
                </Button>
                <Image src={TalentLogo} alt="Talent Protocol logo" />
              </nav>
            </header>
            <main className="w-full h-full flex flex-col items-center p-4 md:p-14 lg:p-28">{children}</main>
          </Suspense>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
