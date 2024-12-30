import { mintOnZora } from "@/services/zora/mint";
import { rollbarError } from "@/utils/rollbar/log";
import { getTalentOnchainWrapped } from "@/utils/talent_protocol/client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 300;

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const talentId: number = parseInt(id) || 0;

  const data = await request.json();

  const authorization = (await headers()).get("authorization");

  const authToken = authorization?.replace("Bearer ", "");

  if (!authToken) {
    return NextResponse.json({ error: "Auth Token is required to access the API" }, { status: 400 });
  }

  const talentResponseBody = await getTalentOnchainWrapped(authToken);
  const onchainWrapped = talentResponseBody.onchain_wrapped;

  if (onchainWrapped.id != talentId) {
    return NextResponse.json({ error: "You can only mint your own wrapped" }, { status: 401 });
  }

  try {
    const zoraPostUrl = await mintOnZora(talentId, data.color ?? "talent");

    return NextResponse.json({
      zoraPostUrl
    });
  } catch (e) {
    const error = e as Error;
    rollbarError(`Unable to mint ${talentId} on Zora`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
