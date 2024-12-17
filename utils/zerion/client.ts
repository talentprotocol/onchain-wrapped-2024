const ZERION_BASE_URL = "https://api.talentprotocol.com/api/";

export const getWalletTransactions = async (walletAddress: string) => {
  const result = await fetch(`${ZERION_BASE_URL}/`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  });

  return await result.json();
};

export const getWalletPNL = async (walletAddress: string) => {
  const result = await fetch(`${ZERION_BASE_URL}/`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  });

  return await result.json();
};
