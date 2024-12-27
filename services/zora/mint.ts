import { pinJsonWithPinata } from "@/utils/pinata/pin";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { SplitRecipient, SplitV1Client } from "@0xsplits/splits-sdk";
import { createCreatorClient, makeMediaTokenMetadata } from "@zoralabs/protocol-sdk";
import {
  Account,
  Chain,
  createPublicClient,
  createWalletClient,
  http,
  HttpTransport,
  PublicClient,
  WalletClient
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";

const supabase = await createSupabaseServerClient();

const ZORA_COLLECTION_ADDRESS = process.env.NEXT_ZORA_COLLECTION_ADDRESS!;
const BASE_RPC_URL = process.env.NEXT_BASE_RPC_URL!;
const ZORA_WALLET_PK = process.env.NEXT_ZORA_WALLET_PK!;
const SPLITS_API_KEY = process.env.NEXT_ZORA_SPLITS_API_KEY!;

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

  if (!user.main_wallet) {
    throw "User main wallet must exist";
  }

  const fileName = `Onchain Wrapped - ${user.ens ? user.ens : talentId}`;

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

  const splitRecipient = await splitsContractAddress(base, publicClient, walletClient, account, user.main_wallet);

  const { parameters: createParameters, newTokenId } = await creatorClient.create1155OnExistingContract({
    // by providing a contract address, the token will be created on an existing contract
    // at that address
    contractAddress: ZORA_COLLECTION_ADDRESS as `0x${string}`,
    token: {
      // token metadata uri
      tokenMetadataURI: jsonMetadataUri,
      payoutRecipient: splitRecipient
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

async function splitsContractAddress(
  chain: Chain,
  publicClient: PublicClient,
  walletClient: WalletClient,
  creatorAccount: Account,
  userWallet: string
) {
  const splitsClient = new SplitV1Client({
    chainId: chain.id,
    publicClient: publicClient as PublicClient<HttpTransport, Chain>,
    apiConfig: {
      apiKey: SPLITS_API_KEY
    }
  });

  const recipients = [
    {
      address: creatorAccount.address,
      percentAllocation: 50
    },
    {
      address: userWallet,
      percentAllocation: 50
    }
  ];

  const splitsConfig: {
    recipients: SplitRecipient[];
    distributorFeePercent: number;
  } = {
    recipients: recipients,
    distributorFeePercent: 0
  };

  const predicted = await splitsClient.predictImmutableSplitAddress(splitsConfig);

  if (!predicted.splitExists) {
    // if the split has not been created, create it by getting the transaction to execute
    // and executing it with the wallet client
    const { data, address } = await splitsClient.callData.createSplit(splitsConfig);

    const hash = await walletClient.sendTransaction({
      to: address as `0x${string}`,
      account: creatorAccount,
      chain,
      data
    });

    await publicClient.waitForTransactionReceipt({
      confirmations: 3,
      hash
    });
  }

  return predicted.splitAddress;
}
