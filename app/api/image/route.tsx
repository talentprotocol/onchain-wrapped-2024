import { ImageResponse } from "next/og";

import ShareImage from "@/app/components/elements/share-image";
import { organizations } from "@/app/utils/constants";
import { UserModel } from "@/models/user.model";

const mockUserData: UserModel = {
  id: 1,
  talent_id: 1001,
  builder_score: 87,
  image_url: "https://example.com/images/user1.jpg",
  credentials_count: 5,
  github_contributions: 120,
  ens: "user.eth",
  calculated_at: new Date("2024-12-20T15:00:00Z"),
  onchain_since: new Date("2021-05-15T10:30:00Z"),
  wallets: [
    {
      id: 1,
      address: "0x1234567890abcdef1234567890abcdef12345678",
      year_pnl: 1200.75,
      year_transactions: 150
    },
    {
      id: 2,
      address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
      year_pnl: 950.5,
      year_transactions: 230
    },
    {
      id: 3,
      address: "0xabcdef1234567890abcdef1234567890abcdef12",
      year_pnl: 3200.9,
      year_transactions: 500
    }
  ],
  base_testnet_contracts_deployed: 15,
  base_mainnet_contracts_deployed: 10,
  loading_builder_score: false,
  loading_wallets_pnl: true,
  loading_wallets_transactions: false,
  loading_wallets_zora: true,
  year_pnl: 1050.4,
  year_transactions: 1500,
  year_base_transactions: 300,
  year_bsc_transactions: 400,
  year_ethereum_transactions: 600,
  year_optimism_transactions: 100,
  year_arbitrum_transactions: 50,
  year_zora_posts: 10,
  year_zora_mints: 25,
  pnl_calculated_at: new Date("2024-12-19T12:00:00Z"),
  transactions_calculated_at: new Date("2024-12-20T14:00:00Z"),
  zora_calculated_at: new Date("2024-12-18T16:00:00Z")
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const color = searchParams.get("color") as keyof typeof organizations;

  // Validate if the color exists
  if (!color || !organizations[color]) {
    console.error("Invalid or missing color parameter.");
    return new Response("Invalid or missing color parameter", { status: 400 });
  }

  try {
    return new ImageResponse(<ShareImage color={color} user={mockUserData} />, {
      width: 1200,
      height: 675
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
