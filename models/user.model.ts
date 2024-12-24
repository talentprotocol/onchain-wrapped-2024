import { WalletModel } from "./wallet.model";

export interface UserModel {
  id: number;
  talent_id: number;
  builder_score: number;
  image_url: string;
  credentials_count: number;
  github_contributions: number;
  ens: string;
  calculated_at: Date | undefined;
  onchain_since: Date | undefined;
  wallets: WalletModel[];
  base_testnet_contracts_deployed: number;
  base_mainnet_contracts_deployed: number;
  loading_builder_score: boolean;
  loading_wallets_pnl: boolean;
  loading_wallets_transactions: boolean;
  loading_wallets_zora: boolean;
  year_pnl: number;
  year_transactions: number;
  year_base_transactions: number;
  year_bsc_transactions: number;
  year_ethereum_transactions: number;
  year_optimism_transactions: number;
  year_arbitrum_transactions: number;
  year_zora_posts: number;
  year_zora_mints: number;
  pnl_calculated_at: Date | undefined;
  transactions_calculated_at: Date | undefined;
  zora_calculated_at: Date | undefined;
}
