import { rollbarError } from "@/utils/rollbar/log";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const talentId: number = parseInt(id) || 0;

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

  return NextResponse.json({ user });
}
