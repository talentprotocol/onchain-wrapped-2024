import type { UserModel } from "@/models/user.model";

export enum OrgEnum {
  TALENT = "talent",
  BASE = "base",
  ZERION = "zerion",
  ZORA = "zora"
}

type OrganizationType = {
  name: string;
  role: string;
  gradient: string;
  bg: string;
  color: string;
};

type ScreenType = {
  organization: OrgEnum;
  name: string;
  label: string;
  value: (user?: UserModel) => string | number | undefined;
  next_page: string;
  conditions: { condition: number[]; title: string; description: string }[];
  animation: "left" | "right" | "up" | "down";
};

export const organizations: Record<OrgEnum, OrganizationType> = {
  talent: {
    name: "Talent Protocol",
    role: "Builder",
    gradient: "from-chart-1 to-chart-2",
    bg: "red",
    color: "#E9D022"
  },
  base: {
    name: "Base",
    role: "Developer",
    gradient: "from-chart-3 to-chart-4",
    bg: "purple",
    color: "#826AEE"
  },
  zerion: {
    name: "Zerion",
    role: "Degen",
    gradient: "from-chart-5 to-chart-6",
    bg: "green",
    color: "#03F3BF"
  },
  zora: {
    name: "Zora",
    role: "Creator",
    gradient: "from-chart-7 to-chart-8",
    bg: "blue",
    color: "#FF1B6B"
  }
};

export const screens: ScreenType[] = [
  {
    organization: OrgEnum.TALENT,
    name: "builder_score",
    label: "Builder Score",
    value: (user?: UserModel) => user?.builder_score,
    next_page: "credentials",
    conditions: [
      {
        condition: [49],
        title: "Getting Started",
        description: "You’ve begun building, but there’s still room to grow."
      },
      {
        condition: [50, 100],
        title: "Making Moves",
        description: "Your Builder Score shows solid progress in the ecosystem."
      },
      {
        condition: [100],
        title: "Top Builder",
        description: "Your Builder Score reflects a significant impact on the onchain ecosystem."
      }
    ],
    animation: "right"
  },
  {
    organization: OrgEnum.TALENT,
    name: "credentials",
    label: "Credentials",
    value: (user?: UserModel) => user?.credentials_count,
    next_page: "github_contributions",
    conditions: [
      {
        condition: [19],
        title: "Just Getting Started",
        description: "A few credentials earned, but there’s much more ahead."
      },
      {
        condition: [20, 39],
        title: "Building Credibility",
        description: "You’ve earned some solid credentials. Keep going!"
      },
      {
        condition: [40],
        title: "Credential Collector",
        description: "You’re stacking credentials at an impressive rate."
      }
    ],
    animation: "left"
  },
  {
    organization: OrgEnum.BASE,
    name: "github_contributions",
    label: "GitHub Contributions",
    value: (user?: UserModel) => user?.github_contributions,
    next_page: "base_smart_contracts_deployed",
    conditions: [
      {
        condition: [4],
        title: "{Hello World}",
        description: "A few contributions here and there – time to dive in deeper."
      },
      {
        condition: [5, 9],
        title: "Active Contributor",
        description: "Your contributions are adding value to the open-source ecosystem."
      },
      {
        condition: [10],
        title: "Open-Source Leader",
        description: "Your GitHub activity is a key part of shaping the ecosystem."
      }
    ],
    animation: "up"
  },
  {
    organization: OrgEnum.BASE,
    name: "base_smart_contracts_deployed",
    label: "Base Smart Contracts Deployed",
    value: (user?: UserModel) =>
      (user?.base_mainnet_contracts_deployed || 0) + (user?.base_testnet_contracts_deployed || 0),
    next_page: "total_transactions",
    conditions: [
      {
        condition: [9],
        title: "One block at a time",
        description: "A few contracts deployed – great start, keep experimenting."
      },
      {
        condition: [10, 99],
        title: "Contract Creator",
        description: "You’ve launched a respectable number of smart contracts."
      },
      {
        condition: [100],
        title: "Lego King",
        description: "Your deployments are setting standards in the space."
      }
    ],
    animation: "down"
  },
  {
    organization: OrgEnum.ZERION,
    name: "total_transactions",
    label: "Total Transactions",
    value: (user?: UserModel) => user?.year_transactions,
    next_page: "estimated_profit",
    conditions: [
      {
        condition: [499],
        title: "In-N-Out",
        description: "You’re making your first transactions – nice start."
      },
      {
        condition: [500, 999],
        title: "On the Move",
        description: "You’re active in the ecosystem, making a fair number of transactions."
      },
      {
        condition: [1000],
        title: "Block Scanner",
        description: "Your transaction volume is impressive and shows you’re really moving onchain."
      }
    ],
    animation: "right"
  },
  {
    organization: OrgEnum.ZERION,
    name: "estimated_profit",
    label: "Estimated Profit",
    value: (user?: UserModel) => user?.year_pnl,
    next_page: "zora_posts",
    conditions: [
      {
        condition: [999],
        title: "Playing onchain",
        description: "Still figuring things out, but there’s room to earn more."
      },
      {
        condition: [1000, 14999],
        title: "WAGMI",
        description: "You’re seeing a steady return on your onchain activity. Keep going"
      },
      {
        condition: [15000],
        title: "Wolf of Wall Street",
        description: "You are making a living out of crypto!"
      }
    ],
    animation: "left"
  },
  {
    organization: OrgEnum.ZORA,
    name: "zora_posts",
    label: "Zora Posts",
    value: (user?: UserModel) => user?.year_zora_posts,
    next_page: "zora_mints",
    conditions: [
      {
        condition: [9],
        title: "Onchain Artist",
        description: "You’ve started posting, but there's more to share with the world."
      },
      {
        condition: [10, 99],
        title: "Trend-setter",
        description: "Your posts are gaining traction – keep sharing your voice!"
      },
      {
        condition: [100],
        title: "Zor-fluencer",
        description: "Your content is something to talk about!"
      }
    ],
    animation: "up"
  },
  {
    organization: OrgEnum.ZORA,
    name: "zora_mints",
    label: "Zora Mints",
    value: (user?: UserModel) => user?.year_zora_mints,
    next_page: "share",
    conditions: [
      {
        condition: [149],
        title: "Collector",
        description: "A few mints here and there."
      },
      {
        condition: [150, 299],
        title: "Curator",
        description: "You've minted more than just NFTs, you are collecting art!"
      },
      {
        condition: [300],
        title: "Aesthetic",
        description: "It’s not only a JPEG..."
      }
    ],
    animation: "down"
  }
];
