"use client";

import Image from "next/image";
import { useCallback } from "react";

import Copy from "@/app/assets/icons/copy.svg";
import { Button } from "@/app/components/atoms";

export default function ButtonCopy({ img }: { img: string | null }) {
  const copyImageToClipboard = useCallback(() => {
    if (!img) return;

    const base64Data = img.split(",")[1]; // Extract the Base64 data
    const mimeType = "image/png"; // Extract MIME type
    const binaryData = atob(base64Data); // Decode Base64 to binary
    const arrayBuffer = new Uint8Array(binaryData.length);

    for (let i = 0; i < binaryData.length; i++) {
      arrayBuffer[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: mimeType });
    navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ]);
  }, [img]);

  return (
    <Button onClick={copyImageToClipboard} className="w-full flex items-center gap-2">
      <Image src={Copy} alt="" width={16} height={16} />
      <span>Copy image</span>
    </Button>
  );
}
