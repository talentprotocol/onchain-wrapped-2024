import { WalletModel } from "@/models/wallet.model";
import { createSupabaseServerClient } from "@/utils/supabase/server";

const supabase = await createSupabaseServerClient();

export async function refreshUserWalletsData(userId: number) {
  const { data, error: getWalletsError } = await supabase.from("wallets").select().eq("user_id", userId);

  if (getWalletsError) {
    throw "Unable to get wallets";
  }

  data.forEach(async wallet => await refreshWalletData(wallet));
}

async function refreshWalletData(wallet: WalletModel) {}
