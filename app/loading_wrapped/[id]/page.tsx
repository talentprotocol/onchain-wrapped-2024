"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import Check from "@/app/assets/icons/check.svg";
import { Button } from "@/app/components/atoms";
import { usePageVisibility } from "@/app/hooks/useVisibility";
import type { UserModel } from "@/models/user.model";
import Link from "next/link";

const loadingWallets: { name: string; loading: keyof UserModel }[] = [
  {
    name: "Base Transactions",
    loading: "loading_wallets_transactions"
  },
  {
    name: "Ethereum Transactions",
    loading: "loading_wallets_transactions"
  },
  {
    name: "BSC Transactions",
    loading: "loading_wallets_transactions"
  },
  {
    name: "Optimism Transactions",
    loading: "loading_wallets_transactions"
  },
  {
    name: "Arbitrum Transactions",
    loading: "loading_wallets_transactions"
  },
  {
    name: "Wallets PnL",
    loading: "loading_wallets_pnl"
  },
  {
    name: "Zora Posts",
    loading: "loading_wallets_zora"
  },
  {
    name: "Zora Mints",
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

  const loading = user?.loading_wallets_pnl || user?.loading_wallets_transactions || user?.loading_wallets_zora;

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

  const redirectToTalentProtocolIntegrations = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_TALENT_PROTOCOL_PASSPORT_URL}/settings/integrations?auth_token=${localStorage.getItem(
        "auth_token"
      )}`
    );
  };

  const redirectToTalentProtocolWallets = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_TALENT_PROTOCOL_PASSPORT_URL}/settings/wallets?auth_token=${localStorage.getItem(
        "auth_token"
      )}`
    );
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {loading && (
        <div className="h-24 w-24 rounded-full border border-dotted border-4 border-t-primary animate-spin-slow" />
      )}
      {loading ? (
        <h1 className="text-2xl font-semibold">Checking onchain data...</h1>
      ) : (
        <h1 className="text-2xl font-semibold">Check completed</h1>
      )}
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex justify-between">
          <span className="text-sm">Builder Score</span>
          <Image alt="" src={Check} />
        </div>
        <div className="w-full flex justify-between">
          <span className="text-sm">Talent Protocol credentials</span>
          <Image alt="" src={Check} />
        </div>
        <div className="w-full flex justify-between">
          <span className="text-sm">Github contributions</span>
          <Image alt="" src={Check} />
        </div>
        {loadingWallets.map(({ loading, name }) => (
          <div key={name} className="w-full flex justify-between">
            <span className="text-sm">{name}</span>
            {user?.[loading] ? (
              <div className="h-5 w-5 rounded-full border border-primary border-2 border-t-transparent border-l-transparent animate-spin-slow" />
            ) : (
              <Image alt="" src={Check} />
            )}
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col gap-3">
        <Button
          variant="secondary"
          onClick={redirectToTalentProtocolIntegrations}
          className="w-full flex items-center gap-2"
        >
          <span>Connect more socials</span>
        </Button>
        <Button
          variant="secondary"
          onClick={redirectToTalentProtocolWallets}
          className="w-full flex items-center gap-2"
        >
          <span>Add more wallets</span>
        </Button>
        <Link href={`/wrapped/${user?.talent_id}/talent`} className="w-full">
          <Button variant="default" className="w-full">
            Check my 2024 Wrapped
          </Button>
        </Link>
      </div>
    </div>
  );
}
