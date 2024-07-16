import React, { useState } from "react";
import NFTList from "./components/NFTList";
import axios from "axios";

const App: React.FC = () => {
  const [address, setAddress] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>(
    "0xa7f551FEAb03D1F34138c900e7C08821F3C3d1d0"
  );
  const [nfts, setNfts] = useState<any[]>([]);

  const handleFetchNFTs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/nft/${address}/${contractAddress}`
      );
      setNfts(response.data);
    } catch (error) {
      console.error("Error fetching NFTs", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>BalthazarDAO NFT Holdings Viewer</h1>
      <div>
        <label>Wallet Address: </label>
        <input
          type="text"
          style={{ width: "30%", margin: "10px 0px 10px 0px" }}
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br></br>
        <label>NFT Contract: </label>
        <input
          type="text"
          style={{ width: "30%", margin: "10px 0px 10px 0px" }}
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="NFT Contract Address"
          defaultValue={"0xa7f551FEAb03D1F34138c900e7C08821F3C3d1d0"}
        />
      </div>
      <br></br>
      <button type="submit" onClick={handleFetchNFTs}>
        Fetch NFTs
      </button>
      <NFTList nfts={nfts} />
    </div>
  );
};

export default App;
