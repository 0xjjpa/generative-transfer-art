import { FetchStaticData } from "@zoralabs/nft-hooks";
import { NFTPreview } from "@zoralabs/nft-components";
import { useRouter } from "next/router";

export const AuctionsList = ({ tokens }: { tokens: any[] }) => {
  const router = useRouter();
  const MOODS = ["Aloof", "Shy", "Mischievous", "Flirty", "Dramatic", "Sly"];
  const filteredTokens = tokens.filter(
    (token, index) => {
      return MOODS.reduce(
        (acc, mood) =>
          Object.assign({}, acc, {
            result: (acc && acc.word.includes(mood)) || acc.result,
          }),
        {
          word:
            token.nft &&
            token.nft.tokenData &&
            token.nft.tokenData.metadata &&
            token.nft.tokenData.metadata.json &&
            token.nft.tokenData.metadata.json.name
              ? token.nft.tokenData.metadata.json.name
              : "",
          result: false,
        }
      ).result
    }
  );

  return (
    <div css={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {filteredTokens &&
        filteredTokens.map((token) => {
          const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);
          return (
            <NFTPreview
              initialData={token}
              key={tokenInfo.tokenId}
              id={tokenInfo.tokenId}
              contract={tokenInfo.tokenContract}
              onClick={(evt) =>
                router.push(
                  `/token/${tokenInfo.tokenContract}/${tokenInfo.tokenId}`
                )
              }
              useBetaIndexer={true}
            />
          );
        })}
    </div>
  );
};
