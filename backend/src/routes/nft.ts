import { Router } from "express";
import axios from "axios";
import "dotenv/config";
const router = Router();

router.get("/:ownerAddress/:filterContract", async (req, res) => {
  const { ownerAddress, filterContract } = req.params;
  try {
    const options = { method: "GET", headers: { accept: "application/json" } };

    const alchemyURL = `https://eth-mainnet.g.alchemy.com/nft/v3`;
    const alchemyAPIKey = process.env.ALCHEMY_KEY;
    const NFTContractAddress = filterContract;

    const url = `${alchemyURL}/${alchemyAPIKey}/getNFTsForOwner?owner=${ownerAddress}&contractAddresses[]=${NFTContractAddress}&withMetadata=true&pageSize=100`;
    //console.log(url);

    const response = await axios.get(url);
    //console.log(response);
    res.json(response.data?.ownedNfts);
  } catch (error) {
    res.status(500).send("Error fetching NFT data");
  }
});

export default router;
