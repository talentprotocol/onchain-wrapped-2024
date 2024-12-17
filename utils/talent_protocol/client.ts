const TALENT_PROTOCOL_BASE_URL = process.env.NEXT_TALENT_PROTOCOL_BASE_URL!;

export const refreshAuthToken = async (authToken: string) => {
  const result = await fetch(`${TALENT_PROTOCOL_BASE_URL}/api/v2/auth/refresh_token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "X-API-KEY": process.env.NEXT_TALENT_PROTOCOL_API_KEY!,
      AUTHORIZATION: `Bearer ${authToken}`
    }
  });

  return await result.json();
};

export const getTalentOnchainWrapped = async (authToken: string) => {
  const result = await fetch(`${TALENT_PROTOCOL_BASE_URL}/api/v2/passports/onchain_wrapped`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-API-KEY": process.env.NEXT_TALENT_PROTOCOL_API_KEY!,
      AUTHORIZATION: `Bearer ${authToken}`
    }
  });

  return await result.json();
};
