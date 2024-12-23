"use client";

import { useGetUser } from "@/app/hooks/useUser";
import YourBuilderYear from "../yourBuilderYear";

const orgInformation = {
  org: "Zerion",
  role: "Degen",
  index: 2
};

export default function Zerion() {
  const user = useGetUser();

  const achievements = [
    {
      title: "Total Transactions",
      value: user?.year_transactions
    },
    {
      title: "Estimated Profit",
      value: `${user?.year_pnl?.toLocaleString("en-us", {
        maximumFractionDigits: 2
      })} $`
    }
  ];

  return (
    <YourBuilderYear
      orgInformation={orgInformation}
      achievements={achievements}
      nextPage={`/wrapped/${user?.talent_id}/zora`}
    />
  );
}
