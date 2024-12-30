"use client";

import Image from "next/image";
import { useCallback } from "react";

import Farcaster from "@/app/assets/icons/farcaster.svg";
import { Button } from "@/app/components/atoms";
import { useGetUser } from "@/app/hooks/useUser";

export default function ButtonFarcaster({ color }: { color: string }) {
  const { user } = useGetUser();

  const shareOnFarcaster = useCallback(() => {
    const text = encodeURIComponent(
      `Check out my Onchain Wrapped 2024 by Talent Protocol! @talentmate.eth \n${process.env
        .NEXT_PUBLIC_APP_URL!}/wrapped/${user?.talent_id}/talent?color=${color}`
    );
    const url = encodeURIComponent(
      `${process.env.NEXT_PUBLIC_APP_URL!}/wrapped/${user?.talent_id}/talent?color=${color}`
    );
    const farcasterShareUrl = `https://warpcast.com/~/compose?text=${text}&embeds[]=${url}`;

    window.open(farcasterShareUrl, "_blank");
  }, [user?.talent_id, color]);

  return (
    <Button variant="secondary" onClick={shareOnFarcaster} className="w-full flex items-center gap-2">
      <Image src={Farcaster} alt="" width={16} height={16} />
      <span>Share on Farcaster</span>
    </Button>
  );
}
