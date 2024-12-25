import { getAchievements, organizations } from "@/app/utils/constants";
import type { UserModel } from "@/models/user.model";

type ShareImageProps = {
  color: keyof typeof organizations;
  user: UserModel;
};

export default function ShareImage({ color, user }: ShareImageProps) {
  const achievements = getAchievements(user);

  const transactions = [
    { label: "Base", value: user?.year_base_transactions ?? 0 },
    { label: "BSC", value: user?.year_bsc_transactions ?? 0 },
    { label: "Ethereum", value: user?.year_ethereum_transactions ?? 0 },
    { label: "Optimism", value: user?.year_optimism_transactions ?? 0 },
    { label: "Arbitrum", value: user?.year_arbitrum_transactions ?? 0 }
  ];

  const highestTransaction = transactions.reduce(
    (highest, current) => (current.value > highest.value ? current : highest),
    { label: "", value: 0 }
  );

  const onchainSince = `Onchain since' ${user?.onchain_since ? new Date(user?.onchain_since).getFullYear() : "-"}`;

  console.log({ user, achievements, highestTransaction, onchainSince });

  console.log({ aa: organizations[color].background });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        padding: "1.5rem",
        //backgroundImage: organizations[color].background,
        backgroundColor: "#DDE7EE",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        fontFamily: "DM Mono, serif",
        fontWeight: "500",
        textTransform: "uppercase"
      }}
    >
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <div
          style={{
            width: "303px",
            height: "128px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            border: "2px solid #32383E",
            borderRadius: "2rem",
            backgroundColor: "#32383E"
          }}
        >
          <h1
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "-0.5rem",
              fontSize: "2.25rem",
              color: "white",
              fontFamily: "DM Mono, serif"
            }}
          >
            <span>
              onchain
              <span style={{ color: organizations[color].color }}>20</span>
            </span>
            <span>
              wrapped
              <span style={{ color: organizations[color].color }}>24</span>
            </span>
          </h1>
        </div>
        <div
          style={{
            width: "825px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            padding: "1.5rem",
            border: "2px solid white",
            borderRadius: "2rem",
            fontSize: "1.5rem",
            fontWeight: "300",
            background:
              "linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3))",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
          }}
        >
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {user?.image_url && (
              <div style={{ width: "80px", height: "80px", backgroundColor: "red", borderRadius: "1.5rem" }}></div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <span>{user?.ens ?? "-"}</span>
              <span style={{ fontWeight: "300" }}>{onchainSince}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontWeight: "300" }}>Most active on</span>
              <span>{highestTransaction.label}</span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontWeight: "300" }}>With</span>
              <span>{highestTransaction.value}</span>
              <span style={{ fontWeight: "300" }}>transactions</span>
            </span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div
            style={{
              width: "564px",
              height: "225px",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              justifyContent: "space-between",
              padding: "1.5rem",
              border: "2px solid white",
              borderRadius: "2rem",
              background:
                "linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3))",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
          >
            <div style={{ display: "flex", gap: "0.25rem" }}>
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  border: "2px solid #32383E",
                  borderRadius: "2rem",
                  backgroundColor: "#32383E",
                  color: "white",
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em"
                }}
              >
                {organizations["talent"].role}
              </span>
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  border: "2px solid white",
                  borderRadius: "2rem",
                  background:
                    "linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3))",
                  backdropFilter: "blur(10px)",
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em"
                }}
              >
                {`Powered By ${organizations["talent"].name}`}
              </span>
            </div>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  borderRight: "2px solid #32383E",
                  color: "#32383E"
                }}
              >
                <span style={{ fontSize: "3rem", fontWeight: "400" }}>{achievements["talent"][0].value}</span>
                <span style={{ letterSpacing: "0.05em" }}>{achievements["talent"][0].title}</span>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  color: "#32383E"
                }}
              >
                <span style={{ fontSize: "3rem", fontWeight: "400" }}>{achievements["talent"][1].value}</span>
                <span style={{ letterSpacing: "0.05em" }}>{achievements["talent"][1].title}</span>
              </span>
            </div>
          </div>
          <div
            style={{
              width: "564px",
              height: "225px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.5rem",
              justifyContent: "space-between",
              padding: "1.5rem",
              border: "2px solid white",
              borderRadius: "2rem",
              background:
                "linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3))",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
          >
            <div style={{ display: "flex", gap: "0.25rem" }}>
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  border: "2px solid #32383E",
                  borderRadius: "2rem",
                  backgroundColor: "#32383E",
                  color: "white",
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em"
                }}
              >
                {organizations["base"].role}
              </span>
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  border: "2px solid white",
                  borderRadius: "2rem",
                  background:
                    "linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3))",
                  backdropFilter: "blur(10px)",
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em"
                }}
              >
                {`Powered By ${organizations["base"].name}`}
              </span>
            </div>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  borderRight: "2px solid #32383E",
                  color: "#32383E"
                }}
              >
                <span style={{ fontSize: "3rem", fontWeight: "400" }}>{achievements["base"][0].value}</span>
                <span style={{ letterSpacing: "0.05em" }}>{achievements["base"][0].title}</span>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  color: "#32383E"
                }}
              >
                <span style={{ fontSize: "3rem", fontWeight: "400" }}>{achievements["base"][1].value}</span>
                <span style={{ letterSpacing: "0.05em" }}>{achievements["base"][1].title}</span>
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div
            style={{
              width: "564px",
              height: "225px",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "1.5rem",
              border: "2px solid white",
              borderRadius: "2rem",
              background:
                "linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3))",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
          >
            <div style={{ display: "flex", gap: "0.25rem" }}>
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  border: "2px solid #32383E",
                  borderRadius: "2rem",
                  backgroundColor: "#32383E",
                  color: "white",
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em"
                }}
              >
                {organizations["zerion"].role}
              </span>
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  border: "2px solid white",
                  borderRadius: "2rem",
                  background:
                    "linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3))",
                  backdropFilter: "blur(10px)",
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em"
                }}
              >
                {`Powered By ${organizations["zerion"].name}`}
              </span>
            </div>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  borderRight: "2px solid #32383E",
                  color: "#32383E"
                }}
              >
                <span style={{ fontSize: "3rem", fontWeight: "400" }}> {achievements["zerion"][0].value}</span>
                <span style={{ letterSpacing: "0.05em" }}>{achievements["zerion"][0].title}</span>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  color: "#32383E"
                }}
              >
                <span style={{ fontSize: "3rem", fontWeight: "400" }}> {achievements["zerion"][1].value}</span>
                <span style={{ letterSpacing: "0.05em" }}>{achievements["zerion"][1].title}</span>
              </span>
            </div>
          </div>
          <div
            style={{
              width: "564px",
              height: "225px",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "1.5rem",
              border: "2px solid white",
              borderRadius: "2rem",
              background:
                "linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3))",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
          >
            <div style={{ display: "flex", gap: "0.25rem" }}>
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  border: "2px solid #32383E",
                  borderRadius: "2rem",
                  backgroundColor: "#32383E",
                  color: "white",
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em"
                }}
              >
                {organizations["zora"].role}
              </span>
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  border: "2px solid white",
                  borderRadius: "2rem",
                  background:
                    "linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3))",
                  backdropFilter: "blur(10px)",
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em"
                }}
              >
                {`Powered By ${organizations["zora"].name}`}
              </span>
            </div>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  borderRight: "2px solid #32383E",
                  color: "#32383E"
                }}
              >
                <span style={{ fontSize: "3rem", fontWeight: "400" }}>{achievements["zora"][0].value}</span>
                <span style={{ letterSpacing: "0.05em" }}>{achievements["zora"][0].title}</span>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  color: "#32383E"
                }}
              >
                <span style={{ fontSize: "3rem", fontWeight: "400" }}>{achievements["zora"][1].value}</span>
                <span style={{ letterSpacing: "0.05em" }}>{achievements["zora"][1].title}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
