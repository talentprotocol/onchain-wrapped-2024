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

  let walletsYearPnL = 0;
  let walletsYearTransactions = 0;

  for (const wallet of data) {
    const walletsData = await refreshWalletData(wallet.address);
    walletsYearPnL += walletsData.walletYearPnL;
    walletsYearTransactions += walletsData.walletYearTransactions;
  }

  const currentDate = new Date();

  const { error } = await supabase
    .from("users")
    .update({
      loading_wallets_pnl: false,
      loading_wallets_transactions: false,
      year_pnl: walletsYearPnL,
      year_transactions: walletsYearTransactions,
      pnl_calculated_at: currentDate,
      transactions_calculated_at: currentDate
    })
    .eq("id", userId);

  if (error) {
    rollbarError("Unable to update user loading state", error);
  }
}
