import { UserModel } from "@/models/user.model";

export function serializeUser(user: UserModel) {
  return {
    id: user.id,
    builderScore: user.builder_score,
    talentId: user.talent_id,
    calculatedAt: user.calculated_at,
    onchainSince: user.onchain_since,
    githubContributions: user.github_contributions,
    ens: user.ens,
    baseTestnetContractsDeployed: user.base_testnet_contracts_deployed,
    baseMainnetContractsDeployed: user.base_mainnet_contracts_deployed,
    loadingWalletsPnl: user.loading_wallets_pnl,
    loadingWalletsTransactions: user.loading_wallets_transactions,
    loadingWalletsZora: user.loading_wallets_zora,
    yearPnL: user.year_pnl,
    yearTransactions: user.year_transactions,
    yearZoraPosts: user.year_zora_posts,
    yearZoraMints: user.year_zora_mints,
    pnlCalculatedAt: user.pnl_calculated_at,
    transactionsCalculatedAt: user.transactions_calculated_at,
    zoraCalculatedAt: user.zora_calculated_at
  };
}
