import { refreshAuthToken } from "@/utils/talent_protocol/client";

export async function refreshToken(tempAuthToken: string) {
  const tokenResponseBody = await refreshAuthToken(tempAuthToken);

  const newAuthToken = tokenResponseBody.auth.token;
  const tokenExpiresAt = tokenResponseBody.auth.expires_at;

  return {
    token: newAuthToken,
    expiresAt: tokenExpiresAt
  };
}
