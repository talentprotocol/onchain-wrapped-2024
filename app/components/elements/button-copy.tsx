"use client";

import Image from "next/image";
import { useCallback } from "react";

import Copy from "@/app/assets/icons/copy.svg";
import { Button } from "@/app/components/atoms";
import { useToast } from "@/app/hooks/use-toast";

export default function ButtonCopy({ imageUrl }: { imageUrl: string }) {
  const { toast } = useToast();

  const copyImageToClipboard = useCallback(async () => {
    const data = await fetch(imageUrl);
    const blob = await data.blob();
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ]);

    toast({ title: "Success!", description: "Image copied to clipboard" });
  }, [imageUrl, toast]);

  return (
    <Button onClick={copyImageToClipboard} className="w-full flex items-center gap-2">
      <Image src={Copy} alt="" width={16} height={16} />
      <span>Copy image</span>
    </Button>
  );
}
