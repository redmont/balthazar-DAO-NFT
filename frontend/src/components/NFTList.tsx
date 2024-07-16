import React from "react";

interface Image {
  thumbnailUrl: string;
}

interface NFT {
  tokenId: string;
  name: string;
  description: string;
  image: Image;
}

interface NFTListProps {
  nfts: NFT[];
}

const NFTList: React.FC<NFTListProps> = ({ nfts }) => {
  return (
    <div style={{ padding: "1%", display: "flex", placeContent: "center" }}>
      {nfts.length === 0 ? (
        <p>No NFTs found</p>
      ) : (
        nfts.map((nft) => (
          <div key={nft.tokenId} style={{ padding: "10px" }}>
            <div>
              <img src={nft.image.thumbnailUrl} alt={nft.name} />
            </div>
            <div>
              <h3>{nft.name}</h3>
              <p>ID: {nft.tokenId}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NFTList;
