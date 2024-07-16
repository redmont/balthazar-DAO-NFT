import express from "express";
import nftRoutes from "./routes/nft";
import { createClient } from "redis";
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;
const client = createClient();

(global as any).redisClient = true;

client.on("error", (err) => {
  (global as any).redisClient = false;
  //console.log("Redis Client Error", err);
});

app.use(express.json());
app.use(cors());
app.use("/api/nft", nftRoutes);

app.listen(port, async () => {
  if ((global as any).redisClient) {
    await client.connect();
    (global as any).redisClient = client;
  }

  console.log(`Server is running on port ${port}`);
});
