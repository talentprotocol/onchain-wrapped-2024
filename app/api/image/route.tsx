import { ImageResponse } from "next/og";

import { organizations } from "@/app/utils/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log("Full URL:", request.url);
  console.log("Query Param - color:", searchParams.get("color"));

  const org = searchParams.get("color") as keyof typeof organizations;

  // Validate if the color exists
  if (!org || !organizations[org]) {
    console.error("Invalid or missing color parameter.");
    return new Response("Invalid or missing color parameter", { status: 400 });
  }

  try {
    return new ImageResponse(<span>oi</span>, {
      width: 1200,
      height: 630
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
