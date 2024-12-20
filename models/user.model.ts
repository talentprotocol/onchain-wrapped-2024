import { WalletModel } from "./wallet.model";

export interface UserModel {
  id: number;
  talent_id: number;
  builder_score: number;
  credentials_count: number;
  github_contributions: number;
  ens: string;
  calculated_at: Date | undefined;
  onchain_since: Date | undefined;
  wallets: WalletModel[];
  base_testnet_contracts_deployed: number;
  base_mainnet_contracts_deployed: number;
  loading_wallets_pnl: boolean;
  loading_wallets_transactions: boolean;
  loading_wallets_zora: boolean;
  year_pnl: number;
  year_transactions: number;
  year_zora_posts: number;
  year_zora_mints: number;
  pnl_calculated_at: Date | undefined;
  transactions_calculated_at: Date | undefined;
  zora_calculated_at: Date | undefined;
}

export interface UserClientModel {
  id: number;
  talentId: number;
  builderScore: number;
  credentialsCount: number;
  githubContributions: number;
  ens: string;
  calculatedAt: Date | undefined;
  onchainSince: Date | undefined;
  wallets: WalletModel[];
  baseTestnetContractsDeployed: number;
  baseMainnetContractsDeployed: number;
  loadingWalletsPnl: boolean;
  loadingWalletsTransactions: boolean;
  loadingWalletsZora: boolean;
  yearPnL: number;
  yearTransactions: number;
  yearZoraPosts: number;
  yearZoraMints: number;
  pnlCalculatedAt: Date | undefined;
  transactionsCalculatedAt: Date | undefined;
  zoraCalculatedAt: Date | undefined;
}
