import { pinJsonWithPinata } from "@/utils/pinata/pin";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { createCreatorClient, makeMediaTokenMetadata } from "@zoralabs/protocol-sdk";
import { createPublicClient, createWalletClient, http, PublicClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";

const supabase = await createSupabaseServerClient();

const ZORA_COLLECTION_ADDRESS = process.env.ZORA_COLLECTION_ADDRESS!;
const BASE_RPC_URL = process.env.BASE_RPC_URL!;
const ZORA_WALLET_PK = process.env.ZORA_WALLET_PK!;

export async function mintOnZora(talentId: number) {
  const { data: user, error: getUserError } = await supabase
    .from("users")
    .select()
    .eq("talent_id", talentId)
    .maybeSingle();

  if (getUserError) {
    throw getUserError;
  }

  if (!user) {
    throw "User does not exist";
  }

  if (!!user.zora_post_url) {
    return user.zora_post_url;
  }

  const fileName = `Onchain Wrapped - ${talentId}`;
  // const image = await fetch(`https://www.builderscore.xyz/api/users/${talentId}/image`);
  // const imageBlob = await image.blob();
  // const file = new File([imageBlob], fileName, { type: imageBlob.type });

  const mediaFileIpfsUrl = `https://www.builderscore.xyz/api/users/${talentId}/image`;
  const metadataJson = await makeMediaTokenMetadata({
    mediaUrl: mediaFileIpfsUrl,
    name: fileName
  });

  const jsonMetadataUri = await pinJsonWithPinata(metadataJson, talentId);

  const rpcUrl = http(BASE_RPC_URL);

  const publicClient = createPublicClient({
    // this will determine which chain to interact with
    chain: base,
    transport: rpcUrl
  }) as PublicClient;

  if (!publicClient) {
    throw "Unable to initialize public client";
  }

  const account = privateKeyToAccount(ZORA_WALLET_PK as `0x${string}`);

  const walletClient = createWalletClient({
    account,
    chain: base,
    transport: rpcUrl
  });

  const creatorClient = createCreatorClient({ chainId: base.id, publicClient });

  const { parameters: createParameters, newTokenId } = await creatorClient.create1155OnExistingContract({
    // by providing a contract address, the token will be created on an existing contract
    // at that address
    contractAddress: ZORA_COLLECTION_ADDRESS as `0x${string}`,
    token: {
      // token metadata uri
      tokenMetadataURI: jsonMetadataUri
    },
    // account to execute the transaction (the creator)
    account
  });

  const { request } = await publicClient.simulateContract(createParameters);

  const hash = await walletClient.writeContract(request);
  const createReceipt = await publicClient.waitForTransactionReceipt({ hash });

  if (createReceipt.status !== "success") {
    throw new Error(`Unable to create transaction: ${hash}`);
  }

  const tokenId = Number(newTokenId);

  const zoraPostUrl = `https://zora.co/collect/base:${ZORA_COLLECTION_ADDRESS}/${tokenId}?referrer=${account.address}`;

  const { error } = await supabase
    .from("users")
    .update({
      zora_post_url: zoraPostUrl,
      zora_mint_tx_hash: hash,
      zora_token_id: tokenId
    })
    .eq("talent_id", talentId);

  if (error) {
    console.error("Error", error);
    throw error;
  }

  return zoraPostUrl;
}
