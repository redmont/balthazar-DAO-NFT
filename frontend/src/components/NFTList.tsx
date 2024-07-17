import React from "react";

interface Image {
  thumbnailUrl: string;
}

interface NFT {
  tokenId: string;
  name: string;
  description: string;
  image: Image;
  traits: any[];
}
interface Result {
  cache: Boolean;
  nfts: NFT[];
}

interface NFTListProps {
  result: Result;
  loading: Boolean;
  error: string;
}

const NFTList: React.FC<NFTListProps> = ({ result, loading, error }) => {
  const { nfts, cache } = result;
  if (loading) {
    return <div style={{ padding: 100 }}>{"Loading ..."}</div>;
  }
  if (error) {
    return <div style={{ padding: 100 }}>{error}</div>;
  }
  return (
    <div>
      {typeof cache == "boolean" && (
        <p>{`Data served from ${cache ? `Redis Cache` : `Alchemy API`}`}</p>
      )}
      <ul
        style={{
          display: "flex",
          placeContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: 0,
        }}
      >
        {nfts.length === 0 ? (
          <div>No NFTs found</div>
        ) : (
          nfts.map((nft) => (
            <li
              key={nft.tokenId}
              style={{
                padding: "10px",
                listStyle: "none",
              }}
            >
              <div>
                <img src={nft.image?.thumbnailUrl} alt={nft.name} />
              </div>
              <div>
                <h3>{nft.name}</h3>
                <p>{nft.tokenId && `ID: ${nft.tokenId}`}</p>
                <div>
                  {nft.traits?.map((trait) => {
                    return (
                      <div style={{ textTransform: "capitalize", padding: 3 }}>
                        {trait.trait_type}: {trait.value}
                      </div>
                    );
                  })}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default NFTList;
