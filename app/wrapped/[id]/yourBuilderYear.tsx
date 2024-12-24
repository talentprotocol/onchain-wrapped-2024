"use client";

import Link from "next/link";

import { Button } from "@/app/components/atoms";

type Achievement = {
  title: string;
  value: number | string | undefined;
};

type YourBuilderYearProps = {
  orgInformation: {
    org: string;
    role: string;
    index: number;
  };
  achievements: Achievement[];
  nextPage: string;
};

const animations = ["right", "up", "left", "down"];

export default function YourBuilderYear({ orgInformation, achievements, nextPage }: YourBuilderYearProps) {
  return (
    <>
      <div
        data-aos={`fade-${animations[orgInformation.index]}`}
        className="flex flex-col items-center gap-2 text-center text-white"
      >
        <h1 className="text-2xl font-semibold">Your Builder Year</h1>
        <p className="font-normal">Share your 2024 builder recap, and get the recognition you deserve.</p>
      </div>
      <div
        data-aos={`zoom-in-${animations[orgInformation.index]}`}
        className="w-full sm:w-screen h-full flex flex-col items-center justify-around bg-hero-pattern bg-center"
      >
        <div className="w-full sm:w-96 flex flex-col items-center gap-2 text-white">
          {achievements.map(({ title, value }) => (
            <div
              key={title}
              className="w-full flex flex-col items-center gap-3 p-6 border border-white/60 rounded-3xl bg-white/20 backdrop-blur-sm shadow"
            >
              <span className="font-bold text-4xl">{value}</span>
              <span className="font-semibold text-xs uppercase">{title}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2 text-white uppercase">
          <span className="px-3 py-0.5 border rounded-[64px] bg-white/10 text-white text-sm font-medium font-mono backdrop-blur-sm shadow">
            {`Powered By ${orgInformation.org}`}
          </span>
          <span className="font-semibold text-2xl">{orgInformation.role}</span>
          <div className="flex items-center gap-2 py-4">
            {Array.from(Array(4).keys()).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${orgInformation.index === index ? "bg-white" : "bg-white/20"}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <Link href={nextPage} className="w-full">
        <Button variant="secondary" className="w-full">
          Next
        </Button>
      </Link>
    </>
  );
}
