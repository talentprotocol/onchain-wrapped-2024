"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import Copy from "@/app/assets/icons/copy.svg";
import Farcaster from "@/app/assets/icons/farcaster.svg";
import Twitter from "@/app/assets/icons/twitter.svg";
import Placeholder from "@/app/assets/images/placeholder.svg";
import { Button } from "@/app/components/atoms";
import { gradients } from "@/app/utils/constants";
import Link from "next/link";

export default function Share() {
  const [selectedColor, setSelectedColor] = useState<number>(0);

  const getButtonBorder = useCallback(
    (index: number, type: "inside" | "outside") => {
      if (selectedColor !== index) return "border-background";
      return type === "inside" ? "border-white" : "border-primary";
    },
    [selectedColor]
  );

  return (
    <>
      <div data-aos="fade-down" className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold">Onchain Wrapped 2024</h1>
        <p className="font-normal">Share your 2024 Onchain Wrapped, and get the recognition you deserve.</p>
      </div>
      <div className="w-full sm:w-screen h-full flex flex-col items-center justify-around bg-hero-pattern bg-center">
        <Image
          data-aos="flip-up"
          data-aos-duration="2000"
          src={Placeholder}
          alt="onchain wrapped"
          className="w-full h-48 sm:w-96 object-contain"
        />
        <div data-aos="fade-up" className="flex items-center gap-2">
          {Object.values(gradients).map((gradient, index) => (
            <Button
              key={index}
              onClick={() => setSelectedColor(index)}
              className={`w-10 h-10 p-0 border-2 ${getButtonBorder(index, "outside")} rounded-full`}
            >
              <div
                className={`w-full h-full border-2 ${getButtonBorder(
                  index,
                  "inside"
                )} rounded-full bg-gradient-to-br ${gradient}`}
              ></div>
            </Button>
          ))}
        </div>
      </div>
      <div data-aos="fade-up" className="w-full flex flex-col gap-2">
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
    </>
  );
}
