"use client";

import { UserClientModel } from "@/models/user.model";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { usePageVisibility } from "../../hooks/useVisibility";

export default function Page() {
  const isPageVisible = usePageVisibility();
  const router = useRouter();
  const timerIdRef = useRef<ReturnType<typeof setTimeout>>(null);
  const [isPollingEnabled, setIsPollingEnabled] = useState(true);
  const [user, setUser] = useState<UserClientModel>();
  const params = useParams();
  const talentId = params.id;

  const loadingData = !user || user.loadingWalletsPnl || user.loadingWalletsTransactions || user.loadingWalletsZora;

  const fetchUser = async () => {
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
      console.log("result", result);
      setIsPollingEnabled(false);
    }

    setUser(data.user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
  }, [isPageVisible, isPollingEnabled]);

  return (
    <div className="flex flex-col w-3/5 gap-3">
      {loadingData ? (
        <>
          <h2 className="text-2xl font-semibold text-center my-6">Loading onchain data...</h2>
          <div className="flex flex-row items-center justify-center">
            <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600 text-center" />
          </div>
        </>
      ) : (
        <h2 className="text-2xl font-semibold text-center my-6">Onchain Wrapped 2024</h2>
      )}

      <div className="flex flex-row  gap-1 place-content-between">
        <h3>ENS</h3>
        <p>{user?.ens}</p>
      </div>
      <div className="flex flex-row  gap-1 place-content-between">
        <h3>Builder Score</h3>
        <p>{user?.builderScore}</p>
      </div>
      <div className="flex flex-row  gap-1 place-content-between">
        <h3>Credentials</h3>
        <p>{user?.credentialsCount}</p>
      </div>
      <div className="flex flex-row  gap-1 place-content-between">
        <h3>2024 Github Contributions</h3>
        <p>{user?.githubContributions}</p>
      </div>

      <div className="flex flex-row  gap-1 place-content-between">
        <h3>2024 Base Mainnet deployed contracts</h3>
        <p>{user?.baseMainnetContractsDeployed}</p>
      </div>

      <div className="flex flex-row  gap-1 place-content-between">
        <h3>2024 Base Testnet deployed contracts</h3>
        <p>{user?.baseTestnetContractsDeployed}</p>
      </div>

      <div className="flex flex-row  gap-1 place-content-between">
        <h3>2024 Transactions</h3>
        <p>{user?.yearTransactions}</p>
      </div>

      <div className="flex flex-row  gap-1 place-content-between">
        <h3>2024 PnL</h3>
        <p>{user?.yearPnL?.toFixed(2)}</p>
      </div>

      <div className="flex flex-row  gap-1 place-content-between">
        <h3>2024 Zora mints</h3>
        <p>{user?.yearZoraMints}</p>
      </div>

      <div className="flex flex-row  gap-1 place-content-between">
        <h3>2024 Zora posts</h3>
        <p>{user?.yearZoraPosts}</p>
      </div>
    </div>
  );
}