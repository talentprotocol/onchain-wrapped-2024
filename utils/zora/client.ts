import { rollbarError } from "../rollbar/log";

const ZORA_GRAPHQL_URL = "https://api.zora.co/universal/graphql";

export const getWalletPostsAndMints = async (
  walletAddress: string,
  postsCursor: string | undefined,
  mintsCursor: string | undefined
) => {
  const query = JSON.stringify({
    query: `{
        profile(identifier: "${walletAddress}") {
          createdCollectionsOrTokens(first: 100${postsCursor ? `, after: "${postsCursor}"` : ""}) {
            edges {
              node {
                name
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
          collectedCollectionsOrTokens(first: 100${mintsCursor ? `, after: "${mintsCursor}"` : ""}) {
            edges {
              node {
                name
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
    }`
  });

  const result = await fetch(ZORA_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: query
  });

  if (!result.ok) {
    rollbarError(`Unable to get ${walletAddress} posts and mints`, undefined, {
      status: result.status,
      body: result.body
    });
  }

  return await result.json();
};
