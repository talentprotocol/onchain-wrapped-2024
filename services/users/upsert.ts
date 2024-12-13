import { getPassport, refreshAuthToken } from "@/utils/talent_protocol/client";

export async function upsertUserFromAuthToken(authToken: string) {
  const tokenResponseBody = await refreshAuthToken(authToken);

  const newAuthToken = tokenResponseBody.auth.token;
  const tokenExpiresAt = tokenResponseBody.auth.expires_at;

  const passportResponseBody = await getPassport(newAuthToken);
}
