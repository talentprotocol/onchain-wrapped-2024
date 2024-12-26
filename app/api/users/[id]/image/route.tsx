import { promises as fsPromises } from "fs";
import { ImageResponse } from "next/og";
import path from "path";

import ShareImage from "@/app/components/elements/share-image";
import { organizations } from "@/app/utils/constants";
import { rollbarError } from "@/utils/rollbar/log";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { searchParams } = new URL(request.url);
  const { id } = await params;
  const talentId: number = parseInt(id) || 0;
  const color = (searchParams.get("color") ?? "talent") as keyof typeof organizations;

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

  const lightFontData = await fsPromises.readFile(lightFontPath);
  const regularFontData = await fsPromises.readFile(regularFontPath);
  const mediumFontData = await fsPromises.readFile(mediumFontPath);

  try {
    return new ImageResponse(<ShareImage color={color} user={user} />, {
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
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
