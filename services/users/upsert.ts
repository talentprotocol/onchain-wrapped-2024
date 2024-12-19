import { UserModel } from "@/models/user.model";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { getTalentOnchainWrapped } from "@/utils/talent_protocol/client";

const supabase = await createSupabaseServerClient();

export async function upsertUserFromAuthToken(authToken: string) {
  const talentResponseBody = await getTalentOnchainWrapped(authToken);
  const onchainWrapped = talentResponseBody.onchain_wrapped;

  const { data, error: getUserError } = await supabase
    .from("users")
    .select()
    .eq("talent_id", onchainWrapped.id)
    .maybeSingle();

  if (getUserError) {
    throw getUserError;
  }

  if (data) {
    upsertUserWallets(data.id, onchainWrapped.wallets);
    return serializeUser(data);
  }
  const { data: createUserData, error: createUserError } = await supabase
    .from("users")
    .insert({
      talent_id: onchainWrapped.id,
      builder_score: onchainWrapped.score,
      onchain_since: onchainWrapped.onchain_since,
      credentials_count: onchainWrapped.credentials_count,
      github_contributions: onchainWrapped.github_contributions,
      ens: onchainWrapped.ens,
      base_testnet_contracts_deployed: onchainWrapped.base_testnet_contracts_deployed,
      base_mainnet_contracts_deployed: onchainWrapped.base_mainnet_contracts_deployed
    })
    .select()
    .maybeSingle();

  upsertUserWallets(createUserData.id, onchainWrapped.wallets);

  if (createUserError) {
    throw createUserError;
  }

  return serializeUser(createUserData);
}

function upsertUserWallets(userId: number, wallets: string[]) {
  wallets.forEach(async wallet => {
    const { error } = await supabase
      .from("wallets")
      .upsert({ user_id: userId, address: wallet }, { onConflict: "address" });

    if (error) {
      throw error;
    }
  });
}

function serializeUser(data: UserModel) {
  return {
    id: data.id,
    builderScore: data.builder_score,
    talentId: data.talent_id,
    calculatedAt: data.calculated_at,
    onchainSince: data.onchain_since,
    githubContributions: data.github_contributions,
    ens: data.ens,
    baseTestnetContractsDeployed: data.base_testnet_contracts_deployed,
    baseMainnetContractsDeployed: data.base_mainnet_contracts_deployed,
    loadingWalletsPnl: data.loading_wallets_pnl,
    loadingWalletsTransactions: data.loading_wallets_transactions,
    loadingWalletsZora: data.loading_wallets_zora
  };
}
