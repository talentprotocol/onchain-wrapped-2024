"use client";

import YourBuilderYear from "../yourBuilderYear";

const orgInformation = {
  org: "Base",
  role: "Developer",
  nextPage: "/zerion",
  index: 1,
  achievements: [
    {
      title: "GitHub Contribuitions",
      value: "245"
    },
    {
      title: "Smart Contracts",
      value: "$150k"
    }
  ]
};

export default function Base() {
  return <YourBuilderYear orgInformation={orgInformation} />;
}
