"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import Check from "@/app/assets/icons/check.svg";
import { usePageVisibility } from "@/app/hooks/useVisibility";
import type { UserModel } from "@/models/user.model";

const loadingWallets: Record<string, string>[] = [
  {
    name: "Transactions",
    loading: "loading_wallets_transactions"
  },
  {
    name: "PNL",
    loading: "loading_wallets_pnl"
  },
  {
    name: "Zora",
    loading: "loading_wallets_zora"
  }
];

export default function Page() {
  const timerIdRef = useRef<ReturnType<typeof setTimeout>>(null);
  const [isPollingEnabled, setIsPollingEnabled] = useState(true);
  const [user, setUser] = useState<UserModel>();

  const isPageVisible = usePageVisibility();
  const router = useRouter();
  const params = useParams();

  const talentId = params.id;

  const fetchUser = useCallback(async () => {
    const result = await fetch(`/api/users/${talentId}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });

    const data = await result.json();

    if (result.status == 404) {
      router.push("/");
    }

    if (!result.ok) {
      setIsPollingEnabled(false);
    }

    const user = data.user;

    if (!(user.loading_wallets_pnl || user.loading_wallets_transactions || user.loading_wallets_zora)) {
      setIsPollingEnabled(false);
    }

    setUser(user);
  }, [router, talentId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const pollingCallback = () => {
      // Your polling logic here
      fetchUser();
    };

    const startPolling = () => {
      // pollingCallback(); // To immediately start fetching data
      // Polling every 30 seconds
      timerIdRef.current = setInterval(pollingCallback, 10000);
    };

    const stopPolling = () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }

      console.log("Stop pooling");
      router.push(`/wrapped/${talentId}/talent`);
    };

    if (isPageVisible && isPollingEnabled) {
      startPolling();
    } else {
      stopPolling();
    }

    return () => {
      stopPolling();
    };
  }, [fetchUser, isPageVisible, isPollingEnabled, router, talentId]);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="h-24 w-24 rounded-full border border-dotted border-4 border-t-primary animate-spin-slow" />
      <h1 className="text-2xl font-semibold">Checking onchain data...</h1>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex justify-between">
          <span className="text-sm">Talent Data</span>
          <Image alt="" src={Check} />
        </div>
        {loadingWallets.map(({ loading, name }) => (
          <div key={name} className="w-full flex justify-between">
            <span className="text-sm">{name}</span>
            {user?.[loading as keyof UserModel] ? (
              <div className="h-5 w-5 rounded-full border border-primary border-2 border-t-transparent border-l-transparent animate-spin-slow" />
            ) : (
              <Image alt="" src={Check} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
