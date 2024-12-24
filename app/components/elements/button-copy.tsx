"use client";

import Image from "next/image";
import { useCallback } from "react";

import Copy from "@/app/assets/icons/copy.svg";
import { Button } from "@/app/components/atoms";

export default function ButtonCopy({ img }: { img: string | null }) {
  const copyImageToClipboard = useCallback(() => {
    if (!img) return;
    navigator.clipboard.writeText(img);
  }, [img]);

  return (
    <Button onClick={copyImageToClipboard} className="w-full flex items-center gap-2">
      <Image src={Copy} alt="" width={16} height={16} />
      <span>Copy image</span>
    </Button>
  );
}
