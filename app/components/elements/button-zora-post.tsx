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
  refetchUser
}: {
  authToken: string;
  talentId: number;
  disabled: boolean;
  setLoading: (loading: boolean) => void;
  refetchUser: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

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

      setOpen(true);
      setUrl(data.zoraPostUrl);
      refetchUser();
      setLoading(false);
    } else {
      toast({ title: "Error!", description: "Unable to mint on Zora" });
      setLoading(false);
    }
  }, [authToken, refetchUser, setLoading, talentId]);

  return (
    <>
      <Button variant="secondary" onClick={refreshData} disabled={disabled} className="w-full flex items-center gap-2">
        <Image src={Zora} alt="" width={16} height={16} />
        <span>Post on Zora</span>
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Posted on Zora!</AlertDialogTitle>
            <AlertDialogDescription>Onchain Wrapped minted with success. Check it out!</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <AlertDialogAction>Open on Zora</AlertDialogAction>
            </a>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
