import { rollbarError } from "../rollbar/log";

const ZERION_BASE_URL = "https://api.zerion.io";

export const getWalletChart = async (walletAddress: string, chains: string, currency: string) => {
  const queryParams = new URLSearchParams({
    currency: currency,
    "filter[chain_ids]": chains
  }).toString();

  const result = await fetch(`${ZERION_BASE_URL}/v1/wallets/${walletAddress}/charts/year?` + queryParams, {
    method: "GET",
    headers: headers()
  });

  if (!result.ok) {
    rollbarError(`Unable to get ${walletAddress} zerion wallet chart`, undefined, {
      status: result.status,
      body: result.body
    });
  }

  return await result.json();
};

export const getWalletTransactions = async (
  walletAddress: string,
  chains: string,
  currency: string,
  nextPageUrl: string | undefined
) => {
  const queryParams = new URLSearchParams({
    currency: currency,
    "filter[chain_ids]": chains
  }).toString();

  const url = nextPageUrl ? nextPageUrl : `${ZERION_BASE_URL}/v1/wallets/${walletAddress}/transactions?` + queryParams;
  const result = await fetch(url, {
    method: "GET",
    headers: headers()
  });

  if (!result.ok) {
    rollbarError(`Unable to get ${walletAddress} zerion transactions`, undefined, {
      status: result.status,
      body: result.body
    });
  }

  return await result.json();
};

const headers = () => {
  const credential = `${process.env.NEXT_ZERION_API_KEY!}:`;

  return {
    Accept: "application/json",
    Authorization: `Basic ${btoa(credential)}`
  };
};
