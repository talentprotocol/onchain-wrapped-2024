import { rollbarError } from "@/utils/rollbar/log";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { getWalletPostsAndMints } from "@/utils/zora/client";

const supabase = await createSupabaseServerClient();

export async function fetchZoraPostsAndMints(wallet: string) {
  let zoraPosts = 0;
  let zoraMints = 0;
  let postsCursor = "";
  let mintsCursor = "";
  let postsNextPage;
  let mintsNextPage;
  let walletPostsAndMintsResponse;

  do {
    walletPostsAndMintsResponse = await getWalletPostsAndMints(wallet, postsCursor, mintsCursor);

    const profile = walletPostsAndMintsResponse?.data?.profile;
    const postsCollections = profile?.createdCollectionsOrTokens;
    const mintsCollections = profile?.collectedCollectionsOrTokens;

    if (postsCursor != postsCollections?.pageInfo?.endCursor) {
      zoraPosts += postsCollections?.edges?.length || 0;
    }
    if (mintsCursor != mintsCollections?.pageInfo?.endCursor) {
      zoraMints += mintsCollections?.edges?.length || 0;
    }

    postsCursor = postsCollections?.pageInfo?.endCursor;
    mintsCursor = mintsCollections?.pageInfo?.endCursor;
    postsNextPage = postsCollections?.pageInfo?.hasNextPage;
    mintsNextPage = mintsCollections?.pageInfo?.hasNextPage;
  } while (postsNextPage || mintsNextPage);

  const { error } = await supabase
    .from("wallets")
    .update({
      zora_posts: zoraPosts,
      zora_mints: zoraMints
    })
    .eq("address", wallet);

  if (error) {
    rollbarError(`Unable to update wallet ${wallet} zora data`, error);
  }

  return { zoraPosts, zoraMints };
}
