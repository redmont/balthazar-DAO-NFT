import { Router } from "express";
import axios from "axios";
import { createClient } from "redis";

import "dotenv/config";
const router = Router();
//const client = createClient();
let redisSupport = Boolean(process.env.REDIS_SUPPORT);

router.get("/:ownerAddress/:filterContract", async (req, res) => {
  const redisClient = (global as any).redisClient;

  const { ownerAddress, filterContract } = req.params;
  const cacheKey = `nft:${ownerAddress}:${filterContract}`;

  if (redisSupport && redisClient) {
    const value = await redisClient.get(cacheKey);
    if (value) {
      console.log(`Serving from cache: ${cacheKey}`);
      const cacheRes = { cache: true, nfts: JSON.parse(value) };
      res.json(cacheRes);
      return;
    }
  }

  try {
    const options = { method: "GET", headers: { accept: "application/json" } };

    const alchemyURL = `https://eth-mainnet.g.alchemy.com/nft/v3`;
    const alchemyAPIKey = process.env.ALCHEMY_KEY;
    const NFTContractAddress = filterContract;

    const url = `${alchemyURL}/${alchemyAPIKey}/getNFTsForOwner?owner=${ownerAddress}&contractAddresses[]=${NFTContractAddress}&withMetadata=true&pageSize=100`;
    //console.log(url);

    const response = await axios.get(url);

    // strip and format data a little bit
    let ownedNfts = response.data?.ownedNfts;
    ownedNfts = ownedNfts.map((nft: any) => {
      const formattedObj = {
        tokenId: nft.tokenId,
        name: nft.name,
        image: nft.image,
        traits: nft.raw?.metadata?.attributes,
      };
      return formattedObj;
    });

    // Caching
    if (redisSupport && redisClient) {
      await redisClient.set(
        cacheKey,
        JSON.stringify(ownedNfts),
        { EX: 60 } // Expire in 60 seconds
      );
    }

    res.json({ cache: false, nfts: ownedNfts });
  } catch (error) {
    res.status(500).send("Error fetching NFT data");
  }
});

export default router;
