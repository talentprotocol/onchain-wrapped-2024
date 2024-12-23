import { createSupabaseServerClient } from "@/utils/supabase/server";
import { getTalentOnchainWrapped } from "@/utils/talent_protocol/client";

const supabase = await createSupabaseServerClient();

export async function upsertUserFromAuthToken(authToken: string) {
  const talentResponseBody = await getTalentOnchainWrapped(authToken);
  const onchainWrapped = talentResponseBody.onchain_wrapped;

  const { data: user, error: getUserError } = await supabase
    .from("users")
    .select()
    .eq("talent_id", onchainWrapped.id)
    .maybeSingle();

  if (getUserError) {
    throw getUserError;
  }

  if (user) {
    upsertUserWallets(user.id, onchainWrapped.wallets);
    return user;
  }
  const { data: createdUser, error: createUserError } = await supabase
    .from("users")
    .insert({
      talent_id: onchainWrapped.id,
      builder_score: onchainWrapped.score,
      image_url: onchainWrapped.image_url,
      onchain_since: onchainWrapped.onchain_since,
      credentials_count: onchainWrapped.credentials_count,
      github_contributions: onchainWrapped.github_contributions,
      ens: onchainWrapped.ens,
      base_testnet_contracts_deployed: onchainWrapped.base_testnet_contracts_deployed,
      base_mainnet_contracts_deployed: onchainWrapped.base_mainnet_contracts_deployed
    })
    .select()
    .maybeSingle();

  upsertUserWallets(createdUser.id, onchainWrapped.wallets);

  if (createUserError) {
    throw createUserError;
  }

  return createdUser;
}

async function upsertUserWallets(userId: number, wallets: string[]) {
  for (const wallet of wallets) {
    const { error } = await supabase
      .from("wallets")
      .upsert({ user_id: userId, address: wallet }, { onConflict: "address" });

    if (error) {
      throw error;
    }
  }
}
