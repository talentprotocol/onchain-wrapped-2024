import { refreshToken } from "@/services/users/refreshToken";
import { refreshUserWalletsData } from "@/services/users/refreshUserWalletsData";
import { upsertUserFromAuthToken } from "@/services/users/upsert";
import { rollbarError } from "@/utils/rollbar/log";
import { waitUntil } from "@vercel/functions";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const maxDuration = 300;

export async function POST() {
  const authorization = (await headers()).get("authorization");

  const authToken = authorization?.replace("Bearer ", "");

  if (!authToken) {
    return NextResponse.json({ error: "Auth Token is required to access the API" }, { status: 400 });
  }

  try {
    const refreshTokenResponse = await refreshToken(authToken);
    const user = await upsertUserFromAuthToken(refreshTokenResponse.token);

    // Don't update already minted users
    if (!user.zora_post_url) {
      waitUntil(refreshUserWalletsData(user.id));
    }

    return NextResponse.json({
      user,
      authToken: { expires_at: refreshTokenResponse.expiresAt, token: refreshTokenResponse.token }
    });
  } catch (e) {
    const error = e as Error;
    rollbarError("Unable to upsert user", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
