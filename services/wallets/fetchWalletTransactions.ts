import { rollbarError } from "@/utils/rollbar/log";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { getWalletTransactions } from "@/utils/zerion/client";

const CHAINS = "ethereum,base,optimism,binance-smart-chain,arbitrum";
const CURRENCY = "usd";

const supabase = await createSupabaseServerClient();

export async function getWalletTransactionsCount(wallet: string) {
  let transactionsCount = 0;
  let bscTransactionsCount = 0;
  let arbitrumTransactionsCount = 0;
  let ethereumTransactionsCount = 0;
  let baseTransactionsCount = 0;
  let optimismTransactionsCount = 0;
  let nextPageUrl = undefined;

  do {
    const walletTransactionsResponse = await getWalletTransactions(wallet, CHAINS, CURRENCY, nextPageUrl);

    nextPageUrl = walletTransactionsResponse?.links?.next;

    const transactions = walletTransactionsResponse.data || [];

    transactionsCount += transactions.length;

    for (const transaction of transactions) {
      switch (transaction.relationships.chain.data.id) {
        case "ethereum":
          ethereumTransactionsCount += 1;
          break;
        case "base":
          baseTransactionsCount += 1;
          break;
        case "optimism":
          optimismTransactionsCount += 1;
          break;
        case "binance-smart-chain":
          bscTransactionsCount += 1;
          break;
        case "arbitrum":
          arbitrumTransactionsCount += 1;
          break;
      }
    }
  } while (nextPageUrl);

  const { error } = await supabase
    .from("wallets")
    .update({
      year_transactions: transactionsCount,
      bsc_transactions: bscTransactionsCount,
      ethereum_transactions: ethereumTransactionsCount,
      base_transactions: baseTransactionsCount,
      arbitrum_transactions: arbitrumTransactionsCount,
      optimism_transactions: optimismTransactionsCount
    })
    .eq("address", wallet);

  if (error) {
    rollbarError(`Unable to update wallet ${wallet} transactions`, error);
  }

  return {
    transactionsCount,
    ethereumTransactionsCount,
    baseTransactionsCount,
    optimismTransactionsCount,
    bscTransactionsCount,
    arbitrumTransactionsCount
  };
}
