import { rollbarError } from "@/utils/rollbar/log";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { refreshWalletData } from "../wallets/refreshWalletData";

const supabase = await createSupabaseServerClient();

export async function refreshUserWalletsData(userId: number) {
  const { data, error: getWalletsError } = await supabase.from("wallets").select("address").eq("user_id", userId);

  if (getWalletsError) {
    rollbarError("Unable to get user wallets", getWalletsError);
    return;
  }

  data.forEach(async wallet => await refreshWalletData(wallet.address));

  const currentDate = new Date();

  const { error } = await supabase
    .from("users")
    .update({
      loading_wallets_pnl: false,
      loading_wallets_transactions: false,
      pnl_calculated_at: currentDate,
      transactions_calculated_at: currentDate
    })
    .eq("id", userId);

  if (error) {
    rollbarError("Unable to update user loading state", error);
  }
}
