"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import Zora from "@/app/assets/icons/zora.svg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button
} from "@/app/components/atoms";
import ButtonFarcaster from "@/app/components/elements/button-farcaster";
import ButtonTwitter from "@/app/components/elements/button-twitter";
import ButtonZoraPost from "@/app/components/elements/button-zora-post";
import { useGetUser } from "@/app/hooks/useUser";
import { organizations, OrgEnum } from "@/app/utils/constants";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { useSearchParams } from "next/navigation";
import { currentTimestamp } from "../utils/cache-timestamp";

export default function SharePage() {
  const currentSearchParams = useSearchParams();
  const { user, fetchUser: refetchUser, mintedOnZora } = useGetUser();
  const [color, setColor] = useState(currentSearchParams.get("color") || OrgEnum.TALENT);
  const [mintingOnZora, setMintingOnZora] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [openZoraMinted, setOpenZoraMinted] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);
  const [zoraPostUrl, setZoraPostUrl] = useState("");

  const getButtonBorder = useCallback(
    (index: OrgEnum, type: "inside" | "outside") => {
      return color === index ? (type === "inside" ? "border-white" : "border-primary") : "border-background";
    },
    [color]
  );

  const changeColor = (newColor: OrgEnum) => {
    setColor(newColor);
    setLoadingImage(true);
    const updatedSearchParams = new URLSearchParams(currentSearchParams.toString());
    updatedSearchParams.set("color", newColor);

    window.history.pushState(null, "", "?" + updatedSearchParams.toString());
  };

  const imageUrl = useMemo(
    () => `/api/users/${user?.talent_id}/image?color=${color}&v=${currentTimestamp()}`,
    [color, user]
  );

  useEffect(() => {
    setAuthToken(localStorage.getItem("auth_token"));
    refetchUser();
  }, [refetchUser]);

  if (!user) {
    return (
      <div className="h-24 w-24 mt-6 rounded-full border border-dotted border-4 border-t-primary animate-spin-slow" />
    );
  }

  if (mintingOnZora) {
    return (
      <div className="flex-1 w-full sm:w-screen flex flex-col items-center justify-around">
        <h1 className="text-2xl font-semibold text-center">Posting your 2024 Onchain Wrapped on Zora...</h1>
        <div className="h-24 w-24 rounded-full border border-dotted border-4 border-t-primary animate-spin-slow" />
        <p className="font-semibold text-center">
          You will earn 50% of the minting fees. They will be sent to your Talent Protocol main wallet.
        </p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          scale: { type: "spring", visualDuration: 0.8, bounce: 0.2 }
        }}
        className="flex flex-col items-center gap-2 text-center"
      >
        <h1 className="text-2xl font-semibold">Onchain Wrapped 2024</h1>
        <p className="font-normal">Share your 2024 Onchain Wrapped, and get the recognition you deserve.</p>
      </motion.div>
      <div className="w-full sm:w-screen flex flex-1 flex-col items-center justify-around gap-8">
        <Image
          src={imageUrl}
          alt="onchain wrapped"
          width={1200}
          height={630}
          className={`w-full sm:w-[500px] object-contain border rounded-2xl shadow ${loadingImage ? "hidden" : ""}`}
          onLoad={() => {
            setLoadingImage(false);
          }}
          priority
        />
        {loadingImage && (
          <div className="h-24 w-24 rounded-full border border-dotted border-4 border-t-primary animate-spin-slow" />
        )}
        <div className="flex items-center gap-2">
          {Object.values(OrgEnum).map(key => (
            <Button
              key={key}
              onClick={() => changeColor(key)}
              className={`w-10 h-10 p-0 border-2 ${getButtonBorder(key, "outside")} rounded-full`}
            >
              <div
                className={`w-full h-full border-2 ${getButtonBorder(key, "inside")} rounded-full bg-gradient-to-br ${
                  organizations[key].gradient
                }`}
              ></div>
            </Button>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <ButtonFarcaster color={color} />
        <ButtonTwitter color={color} />
        {user && mintedOnZora && (
          <Link href={user?.zora_post_url || "#"} target="_blank" className="w-full">
            <Button variant="secondary" className="w-full">
              <Image src={Zora} alt="" width={16} height={16} />
              Mint on Zora
            </Button>
          </Link>
        )}
        {!!authToken && user && !mintedOnZora && (
          <ButtonZoraPost
            authToken={authToken}
            talentId={user.talent_id}
            setLoading={setMintingOnZora}
            refetchUser={refetchUser}
            disabled={!user.main_wallet}
            setOpenZoraMinted={setOpenZoraMinted}
            setZoraPostUrl={setZoraPostUrl}
            color={color}
          />
        )}
      </div>
      <AlertDialog open={openZoraMinted} onOpenChange={setOpenZoraMinted}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Posted on Zora!</AlertDialogTitle>
            <AlertDialogDescription>Onchain Wrapped minted with success. Check it out!</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <a href={zoraPostUrl} target="_blank" rel="noopener noreferrer">
              <AlertDialogAction>Open on Zora</AlertDialogAction>
            </a>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
