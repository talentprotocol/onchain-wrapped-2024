"use client";

import AOS from "aos";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";

import TalentLogo from "@/app/assets/images/logo.svg";
import { organizations } from "@/app/utils/constants";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const lastPathSegment = (pathSegments.pop() || "") as keyof typeof organizations;
  const isGradientPage = useMemo(() => Object.keys(organizations).includes(lastPathSegment), [lastPathSegment]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false
    });
  }, []);

  return (
    <main
      className={`flex flex-col items-center h-svh pt-2 ${
        isGradientPage ? `bg-gradient-to-br ${organizations[lastPathSegment].gradient}` : "bg-background"
      }`}
    >
      <header className="z-10">
        <nav className="grid grid-cols-1 items-center px-4 py-2">
          <Image src={TalentLogo} alt="Talent Protocol logo" className={isGradientPage ? "invert" : "invert-0"} />
        </nav>
      </header>
      <section className="w-full sm:w-96 h-full flex flex-col items-center p-4 sm:py-14 z-10">{children}</section>
    </main>
  );
}
