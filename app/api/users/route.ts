import { upsertUserFromAuthToken } from "@/services/users/upsert";
import { rollbarError } from "@/utils/rollbar/log";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const authToken = body.authToken;
  if (!authToken) {
    return NextResponse.json({ error: "Auth Token is required to create a new user" }, { status: 400 });
  }

  try {
    await upsertUserFromAuthToken(authToken);
  } catch (e) {
    const error = e as Error;
    rollbarError("Unable to upsert user", error);
    return NextResponse.json({ error: error.message });
  }
}
