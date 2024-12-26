"use client";

import { useCallback } from "react";

import { Button } from "@/app/components/atoms";
import { toast } from "@/app/hooks/use-toast";

export default function ButtonZoraMint({
  authToken,
  talentId,
  setLoading,
  refetchUser
}: {
  authToken: string;
  talentId: number;
  setLoading: (loading: boolean) => void;
  refetchUser: () => void;
}) {
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
      toast({ title: "Success!", description: "Onchain Wrapped minted on Zora" });
      refetchUser();
      setLoading(false);
    } else {
      toast({ title: "Error!", description: "Unable to mint on Zora" });
      setLoading(false);
    }
  }, [authToken, refetchUser, setLoading, talentId]);

  return (
    <Button variant="secondary" onClick={refreshData} className="w-full flex items-center gap-2">
      <span>Mint on Zora</span>
    </Button>
  );
}
