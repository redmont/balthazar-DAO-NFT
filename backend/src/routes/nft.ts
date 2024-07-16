import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/:ownerAddress/:filterContract", async (req, res) => {
  const { ownerAddress, filterContract } = req.params;
  try {
    const options = { method: "GET", headers: { accept: "application/json" } };

    const alchemyURL = `https://eth-mainnet.g.alchemy.com/nft/v3`;
    const alchemyAPIKey = `YOGCFao8H1mCzIieh2VXMR7lFtgAI_lj`;
    const NFTContractAddress = filterContract;

    const url = `${alchemyURL}/${alchemyAPIKey}/getNFTsForOwner?owner=${ownerAddress}&contractAddresses[]=${NFTContractAddress}&withMetadata=true&pageSize=100`;
    //console.log(url);

    const response = await axios.get(url);
    //console.log(response);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching NFT data");
  }
});

export default router;
