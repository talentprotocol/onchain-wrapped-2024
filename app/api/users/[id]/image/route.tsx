import { promises as fsPromises } from "fs";
import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";
import path from "path";

import ShareImage from "@/app/components/elements/share-image";
import { organizations, OrgEnum } from "@/app/utils/constants";
import { rollbarError } from "@/utils/rollbar/log";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { searchParams } = new URL(request.url);
  const { id } = await params;
  const talentId: number = parseInt(id) || 0;

  const color = searchParams.get("color") as OrgEnum;

  const supabase = await createSupabaseServerClient();
  const { data: user, error: getUserError } = await supabase
    .from("users")
    .select("*")
    .eq("talent_id", talentId)
    .maybeSingle();

  if (getUserError) {
    rollbarError("Unable to get user", getUserError);
    return NextResponse.json({ error: "Unable to get user" }, { status: 400 });
  }

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const lightFontPath = path.join(process.cwd(), "public/fonts/dm-mono-light.ttf");
  const regularFontPath = path.join(process.cwd(), "public/fonts/dm-mono-regular.ttf");
  const mediumFontPath = path.join(process.cwd(), "public/fonts/dm-mono-medium.ttf");
  const backgroundPath = path.join(process.cwd(), `public/images/share-pattern-${organizations[color].bg}.png`);
  const cardBackgroundPath = path.join(process.cwd(), `public/images/card-bg.png`);
  const cardBackgroundTopPath = path.join(process.cwd(), `public/images/card-bg-top-${organizations[color].bg}.png`);
  const cardBackgroundBottomPath = path.join(
    process.cwd(),
    `public/images/card-bg-bottom-${organizations[color].bg}.png`
  );

  const lightFontData = await fsPromises.readFile(lightFontPath);
  const regularFontData = await fsPromises.readFile(regularFontPath);
  const mediumFontData = await fsPromises.readFile(mediumFontPath);
  const backgroundData = await fsPromises.readFile(backgroundPath);
  const cardBackgroundData = await fsPromises.readFile(cardBackgroundPath);
  const cardBackgroundTopData = await fsPromises.readFile(cardBackgroundTopPath);
  const cardBackgroundBottomData = await fsPromises.readFile(cardBackgroundBottomPath);

  try {
    return new ImageResponse(
      (
        <ShareImage
          background={backgroundData}
          cardBackground={cardBackgroundData}
          cardBackgroundBottom={cardBackgroundBottomData}
          cardBackgroundTop={cardBackgroundTopData}
          color={color}
          user={user}
        />
      ),
      {
        width: 1200,
        height: 675,
        fonts: [
          {
            name: "DM Mono",
            data: lightFontData,
            style: "normal",
            weight: 300
          },
          {
            name: "DM Mono",
            data: regularFontData,
            style: "normal",
            weight: 400
          },
          {
            name: "DM Mono",
            data: mediumFontData,
            style: "normal",
            weight: 500
          }
        ]
      }
    );
  } catch (e) {
    const error = e as Error;
    rollbarError("Failed to generate image", error);
    console.error("Error generating image:", error);
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
  }
}
