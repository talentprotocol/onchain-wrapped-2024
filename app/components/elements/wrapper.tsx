"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

import Back from "@/app/assets/icons/back.svg";
import TalentLogo from "@/app/assets/images/logo.svg";
import { Button } from "@/app/components/atoms";
import { gradients } from "@/app/utils/constants";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isInitialPage = useMemo(() => pathname === "/", [pathname]);
  const isGradientPage = useMemo(() => Object.keys(gradients).includes(pathname), [pathname]);

  return (
    <main
      className={`flex flex-col items-center h-svh pt-2 ${
        isGradientPage ? `bg-gradient-to-br ${gradients[pathname]}` : "bg-background"
      }`}
    >
      <header>
        <nav className="grid grid-cols-3 items-center px-4">
          {!isInitialPage ? (
            <Button className="w-fit hover:bg-transparent" onClick={() => router.back()} variant="ghost">
              <Image
                src={Back}
                alt="Back button"
                className={`${isGradientPage ? "invert" : "invert-0"} hover:${isGradientPage ? "invert-0" : "invert"}`}
              />
            </Button>
          ) : (
            <div></div>
          )}
          <Image src={TalentLogo} alt="Talent Protocol logo" className={isGradientPage ? "invert" : "invert-0"} />
        </nav>
      </header>
      <section className="w-full sm:w-96 h-full flex flex-col items-center p-4 sm:py-14">{children}</section>
    </main>
  );
}
