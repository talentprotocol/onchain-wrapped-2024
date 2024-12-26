import type { UserModel } from "@/models/user.model";

type Achievement = {
  title: string;
  value?: number | string;
};

type Organization = {
  index: number;
  name: string;
  role: string;
  gradient: string;
  bg: string;
  color: string;
};

export const organizations: Record<"talent" | "base" | "zerion" | "zora", Organization> = {
  talent: {
    index: 0,
    name: "Talent Protocol",
    role: "Builder",
    gradient: "from-chart-1 to-chart-2",
    bg: "red",
    color: "#E9D022"
  },
  base: {
    index: 1,
    name: "Base",
    role: "Developer",
    gradient: "from-chart-3 to-chart-4",
    bg: "purple",
    color: "#826AEE"
  },
  zerion: {
    index: 2,
    name: "Zerion",
    role: "Degen",
    gradient: "from-chart-5 to-chart-6",
    bg: "green",
    color: "#03F3BF"
  },
  zora: {
    index: 3,
    name: "Zora",
    role: "Creator",
    gradient: "from-chart-7 to-chart-8",
    bg: "blue",
    color: "#FF1B6B"
  }
};

export const getAchievements = (user?: UserModel): Record<string, Achievement[]> => ({
  talent: [
    {
      title: "Builder Score",
      value: user?.builder_score
    },
    {
      title: "Credentials",
      value: user?.credentials_count
    }
  ],
  base: [
    {
      title: "GitHub Contribuitions",
      value: user?.github_contributions
    },
    {
      title: "Base Smart contracts deployed",
      value: (user?.base_mainnet_contracts_deployed || 0) + (user?.base_testnet_contracts_deployed || 0)
    }
  ],
  zerion: [
    {
      title: "Total Transactions",
      value: user?.year_transactions
    },
    {
      title: "Estimated Profit",
      value: `$${user?.year_pnl?.toLocaleString("en-us", {
        maximumFractionDigits: 0
      })}`
    }
  ],
  zora: [
    {
      title: "Zora Posts",
      value: user?.year_zora_posts
    },
    {
      title: "Zora Mints",
      value: user?.year_zora_mints
    }
  ]
});
