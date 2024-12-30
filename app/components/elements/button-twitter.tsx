"use client";

import Image from "next/image";
import { useCallback } from "react";

import Twitter from "@/app/assets/icons/twitter.svg";
import { Button } from "@/app/components/atoms";
import { useGetUser } from "@/app/hooks/useUser";

export default function ButtonTwitter({ color }: { color: string }) {
  const { user } = useGetUser();

  const shareOnTwitter = useCallback(() => {
    const text = encodeURIComponent("My 2024 Onchain! Check my #OnchainWrapped2024 by @TalentProtocol 💫");
    const url = encodeURIComponent(
      `${process.env.NEXT_PUBLIC_APP_URL!}/wrapped/${user?.talent_id}/share?color=${color}`
    );
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;

    window.open(twitterShareUrl, "_blank");
  }, [user?.talent_id, color]);

  return (
    <Button variant="secondary" onClick={shareOnTwitter} className="w-full flex items-center gap-2">
      <Image src={Twitter} alt="" width={16} height={16} />
      <span>Share on X</span>
    </Button>
  );
}
