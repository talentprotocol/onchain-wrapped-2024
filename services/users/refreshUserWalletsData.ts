import { rollbarError } from "@/utils/rollbar/log";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { getWalletPnL } from "../wallets/fetchWalletPnl";
import { getWalletTransactionsCount } from "../wallets/fetchWalletTransactions";
import { fetchZoraPostsAndMints } from "../wallets/fetchZoraPostsAndMints";

interface WalletAddress {
  address: string;
}

const supabase = await createSupabaseServerClient();

export async function refreshUserWalletsData(userId: number) {
  const { data: wallets, error: getWalletsError } = await supabase
    .from("wallets")
    .select("address")
    .eq("user_id", userId);

  console.log("wallets", wallets);

  if (getWalletsError) {
    rollbarError("Unable to get user wallets", getWalletsError);
    return;
  }

  await fetchTransactions(userId, wallets);
  await fetchPNL(userId, wallets);
  await fetchFromZora(userId, wallets);
}

async function fetchPNL(userId: number, wallets: WalletAddress[]) {
  let walletsYearPNL = 0;

  for (const wallet of wallets) {
    const walletPNL = await getWalletPnL(wallet.address);
    walletsYearPNL += walletPNL;
  }

  const { error } = await supabase
    .from("users")
    .update({
      loading_wallets_pnl: false,
      year_pnl: walletsYearPNL,
      pnl_calculated_at: new Date()
    })
    .eq("id", userId);

  if (error) {
    rollbarError(`Unable to update user ${userId} pnl`, error);
  }
}

async function fetchTransactions(userId: number, wallets: WalletAddress[]) {
  let walletsTransactionsCount = 0;
  let walletsEthereumTransactionsCount = 0;
  let walletsBaseTransactionsCount = 0;
  let walletsOptimismTransactionsCount = 0;
  let walletsArbitrumTransactionsCount = 0;
  let walletsBscTransactionsCount = 0;

  for (const wallet of wallets) {
    const {
      transactionsCount,
      ethereumTransactionsCount,
      baseTransactionsCount,
      optimismTransactionsCount,
      bscTransactionsCount,
      arbitrumTransactionsCount
    } = await getWalletTransactionsCount(wallet.address);
    walletsTransactionsCount += transactionsCount;
    walletsEthereumTransactionsCount += ethereumTransactionsCount;
    walletsBaseTransactionsCount += baseTransactionsCount;
    walletsOptimismTransactionsCount += optimismTransactionsCount;
    walletsArbitrumTransactionsCount += arbitrumTransactionsCount;
    walletsBscTransactionsCount += bscTransactionsCount;
  }

  const { error } = await supabase
    .from("users")
    .update({
      loading_wallets_transactions: false,
      year_transactions: walletsTransactionsCount,
      year_bsc_transactions: walletsBscTransactionsCount,
      year_base_transactions: walletsBaseTransactionsCount,
      year_ethereum_transactions: walletsEthereumTransactionsCount,
      year_optimism_transactions: walletsOptimismTransactionsCount,
      year_arbitrum_transactions: walletsArbitrumTransactionsCount,
      transactions_calculated_at: new Date()
    })
    .eq("id", userId);

  if (error) {
    rollbarError(`Unable to update user ${userId} transactions`, error);
  }
}

async function fetchFromZora(userId: number, wallets: WalletAddress[]) {
  let walletsZoraPosts = 0;
  let walletsZoraMints = 0;
  for (const wallet of wallets) {
    const { zoraPosts, zoraMints } = await fetchZoraPostsAndMints(wallet.address);
    walletsZoraPosts += zoraPosts;
    walletsZoraMints += zoraMints;
  }

  const { error } = await supabase
    .from("users")
    .update({
      loading_wallets_zora: false,
      year_zora_posts: walletsZoraPosts,
      year_zora_mints: walletsZoraMints,
      zora_calculated_at: new Date()
    })
    .eq("id", userId);

  if (error) {
    rollbarError(`Unable to update user ${userId} zora mints and posts`, error);
  }
}
