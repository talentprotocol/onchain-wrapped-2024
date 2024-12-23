"use client";

import Image from "next/image";
import { useMemo } from "react";

import { useGetUser } from "@/app/hooks/useUser";
import { getAchievements, organizations } from "@/app/utils/constants";

export default function ShareImage() {
  const user = useGetUser();

  const achievements = useMemo(() => getAchievements(user), [user]);

  const highestTransaction = useMemo(() => {
    const transactions = [
      { label: "Base", value: user?.year_base_transactions ?? 0 },
      { label: "BSC", value: user?.year_bsc_transactions ?? 0 },
      { label: "Ethereum", value: user?.year_ethereum_transactions ?? 0 },
      { label: "Optimism", value: user?.year_optimism_transactions ?? 0 },
      { label: "Arbitrum", value: user?.year_arbitrum_transactions ?? 0 }
    ];

    return transactions.reduce((highest, current) => (current.value > highest.value ? current : highest), {
      label: "",
      value: 0
    });
  }, [user]);

  return (
    <div className="w-screen h-full grid grid-cols-4 grid-rows-[auto_1fr_1fr] gap-4 p-6 bg-background bg-share-pattern bg-center bg-cover font-mono uppercase">
      <div className="w-full h-min flex items-center justify-center p-6 border-2 border-accent-foreground rounded-3xl bg-accent-foreground">
        <h1 className="flex flex-col -gap-1 text-4xl font-medium text-white">
          <span>
            onchain
            <span className="bg-gradient-to-br from-chart-3 to-chart-4 text-transparent bg-clip-text">20</span>
          </span>
          <span>
            wrapped
            <span className="bg-gradient-to-br from-chart-3 to-chart-4 text-transparent bg-clip-text">24</span>
          </span>
        </h1>
      </div>
      <div className="w-full h-min flex items-center gap-4 p-6 col-span-3 border-2 border-white rounded-3xl text-2xl font-light backdrop-blur-2xl shadow">
        {user?.image_url && (
          <Image src={user?.image_url} alt="User profile image" className="w-20 h-20 rounded-2xl object-cover" />
        )}
        <div className="w-full flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <span className="font-medium">{user?.ens ?? "-"}</span>
            <span>
              Onchain since’
              {typeof user?.onchain_since === "string"
                ? user?.onchain_since ?? "-"
                : user?.onchain_since?.toString() ?? "-"}
            </span>
          </div>
          <div className="flex flex-col gap-2 text-right">
            <span>
              Most active on <span className="font-medium">{highestTransaction.label}</span>
            </span>
            <span>
              With <span className="font-medium">{highestTransaction.value}</span> transactions
            </span>
          </div>
        </div>
      </div>
      {Object.keys(organizations).map(org => (
        <div
          key={org}
          className="w-full flex flex-col gap-2 justify-between col-span-2 p-6 border-2 border-white rounded-3xl backdrop-blur-2xl shadow"
        >
          <div className="flex items-center gap-2 text-sm font-medium tracking-widest">
            <span className="px-3 py-1 border-2 border-accent-foreground rounded-[32px] bg-accent-foreground text-white">
              {organizations[org].role}
            </span>
            <span className="px-3 py-1 border-2 border-white rounded-[32px] bg-white/20 backdrop-blur-2xl">
              {`Powered By ${organizations[org].name}`}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {achievements[org]?.map(({ title, value }, index) => (
              <span key={title} className={`flex flex-col gap-8 ${index === 0 ? "border-r-4 border-dotted " : ""}`}>
                <span className="text-5xl">{value ?? "-"}</span>
                <span className="font-medium tracking-widest">{title}</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
