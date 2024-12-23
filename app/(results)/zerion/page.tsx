"use client";

import YourBuilderYear from "../yourBuilderYear";

const orgInformation = {
  org: "Zerion",
  role: "Degen",
  nextPage: "/zora",
  index: 2,
  achievements: [
    {
      title: "Total Transactions",
      value: "485"
    },
    {
      title: "Estimated Profit",
      value: "$15k"
    }
  ]
};

export default function Zerion() {
  return <YourBuilderYear orgInformation={orgInformation} />;
}
