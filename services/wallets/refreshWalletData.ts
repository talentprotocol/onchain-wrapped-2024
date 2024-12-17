import { rollbarError } from "@/utils/rollbar/log";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { getWalletChart, getWalletTransactions } from "@/utils/zerion/client";

const supabase = await createSupabaseServerClient();

const BEGINNING_OF_YEAR_TIMESTAMP = 1704067200;
const END_OF_YEAR_TIMESTAMP = 1735689599;
const CHAINS = "ethereum,base,optimism,binance-smart-chain,arbitrum";
const CURRENCY = "usd";

export async function refreshWalletData(wallet: string) {
  const walletYearPnL = await getWalletPnL(wallet);
  const walletYearTransactions = await getWalletTransactionsCount(wallet);

  const { error } = await supabase
    .from("wallets")
    .update({
      year_pnl: walletYearPnL,
      year_transactions: walletYearTransactions
    })
    .eq("address", wallet);

  if (error) {
    rollbarError("Unable to update wallets data", error);
  }

  return { walletYearPnL, walletYearTransactions };
}

async function getWalletPnL(wallet: string) {
  const walletPnLResponse = await getWalletChart(wallet, CHAINS, CURRENCY);
  const chartPoints = walletPnLResponse?.data?.attributes?.points;

  const firstPointOfYear = chartPoints?.find((point: number[]) => point[0] >= BEGINNING_OF_YEAR_TIMESTAMP);
  const beginningOfYearBalance = firstPointOfYear ? firstPointOfYear[1] : 0;

  const lastPointOfYear = chartPoints?.findLast((point: number[]) => point[0] <= END_OF_YEAR_TIMESTAMP);
  const endOfYearBalance = lastPointOfYear ? lastPointOfYear[1] : 0;

  return endOfYearBalance - beginningOfYearBalance;
}

async function getWalletTransactionsCount(wallet: string) {
  let transactionsCount = 0;
  let nextPageUrl = undefined;

  do {
    const wallettransactionsResponse = await getWalletTransactions(wallet, CHAINS, CURRENCY, nextPageUrl);

    nextPageUrl = wallettransactionsResponse?.links?.next;

    transactionsCount += wallettransactionsResponse.data?.length || 0;
  } while (nextPageUrl);

  return transactionsCount;
}
