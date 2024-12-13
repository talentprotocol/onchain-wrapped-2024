const TALENT_PROTOCOL_BASE_URL = "https://api.talentprotocol.com/api/";

export const refreshAuthToken = async (authToken: string) => {
  const result = await fetch(`${TALENT_PROTOCOL_BASE_URL}/v2/auth/refresh_token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "X-API-KEY": process.env.NEXT_TALENT_PROTOCOL_API_KEY!,
      AUTHORIZATION: `Bearer ${authToken}`
    }
  });

  return await result.json();
};

export const getPassport = async (authToken: string) => {
  const result = await fetch(`${TALENT_PROTOCOL_BASE_URL}/v2/current_passport`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "X-API-KEY": process.env.NEXT_TALENT_PROTOCOL_API_KEY!,
      AUTHORIZATION: `Bearer ${authToken}`
    }
  });

  return await result.json();
};
