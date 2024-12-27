import * as jose from "jose";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/api/users", "/api/users/:id/zora"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  if (!isProtectedRoute) {
    return NextResponse.next();
  }
  const authorization = (await headers()).get("authorization");

  const authToken = authorization?.replace("Bearer ", "");

  if (!authToken) {
    return NextResponse.json({ error: "Auth Token is required to access the API" }, { status: 400 });
  }

  try {
    const publicKey = await jose.importSPKI(process.env.NEXT_JWT_SECRET!, "RS256");

    await jose.jwtVerify(authToken, publicKey);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Auth Token is invalid or expired" }, { status: 401 });
  }
}
