import * as jose from "jose";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware() {
  const authorization = (await headers()).get("authorization");

  const authToken = authorization?.replace("Bearer ", "");

  if (!authToken) {
    return NextResponse.json({ error: "Auth Token is required to access the API" }, { status: 400 });
  }

  try {
    const jwtSecret = atob(process.env.NEXT_JWT_SECRET!);
    const publicKey = await jose.importSPKI(jwtSecret, "RS256");

    await jose.jwtVerify(authToken, publicKey);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Auth Token is invalid or expired" }, { status: 401 });
  }
}
