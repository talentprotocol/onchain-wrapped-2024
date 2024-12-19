import { rollbarError } from "@/utils/rollbar/log";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { getWalletTransactions } from "@/utils/zerion/client";

const BEGINNING_OF_YEAR_TIMESTAMP = 1704067200;
const END_OF_YEAR_TIMESTAMP = 1735689599;
const CHAINS = "ethereum,base,optimism,binance-smart-chain,arbitrum";
const CURRENCY = "usd";

const supabase = await createSupabaseServerClient();

export async function getWalletTransactionsCount(wallet: string) {
  let transactionsCount = 0;
  let nextPageUrl = undefined;

  do {
    const wallettransactionsResponse = await getWalletTransactions(wallet, CHAINS, CURRENCY, nextPageUrl);

    nextPageUrl = wallettransactionsResponse?.links?.next;

    transactionsCount += wallettransactionsResponse.data?.length || 0;
  } while (nextPageUrl);

  const { error } = await supabase
    .from("wallets")
    .update({
      year_transactions: transactionsCount
    })
    .eq("address", wallet);

  if (error) {
    rollbarError(`Unable to update wallet ${wallet} transactions`, error);
  }

  return transactionsCount;
}
