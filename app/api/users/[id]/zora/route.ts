import { mintOnZora } from "@/services/zora/mint";
import { rollbarError } from "@/utils/rollbar/log";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 300;

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const talentId: number = parseInt(id) || 0;

  const authorization = (await headers()).get("authorization");

  const authToken = authorization?.replace("Bearer ", "");

  if (!authToken) {
    return NextResponse.json({ error: "Auth Token is required to access the API" }, { status: 400 });
  }
  try {
    const zoraPostUrl = await mintOnZora(talentId);

    return NextResponse.json({
      zoraPostUrl
    });
  } catch (e) {
    const error = e as Error;
    rollbarError(`Unable to mint ${talentId} on Zora`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}