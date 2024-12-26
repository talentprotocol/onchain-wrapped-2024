"use client";

import Image from "next/image";
import { useState } from "react";

import Copy from "@/app/assets/icons/copy.svg";
import { Button } from "@/app/components/atoms";
import { useToast } from "@/app/hooks/use-toast";

export default function ButtonCopy({ imageUrl }: { imageUrl: string }) {
  const { toast } = useToast();

  const [copying, setCopying] = useState(false);

  async function copyImageToClipboard() {
    try {
      setCopying(true);
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch the image");
      }
      const blob = await response.blob();

      await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);

      toast({ title: "Success!", description: "Image copied to clipboard" });
      setCopying(false);
    } catch (error) {
      toast({ title: "Error!", description: `Error copying image to clipboard: ${error}`, variant: "destructive" });
      setCopying(false);
    }
  }

  return (
    <Button onClick={copyImageToClipboard} disabled={copying} className="w-full flex items-center gap-2">
      <Image src={Copy} alt="" width={16} height={16} />
      <span>{copying ? "Copying" : "Copy image"}</span>
    </Button>
  );
}
