"use client";

import { useGetUser } from "@/app/hooks/useUser";
import YourBuilderYear from "../yourBuilderYear";

const orgInformation = {
  org: "Zora",
  role: "Creator",
  index: 3
};

export default function Zora() {
  const user = useGetUser();

  const achievements = [
    {
      title: "Zora Posts",
      value: user?.year_zora_posts
    },
    {
      title: "Zora Mints",
      value: user?.year_zora_mints
    }
  ];
  return (
    <YourBuilderYear
      orgInformation={orgInformation}
      achievements={achievements}
      nextPage={`/wrapped/${user?.talent_id}/share`}
    />
  );
}
