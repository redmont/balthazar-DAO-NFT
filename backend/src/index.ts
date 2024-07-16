import express from "express";
import nftRoutes from "./routes/nft";
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use("/api/nft", nftRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
