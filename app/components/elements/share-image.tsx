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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        padding: "1.5rem",
        backgroundColor: "#DDE7EE",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        fontFamily: "DM Mono, serif",
        fontWeight: "500",
        textTransform: "uppercase",
        letterSpacing: "1.3px",
        color: "#32383E"
      }}
    >
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <h1
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "-0.5rem",
            margin: 0,
            padding: "0 2.5rem",
            border: "2px solid #32383E",
            borderRadius: "2rem",
            backgroundColor: "#32383E",
            color: "#FFFFFF",
            fontSize: "2.25rem",
            letterSpacing: "initial"
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
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.5rem",
            border: "2px solid white",
            borderRadius: "2rem",
            fontSize: "1.5rem",
            background:
              "linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3))",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
          }}
        >
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            {user?.image_url && (
              <img
                src={user?.image_url}
                alt=""
                style={{ width: "80px", height: "80px", borderRadius: "1.5rem", objectFit: "cover" }}
              />
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <span>{user?.ens ?? "-"}</span>
              <span style={{ fontWeight: "300" }}>{onchainSince}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontWeight: "300" }}>Most active on</span>
              <span>{highestTransaction.label}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontWeight: "300" }}>With</span>
              <span>{highestTransaction.value}</span>
              <span style={{ fontWeight: "300" }}>transactions</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div
            style={{
              width: "564px",
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
                  color: "#FFFFFF",
                  fontSize: "0.875rem"
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
                  fontSize: "0.875rem"
                }}
              >
                {`Powered By ${organizations["talent"].name}`}
              </span>
            </div>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: "400", letterSpacing: "-2.6px" }}>
                  {achievements["talent"][0].value}
                </span>
                <span>{achievements["talent"][0].title}</span>
              </div>
              <div
                style={{
                  border: "5px solid transparent",
                  backgroundImage: "radial-gradient(circle, #36363620 2px, transparent 3px)",
                  backgroundSize: "10px 10px"
                }}
              />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: "400", letterSpacing: "-2.6px" }}>
                  {achievements["talent"][1].value}
                </span>
                <span>{achievements["talent"][1].title}</span>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "564px",
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
                  color: "#FFFFFF",
                  fontSize: "0.875rem"
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
                  fontSize: "0.875rem"
                }}
              >
                {`Powered By ${organizations["base"].name}`}
              </span>
            </div>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: "400", letterSpacing: "-2.6px" }}>
                  {achievements["base"][0].value}
                </span>
                <span>{achievements["base"][0].title}</span>
              </div>
              <div
                style={{
                  border: "5px solid transparent",
                  backgroundImage: "radial-gradient(circle, #36363620 2px, transparent 3px)",
                  backgroundSize: "10px 10px"
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: "400", letterSpacing: "-2.6px" }}>
                  {achievements["base"][1].value}
                </span>
                <span>{achievements["base"][1].title}</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div
            style={{
              flex: 1,
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
                  color: "#FFFFFF",
                  fontSize: "0.875rem"
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
                  fontSize: "0.875rem"
                }}
              >
                {`Powered By ${organizations["zerion"].name}`}
              </span>
            </div>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: "400", letterSpacing: "-2.6px" }}>
                  {achievements["zerion"][0].value}
                </span>
                <span>{achievements["zerion"][0].title}</span>
              </span>
              <div
                style={{
                  border: "5px solid transparent",
                  backgroundImage: "radial-gradient(circle, #36363620 2px, transparent 3px)",
                  backgroundSize: "10px 10px"
                }}
              />
              <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: "400", letterSpacing: "-2.6px" }}>
                  {achievements["zerion"][1].value}
                </span>
                <span>{achievements["zerion"][1].title}</span>
              </span>
            </div>
          </div>
          <div
            style={{
              flex: 1,
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
                  color: "#FFFFFF",
                  fontSize: "0.875rem"
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
                  fontSize: "0.875rem"
                }}
              >
                {`Powered By ${organizations["zora"].name}`}
              </span>
            </div>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: "400", letterSpacing: "-2.6px" }}>
                  {achievements["zora"][0].value}
                </span>
                <span>{achievements["zora"][0].title}</span>
              </span>
              <div
                style={{
                  border: "5px solid transparent",
                  backgroundImage: "radial-gradient(circle, #36363620 2px, transparent 3px)",
                  backgroundSize: "10px 10px"
                }}
              />
              <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: "400", letterSpacing: "-2.6px" }}>
                  {achievements["zora"][1].value}
                </span>
                <span>{achievements["zora"][1].title}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
