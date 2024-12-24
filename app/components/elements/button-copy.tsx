"use client";

import Image from "next/image";
import { useCallback } from "react";

import Copy from "@/app/assets/icons/copy.svg";
import { Button } from "@/app/components/atoms";
import { useToast } from "@/app/hooks/use-toast";

export default function ButtonCopy({ color }: { color: string | null }) {
  const { toast } = useToast();

  const copyImageToClipboard = useCallback(() => {
    navigator.clipboard.writeText(`/api/image?color=${color ?? "talent"}`);
    toast({ title: "Copied!", description: "Copied image to clipboard" });
  }, [color, toast]);

  return (
    <Button onClick={copyImageToClipboard} className="w-full flex items-center gap-2">
      <Image src={Copy} alt="" width={16} height={16} />
      <span>Copy image</span>
    </Button>
  );
}
