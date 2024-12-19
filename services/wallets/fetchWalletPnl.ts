import { rollbarError } from "@/utils/rollbar/log";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { getWalletChart } from "@/utils/zerion/client";

const BEGINNING_OF_YEAR_TIMESTAMP = 1704067200;
const END_OF_YEAR_TIMESTAMP = 1735689599;
const CHAINS = "ethereum,base,optimism,binance-smart-chain,arbitrum";
const CURRENCY = "usd";

const supabase = await createSupabaseServerClient();

export async function getWalletPnL(wallet: string) {
  const walletPnLResponse = await getWalletChart(wallet, CHAINS, CURRENCY);
  const chartPoints = walletPnLResponse?.data?.attributes?.points;

  const firstPointOfYear = chartPoints?.find((point: number[]) => point[0] >= BEGINNING_OF_YEAR_TIMESTAMP);
  const beginningOfYearBalance = firstPointOfYear ? firstPointOfYear[1] : 0;

  const lastPointOfYear = chartPoints?.findLast((point: number[]) => point[0] <= END_OF_YEAR_TIMESTAMP);
  const endOfYearBalance = lastPointOfYear ? lastPointOfYear[1] : 0;
  const walletPNL = endOfYearBalance - beginningOfYearBalance;

  const { error } = await supabase
    .from("wallets")
    .update({
      year_pnl: walletPNL
    })
    .eq("address", wallet);

  if (error) {
    rollbarError(`Unable to update wallet ${wallet} pnl`, error);
  }

  return walletPNL;
}
