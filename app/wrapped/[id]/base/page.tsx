"use client";

import { useGetUser } from "@/app/hooks/useUser";
import YourBuilderYear from "../yourBuilderYear";

const orgInformation = {
  org: "Base",
  role: "Developer",
  index: 1
};

export default function Base() {
  const user = useGetUser();

  const achievements = [
    {
      title: "GitHub Contribuitions",
      value: user?.github_contributions
    },
    {
      title: "Base Smart contracts deployed",
      value: (user?.base_mainnet_contracts_deployed || 0) + (user?.base_testnet_contracts_deployed || 0)
    }
  ];
  return (
    <YourBuilderYear
      orgInformation={orgInformation}
      achievements={achievements}
      nextPage={`/wrapped/${user?.talent_id}/zerion`}
    />
  );
}
