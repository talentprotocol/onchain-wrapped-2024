"use client";

import { useCallback } from "react";

import { Button } from "@/app/components/atoms";
import { useRouter } from "next/navigation";

export default function ButtonRefresh({
  authToken,
  talentId,
  setImg
}: {
  authToken: string;
  talentId: number;
  setImg: (img: string | null) => void;
}) {
  const router = useRouter();

  const refreshData = useCallback(async () => {
    setImg(null);
    const result = await fetch(`/api/users/${talentId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        AUTHORIZATION: `Bearer ${authToken}`
      }
    });

    if (result.ok) {
      router.push(`/loading_wrapped/${talentId}`);
    }
  }, [authToken, talentId]);

  return (
    <Button onClick={refreshData} className="w-full flex items-center gap-2 mt-4">
      <span>Refresh data</span>
    </Button>
  );
}
