"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/app/components/atoms";
import ButtonCopy from "@/app/components/elements/button-copy";
import ButtonFarcaster from "@/app/components/elements/button-farcaster";
import ButtonRefresh from "@/app/components/elements/button-refresh";
import ButtonTwitter from "@/app/components/elements/button-twitter";
import ButtonZoraMint from "@/app/components/elements/button-zora-mint";
import { useGetUser } from "@/app/hooks/useUser";
import { organizations } from "@/app/utils/constants";
import Link from "next/link";

type OrganizationKey = keyof typeof organizations;

export default function Share() {
  const { user, fetchUser: refetchUser } = useGetUser();
  const [color, setColor] = useState<OrganizationKey>("talent");
  const [loading, setLoading] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const getButtonBorder = useCallback(
    (index: OrganizationKey, type: "inside" | "outside") => {
      return color === index ? (type === "inside" ? "border-white" : "border-primary") : "border-background";
    },
    [color]
  );

  const imageUrl = useMemo(() => `/api/users/${user?.talent_id}/image?color=${color}`, [color, user]);

  useEffect(() => {
    setAuthToken(localStorage.getItem("auth_token"));
  }, []);

  if (!user || loading) {
    return <div className="h-24 w-24 rounded-full border border-dotted border-4 border-t-primary animate-spin-slow" />;
  }

  return (
    <>
      <div data-aos="fade-down" className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold">Onchain Wrapped 2024</h1>
        <p className="font-normal">Share your 2024 Onchain Wrapped, and get the recognition you deserve.</p>
      </div>
      <div className="w-full sm:w-screen h-full flex flex-col items-center justify-around">
        <Image
          data-aos="flip-up"
          data-aos-duration="2000"
          src={imageUrl}
          alt="onchain wrapped"
          width={1200}
          height={630}
          className="w-full sm:w-[500px] object-contain border rounded-2xl shadow"
          priority
        />
        <div data-aos="fade-up" className="flex items-center gap-2">
          {Object.keys(organizations).map(key => (
            <Button
              key={key}
              onClick={() => setColor(key as OrganizationKey)}
              className={`w-10 h-10 p-0 border-2 ${getButtonBorder(key as OrganizationKey, "outside")} rounded-full`}
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
      </div>
      <div data-aos="fade-right" className="w-full flex flex-col gap-2">
        <ButtonFarcaster />
        <ButtonTwitter />
        {!!authToken &&
          user &&
          (user.zora_post_url ? (
            <Link href={user.zora_post_url} className="w-full">
              <Button variant="default" className="w-full">
                Mint on Zora
              </Button>
            </Link>
          ) : (
            <ButtonZoraMint
              authToken={authToken}
              talentId={user.talent_id}
              setLoading={setLoading}
              refetchUser={refetchUser}
            />
          ))}
        {!!authToken && user && (
          <ButtonRefresh authToken={authToken} talentId={user.talent_id} setLoading={setLoading} />
        )}
        <ButtonCopy imageUrl={imageUrl} />
      </div>
    </>
  );
}
