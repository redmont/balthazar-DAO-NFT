import React, { useState } from "react";
import NFTList from "./components/NFTList";
import axios from "axios";

const pudgyPenguinContractAddress = `0xbd3531da5cf5857e7cfaa92426877b022e612cf8`;
const testWallet = `0xcb415344Cd0fC552CE7B48EE9375991Ff5865895`;

const App: React.FC = () => {
  const [address, setAddress] = useState<string>(testWallet);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string>("");

  const [contractAddress, setContractAddress] = useState<string>(
    pudgyPenguinContractAddress
  );
  const [results, setResult] = useState<any>({ nfts: [], cache: false });

  const handleFetchNFTs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3001/api/nft/${address}/${contractAddress}`
      );
      setResult(response.data);
      setLoading(false);
      setError("");
    } catch (error) {
      console.error("Error fetching NFTs", error);
      setError("Error fetching NFTs Data");
      setLoading(false);
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
        />
      </div>
      <br></br>
      <button type="submit" onClick={handleFetchNFTs}>
        Fetch NFTs
      </button>
      <NFTList result={results} loading={loading} error={error} />
    </div>
  );
};

export default App;
