"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import TalentLogo from "@/app/assets/images/logo.svg";
import { organizations, screens } from "@/app/utils/constants";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const gradient = useMemo(() => {
    const pathSegments = pathname.split("/");
    const lastPathSegment = pathSegments.pop() || "";
    const organization = screens.find(({ name }) => name === lastPathSegment)?.organization;
    return organization ? organizations[organization].gradient : "";
  }, [pathname]);

  return (
    <main
      className={`flex flex-col items-center min-h-svh py-4 sm:py-14 ${
        !!gradient ? `bg-gradient-to-br ${gradient}` : "bg-background"
      }`}
    >
      <header className="z-10">
        <nav className="pt-4">
          <Image src={TalentLogo} alt="Talent Protocol logo" className={!!gradient ? "invert" : "invert-0"} />
        </nav>
      </header>
      <section className="w-full sm:w-96 flex flex-1 flex-col items-center gap-8 p-4 z-10">{children}</section>
    </main>
  );
}
