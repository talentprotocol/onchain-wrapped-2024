"use server";

import SharePage from "@/app/components/share-page";
import { currentTimestamp } from "@/app/utils/cache-timestamp";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const id = (await params).id;
  const color = (await searchParams).color ?? "talent";

  return {
    openGraph: {
      images: [
        {
          url: `/api/users/${id}/image?color=${color}&v=${currentTimestamp()}`,
          width: 1200,
          height: 630,
          alt: "Onchain Wrapped 2024",
          type: "image/png"
        }
      ]
    }
  };
}

export default async function Share() {
  return <SharePage />;
}
