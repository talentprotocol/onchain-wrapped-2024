import { refreshUserWalletsData } from "@/services/users/refreshUserWalletsData";
import { upsertUserFromAuthToken } from "@/services/users/upsert";
import { rollbarError } from "@/utils/rollbar/log";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { waitUntil } from "@vercel/functions";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 300;

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const talentId: number = parseInt(id) || 0;

  const authorization = (await headers()).get("authorization");

  const authToken = authorization?.replace("Bearer ", "");

  if (!authToken) {
    return NextResponse.json({ error: "Auth Token is required to access the API" }, { status: 400 });
  }

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

  let refreshedUser = user;

  if (user.loading_builder_score) {
    refreshedUser = await upsertUserFromAuthToken(authToken);
  }

  return NextResponse.json({ user: refreshedUser });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const talentId: number = parseInt(id) || 0;

  const authorization = (await headers()).get("authorization");

  const authToken = authorization?.replace("Bearer ", "");

  if (!authToken) {
    return NextResponse.json({ error: "Auth Token is required to access the API" }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();

  const { data: user, error: updateUserError } = await supabase
    .from("users")
    .update({
      loading_builder_score: true,
      loading_wallets_pnl: true,
      loading_wallets_transactions: true,
      loading_wallets_zora: true
    })
    .eq("talent_id", talentId)
    .select()
    .maybeSingle();

  if (updateUserError) {
    rollbarError("Unable to get user", updateUserError);
    return NextResponse.json({ error: "Unable to get user" }, { status: 400 });
  }

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const refreshedUser = await upsertUserFromAuthToken(authToken);

    waitUntil(refreshUserWalletsData(refreshedUser.id));

    return NextResponse.json({
      user: refreshedUser
    });
  } catch (e) {
    const error = e as Error;
    rollbarError(`Unable to refresh user ${talentId} data`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
