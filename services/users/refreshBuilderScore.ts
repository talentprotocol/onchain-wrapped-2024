import { refreshAuthToken } from "@/utils/talent_protocol/client";

export async function refreshBuilderScore(authToken: string) {
  const tokenResponseBody = await refreshAuthToken(authToken);

  const newAuthToken = tokenResponseBody.auth.token;
  const tokenExpiresAt = tokenResponseBody.auth.expires_at;

  return {
    token: newAuthToken,
    expiresAt: tokenExpiresAt
  };
}
