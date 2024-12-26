const PINATA_JWT = process.env.NEXT_PINATA_JWT!;

export async function pinFileWithPinata(file: File) {
  const data = new FormData();
  data.append("file", file);

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`
    },
    body: data
  });

  const result = (await res.json()) as { IpfsHash: string };

  return `ipfs://${result.IpfsHash}`;
}

export async function pinJsonWithPinata(json: object, talentId: number) {
  const data = JSON.stringify({
    pinataContent: json,
    pinataMetadata: {
      name: `metadata-${talentId}.json`
    }
  });

  const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PINATA_JWT}`
    },
    body: data
  });

  if (!res.ok) {
    console.error(res);
    console.log("PINATA_JWT", PINATA_JWT);
  }

  const result = (await res.json()) as { IpfsHash: string };

  return `ipfs://${result.IpfsHash}`;
}
