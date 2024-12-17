import { WalletModel } from "./wallet.model";

export interface UserModel {
  id: number;
  talent_id: number;
  builder_score: number;
  github_contributions: number;
  ens: string;
  calculated_at: Date | undefined;
  onchain_since: Date | undefined;
  wallets: WalletModel[];
  base_testnet_contracts_deployed: number;
  base_mainnet_contracts_deployed: number;
  loading_wallets_pnl: boolean;
  loading_wallets_transactions: boolean;
}
