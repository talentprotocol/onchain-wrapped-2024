"use client";

import { useCallback, useState } from "react";

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
import { toast } from "@/app/hooks/use-toast";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import Image from "next/image";

export default function ButtonZoraPost({
  authToken,
  talentId,
  disabled,
  setLoading,
  refetchUser,
  setOpenZoraMinted,
  setZoraPostUrl
}: {
  authToken: string;
  talentId: number;
  disabled: boolean;
  setLoading: (loading: boolean) => void;
  refetchUser: () => void;
  setOpenZoraMinted: (open: boolean) => void;
  setZoraPostUrl: (url: string) => void;
}) {
  const [confirmZoraMintOpen, setConfirmZoraMintOpen] = useState(false);

  const refreshData = useCallback(async () => {
    setLoading(true);
    const result = await fetch(`/api/users/${talentId}/zora`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        AUTHORIZATION: `Bearer ${authToken}`
      }
    });

    if (result.ok) {
      const data = await result.json();

      setOpenZoraMinted(true);
      setZoraPostUrl(data.zoraPostUrl);
      refetchUser();
      setLoading(false);
    } else {
      toast({ title: "Error!", description: "Unable to mint on Zora" });
      setLoading(false);
    }
  }, [authToken, refetchUser, setLoading, talentId]);

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setConfirmZoraMintOpen(true)}
        disabled={disabled}
        className="w-full flex items-center gap-2"
      >
        <Image src={Zora} alt="" width={16} height={16} />
        <span>Post on Zora</span>
      </Button>
      <AlertDialog open={confirmZoraMintOpen} onOpenChange={setConfirmZoraMintOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You`re about to post your 2024 on Zora!</AlertDialogTitle>
            <AlertDialogDescription>
              After posting you won`t be able to change your wrapped! Make sure you add all your socials and wallets to
              your Talent Protocol profile
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <a href={`/loading_wrapped/${talentId}`}>
              <AlertDialogAction>Connect more data</AlertDialogAction>
            </a>
            <Button onClick={refreshData} variant="default">
              <Image src={Zora} alt="" width={16} height={16} />
              Mint
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
