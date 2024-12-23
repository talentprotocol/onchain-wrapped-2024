"use client";

import YourBuilderYear from "../yourBuilderYear";

const orgInformation = {
  org: "Zora",
  role: "Creator",
  nextPage: "/share",
  index: 3,
  achievements: [
    {
      title: "Zora Posts",
      value: "53"
    },
    {
      title: "Zora Earnings",
      value: "$1.7k"
    }
  ]
};

export default function Zerion() {
  return <YourBuilderYear orgInformation={orgInformation} />;
}
