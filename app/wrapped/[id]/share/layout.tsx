"use server";

import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  return {
    openGraph: {
      images: [
        {
          url: `/api/users/${id}/image`,
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
