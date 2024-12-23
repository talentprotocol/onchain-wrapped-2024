"use client";

import { toPng } from "html-to-image";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import Copy from "@/app/assets/icons/copy.svg";
import Farcaster from "@/app/assets/icons/farcaster.svg";
import Twitter from "@/app/assets/icons/twitter.svg";
import { Button } from "@/app/components/atoms";
import ShareImage from "@/app/components/elements/shareImage";
import { useGetUser } from "@/app/hooks/useUser";
import { organizations } from "@/app/utils/constants";

type OrganizationKey = keyof typeof organizations;

export default function Share() {
  const user = useGetUser();
  const ref = useRef<HTMLDivElement>(null);

  const [colorIndex, setColorIndex] = useState<OrganizationKey>("talent");
  const [img, setImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getButtonBorder = useCallback(
    (index: OrganizationKey, type: "inside" | "outside") => {
      return colorIndex === index ? (type === "inside" ? "border-white" : "border-primary") : "border-background";
    },
    [colorIndex]
  );

  const generateImage = useCallback(async () => {
    if (!ref.current) return;

    setLoading(true);
    try {
      const clonedElement = ref.current.cloneNode(true) as HTMLDivElement;
      clonedElement.classList.remove("hidden");

      document.body.appendChild(clonedElement);
      document.body.classList.add("overflow-hidden");

      const dataUrl = await toPng(clonedElement, { cacheBust: true });
      setImg(dataUrl);

      document.body.removeChild(clonedElement);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  }, [ref]);

  useEffect(() => {
    generateImage();
  }, [user, colorIndex, generateImage]);

  return (
    <>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold">Onchain Wrapped 2024</h1>
        <p className="font-normal">Share your 2024 Onchain Wrapped, and get the recognition you deserve.</p>
      </div>
      <div className="w-full sm:w-screen h-full flex flex-col items-center justify-around bg-hero-pattern bg-center">
        {loading ? (
          <div className="h-24 w-24 rounded-full border border-dotted border-4 border-t-primary animate-spin-slow" />
        ) : (
          <>
            {img && (
              <Image
                src={img}
                alt="onchain wrapped"
                width={16}
                height={16}
                className="w-full sm:w-1/3 object-contain border rounded-2xl shadow"
              />
            )}
            <div className="flex items-center gap-2">
              {Object.keys(organizations).map(key => (
                <Button
                  key={key}
                  onClick={() => setColorIndex(key as OrganizationKey)}
                  className={`w-10 h-10 p-0 border-2 ${getButtonBorder(
                    key as OrganizationKey,
                    "outside"
                  )} rounded-full`}
                >
                  <div
                    className={`w-full h-full border-2 ${getButtonBorder(
                      key as OrganizationKey,
                      "inside"
                    )} rounded-full bg-gradient-to-br ${organizations[key as OrganizationKey].gradient}`}
                  ></div>
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="w-full flex flex-col gap-2">
        <Button variant="secondary" className="w-full flex items-center gap-2">
          <Image src={Farcaster} alt="" width={16} height={16} />
          <span>Share on Farcaster</span>
        </Button>

        <Link href="https://twitter.com/intent/tweet?text=Hello%20world" data-size="large">
          <Button variant="secondary" className="w-full flex items-center gap-2">
            <Image src={Twitter} alt="" width={16} height={16} />
            <span>Share on X</span>
          </Button>
        </Link>
        <Button className="w-full flex items-center gap-2">
          <Image src={Copy} alt="" width={16} height={16} />
          <span>Copy image</span>
        </Button>
      </div>
      <ShareImage ref={ref} org={colorIndex} />
    </>
  );
}
