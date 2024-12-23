"use client";

import YourBuilderYear from "../yourBuilderYear";

const orgInformation = {
  org: "Talent Protocol",
  role: "Builder",
  nextPage: "/base",
  index: 0,
  achievements: [
    {
      title: "Builder Score",
      value: "75"
    },
    {
      title: "Rank",
      value: "TOP 20%"
    }
  ]
};

export default function Talent() {
  return <YourBuilderYear orgInformation={orgInformation} />;
}
