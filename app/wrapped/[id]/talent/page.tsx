"use client";

import { useGetUser } from "@/app/hooks/useUser";
import YourBuilderYear from "../yourBuilderYear";

const orgInformation = {
  org: "Talent Protocol",
  role: "Builder",
  index: 0
};

export default function Talent() {
  const user = useGetUser();

  const achievements = [
    {
      title: "Builder Score",
      value: user?.builder_score
    },
    {
      title: "Credentials",
      value: user?.credentials_count
    }
  ];
  return (
    <YourBuilderYear
      orgInformation={orgInformation}
      achievements={achievements}
      nextPage={`/wrapped/${user?.talent_id}/base`}
    />
  );
}
