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

interface NFTListProps {
  nfts: NFT[];
  loading: Boolean;
}

const NFTList: React.FC<NFTListProps> = ({ nfts, loading }) => {
  if (loading) {
    return <div style={{ padding: 100 }}>{"Loading ..."}</div>;
  }
  return (
    <ul
      style={{
        display: "flex",
        placeContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {nfts.length === 0 ? (
        <p>No NFTs found</p>
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
              <img src={nft.image.thumbnailUrl} alt={nft.name} />
            </div>
            <div>
              <h3>{nft.name}</h3>
              <p>ID: {nft.tokenId}</p>
              <div>
                {nft.traits.map((trait) => {
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
  );
};

export default NFTList;
