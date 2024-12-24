"use server";

import { Metadata } from "next";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const organization = (await searchParams)?.organization;

  return {
    openGraph: {
      images: [
        {
          url: `/api/image?organization=${organization ?? "talent"}`,
          width: 1200,
          height: 630,
          alt: "Onchain Wrapped 2024",
          type: "image/png"
        }
      ]
    }
  };
}

export default async function ShareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
