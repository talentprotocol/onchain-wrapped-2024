"use client";

import Image from "next/image";
import { useCallback } from "react";

import Twitter from "@/app/assets/icons/twitter.svg";
import { Button } from "@/app/components/atoms";
import { useGetUser } from "@/app/hooks/useUser";

export default function ButtonTwitter() {
  const user = useGetUser();

  const shareOnTwitter = useCallback(() => {
    const text = encodeURIComponent("Check out my Onchain Wrapped 2024 by Talent Protocol!");
    const url = encodeURIComponent(`https://www.builderscore.xyz/wrapped/${user?.talent_id}/share`);
    const hashtags = "OnchainWrapped2024,TalentProtocol";
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}`;

    window.open(twitterShareUrl, "_blank");
  }, [user?.talent_id]);

  return (
    <Button variant="secondary" onClick={shareOnTwitter} className="w-full flex items-center gap-2">
      <Image src={Twitter} alt="" width={16} height={16} />
      <span>Share on X</span>
    </Button>
  );
}
