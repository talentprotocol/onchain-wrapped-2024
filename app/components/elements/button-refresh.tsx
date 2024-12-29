"use client";

import { useCallback } from "react";

import { Button } from "@/app/components/atoms";
import { UserModel } from "@/models/user.model";
import { useRouter } from "next/navigation";

export default function ButtonRefresh({
  authToken,
  talentId,
  setLoading,
  setUser,
  disabled
}: {
  authToken: string;
  talentId: number;
  disabled: boolean;
  setLoading: (loading: boolean) => void;
  setUser: (user: UserModel | undefined) => void;
}) {
  const router = useRouter();

  const refreshData = useCallback(async () => {
    setLoading(true);
    setUser(undefined);
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
  }, [authToken, router, talentId, setLoading, setUser]);

  return (
    <Button onClick={refreshData} disabled={disabled} className="w-full flex items-center gap-2">
      <span>Refresh data</span>
    </Button>
  );
}
